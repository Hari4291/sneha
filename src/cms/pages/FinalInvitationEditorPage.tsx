import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, FinalInvitationData } from '../types/cmsTypes';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Save, Image as ImageIcon, Plus, Trash2, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const FinalInvitationEditorPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [formData, setFormData] = useState<FinalInvitationData>(
    draftState.finalInvitation || {
      title: 'FINAL INVITATION',
      heading: 'Your Presence Is Our Blessing',
      paragraph1: 'With hearts filled with joy, we invite you to celebrate this beautiful beginning with us.',
      paragraph2: 'As two hearts unite and families come together, your presence and blessings mean the world to us.',
      monogramText: 'SS',
      monogramImage: '/assets/logo.jpg',
      warmRegardsTitle: 'WARM REGARDS',
      hosts: ['DADIGI KANAKA PEDDI RAJU', 'DADIGI KANAKA DURGA', 'DADIGI NAGU'],
    }
  );
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSaveDraft({
      ...draftState,
      finalInvitation: formData,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleHostChange = (index: number, val: string) => {
    const updated = [...formData.hosts];
    updated[index] = val;
    setFormData({ ...formData, hosts: updated });
  };

  const addHost = () => {
    setFormData({ ...formData, hosts: [...formData.hosts, 'NEW HOST NAME'] });
  };

  const removeHost = (index: number) => {
    const updated = formData.hosts.filter((_, idx) => idx !== index);
    setFormData({ ...formData, hosts: updated });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            FINAL INVITATION & WARM REGARDS CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Edit Final Invitation & Warm Regards Section
          </h2>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="flex items-center justify-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg shrink-0"
        >
          {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
          <span>{saveSuccess ? 'SECTION CHANGES SAVED!' : 'SAVE SECTION CHANGES'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SECTION TITLE TAG</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">MAIN HEADING</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">INVITATION PARAGRAPH 1</label>
          <textarea
            rows={2}
            value={formData.paragraph1}
            onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">INVITATION PARAGRAPH 2</label>
          <textarea
            rows={2}
            value={formData.paragraph2}
            onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
          />
        </div>

        {/* Monogram Seal Config */}
        <div className="space-y-3 border-t border-b border-[#bf953f]/20 py-4">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">CIRCULAR SS MONOGRAM SEAL</label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-1">
              <label className="font-cinzel text-[10px] font-bold text-[#734f10] uppercase block">MONOGRAM TEXT (e.g. SS)</label>
              <input
                type="text"
                value={formData.monogramText}
                onChange={(e) => setFormData({ ...formData, monogramText: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full border border-[#bf953f] bg-gray-100 overflow-hidden shrink-0">
                <img src={formData.monogramImage || '/assets/logo.jpg'} alt="Monogram" className="h-full w-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] px-3 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                <span>CHANGE SEAL IMAGE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Warm Regards Config */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
              WARM REGARDS HOST NAMES
            </label>
            <button
              type="button"
              onClick={addHost}
              className="flex items-center gap-1 text-xs font-cinzel font-bold text-[#4a0e17] hover:text-[#7a1c29] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>ADD HOST NAME</span>
            </button>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[10px] font-bold text-[#734f10] uppercase block">REGARDS TITLE</label>
            <input
              type="text"
              value={formData.warmRegardsTitle}
              onChange={(e) => setFormData({ ...formData, warmRegardsTitle: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-2">
            {formData.hosts.map((host, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={host}
                  onChange={(e) => handleHostChange(idx, e.target.value)}
                  className="flex-1 rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
                <button
                  type="button"
                  onClick={() => removeHost(idx)}
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                  title="Remove Host"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SECTION CHANGES SAVED!' : 'SAVE SECTION CHANGES'}</span>
          </button>
        </div>
      </form>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, monogramImage: url })}
        currentValue={formData.monogramImage}
      />
    </div>
  );
};
