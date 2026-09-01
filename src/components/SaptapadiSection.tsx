import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, ChevronRight, Sparkles } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';
import { WEDDING_DATA } from '../data/weddingData';

interface SaptapadiSectionProps {
  isPreview?: boolean;
}

export const SaptapadiSection: React.FC<SaptapadiSectionProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const vows = cmsContent.saptapadiVows || WEDDING_DATA.saptapadiVows;
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = vows.length;

  return (
    <section id="saptapadi" className="relative bg-[#f4ece0] py-16 px-4 overflow-hidden border-t border-[#bf953f]/30">
      {/* Background Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,248,241,0.8)_0%,rgba(244,236,224,1)_100%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <span className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            CHAPTER III • DEVOTIONAL TRADITION
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a0e17]">
            సప్తపది — The Seven Sacred Steps
          </h2>
          <p className="font-cormorant text-sm sm:text-base italic text-[#734f10] font-medium">
            "Seven steps together around the sacred fire, bound for seven lifetimes."
          </p>
          <div className="mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent mt-2" />
        </div>

        {/* Circular Arrangement Stage (Compact Size) */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="relative h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] flex items-center justify-center">
            {/* Central Inner Mandala Ring Display */}
            <div className="relative z-10 flex h-20 w-20 sm:h-24 sm:w-24 flex-col items-center justify-center rounded-full border-2 border-[#bf953f] bg-gradient-to-br from-[#4a0e17] via-[#63141f] to-[#3b0910] text-[#fcf6ba] shadow-xl p-1 text-center">
              <Footprints className="h-4 w-4 sm:h-5 sm:w-5 text-[#bf953f] mb-0.5 animate-bounce" />
              <span className="font-cinzel text-[8px] sm:text-[9px] font-extrabold tracking-widest text-[#bf953f] uppercase leading-none">
                SACRED VOW
              </span>
              <span className="font-cinzel text-sm sm:text-lg font-black text-[#fcf6ba] leading-tight my-0.5">
                0{activeStep + 1} / 07
              </span>
              <span className="font-sans text-[8px] text-[#fcf6ba]/80 font-medium tracking-tight">
                Tap step
              </span>
            </div>

            {/* 7 Compact Footprint Pill Badges Arranged in a Tight Circle */}
            {vows.map((vow, index) => {
              const angleDeg = -90 + (index * 360) / totalSteps;
              const angleRad = (angleDeg * Math.PI) / 180;

              const radiusMobile = 85;
              const radiusDesktop = 105;

              const xMobile = Math.round(radiusMobile * Math.cos(angleRad));
              const yMobile = Math.round(radiusMobile * Math.sin(angleRad));

              const xDesktop = Math.round(radiusDesktop * Math.cos(angleRad));
              const yDesktop = Math.round(radiusDesktop * Math.sin(angleRad));

              const isActive = activeStep === index;

              return (
                <button
                  key={vow.step}
                  onClick={() => setActiveStep(index)}
                  style={
                    {
                      left: '50%',
                      top: '50%',
                      '--x-mob': `${xMobile}px`,
                      '--y-mob': `${yMobile}px`,
                      '--x-desk': `${xDesktop}px`,
                      '--y-desk': `${yDesktop}px`,
                      transform: `translate(calc(-50% + var(--x-mob)), calc(-50% + var(--y-mob)))`,
                    } as React.CSSProperties
                  }
                  className={`absolute z-20 flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-cinzel font-bold transition-all duration-300 cursor-pointer shadow-md whitespace-nowrap sm:[transform:translate(calc(-50%+var(--x-desk)),calc(-50%+var(--y-desk)))] ${
                    isActive
                      ? 'border-[#bf953f] bg-gradient-to-r from-[#4a0e17] to-[#7a1c29] text-[#fcf6ba] shadow-xl scale-110 z-30'
                      : 'border-[#bf953f]/60 bg-[#fffdf9] text-[#4a0e17] hover:border-[#bf953f] hover:bg-[#f7f2e8] hover:scale-105'
                  }`}
                  title={`Step ${vow.step}: ${vow.teluguName}`}
                >
                  <Footprints className={`h-3.5 w-3.5 ${isActive ? 'text-[#bf953f]' : 'text-[#8a5d12]'}`} />
                  <span className="font-cinzel text-xs font-extrabold">{vow.step}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Card (Sleek Compact Size) */}
        <div className="mx-auto max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border-2 border-[#bf953f]/80 bg-[#fffdf9] p-5 sm:p-7 shadow-xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#bf953f]/25 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#bf953f] bg-[#4a0e17] shadow-sm">
                    <span className="font-cinzel text-sm font-bold text-[#fcf6ba]">
                      0{vows[activeStep].step}
                    </span>
                  </div>
                  <div>
                    <span className="font-cinzel text-[10px] font-bold tracking-widest text-[#8a5d12] uppercase block leading-none mb-0.5">
                      {vows[activeStep].sanskrit}
                    </span>
                    <h3 className="font-cinzel text-base sm:text-xl font-bold text-[#4a0e17] leading-tight">
                      {vows[activeStep].teluguName}
                    </h3>
                  </div>
                </div>
                <Sparkles className="h-5 w-5 text-[#8a5d12] animate-pulse hidden sm:block" />
              </div>

              {/* Meanings */}
              <div className="space-y-4">
                <div>
                  <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#8a5d12] uppercase block mb-1">
                    TELUGU MEANING (తెలుగు వివరణ)
                  </span>
                  <p className="font-cormorant text-base sm:text-lg text-[#2b0c10] font-bold leading-snug">
                    {vows[activeStep].teluguMeaning}
                  </p>
                </div>

                <div className="border-t border-[#bf953f]/20 pt-3">
                  <span className="font-sans text-[10px] font-extrabold tracking-widest text-[#734f10] uppercase block mb-1">
                    ENGLISH SIGNIFICANCE
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#3b1217] leading-relaxed font-medium">
                    {vows[activeStep].englishMeaning}
                  </p>
                </div>
              </div>

              {/* Next/Prev Navigation */}
              <div className="mt-5 flex items-center justify-between border-t border-[#bf953f]/25 pt-4">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : vows.length - 1))}
                  className="font-cinzel text-[11px] font-bold text-[#4a0e17] hover:text-[#8a5d12] transition-colors cursor-pointer"
                >
                  ← PREVIOUS STEP
                </button>

                <div className="flex gap-1.5">
                  {vows.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeStep ? 'w-5 bg-[#4a0e17]' : 'w-1.5 bg-[#c2a366]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveStep((prev) => (prev < vows.length - 1 ? prev + 1 : 0))}
                  className="font-cinzel text-[11px] font-bold text-[#4a0e17] hover:text-[#8a5d12] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>NEXT STEP</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
