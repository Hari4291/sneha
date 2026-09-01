import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState } from '../types/cmsTypes';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Heart, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const CoupleEditorPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [formData, setFormData] = useState(draftState.couple);
  const [activePhotoTarget, setActivePhotoTarget] = useState<'bride' | 'groom' | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSaveDraft({
      ...draftState,
      couple: formData,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            COUPLE SECTION EDITOR
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Edit Bride & Groom Profiles
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bride Profile Card */}
        <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-6">
          <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase tracking-wider border-b border-[#bf953f]/20 pb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#8a5d12]" />
            <span>BRIDE PROFILE DETAILS (SRI SAI SNEHA)</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-36 w-36 rounded-2xl border-2 border-[#bf953f]/40 overflow-hidden shadow-md shrink-0">
              <img src={formData.bride.photo} alt="Bride" className="h-full w-full object-cover" />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setActivePhotoTarget('bride')}
                className="flex items-center gap-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] px-4 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                <span>CHANGE BRIDE PHOTO</span>
              </button>
              <span className="mt-1 font-sans text-[10px] text-[#734f10] block">
                Official Pellikuthuru / Editorial portrait
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">FULL NAME</label>
              <input
                type="text"
                value={formData.bride.fullName}
                onChange={(e) => setFormData({ ...formData, bride: { ...formData.bride, fullName: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SALUTATION</label>
              <input
                type="text"
                value={formData.bride.salutation}
                onChange={(e) => setFormData({ ...formData, bride: { ...formData.bride, salutation: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">QUALIFICATION</label>
              <input
                type="text"
                value={formData.bride.qualification}
                onChange={(e) => setFormData({ ...formData, bride: { ...formData.bride, qualification: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">FATHER NAME</label>
              <input
                type="text"
                value={formData.bride.father}
                onChange={(e) => setFormData({ ...formData, bride: { ...formData.bride, father: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">MOTHER NAME</label>
              <input
                type="text"
                value={formData.bride.mother}
                onChange={(e) => setFormData({ ...formData, bride: { ...formData.bride, mother: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">RESIDENCE / LOCATION</label>
            <input
              type="text"
              value={formData.bride.residence}
              onChange={(e) => setFormData({ ...formData, bride: { ...formData.bride, residence: e.target.value } })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        {/* Groom Profile Card */}
        <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-6">
          <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase tracking-wider border-b border-[#bf953f]/20 pb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#8a5d12]" />
            <span>GROOM PROFILE DETAILS (SUBRAMANYESWARA SWAMI)</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-36 w-36 rounded-2xl border-2 border-[#bf953f]/40 overflow-hidden shadow-md shrink-0">
              <img src={formData.groom.photo} alt="Groom" className="h-full w-full object-cover" />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setActivePhotoTarget('groom')}
                className="flex items-center gap-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] px-4 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                <span>CHANGE GROOM PHOTO</span>
              </button>
              <span className="mt-1 font-sans text-[10px] text-[#734f10] block">
                Official Groom portrait
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">FULL NAME</label>
              <input
                type="text"
                value={formData.groom.fullName}
                onChange={(e) => setFormData({ ...formData, groom: { ...formData.groom, fullName: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SALUTATION</label>
              <input
                type="text"
                value={formData.groom.salutation}
                onChange={(e) => setFormData({ ...formData, groom: { ...formData.groom, salutation: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">QUALIFICATION</label>
              <input
                type="text"
                value={formData.groom.qualification}
                onChange={(e) => setFormData({ ...formData, groom: { ...formData.groom, qualification: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">FATHER NAME</label>
              <input
                type="text"
                value={formData.groom.father}
                onChange={(e) => setFormData({ ...formData, groom: { ...formData.groom, father: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">MOTHER NAME</label>
              <input
                type="text"
                value={formData.groom.mother}
                onChange={(e) => setFormData({ ...formData, groom: { ...formData.groom, mother: e.target.value } })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">RESIDENCE / LOCATION</label>
            <input
              type="text"
              value={formData.groom.residence}
              onChange={(e) => setFormData({ ...formData, groom: { ...formData.groom, residence: e.target.value } })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
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
        isOpen={activePhotoTarget !== null}
        onClose={() => setActivePhotoTarget(null)}
        onSelect={(url) => {
          if (activePhotoTarget === 'bride') {
            setFormData({ ...formData, bride: { ...formData.bride, photo: url } });
          } else if (activePhotoTarget === 'groom') {
            setFormData({ ...formData, groom: { ...formData.groom, photo: url } });
          }
        }}
        currentValue={activePhotoTarget === 'bride' ? formData.bride.photo : formData.groom.photo}
      />
    </div>
  );
};
