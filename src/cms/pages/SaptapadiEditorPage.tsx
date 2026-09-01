import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, SaptapadiVowData } from '../types/cmsTypes';
import { getStoredCMSState } from '../store/cmsStore';
import { Save, CheckCircle, Footprints } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const SaptapadiEditorPage: React.FC = () => {
  const { handleSaveDraft } = useOutletContext<OutletContextType>();
  const [vowsList, setVowsList] = useState<SaptapadiVowData[]>(() => {
    const current = getStoredCMSState('draft');
    return current.saptapadiVows || [];
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdateVow = (index: number, field: keyof SaptapadiVowData, value: string | number) => {
    const updated = [...vowsList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setVowsList(updated);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const freshState = getStoredCMSState('draft');
    handleSaveDraft({
      ...freshState,
      saptapadiVows: vowsList,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            DEVOTIONAL TRADITION CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Edit Saptapadi Vows (The 7 Sacred Steps)
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {vowsList.map((vow, index) => (
          <div
            key={vow.step}
            className="rounded-2xl border border-[#bf953f]/40 bg-[#fffdf9] p-6 shadow-md space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[#bf953f]/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] font-cinzel font-bold text-sm">
                  0{vow.step}
                </div>
                <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase">
                  STEP {vow.step} VOW
                </h3>
              </div>
              <Footprints className="h-5 w-5 text-[#8a5d12]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                  SANSKRIT TITLE / MOTTO
                </label>
                <input
                  type="text"
                  required
                  value={vow.sanskrit}
                  onChange={(e) => handleUpdateVow(index, 'sanskrit', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                  TELUGU NAME (తెలుగు పేరు)
                </label>
                <input
                  type="text"
                  required
                  value={vow.teluguName}
                  onChange={(e) => handleUpdateVow(index, 'teluguName', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                TELUGU MEANING & EXPLANATION (తెలుగు వివరణ)
              </label>
              <textarea
                rows={2}
                required
                value={vow.teluguMeaning}
                onChange={(e) => handleUpdateVow(index, 'teluguMeaning', e.target.value)}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                ENGLISH SIGNIFICANCE
              </label>
              <textarea
                rows={2}
                required
                value={vow.englishMeaning}
                onChange={(e) => handleUpdateVow(index, 'englishMeaning', e.target.value)}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
              />
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-3 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SECTION CHANGES SAVED!' : 'SAVE SECTION CHANGES'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
