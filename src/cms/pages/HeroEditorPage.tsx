import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState } from '../types/cmsTypes';
import { getStoredCMSState } from '../store/cmsStore';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Image as ImageIcon, Save, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const HeroEditorPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [formData, setFormData] = useState(() => getStoredCMSState('draft').hero);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFormData(getStoredCMSState('draft').hero);
  }, [draftState]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const freshState = getStoredCMSState('draft');
    handleSaveDraft({
      ...freshState,
      hero: formData,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            HERO SECTION EDITOR
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Edit Hero Section & Typography
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
        {/* Background Photo Picker */}
        <div className="space-y-2 border-b border-[#bf953f]/20 pb-6">
          <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
            HERO SECTION BACKGROUND COUPLE PHOTOGRAPH
          </label>
          <div className="flex items-center gap-4">
            <div className="h-28 w-28 rounded-xl border border-[#bf953f]/40 bg-gray-100 overflow-hidden shadow-sm">
              <img src={formData.heroPhoto} alt="Hero Couple" className="h-full w-full object-cover" />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] px-4 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                <span>CHANGE HERO PHOTO</span>
              </button>
              <span className="mt-1 font-sans text-[10px] text-[#734f10] block">
                High-resolution couple portrait
              </span>
            </div>
          </div>
        </div>

        {/* Text Fields */}
        <div className="space-y-1.5">
          <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
            BLESSINGS LINE
          </label>
          <input
            type="text"
            value={formData.blessingsText}
            onChange={(e) => setFormData({ ...formData, blessingsText: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              BRIDE NAME
            </label>
            <input
              type="text"
              value={formData.brideName}
              onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              GROOM NAME
            </label>
            <input
              type="text"
              value={formData.groomName}
              onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              WEDDING HASHTAG
            </label>
            <input
              type="text"
              value={formData.hashtag}
              onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              LOCATION SUMMARY
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              WEDDING DATE
            </label>
            <input
              type="text"
              value={formData.weddingDate}
              onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              SUMUHURTHAM TIME STR
            </label>
            <input
              type="text"
              value={formData.sumuhurthamTime}
              onChange={(e) => setFormData({ ...formData, sumuhurthamTime: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-3 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
          </div>
        </div>

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

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, heroPhoto: url })}
        currentValue={formData.heroPhoto}
      />
    </div>
  );
};
