import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface PhotoGalleryProps {
  isPreview?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const header = cmsContent.galleryHeader || {
    title: 'CHAPTER V • WEDDING GALLERY',
    heading: 'Moments Captured in Time',
    subheading: 'Every picture tells a story of love, laughter, and lifelong togetherness.',
  };
  const visibleGallery = cmsContent.gallery.filter((g) => g.visible);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative bg-[#fffdf9] py-24 px-4 overflow-hidden border-t border-[#bf953f]/30">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase">
            {header.title}
          </span>
          <h2 className="mt-2 font-cormorant text-4xl md:text-5xl font-bold text-[#4a0e17]">
            {header.heading}
          </h2>
          {header.subheading && (
            <p className="mt-3 font-cormorant text-base italic text-[#734f10] font-medium">
              "{header.subheading}"
            </p>
          )}
          <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-4">
          {visibleGallery.map((img, index) => (
            <motion.div
              key={img.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => setSelectedPhoto(img.url)}
              className={`${img.span || 'col-span-12 md:col-span-6'} group relative h-72 md:h-80 rounded-2xl overflow-hidden border-2 border-[#bf953f]/30 bg-gray-100 shadow-md cursor-pointer`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a0e17]/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="font-cinzel text-[9px] font-bold tracking-widest text-[#fcf6ba] uppercase bg-[#4a0e17] px-2 py-0.5 rounded border border-[#bf953f]/50 inline-block mb-1">
                    {img.category || 'GALLERY'}
                  </span>
                  <p className="font-cormorant text-base font-semibold italic text-white line-clamp-1">
                    {img.caption}
                  </p>
                </div>
                <div className="rounded-full bg-[#4a0e17] p-2 text-[#fcf6ba] border border-[#bf953f]">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 rounded-full border border-[#bf953f] bg-[#4a0e17] p-2 text-[#fcf6ba] shadow-xl hover:bg-[#7a1c29]"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedPhoto}
              alt="Enlarged gallery photo"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl border-2 border-[#bf953f] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
