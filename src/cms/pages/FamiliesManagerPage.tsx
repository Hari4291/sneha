import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, FamilyMemberData } from '../types/cmsTypes';
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const FamiliesManagerPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [editingMember, setEditingMember] = useState<FamilyMemberData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const triggerSave = () => {
    handleSaveDraft();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateNew = () => {
    const newMember: FamilyMemberData = {
      id: `fam-${Date.now()}`,
      name: 'Family Member Name',
      role: 'Host / Well Wisher',
      family: 'host',
      visible: true,
      order: draftState.families.length + 1,
    };
    setEditingMember(newMember);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    const existingIdx = draftState.families.findIndex((f) => f.id === editingMember.id);
    let updated = [...draftState.families];

    if (existingIdx >= 0) {
      updated[existingIdx] = editingMember;
    } else {
      updated.push(editingMember);
    }

    handleSaveDraft({ ...draftState, families: updated });
    setEditingMember(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteMember = (id: string) => {
    if (!window.confirm('Delete this family member?')) return;
    const updated = draftState.families.filter((f) => f.id !== id);
    handleSaveDraft({ ...draftState, families: updated });
  };

  const toggleVisibility = (id: string) => {
    const updated = draftState.families.map((f) =>
      f.id === id ? { ...f, visible: !f.visible } : f
    );
    handleSaveDraft({ ...draftState, families: updated });
  };

  const moveMember = (index: number, direction: 'up' | 'down') => {
    const list = [...draftState.families];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    handleSaveDraft({ ...draftState, families: reordered });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            FAMILY BLESSINGS CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Hosts, Elders & Well-Wishers
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SAVED!' : 'SAVE CHANGES'}</span>
          </button>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#8a5d12] px-4 py-2.5 font-cinzel text-xs font-bold text-[#fffdfa] hover:bg-[#734f10] cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>ADD MEMBER</span>
          </button>
        </div>
      </div>

      {!editingMember && (
        <div className="space-y-3">
          {draftState.families.map((f, idx) => (
            <div
              key={f.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                f.visible ? 'border-[#bf953f]/40 bg-[#fffdf9]' : 'border-gray-300 bg-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4a0e17] text-xs font-cinzel font-bold text-[#fcf6ba]">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-cormorant text-base font-bold text-[#4a0e17]">{f.name}</h4>
                  <span className="font-sans text-xs text-[#8a5d12]">{f.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveMember(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-[#f7f2e8] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveMember(idx, 'down')}
                  disabled={idx === draftState.families.length - 1}
                  className="p-1.5 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-[#f7f2e8] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleVisibility(f.id)}
                  className={`p-1.5 rounded-lg border cursor-pointer ${
                    f.visible ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-400 bg-gray-200 text-gray-600'
                  }`}
                >
                  {f.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setEditingMember(f)}
                  className="p-1.5 rounded-lg border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteMember(f.id)}
                  className="p-1.5 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingMember && (
        <form onSubmit={handleSaveMember} className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#bf953f]/20 pb-3">
            <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase">EDIT FAMILY MEMBER</h3>
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="text-xs font-cinzel font-bold text-gray-500 hover:text-black underline cursor-pointer"
            >
              CANCEL
            </button>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">NAME</label>
            <input
              type="text"
              required
              value={editingMember.name}
              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">ROLE / RELATIONSHIP</label>
            <input
              type="text"
              required
              value={editingMember.role}
              onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-cinzel font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
            >
              <Save className="h-4 w-4 text-[#bf953f]" />
              <span>SAVE MEMBER</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
