import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface TempleDoorIntroProps {
  onEnter: () => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  isPreview?: boolean;
}

export const TempleDoorIntro: React.FC<TempleDoorIntroProps> = ({
  onEnter,
  isAudioPlaying,
  toggleAudio,
  isPreview = false,
}) => {
  const cmsContent = useCMSContent(isPreview);
  const data = cmsContent.preloader;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleDoorClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    
    if (!isAudioPlaying) {
      toggleAudio();
    }

    setTimeout(() => {
      setIsOpen(true);
      onEnter();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#090506]"
        >
          {/* Audio Toggle Pill (Top Right) */}
          <div className="absolute top-6 right-6 z-50">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 rounded-full border border-[#bf953f]/60 bg-[#1a080c]/80 px-4 py-2 text-xs tracking-widest text-[#fcf6ba] font-semibold uppercase backdrop-blur-md shadow-lg hover:border-[#bf953f] hover:bg-[#2b0c13] cursor-pointer"
            >
              {isAudioPlaying ? <Volume2 className="h-4 w-4 text-[#bf953f]" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
              <span>{isAudioPlaying ? 'MUSIC ON' : 'MUSIC OFF'}</span>
            </button>
          </div>

          {/* Golden Light Burst Layer Behind Closed Doors */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url(${cmsContent.hero.heroPhoto})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
          </div>

          {/* Central Backlight Expansion when Doors Open */}
          {isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 2 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,246,186,0.6)_0%,rgba(191,149,63,0.25)_40%,transparent_70%)]"
            />
          )}

          {/* FULL-SCREEN LEFT REAL TEMPLE DOOR */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isOpening ? '-100%' : 0 }}
            transition={{ duration: 2.8, ease: [0.77, 0, 0.175, 1] }}
            className="relative h-full w-1/2 overflow-hidden border-r border-[#bf953f]/60 bg-cover bg-no-repeat shadow-2xl shadow-black z-20"
            style={{
              backgroundImage: `url('/assets/real_temple_doors.jpg')`,
              backgroundPosition: 'left center',
              backgroundSize: '200% 100%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* FULL-SCREEN RIGHT REAL TEMPLE DOOR */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isOpening ? '100%' : 0 }}
            transition={{ duration: 2.8, ease: [0.77, 0, 0.175, 1] }}
            className="relative h-full w-1/2 overflow-hidden border-l border-[#bf953f]/60 bg-cover bg-no-repeat shadow-2xl shadow-black z-20"
            style={{
              backgroundImage: `url('/assets/real_temple_doors.jpg')`,
              backgroundPosition: 'right center',
              backgroundSize: '200% 100%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* FLOATING SACRED INVITATION CONTENT FROM CMS */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{
              opacity: isOpening ? 0 : 1,
              y: isOpening ? -15 : 0,
              filter: isOpening ? 'blur(4px)' : 'blur(0px)',
            }}
            transition={{
              duration: isOpening ? 0.6 : 1.5,
              delay: isOpening ? 0 : 2.0,
              ease: 'easeOut',
            }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center pointer-events-auto"
          >
            <div className="max-w-2xl flex flex-col items-center justify-center">
              {/* EXACT LORD VINAYAKA STATUE IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 2.2 }}
                className="mb-3 flex items-center justify-center"
              >
                <img
                  src={data.ganeshaImage}
                  alt="Lord Vinayaka Sacred Statue"
                  className="h-24 sm:h-32 md:h-36 lg:h-40 w-auto object-contain filter drop-shadow-[0_10px_25px_rgba(212,175,55,0.4)] pointer-events-none"
                />
              </motion.div>

              {/* Devotional Heading */}
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.35em] text-[#fffdfa] uppercase drop-shadow-md">
                {data.devotionalHeading}
              </span>

              {/* Subheading */}
              <h2 className="mt-2 font-cormorant text-base sm:text-lg italic text-[#f7f2ea] drop-shadow font-medium max-w-md">
                {data.subheading}
              </h2>

              {/* Couple Names */}
              <div className="my-4 flex flex-col items-center">
                <span className="font-cormorant text-sm italic tracking-widest text-[#d4af37]">
                  {data.brideSalutation}
                </span>
                <h1 className="font-cormorant text-3xl sm:text-5xl font-semibold tracking-wide text-[#fffdfa] drop-shadow-lg">
                  {data.brideName}
                </h1>
                <span className="my-0.5 font-script text-3xl text-[#fcf6ba]">&</span>
                <span className="font-cormorant text-sm italic tracking-widest text-[#d4af37]">
                  {data.groomSalutation}
                </span>
                <h1 className="font-cormorant text-3xl sm:text-5xl font-semibold tracking-wide text-[#fffdfa] drop-shadow-lg">
                  {data.groomName}
                </h1>
              </div>

              {/* Date & Location */}
              <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] text-[#fcf6ba] font-semibold uppercase drop-shadow">
                {data.weddingDate} • {data.weddingLocation}
              </p>

              {/* ROYAL CIRCULAR INVITATION SEAL BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleDoorClick}
                disabled={isOpening}
                aria-label="Enter our celebration"
                className="mt-6 flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border-2 border-[#bf953f] bg-gradient-to-br from-[#4a0e17] via-[#63141f] to-[#3b0910] text-[#fcf6ba] shadow-2xl shadow-[#4a0e17]/80 hover:shadow-[#bf953f]/50 cursor-pointer text-center p-2 relative group overflow-hidden transition-shadow"
              >
                <div className="absolute inset-1 rounded-full border border-[#bf953f]/50 pointer-events-none" />

                <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.2em] leading-tight uppercase text-[#fcf6ba] drop-shadow">
                  {data.buttonText.replace(/ /g, '\n')}
                </span>
              </motion.button>

              <span className="mt-2.5 font-sans text-[10px] tracking-widest text-[#d4af37] uppercase font-semibold drop-shadow">
                {data.instructionText}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
