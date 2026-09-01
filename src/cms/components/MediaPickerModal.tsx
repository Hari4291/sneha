import React, { useState } from 'react';
import { X, Upload, Check, Search, Film, Cloud, Loader2, AlertCircle } from 'lucide-react';
import { uploadFileToCloudinary } from '../utils/cloudinaryUploader';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentValue?: string;
  acceptType?: 'all' | 'image' | 'video';
}

const DEFAULT_MEDIA_ASSETS = [
  { url: '/assets/couple_real_hero.jpg', name: 'Couple Hero Portrait', type: 'image' },
  { url: '/assets/couple_editorial_hero_1788197820352.jpg', name: 'Groom Editorial Photo', type: 'image' },
  { url: '/assets/couple_pellikuthuru_1788197942792.jpg', name: 'Bride Pellikuthuru Photo', type: 'image' },
  { url: '/assets/ganesha_statue.png', name: 'Sacred Lord Vinayaka Statue', type: 'image' },
  { url: '/assets/real_temple_doors.jpg', name: 'Carved South Indian Temple Doors', type: 'image' },
  { url: '/assets/logo.jpg', name: 'Monogram Emblem Logo', type: 'image' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-at-their-wedding-41584-large.mp4', name: 'Reel 1: Mangalya Dharanam MP4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-and-groom-holding-each-other-41580-large.mp4', name: 'Reel 2: Sacred Vows MP4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-out-of-a-church-41582-large.mp4', name: 'Reel 3: Pellikuthuru Festival MP4', type: 'video' },
];

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentValue,
  acceptType = 'all',
}) => {
  const [customUrl, setCustomUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaList, setMediaList] = useState(DEFAULT_MEDIA_ASSETS);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredList = mediaList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = acceptType === 'all' || m.type === acceptType;
    return matchesSearch && matchesType;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsUploading(true);
    setUploadProgress(0);

    const isVid = file.type.startsWith('video');

    try {
      // Direct authenticated Cloudinary signed upload to cloud z317zivv
      const cloudinaryUrl = await uploadFileToCloudinary(file, (pct) => {
        setUploadProgress(pct);
      });

      if (cloudinaryUrl) {
        const newAsset = { url: cloudinaryUrl, name: file.name, type: isVid ? 'video' : 'image' };
        setMediaList([newAsset, ...mediaList]);
        onSelect(cloudinaryUrl);
        setIsUploading(false);
        onClose();
        return;
      }
    } catch (err: unknown) {
      console.warn('Cloudinary signed upload failed:', err);
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setErrorMessage(`Upload error: ${msg}. You can also paste an HTTPS URL directly.`);
    }

    setIsUploading(false);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl) {
      if (customUrl.startsWith('blob:')) {
        alert('Blob URLs are temporary browser links. Please paste a permanent HTTPS Cloudinary URL.');
        return;
      }
      onSelect(customUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-[#bf953f] bg-[#fffdf9] p-6 shadow-2xl flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#bf953f]/30 pb-4">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-[#8a5d12]" />
            <h3 className="font-cinzel text-lg font-bold text-[#4a0e17]">
              CLOUDINARY CDN MEDIA PICKER (z317zivv)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-black cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="my-2 rounded-xl border border-red-300 bg-red-50 p-3 flex items-center gap-2 text-xs text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload & Cloudinary URL Section */}
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File Upload Button */}
          <label className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#bf953f] bg-[#f7f2e8] p-4 text-xs font-cinzel font-bold text-[#4a0e17] hover:bg-[#efe6d5] cursor-pointer transition-colors text-center relative overflow-hidden">
            {isUploading ? (
              <div className="flex items-center gap-2 text-[#8a5d12]">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>UPLOADING TO CLOUDINARY ({uploadProgress}%)...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-[#8a5d12]" />
                  <Upload className="h-4 w-4 text-[#8a5d12]" />
                  <span>UPLOAD VIDEO / IMAGE TO CLOUDINARY</span>
                </div>
                <span className="font-sans text-[10px] text-[#734f10] normal-case">
                  Uploads directly to Cloudinary (z317zivv) & returns HTTPS CDN URL
                </span>
                <input type="file" accept="image/*,video/*" onChange={handleFileUpload} disabled={isUploading} className="hidden" />
              </>
            )}
          </label>

          {/* External / Cloudinary URL Input */}
          <form onSubmit={handleCustomUrlSubmit} className="flex flex-col justify-between gap-2">
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Paste Cloudinary MP4 URL (https://res.cloudinary.com/z317zivv/...)"
                className="flex-1 rounded-xl border border-[#bf953f]/50 bg-white px-3 py-2 text-xs font-sans text-[#2b0c10] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl border border-[#bf953f] bg-[#4a0e17] px-4 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shrink-0"
              >
                USE URL
              </button>
            </div>
            <span className="font-sans text-[10px] text-gray-500">
              Direct Cloudinary HTTPS links provide fast 4K/HD video streaming.
            </span>
          </form>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media library assets..."
            className="w-full rounded-xl border border-[#bf953f]/40 bg-white pl-9 pr-4 py-2 text-xs font-sans text-gray-800 focus:outline-none"
          />
        </div>

        {/* Assets Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
          {filteredList.map((asset, index) => {
            const isSelected = currentValue === asset.url;
            return (
              <div
                key={index}
                onClick={() => {
                  onSelect(asset.url);
                  onClose();
                }}
                className={`group relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all aspect-square flex flex-col justify-end bg-black ${
                  isSelected ? 'border-[#4a0e17] ring-2 ring-[#bf953f]' : 'border-[#bf953f]/30 hover:border-[#bf953f]'
                }`}
              >
                {asset.type === 'video' ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <Film className="h-8 w-8 text-[#bf953f] opacity-80" />
                    <span className="absolute top-2 left-2 bg-[#4a0e17] text-[#fcf6ba] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#bf953f]">
                      VIDEO MP4
                    </span>
                  </div>
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                
                {isSelected && (
                  <div className="absolute top-2 right-2 rounded-full bg-[#4a0e17] p-1 border border-[#fcf6ba] z-10">
                    <Check className="h-3.5 w-3.5 text-[#fcf6ba]" />
                  </div>
                )}

                <span className="relative z-10 p-2 text-[10px] font-sans font-semibold text-white truncate">
                  {asset.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
