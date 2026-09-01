import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface HeroSectionProps {
  onExplore: () => void;
  isPreview?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const data = cmsContent.hero;

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden pt-24 pb-10 bg-transparent">
      {/* Real Couple Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="h-full w-full bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: `url('${data.heroPhoto}')` }}
        />
        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/45" />
      </div>

      <div className="h-6" />

      {/* MAIN HERO CONTENT GROUP */}
      <motion.div
        animate={{
          opacity: [1, 1, 0, 0, 1],
          y: [0, 0, -8, 10, 0],
          filter: ['blur(0px)', 'blur(0px)', 'blur(4px)', 'blur(4px)', 'blur(0px)'],
        }}
        transition={{
          duration: 13,
          times: [0, 0.3846, 0.5, 0.8846, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full my-auto"
      >
        {/* Blessing Subtitle */}
        <span className="font-cormorant text-base sm:text-xl md:text-2xl italic text-white font-bold tracking-widest block mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {data.blessingsText}
        </span>

        {/* Bride Name */}
        <div className="flex flex-col items-center">
          <h1 className="font-cormorant font-bold tracking-wide text-white text-center leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-[clamp(2.2rem,4.8vw,4.5rem)]">
            {data.brideName}
          </h1>
        </div>

        {/* Ampersand Divider */}
        <div className="my-3 flex items-center justify-center gap-4">
          <div className="h-[1.5px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#fcf6ba] to-[#fcf6ba]" />
          <span className="font-script text-3xl md:text-4xl text-white font-bold drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">&</span>
          <div className="h-[1.5px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#fcf6ba] to-[#fcf6ba]" />
        </div>

        {/* Groom Name */}
        <div className="flex flex-col items-center">
          <h1 className="font-cormorant font-bold tracking-wide text-white text-center leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-[clamp(2.0rem,4.4vw,4.1rem)]">
            {data.groomName}
          </h1>
        </div>

        {/* Hashtag */}
        <span className="mt-4 font-cinzel text-[11px] font-extrabold tracking-[0.3em] text-white uppercase bg-[#4a0e17]/85 px-5 py-1.5 rounded-full border border-[#bf953f] shadow-lg backdrop-blur-sm">
          {data.hashtag}
        </span>
      </motion.div>

      {/* Refined Bottom Supporting Information */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center space-y-3 px-4"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-cormorant text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase bg-[#4a0e17]/85 px-6 py-2 rounded-full border border-[#bf953f] shadow-xl backdrop-blur-md">
          <span>{data.weddingDate}</span>
          <span className="text-[#bf953f] font-bold">•</span>
          <span>{data.sumuhurthamTime}</span>
          <span className="text-[#bf953f] font-bold">•</span>
          <span>{data.location}</span>
        </div>

        {/* Scroll Down Indicator */}
        <motion.button
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={onExplore}
          className="flex flex-col items-center gap-1 font-cinzel text-[9px] tracking-[0.3em] text-white uppercase font-extrabold cursor-pointer hover:text-[#fcf6ba] transition-colors"
        >
          <span className="bg-[#4a0e17]/85 px-4 py-1.5 rounded-full border border-[#bf953f]/60 backdrop-blur-md shadow-md text-white">
            {data.scrollText}
          </span>
          <ChevronDown className="h-4 w-4 text-[#fcf6ba]" />
        </motion.button>
      </motion.div>
    </section>
  );
};
