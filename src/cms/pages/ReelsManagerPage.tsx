import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, ReelItemData, ReelsHeaderData } from '../types/cmsTypes';
import { getStoredCMSState } from '../store/cmsStore';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { uploadFileToCloudinary } from '../utils/cloudinaryUploader';
import { storeVideoFile } from '../utils/videoStorageDB';
import { Plus, Trash2, Eye, EyeOff, Edit2, ArrowUp, ArrowDown, Film, Save, CheckCircle, ExternalLink, Image as ImageIcon, Sliders, Cloud, Upload, Loader2, Settings } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const ReelsManagerPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [reelsHeader, setReelsHeader] = useState<ReelsHeaderData>(
    draftState.reelsHeader || {
      title: 'WEDDING REELS & CINEMATIC HIGHLIGHTS',
      heading: 'Sacred Memories in Motion',
      subheading: 'Moments of love, laughter, and divine togetherness captured in motion.',
      scrollSpeed: 65,
    }
  );
  const [editingReel, setEditingReel] = useState<ReelItemData | null>(null);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'video' | 'poster' | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [isUploadingCloudinary, setIsUploadingCloudinary] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cloudinary credentials stored in LocalStorage
  const [cloudName, setCloudName] = useState(() => localStorage.getItem('cloudinary_cloud_name') || '');
  const [uploadPreset, setUploadPreset] = useState(() => localStorage.getItem('cloudinary_upload_preset') || '');
  const [showConfig, setShowConfig] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
    if (draftState.reelsHeader) {
      setReelsHeader(draftState.reelsHeader);
    }
  }, [draftState]);

  const handleSaveCloudinaryConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cloudinary_cloud_name', cloudName);
    localStorage.setItem('cloudinary_upload_preset', uploadPreset);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const triggerSave = () => {
    const fresh = getStoredCMSState('draft');
    handleSaveDraft({
      ...fresh,
      reelsHeader,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateNew = () => {
    const fresh = getStoredCMSState('draft');
    const newReel: ReelItemData = {
      id: `reel-${Date.now()}`,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-at-their-wedding-41584-large.mp4',
      posterUrl: '/assets/couple_real_hero.jpg',
      instagramUrl: 'https://www.instagram.com/',
      title: 'New Cinematic Reel',
      caption: 'Sri Sai Sneha & Subramanyeswara Swami — Sacred Wedding Moment',
      visible: true,
      order: (fresh.reels || []).length + 1,
    };
    setEditingReel(newReel);
  };

  const handleDeviceVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingReel) return;

    setIsUploadingCloudinary(true);
    setUploadProgress(0);

    try {
      // Direct authenticated signed Cloudinary CDN upload to cloud z317zivv
      const cloudinaryUrl = await uploadFileToCloudinary(file, (pct) => {
        setUploadProgress(pct);
      });

      if (cloudinaryUrl) {
        setEditingReel({ ...editingReel, videoUrl: cloudinaryUrl });
        setIsUploadingCloudinary(false);
        return;
      }
    } catch (err: unknown) {
      console.warn('Cloudinary upload error, trying local persistent storage:', err);
      const msg = err instanceof Error ? err.message : 'Upload failed';
      
      // Local persistent fallback
      try {
        const idxdbUrl = await storeVideoFile(file);
        setEditingReel({ ...editingReel, videoUrl: idxdbUrl });
      } catch {
        alert(`Cloudinary Upload Error: ${msg}. Please paste an HTTPS video URL directly.`);
      }
    }

    setIsUploadingCloudinary(false);
  };

  const handleSaveReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel) return;

    const fresh = getStoredCMSState('draft');
    const currentList = fresh.reels || [];
    const existingIdx = currentList.findIndex((r) => r.id === editingReel.id);
    let updated = [...currentList];

    if (existingIdx >= 0) {
      updated[existingIdx] = editingReel;
    } else {
      updated.push(editingReel);
    }

    handleSaveDraft({
      ...fresh,
      reelsHeader,
      reels: updated,
    });
    setEditingReel(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteReel = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reel?')) return;
    const fresh = getStoredCMSState('draft');
    const updated = (fresh.reels || []).filter((r) => r.id !== id);
    handleSaveDraft({ ...fresh, reelsHeader, reels: updated });
  };

  const toggleVisibility = (id: string) => {
    const fresh = getStoredCMSState('draft');
    const updated = (fresh.reels || []).map((r) =>
      r.id === id ? { ...r, visible: !r.visible } : r
    );
    handleSaveDraft({ ...fresh, reelsHeader, reels: updated });
  };

  const moveReel = (index: number, direction: 'up' | 'down') => {
    const fresh = getStoredCMSState('draft');
    const list = [...(fresh.reels || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    handleSaveDraft({ ...fresh, reelsHeader, reels: reordered });
  };

  const reelsList = draftState.reels || [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            WEDDING REELS CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Manage Infinite Reels & Cloudinary CDN Uploads
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 rounded-full border border-[#bf953f]/60 bg-[#fffdf9] px-4 py-2.5 font-cinzel text-xs font-bold text-[#4a0e17] hover:bg-[#f7f2e8] cursor-pointer shadow-sm"
          >
            <Settings className="h-4 w-4 text-[#8a5d12]" />
            <span>{showConfig ? 'HIDE CONFIG' : '⚙️ CLOUDINARY CONFIG'}</span>
          </button>

          <button
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SAVED!' : 'SAVE SECTION CHANGES'}</span>
          </button>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#8a5d12] px-4 py-2.5 font-cinzel text-xs font-bold text-[#fffdfa] hover:bg-[#734f10] cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>ADD REEL</span>
          </button>
        </div>
      </div>

      {/* Cloudinary Config Panel */}
      {showConfig && (
        <form onSubmit={handleSaveCloudinaryConfig} className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <span className="font-cinzel text-xs font-bold text-amber-950 uppercase flex items-center gap-2">
              <Cloud className="h-4 w-4 text-amber-700" />
              <span>CLOUDINARY CDN ACCOUNT SETUP (FREE)</span>
            </span>
            {configSaved && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>SAVED!</span>
              </span>
            )}
          </div>

          <p className="font-sans text-xs text-amber-900 leading-relaxed">
            Enter your Cloudinary Cloud Name and Unsigned Upload Preset to receive automatic permanent <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">https://res.cloudinary.com/.../video.mp4</code> CDN links when uploading video files from your device.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-amber-900 uppercase block">Cloud Name</label>
              <input
                type="text"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                placeholder="e.g. dngyv1j1x or your-cloud-name"
                className="w-full rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-sans text-gray-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-amber-900 uppercase block">Unsigned Upload Preset</label>
              <input
                type="text"
                value={uploadPreset}
                onChange={(e) => setUploadPreset(e.target.value)}
                placeholder="e.g. ml_default or unsigned_preset"
                className="w-full rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-sans text-gray-900"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full border border-amber-600 bg-[#4a0e17] px-5 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#63141f] cursor-pointer"
            >
              SAVE CLOUDINARY CREDENTIALS
            </button>
          </div>
        </form>
      )}

      {/* Cloudinary Integration Helper Info Box */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 flex items-start gap-3 text-xs text-blue-900 shadow-sm">
        <Cloud className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-cinzel font-bold text-blue-950 uppercase block">
            HOW TO GET A PERMANENT CLOUDINARY HTTPS LINK (https://res.cloudinary.com/...)
          </span>
          <p className="font-sans leading-relaxed">
            1. <strong>Direct Cloudinary Paste</strong>: Upload your reel video at <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="underline font-bold text-blue-700">Cloudinary.com</a> and paste the link (<code className="bg-blue-100 px-1 py-0.5 rounded">https://res.cloudinary.com/.../video.mp4</code>) into the form below.<br />
            2. <strong>One-Click Device Uploader</strong>: Click <strong>⚙️ CLOUDINARY CONFIG</strong> above to add your free Cloud Name and Upload Preset, then click <strong>📁 UPLOAD MP4 FROM DEVICE</strong> to generate Cloudinary links automatically!
          </p>
        </div>
      </div>

      {/* Header Fields & Speed Control Card */}
      <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-5">
        <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase border-b border-[#bf953f]/20 pb-2">
          REELS SECTION TITLES & SCROLLING SPEED CONTROL
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
              SECTION TITLE TAG
            </label>
            <input
              type="text"
              value={reelsHeader.title}
              onChange={(e) => setReelsHeader({ ...reelsHeader, title: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
              MAIN HEADING
            </label>
            <input
              type="text"
              value={reelsHeader.heading}
              onChange={(e) => setReelsHeader({ ...reelsHeader, heading: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
            SUBHEADING / CAPTION
          </label>
          <input
            type="text"
            value={reelsHeader.subheading}
            onChange={(e) => setReelsHeader({ ...reelsHeader, subheading: e.target.value })}
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2 text-xs font-sans text-[#2b0c10]"
          />
        </div>

        {/* Scroll Speed Control */}
        <div className="space-y-2 border-t border-[#bf953f]/20 pt-4">
          <div className="flex items-center justify-between">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-[#8a5d12]" />
              <span>MARQUEE SCROLL SPEED (SECONDS PER LOOP)</span>
            </label>
            <span className="font-cinzel text-xs font-bold text-[#4a0e17] bg-[#f7f2e8] px-3 py-1 rounded-full border border-[#bf953f]/40">
              {reelsHeader.scrollSpeed || 65}s (Higher = Slower & More Elegant)
            </span>
          </div>
          <input
            type="range"
            min={20}
            max={120}
            step={5}
            value={reelsHeader.scrollSpeed || 65}
            onChange={(e) => setReelsHeader({ ...reelsHeader, scrollSpeed: Number(e.target.value) })}
            className="w-full accent-[#8a5d12] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-sans">
            <span>20s (Fast)</span>
            <span>65s (Recommended Slower)</span>
            <span>120s (Ultra Slow)</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'HEADER SAVED!' : 'SAVE HEADER & SPEED'}</span>
          </button>
        </div>
      </div>

      {/* Reels List */}
      {!editingReel && (
        <div className="space-y-4">
          {reelsList.map((reel, idx) => (
            <div
              key={reel.id}
              className={`rounded-2xl border p-5 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                reel.visible ? 'border-[#bf953f]/40 bg-[#fffdf9]' : 'border-gray-300 bg-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="h-24 w-16 rounded-xl border border-[#bf953f]/30 overflow-hidden shrink-0 bg-black flex items-center justify-center relative">
                  {reel.posterUrl ? (
                    <img src={reel.posterUrl} alt={reel.title} className="h-full w-full object-cover opacity-80" />
                  ) : (
                    <Film className="h-6 w-6 text-[#bf953f]" />
                  )}
                  <span className="absolute bottom-1 right-1 bg-black/80 text-[#fcf6ba] text-[9px] font-bold px-1 rounded">
                    MP4
                  </span>
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] flex items-center gap-2">
                    <span>{reel.title}</span>
                    {reel.instagramUrl && (
                      <a
                        href={reel.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-pink-700 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Instagram Link</span>
                      </a>
                    )}
                  </h3>
                  <p className="font-sans text-xs text-[#734f10] mt-1 italic">
                    "{reel.caption}"
                  </p>
                  <p className="font-mono text-[10px] text-gray-500 truncate max-w-md mt-1">
                    Video: {reel.videoUrl}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveReel(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-[#f7f2e8] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveReel(idx, 'down')}
                  disabled={idx === reelsList.length - 1}
                  className="p-2 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-[#f7f2e8] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleVisibility(reel.id)}
                  className={`p-2 rounded-lg border cursor-pointer ${
                    reel.visible ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-400 bg-gray-200 text-gray-600'
                  }`}
                  title={reel.visible ? 'Hide Reel' : 'Show Reel'}
                >
                  {reel.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setEditingReel(reel)}
                  className="p-2 rounded-lg border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
                  title="Edit Reel"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteReel(reel.id)}
                  className="p-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                  title="Delete Reel"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal Form */}
      {editingReel && (
        <form onSubmit={handleSaveReel} className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-[#bf953f]/20 pb-4">
            <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase">
              {editingReel.id ? 'EDIT REEL DETAILS' : 'ADD NEW REEL'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingReel(null)}
              className="text-xs font-cinzel font-bold text-gray-500 hover:text-black underline cursor-pointer"
            >
              CANCEL
            </button>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">REEL TITLE</label>
            <input
              type="text"
              required
              value={editingReel.title}
              onChange={(e) => setEditingReel({ ...editingReel, title: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          {/* Instagram URL Field */}
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-pink-800 uppercase block flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>INSTAGRAM URL (SPECIFIC TO THIS REEL)</span>
            </label>
            <input
              type="url"
              required
              value={editingReel.instagramUrl || ''}
              onChange={(e) => setEditingReel({ ...editingReel, instagramUrl: e.target.value })}
              placeholder="https://www.instagram.com/reel/..."
              className="w-full rounded-xl border border-pink-400 bg-pink-50/40 px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] focus:outline-none"
            />
            <span className="text-[10px] text-gray-500 font-sans block">
              Tapping/clicking this reel on the website will redirect guests to this Instagram URL.
            </span>
          </div>

          {/* Video File Uploader & Cloudinary Input */}
          <div className="space-y-2 border border-[#bf953f]/30 rounded-xl p-4 bg-[#f7f2e8]/60">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block flex items-center gap-1.5">
              <Film className="h-4 w-4 text-[#8a5d12]" />
              <span>VIDEO / REEL URL (CLOUDINARY CDN OR MP4)</span>
            </label>

            {/* Direct Device Video Upload Button */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <label className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#bf953f] bg-[#fffdf9] px-4 py-3 text-xs font-cinzel font-bold text-[#4a0e17] hover:bg-[#efe6d5] cursor-pointer transition-colors text-center relative overflow-hidden">
                {isUploadingCloudinary ? (
                  <div className="flex items-center gap-2 text-[#8a5d12]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>UPLOADING TO CLOUDINARY ({uploadProgress}%)...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-4 w-4 text-[#8a5d12]" />
                    <span>📁 UPLOAD MP4 FROM DEVICE</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleDeviceVideoUpload}
                      disabled={isUploadingCloudinary}
                      className="hidden"
                    />
                  </>
                )}
              </label>

              <button
                type="button"
                onClick={() => setMediaPickerTarget('video')}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] text-xs font-cinzel font-bold hover:bg-[#7a1c29] cursor-pointer shrink-0"
              >
                <Cloud className="h-4 w-4 text-[#bf953f]" />
                <span>MEDIA LIBRARY</span>
              </button>
            </div>

            {/* Video URL String Input */}
            <div className="space-y-1 pt-1">
              <span className="font-sans text-[10px] text-gray-600 block">
                Cloudinary Permanent HTTPS Link (https://res.cloudinary.com/...):
              </span>
              <input
                type="text"
                required
                value={editingReel.videoUrl}
                onChange={(e) => setEditingReel({ ...editingReel, videoUrl: e.target.value })}
                placeholder="https://res.cloudinary.com/... or MP4 link"
                className="w-full rounded-xl border border-[#bf953f]/50 bg-white px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          {/* Poster Image Selector */}
          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">THUMBNAIL / POSTER IMAGE URL</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={editingReel.posterUrl || ''}
                onChange={(e) => setEditingReel({ ...editingReel, posterUrl: e.target.value })}
                className="flex-1 rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
              <button
                type="button"
                onClick={() => setMediaPickerTarget('poster')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#bf953f] bg-[#8a5d12] text-white text-xs font-cinzel font-bold hover:bg-[#734f10] cursor-pointer"
              >
                <ImageIcon className="h-4 w-4" />
                <span>SELECT THUMBNAIL</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">CAPTION / SUBTITLE</label>
            <textarea
              rows={2}
              value={editingReel.caption}
              onChange={(e) => setEditingReel({ ...editingReel, caption: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3.5 py-2.5 text-xs font-sans text-[#2b0c10] resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-[#bf953f]/20">
            <button
              type="button"
              onClick={() => setEditingReel(null)}
              className="rounded-full border border-[#8a5d12]/40 px-5 py-2 text-xs font-cinzel font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isUploadingCloudinary}
              className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Save className="h-4 w-4 text-[#bf953f]" />
              <span>{isUploadingCloudinary ? 'UPLOADING...' : 'SAVE REEL'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerTarget !== null}
        onClose={() => setMediaPickerTarget(null)}
        acceptType={mediaPickerTarget === 'video' ? 'video' : 'image'}
        onSelect={(url) => {
          if (editingReel) {
            if (mediaPickerTarget === 'video') {
              setEditingReel({ ...editingReel, videoUrl: url });
            } else if (mediaPickerTarget === 'poster') {
              setEditingReel({ ...editingReel, posterUrl: url });
            }
          }
        }}
        currentValue={mediaPickerTarget === 'video' ? editingReel?.videoUrl : editingReel?.posterUrl}
      />
    </div>
  );
};
