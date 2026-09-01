import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState } from '../types/cmsTypes';
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Save, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const SectionManagerPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleSection = (id: string) => {
    const updatedSections = draftState.sections.map((sec) =>
      sec.id === id ? { ...sec, visible: !sec.visible } : sec
    );
    handleSaveDraft({ ...draftState, sections: updatedSections });
  };

  const deleteSection = (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this section from the website?')) return;
    const updatedSections = draftState.sections.filter((sec) => sec.id !== id);
    handleSaveDraft({ ...draftState, sections: updatedSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...draftState.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;

    // re-index order
    const ordered = newSections.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    handleSaveDraft({ ...draftState, sections: ordered });
  };

  const triggerSave = () => {
    handleSaveDraft();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            VISUAL SECTION MANAGER
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Reorder, Delete & Enable Public Website Sections
          </h2>
        </div>

        <button
          onClick={triggerSave}
          className="flex items-center justify-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg shrink-0"
        >
          {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
          <span>{saveSuccess ? 'SECTION CHANGES SAVED!' : 'SAVE SECTION CHANGES'}</span>
        </button>
      </div>

      <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-4">
        <p className="font-sans text-xs text-[#734f10]">
          Drag or use arrows to change section display order on the live website. Toggle the eye icon to hide/show, or click the trash icon to permanently delete a section. Click "SAVE SECTION CHANGES" when finished.
        </p>

        <div className="space-y-3">
          {draftState.sections.map((section, idx) => (
            <div
              key={section.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                section.visible
                  ? 'border-[#bf953f]/40 bg-[#f7f2e8]'
                  : 'border-gray-300 bg-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4a0e17] text-xs font-cinzel font-bold text-[#fcf6ba]">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#4a0e17]">
                    {section.name}
                  </h4>
                  <span className="font-sans text-[10px] text-[#8a5d12]">
                    ID: #{section.id} • {section.visible ? 'VISIBLE PUBLICLY' : 'HIDDEN FROM PUBLIC'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-white disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === draftState.sections.length - 1}
                  className="p-1.5 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-white disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-cinzel font-bold cursor-pointer transition-colors ${
                    section.visible
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
                      : 'border-gray-400 bg-gray-200 text-gray-700'
                  }`}
                >
                  {section.visible ? (
                    <>
                      <Eye className="h-4 w-4" />
                      <span>VISIBLE</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4" />
                      <span>HIDDEN</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="p-1.5 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                  title="Delete Section"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#bf953f]/20 flex justify-end">
          <button
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-3 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SECTION CHANGES SAVED!' : 'SAVE SECTION CHANGES'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
