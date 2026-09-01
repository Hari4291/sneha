import React from 'react';
import { motion } from 'framer-motion';
import { useCMSContent } from '../cms/store/cmsStore';

interface FinalInvitationProps {
  isPreview?: boolean;
}

export const FinalInvitation: React.FC<FinalInvitationProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const data = cmsContent.finalInvitation;

  return (
    <section id="finalInvitation" className="relative bg-[#f8f3ea] py-24 px-4 overflow-hidden border-t border-[#bf953f]/30">
      <div className="mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center space-y-10"
        >
          {/* Top Decorative Framed Header matching Reference Image */}
          <div className="relative rounded-2xl border border-[#c29b4e]/30 bg-[#fbf8f1]/90 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex flex-col items-center justify-center">
              {/* Birds / Floral Line Ornament SVG */}
              <div className="flex items-center justify-center gap-6 mb-2 text-[#c29b4e]/80">
                <svg className="h-6 w-12" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0 15 Q15 0 25 15 Q35 0 50 15" />
                  <circle cx="25" cy="8" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Title Tag */}
              <span className="font-cinzel text-[10px] font-bold tracking-[0.35em] text-[#8a5d12] uppercase block mb-3">
                {data.title || 'FINAL INVITATION'}
              </span>

              {/* Lotus Floral Rule Ornament */}
              <div className="flex items-center gap-4 w-full max-w-xs justify-center my-1">
                <div className="h-[1px] flex-1 bg-[#c29b4e]/40" />
                {/* Lotus Icon */}
                <svg className="h-5 w-5 text-[#8a5d12]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 4c-2.5 3-4 6-4 8.5 0 2.5 1.8 4.5 4 4.5s4-2 4-4.5C16 10 14.5 7 12 4z" />
                  <path d="M12 17c-3 0-5.5 1-7.5 3 2.5-1 5-1 7.5.5 2.5-1.5 5-1.5 7.5-.5-2-2-4.5-3-7.5-3z" />
                </svg>
                <div className="h-[1px] flex-1 bg-[#c29b4e]/40" />
              </div>
            </div>

            {/* Main Heading - Deep Burgundy Serif Text */}
            <h2 className="font-cormorant text-3xl sm:text-5xl font-bold text-[#6e1823] tracking-wide leading-tight font-serif px-2">
              {data.heading}
            </h2>
          </div>

          {/* Body Invitation Paragraphs */}
          <div className="space-y-6 font-cormorant text-lg sm:text-xl text-[#3d1a1e] font-normal leading-relaxed max-w-xl mx-auto px-4">
            <p className="tracking-wide">{data.paragraph1}</p>
            <p className="tracking-wide">{data.paragraph2}</p>
          </div>

          {/* Circular SS Monogram Emblem matching Reference Image */}
          <div className="pt-6 flex flex-col items-center justify-center">
            <div className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-full border border-[#c29b4e]/70 bg-[#fbf8f1] shadow-md group hover:scale-105 transition-transform duration-500">
              <div className="flex h-full w-full items-center justify-center rounded-full p-2">
                {data.monogramImage ? (
                  <img src={data.monogramImage} alt="SS Monogram" className="h-full w-full object-cover rounded-full" />
                ) : (
                  <span className="font-cormorant text-4xl sm:text-5xl font-light tracking-widest text-[#7a1c29] select-none">
                    {data.monogramText || 'SS'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Warm Regards Section */}
          <div className="pt-6 space-y-3 max-w-md mx-auto">
            <span className="font-cinzel text-xs font-extrabold tracking-[0.3em] text-[#8a5d12] uppercase block">
              {data.warmRegardsTitle || 'WARM REGARDS'}
            </span>
            <div className="space-y-1.5 font-cormorant text-lg sm:text-xl font-semibold text-[#4a0e17] tracking-wider uppercase">
              {data.hosts.map((host, idx) => (
                <p key={idx}>{host}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
