import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface CoupleSectionProps {
  isPreview?: boolean;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const { bride, groom, hashtag } = cmsContent.couple;

  return (
    <section id="couple" className="relative bg-[#f7f2e8] py-24 px-4 overflow-hidden border-t border-[#bf953f]/30">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase">
            CHAPTER I • THE DIVINE UNION
          </span>
          <h2 className="mt-2 font-cormorant text-4xl md:text-5xl font-bold text-[#4a0e17]">
            Two Souls, One Sacred Journey
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Bride Card (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 rounded-3xl border-2 border-[#bf953f]/40 bg-[#fffdf9] p-6 md:p-8 shadow-xl relative group"
          >
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-6 border border-[#bf953f]/40">
              <img
                src={bride.photo}
                alt={bride.fullName}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a0e17]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-cormorant text-sm italic tracking-widest text-[#fcf6ba]">
                  {bride.salutation}
                </span>
                <h3 className="font-cormorant text-2xl md:text-3xl font-bold">{bride.fullName}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#8a5d12] uppercase border-b border-[#bf953f]/20 pb-2">
                <GraduationCap className="h-4 w-4 text-[#bf953f]" />
                <span>QUALIFICATION: {bride.qualification}</span>
              </div>

              <div className="space-y-1 font-cormorant text-sm text-[#4a0e17]">
                <p><strong className="font-bold">Parents:</strong> {bride.father} & {bride.mother}</p>
                {bride.grandparents && <p><strong className="font-bold">Grandparents:</strong> {bride.grandparents}</p>}
                <p className="flex items-start gap-1.5 pt-1 text-xs font-sans text-[#734f10]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8a5d12] mt-0.5" />
                  <span>{bride.residence}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Central Monogram Crest Divider */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center my-4 lg:my-0">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#bf953f] bg-[#4a0e17] overflow-hidden shadow-xl">
              <img
                src="/assets/logo.jpg"
                alt="Official Monogram"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <span className="mt-3 font-cinzel text-xs font-extrabold tracking-widest text-[#8a5d12]">
              {hashtag}
            </span>
            <span className="font-script text-xl text-[#4a0e17]">Together Forever</span>
          </div>

          {/* Groom Card (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 rounded-3xl border-2 border-[#bf953f]/40 bg-[#fffdf9] p-6 md:p-8 shadow-xl relative group"
          >
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-6 border border-[#bf953f]/40">
              <img
                src={groom.photo}
                alt={groom.fullName}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a0e17]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-cormorant text-sm italic tracking-widest text-[#fcf6ba]">
                  {groom.salutation}
                </span>
                <h3 className="font-cormorant text-2xl md:text-3xl font-bold">{groom.fullName}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#8a5d12] uppercase border-b border-[#bf953f]/20 pb-2">
                <GraduationCap className="h-4 w-4 text-[#bf953f]" />
                <span>QUALIFICATION: {groom.qualification}</span>
              </div>

              <div className="space-y-1 font-cormorant text-sm text-[#4a0e17]">
                <p><strong className="font-bold">Parents:</strong> {groom.father} & {groom.mother}</p>
                <p className="flex items-start gap-1.5 pt-1 text-xs font-sans text-[#734f10]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8a5d12] mt-0.5" />
                  <span>{groom.residence}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
