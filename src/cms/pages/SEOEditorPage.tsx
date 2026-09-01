import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState } from '../types/cmsTypes';
import { Save, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const SEOEditorPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [formData, setFormData] = useState(draftState.seo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSaveDraft({
      ...draftState,
      seo: formData,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            SEO & META TAGS CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Page Titles, Social Sharing & Favicon
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

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-4">
        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">WEBSITE PAGE TITLE</label>
          <input
            type="text"
            value={formData.pageTitle}
            onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
          />
        </div>

        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">META DESCRIPTION</label>
          <textarea
            rows={3}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">FAVICON ICON URL</label>
            <input
              type="text"
              value={formData.faviconUrl}
              onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SOCIAL SHARE IMAGE (OG:IMAGE)</label>
            <input
              type="text"
              value={formData.ogImageUrl}
              onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SECTION CHANGES SAVED!' : 'SAVE SECTION CHANGES'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
