import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, CelebrationItemData, CelebrationsHeaderData } from '../types/cmsTypes';
import { getStoredCMSState } from '../store/cmsStore';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Save, CheckCircle, Sparkles, MapPin, Image as ImageIcon } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const CelebrationsManagerPage: React.FC = () => {
  const { handleSaveDraft } = useOutletContext<OutletContextType>();
  const [headerData, setHeaderData] = useState<CelebrationsHeaderData>(() => {
    const current = getStoredCMSState('draft');
    return current.celebrationsHeader || {
      title: 'CHAPTER IV • SACRED RITUALS',
      heading: 'CELEBRATIONS',
      subheading: 'Select a sacred ceremony below to view its cinematic chapter and invitation.',
    };
  });

  const [celebrationsList, setCelebrationsList] = useState<CelebrationItemData[]>(() => {
    const current = getStoredCMSState('draft');
    return current.celebrations || [];
  });

  const [mediaPickerIndex, setMediaPickerIndex] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdateItem = (index: number, field: keyof CelebrationItemData, value: string | boolean) => {
    const updated = [...celebrationsList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setCelebrationsList(updated);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fresh = getStoredCMSState('draft');
    handleSaveDraft({
      ...fresh,
      celebrationsHeader: headerData,
      celebrations: celebrationsList,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            RITUALS & EVENTS CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Edit Celebrations (Haldi, Pellikuthuru, Wedding)
          </h2>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="flex items-center justify-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg shrink-0"
        >
          {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
          <span>{saveSuccess ? 'SAVED!' : 'SAVE CELEBRATIONS'}</span>
        </button>
      </div>

      {/* Header Titles Card */}
      <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-4">
        <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase border-b border-[#bf953f]/20 pb-2">
          SECTION HEADER TITLES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SECTION TAG</label>
            <input
              type="text"
              value={headerData.title}
              onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">MAIN HEADING</label>
            <input
              type="text"
              value={headerData.heading}
              onChange={(e) => setHeaderData({ ...headerData, heading: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SUBHEADING / INSTRUCTION</label>
          <input
            type="text"
            value={headerData.subheading}
            onChange={(e) => setHeaderData({ ...headerData, subheading: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
          />
        </div>
      </div>

      {/* Celebrations Event Editors */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {celebrationsList.map((item, index) => (
          <div
            key={item.id || index}
            className="rounded-2xl border-2 border-[#bf953f]/40 bg-[#fffdf9] p-6 shadow-lg space-y-5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[#bf953f]/25 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] font-cinzel font-bold text-xs">
                  0{index + 1}
                </div>
                <h3 className="font-cinzel text-base font-extrabold text-[#4a0e17] uppercase">
                  {item.name} EVENT CHAPTER
                </h3>
              </div>
              <Sparkles className="h-5 w-5 text-[#8a5d12]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">CARD NAME</label>
                <input
                  type="text"
                  required
                  value={item.name}
                  onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">EVENT DATE</label>
                <input
                  type="text"
                  required
                  value={item.date}
                  onChange={(e) => handleUpdateItem(index, 'date', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">DAY OF WEEK</label>
                <input
                  type="text"
                  required
                  value={item.day}
                  onChange={(e) => handleUpdateItem(index, 'day', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">CHAPTER TITLE</label>
                <input
                  type="text"
                  required
                  value={item.title}
                  onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SUBHEADING / TAGLINE</label>
                <input
                  type="text"
                  value={item.subheading || ''}
                  onChange={(e) => handleUpdateItem(index, 'subheading', e.target.value)}
                  placeholder="e.g. WITH HALDI & HENNA"
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">INVITATION MESSAGE</label>
              <textarea
                rows={2}
                required
                value={item.message}
                onChange={(e) => handleUpdateItem(index, 'message', e.target.value)}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">TIME & SCHEDULE</label>
                <input
                  type="text"
                  required
                  value={item.time}
                  onChange={(e) => handleUpdateItem(index, 'time', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">FOLLOWED BY / DINNER</label>
                <input
                  type="text"
                  value={item.followedBy || ''}
                  onChange={(e) => handleUpdateItem(index, 'followedBy', e.target.value)}
                  placeholder="e.g. Followed by High Tea & Dinner"
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">VENUE NAME</label>
                <input
                  type="text"
                  required
                  value={item.venue}
                  onChange={(e) => handleUpdateItem(index, 'venue', e.target.value)}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">ADDRESS / LOCATION DETAILS</label>
                <input
                  type="text"
                  value={item.address || ''}
                  onChange={(e) => handleUpdateItem(index, 'address', e.target.value)}
                  placeholder="e.g. Kokkirapadu Adda Road, Kalaparru (v)"
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">DRESS CODE (OPTIONAL)</label>
                <input
                  type="text"
                  value={item.dressCode || ''}
                  onChange={(e) => handleUpdateItem(index, 'dressCode', e.target.value)}
                  placeholder="e.g. Pastels only (PEACH, BABY PINK, BEIGE)"
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">TAGLINE (OPTIONAL)</label>
                <input
                  type="text"
                  value={item.tagline || ''}
                  onChange={(e) => handleUpdateItem(index, 'tagline', e.target.value)}
                  placeholder="e.g. A PROMISE FOR A LIFETIME"
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
              </div>
            </div>

            {/* Google Maps Location URL */}
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#8a5d12]" />
                <span>GOOGLE MAPS LOCATION URL (FOR "VIEW LOCATION" BUTTON)</span>
              </label>
              <input
                type="url"
                required
                value={item.googleMapsUrl}
                onChange={(e) => handleUpdateItem(index, 'googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            {/* Hero Image Selector */}
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">EVENT HERO PHOTOGRAPH</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  required
                  value={item.heroImage}
                  onChange={(e) => handleUpdateItem(index, 'heroImage', e.target.value)}
                  className="flex-1 rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
                />
                <button
                  type="button"
                  onClick={() => setMediaPickerIndex(index)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] text-xs font-cinzel font-bold hover:bg-[#7a1c29] cursor-pointer shrink-0"
                >
                  <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                  <span>SELECT FROM MEDIA LIBRARY</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-3 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'CELEBRATIONS SAVED!' : 'SAVE CELEBRATIONS'}</span>
          </button>
        </div>
      </form>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerIndex !== null}
        onClose={() => setMediaPickerIndex(null)}
        acceptType="image"
        onSelect={(url) => {
          if (mediaPickerIndex !== null) {
            handleUpdateItem(mediaPickerIndex, 'heroImage', url);
          }
        }}
        currentValue={mediaPickerIndex !== null ? celebrationsList[mediaPickerIndex]?.heroImage : ''}
      />
    </div>
  );
};
