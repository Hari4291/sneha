import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, GalleryItemData, GalleryHeaderData } from '../types/cmsTypes';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Plus, Trash2, Eye, EyeOff, Edit2, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const GalleryManagerPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [galleryHeader, setGalleryHeader] = useState<GalleryHeaderData>(
    draftState.galleryHeader || {
      title: 'CHAPTER V • WEDDING GALLERY',
      heading: 'Moments Captured in Time',
      subheading: 'Every picture tells a story of love, laughter, and lifelong togetherness.',
    }
  );
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isEditImagePickerOpen, setIsEditImagePickerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const triggerSave = () => {
    handleSaveDraft({
      ...draftState,
      galleryHeader,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddPhoto = (url: string) => {
    const newItem: GalleryItemData = {
      id: `gal-${Date.now()}`,
      url,
      caption: 'Sri Sai Sneha & Subramanyeswara Swami — Wedding Moment',
      category: 'Couple',
      span: 'col-span-12 md:col-span-6 row-span-1',
      visible: true,
      order: draftState.gallery.length + 1,
    };
    const updated = [...draftState.gallery, newItem];
    handleSaveDraft({ ...draftState, galleryHeader, gallery: updated });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteItem = (id: string) => {
    if (!window.confirm('Are you sure you want to remove this photo from the gallery?')) return;
    const updated = draftState.gallery.filter((g) => g.id !== id);
    handleSaveDraft({ ...draftState, galleryHeader, gallery: updated });
  };

  const toggleVisibility = (id: string) => {
    const updated = draftState.gallery.map((g) =>
      g.id === id ? { ...g, visible: !g.visible } : g
    );
    handleSaveDraft({ ...draftState, galleryHeader, gallery: updated });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const updated = draftState.gallery.map((g) => (g.id === editingItem.id ? editingItem : g));
    handleSaveDraft({ ...draftState, galleryHeader, gallery: updated });
    setEditingItem(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            MEDIA & GALLERY CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Photo Gallery & Header Editor
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SAVED!' : 'SAVE SECTION CHANGES'}</span>
          </button>
          <button
            onClick={() => setIsMediaPickerOpen(true)}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#8a5d12] px-4 py-2.5 font-cinzel text-xs font-bold text-[#fffdfa] hover:bg-[#734f10] cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>ADD PHOTO</span>
          </button>
        </div>
      </div>

      {/* Gallery Header Text Fields Card */}
      <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-4">
        <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase border-b border-[#bf953f]/20 pb-2">
          GALLERY SECTION TITLES & HEADINGS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
              SECTION TITLE TAG
            </label>
            <input
              type="text"
              value={galleryHeader.title}
              onChange={(e) => setGalleryHeader({ ...galleryHeader, title: e.target.value })}
              placeholder="CHAPTER V • WEDDING GALLERY"
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
              MAIN HEADING
            </label>
            <input
              type="text"
              value={galleryHeader.heading}
              onChange={(e) => setGalleryHeader({ ...galleryHeader, heading: e.target.value })}
              placeholder="Moments Captured in Time"
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
            SUBHEADING / QUOTE
          </label>
          <input
            type="text"
            value={galleryHeader.subheading}
            onChange={(e) => setGalleryHeader({ ...galleryHeader, subheading: e.target.value })}
            placeholder="Every picture tells a story of love..."
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'HEADER CHANGES SAVED!' : 'SAVE HEADER & SECTION'}</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {draftState.gallery.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border bg-[#fffdf9] p-4 shadow-sm space-y-3 flex flex-col justify-between transition-all ${
              item.visible ? 'border-[#bf953f]/40' : 'border-gray-300 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#bf953f]/30 bg-gray-100">
                <img src={item.url} alt={item.caption} className="h-full w-full object-cover" />
                <span className="absolute top-2 left-2 bg-[#4a0e17]/85 text-[#fcf6ba] font-cinzel text-[10px] font-bold px-2 py-0.5 rounded border border-[#bf953f]">
                  {item.category}
                </span>
              </div>
              <p className="font-cormorant text-sm font-semibold text-[#4a0e17] italic line-clamp-2">
                "{item.caption}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#bf953f]/20 pt-3">
              <button
                onClick={() => toggleVisibility(item.id)}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                  item.visible ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-400 bg-gray-200 text-gray-600'
                }`}
                title={item.visible ? 'Hide Photo' : 'Show Photo'}
              >
                {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setEditingItem(item)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] hover:bg-[#7a1c29] text-xs font-cinzel font-bold cursor-pointer"
                title="Edit Photo, Image URL & Settings"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>EDIT PHOTO</span>
              </button>

              <button
                onClick={() => handleDeleteItem(item.id)}
                className="p-1.5 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                title="Delete Photo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Edit Modal with Image Replace & Management */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <form onSubmit={handleSaveEdit} className="w-full max-w-lg rounded-2xl border-2 border-[#bf953f] bg-[#fffdf9] p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#bf953f]/20 pb-3">
              <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase">
                EDIT GALLERY PHOTO & IMAGE SETTINGS
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-xs font-cinzel font-bold text-gray-500 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Photo Preview & Change Button */}
            <div className="space-y-2">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                IMAGE PREVIEW & REPLACEMENT
              </label>
              <div className="flex items-center gap-4">
                <div className="h-28 w-28 rounded-xl border border-[#bf953f]/40 overflow-hidden bg-gray-100 shrink-0">
                  <img src={editingItem.url} alt={editingItem.caption} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsEditImagePickerOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] px-4 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
                  >
                    <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                    <span>CHANGE / SELECT IMAGE</span>
                  </button>
                  <span className="font-sans text-[10px] text-gray-500 block">
                    Upload new file or choose from Media Library
                  </span>
                </div>
              </div>
            </div>

            {/* Image Direct URL */}
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">IMAGE URL</label>
              <input
                type="text"
                value={editingItem.url}
                onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            {/* Caption */}
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">CAPTION</label>
              <textarea
                rows={2}
                value={editingItem.caption}
                onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">CATEGORY</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
                >
                  <option value="Couple">Couple</option>
                  <option value="Pellikuthuru">Pellikuthuru</option>
                  <option value="Sundowner">Sundowner</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Invitation">Invitation</option>
                </select>
              </div>

              {/* Grid Layout Width Span */}
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">GRID WIDTH SPAN</label>
                <select
                  value={editingItem.span}
                  onChange={(e) => setEditingItem({ ...editingItem, span: e.target.value })}
                  className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
                >
                  <option value="col-span-12 md:col-span-8 row-span-2">Large Featured (8 Cols)</option>
                  <option value="col-span-12 md:col-span-6 row-span-1">Medium Half Width (6 Cols)</option>
                  <option value="col-span-12 md:col-span-4 row-span-1">Small One-Third (4 Cols)</option>
                  <option value="col-span-12 row-span-1">Full Width (12 Cols)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-[#bf953f]/20">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-full border border-gray-300 px-5 py-2 text-xs font-cinzel font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
              >
                <Save className="h-4 w-4 text-[#bf953f]" />
                <span>SAVE PHOTO CHANGES</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* New Photo Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => handleAddPhoto(url)}
      />

      {/* Edit Photo Image Replacer */}
      <MediaPickerModal
        isOpen={isEditImagePickerOpen}
        onClose={() => setIsEditImagePickerOpen(false)}
        onSelect={(url) => {
          if (editingItem) {
            setEditingItem({ ...editingItem, url });
          }
        }}
        currentValue={editingItem?.url}
      />
    </div>
  );
};
