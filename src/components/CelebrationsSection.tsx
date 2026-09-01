import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sun, Sparkles, Flame, Clock, HeartHandshake, Shirt } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface CelebrationsSectionProps {
  isPreview?: boolean;
}

export const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const header = cmsContent.celebrationsHeader || {
    title: 'CHAPTER IV • SACRED RITUALS',
    heading: 'CELEBRATIONS',
    subheading: 'Select a sacred ceremony below to view its cinematic chapter and invitation.',
  };

  const celebrations = cmsContent.celebrations && cmsContent.celebrations.length > 0
    ? cmsContent.celebrations.filter((c) => c.visible).sort((a, b) => a.order - b.order)
    : [
        {
          id: 'cel-1',
          name: 'HALDI',
          date: 'SEP 04 2026',
          day: 'FRIDAY',
          title: 'HALDI',
          subheading: 'WITH HALDI & HENNA',
          message: 'You are invited to an evening of sunshine, traditions & togetherness',
          time: '05:00 PM onwards',
          followedBy: 'Followed by High Tea & Dinner',
          venue: 'DHARMAJIGUDEM',
          dressCode: 'Pastels only (PEACH, BABY PINK, BEIGE)',
          googleMapsUrl: 'https://maps.google.com/?q=Dharmajigudem',
          heroImage: '/assets/couple_sundowner_1788197884607.jpg',
          visualTheme: 'haldi' as const,
          visible: true,
          order: 1,
        },
        {
          id: 'cel-2',
          name: 'PELLIKUTHURU',
          date: 'SEP 05 2026',
          day: 'SATURDAY',
          title: 'PELLIKUTHURU',
          subheading: 'TRADITIONAL TELUGU BLESSINGS',
          message: 'An intimate and joyful ritual of sacred scents, turmeric, and family blessings',
          time: '09:30 AM Onwards',
          followedBy: 'Followed by TIFFINS',
          venue: 'DHARMAJJIGUDEM',
          googleMapsUrl: 'https://maps.google.com/?q=Dharmajjigudem',
          heroImage: '/assets/couple_pellikuthuru_1788197942792.jpg',
          visualTheme: 'pellikuthuru' as const,
          visible: true,
          order: 2,
        },
        {
          id: 'cel-3',
          name: 'WEDDING',
          date: 'SEP 05 2026',
          day: 'SATURDAY',
          title: 'THE WEDDING',
          subheading: 'SACRED NUPTIAL CEREMONY',
          message: 'You are invited to an auspicious day of sacred vows & eternal love',
          time: 'SUMUHURTHAM: 09:37 PM',
          venue: 'SRI SAIBABA MANDIRAM',
          address: 'Kokkirapadu Adda Road, Kalaparru (v)',
          tagline: 'A PROMISE FOR A LIFETIME',
          googleMapsUrl: 'https://maps.google.com/?q=Sri+Sai+Baba+Temple+Kalaparru',
          heroImage: '/assets/couple_real_hero.jpg',
          visualTheme: 'wedding' as const,
          visible: true,
          order: 3,
        },
      ];

  // Active Selected Celebration (default to first or HALDI)
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = celebrations[activeIdx] || celebrations[0];

  return (
    <section id="celebrations" className="relative bg-[#f4ece0] py-20 px-4 overflow-hidden border-t border-[#bf953f]/30">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,248,241,0.8)_0%,rgba(244,236,224,1)_100%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
          <span className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase block">
            {header.title}
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#4a0e17]">
            {header.heading}
          </h2>
          <p className="font-cormorant text-sm sm:text-base italic text-[#734f10] font-medium">
            {header.subheading}
          </p>
          <div className="mx-auto h-[2px] w-20 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent mt-3" />
        </div>

        {/* Three Small Elegant Cards (Compact Size) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8">
          {celebrations.map((item, index) => {
            const isActive = activeIdx === index;

            return (
              <button
                key={item.id || index}
                onClick={() => setActiveIdx(index)}
                className={`relative flex flex-col items-center justify-between rounded-xl border px-3.5 py-2.5 sm:px-4 sm:py-3 transition-all duration-300 cursor-pointer text-center group overflow-hidden ${
                  isActive
                    ? 'border-[#bf953f] bg-gradient-to-br from-[#4a0e17] via-[#63141f] to-[#3b0910] text-[#fcf6ba] shadow-xl scale-105 z-20 ring-1 ring-[#bf953f]/60'
                    : 'border-[#bf953f]/50 bg-[#fffdf9] text-[#4a0e17] hover:border-[#bf953f] hover:bg-[#f7f2e8] hover:scale-102 shadow-sm'
                }`}
              >
                {/* Decorative Top Icon */}
                <div className="mb-1">
                  {item.name.toUpperCase().includes('HALDI') ? (
                    <Sun className={`h-4 w-4 ${isActive ? 'text-[#bf953f]' : 'text-[#8a5d12]'}`} />
                  ) : item.name.toUpperCase().includes('PELLIKUTHURU') ? (
                    <Sparkles className={`h-4 w-4 ${isActive ? 'text-[#bf953f]' : 'text-[#8a5d12]'}`} />
                  ) : (
                    <Flame className={`h-4 w-4 ${isActive ? 'text-[#bf953f]' : 'text-[#8a5d12]'}`} />
                  )}
                </div>

                {/* Card Title */}
                <h3 className={`font-cinzel text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-0.5 ${isActive ? 'text-[#fcf6ba]' : 'text-[#4a0e17]'}`}>
                  {item.name}
                </h3>

                {/* Date */}
                <div className={`font-cormorant text-[10px] sm:text-xs font-bold tracking-wider ${isActive ? 'text-[#fcf6ba]/90' : 'text-[#8a5d12]'}`}>
                  <span>{item.date}</span>
                  <span className="mx-1">•</span>
                  <span>{item.day}</span>
                </div>

                {/* Selected Indicator Arrow */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#bf953f]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Event Chapter Expanded Display */}
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              key={activeItem.id || activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl border-2 shadow-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-md ${
                activeItem.visualTheme === 'wedding' || activeItem.name.toUpperCase().includes('WEDDING')
                  ? 'border-[#bf953f] bg-gradient-to-br from-[#3b0910] via-[#4a0e17] to-[#2b0c13] text-[#fcf6ba]'
                  : 'border-[#bf953f]/80 bg-[#fffdf9] text-[#4a0e17]'
              }`}
            >
              {/* Grand Mandapam Decorative Floral Banner */}
              <div className="flex items-center justify-between border-b border-[#bf953f]/30 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-cinzel text-xs font-bold tracking-[0.25em] uppercase ${
                      activeItem.visualTheme === 'wedding' ? 'text-[#bf953f]' : 'text-[#8a5d12]'
                    }`}>
                      {activeItem.date} • {activeItem.day}
                    </span>
                  </div>
                  <h3 className={`font-cinzel text-3xl sm:text-4xl md:text-5xl font-black ${
                    activeItem.visualTheme === 'wedding' ? 'text-[#fcf6ba]' : 'text-[#4a0e17]'
                  }`}>
                    {activeItem.title}
                  </h3>
                  {activeItem.subheading && (
                    <span className={`font-cormorant text-base sm:text-lg italic font-bold block mt-1 ${
                      activeItem.visualTheme === 'wedding' ? 'text-[#bf953f]' : 'text-[#8a5d12]'
                    }`}>
                      {activeItem.subheading}
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-2 rounded-full border border-[#bf953f] px-3.5 py-1 bg-[#4a0e17]/40 text-[#fcf6ba] text-xs font-cinzel font-bold">
                    <Sparkles className="h-3.5 w-3.5 text-[#bf953f]" />
                    <span>SACRED CHAPTER</span>
                  </div>
                </div>
              </div>

              {/* Main Content Grid: Image + Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Hero Photo Column */}
                <div className="lg:col-span-6 relative group">
                  <div className="relative h-72 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden border-2 border-[#bf953f] shadow-2xl bg-black">
                    <img
                      src={activeItem.heroImage}
                      alt={activeItem.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Invitation Message */}
                  <p className={`font-cormorant text-xl sm:text-2xl font-bold leading-relaxed italic ${
                    activeItem.visualTheme === 'wedding' ? 'text-[#fcf6ba]/90' : 'text-[#2b0c10]'
                  }`}>
                    "{activeItem.message}"
                  </p>

                  {/* Details List */}
                  <div className="space-y-4 border-t border-[#bf953f]/25 pt-4">
                    {/* Time */}
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-[#bf953f] shrink-0 mt-0.5" />
                      <div>
                        <span className={`font-cinzel text-xs font-bold uppercase tracking-wider block ${
                          activeItem.visualTheme === 'wedding' ? 'text-[#bf953f]' : 'text-[#8a5d12]'
                        }`}>
                          TIME & SCHEDULE
                        </span>
                        <span className="font-sans text-sm sm:text-base font-semibold block">
                          {activeItem.time}
                        </span>
                        {activeItem.followedBy && (
                          <span className={`font-cormorant text-xs italic font-bold block ${
                            activeItem.visualTheme === 'wedding' ? 'text-[#fcf6ba]/80' : 'text-[#734f10]'
                          }`}>
                            {activeItem.followedBy}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Venue & Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#bf953f] shrink-0 mt-0.5" />
                      <div>
                        <span className={`font-cinzel text-xs font-bold uppercase tracking-wider block ${
                          activeItem.visualTheme === 'wedding' ? 'text-[#bf953f]' : 'text-[#8a5d12]'
                        }`}>
                          VENUE & LOCATION
                        </span>
                        <span className="font-sans text-sm sm:text-base font-semibold block">
                          {activeItem.venue}
                        </span>
                        {activeItem.address && (
                          <span className={`font-sans text-xs font-medium block ${
                            activeItem.visualTheme === 'wedding' ? 'text-[#fcf6ba]/80' : 'text-[#734f10]'
                          }`}>
                            {activeItem.address}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dress Code (If available) */}
                    {activeItem.dressCode && (
                      <div className="flex items-start gap-3">
                        <Shirt className="h-5 w-5 text-[#bf953f] shrink-0 mt-0.5" />
                        <div>
                          <span className={`font-cinzel text-xs font-bold uppercase tracking-wider block ${
                            activeItem.visualTheme === 'wedding' ? 'text-[#bf953f]' : 'text-[#8a5d12]'
                          }`}>
                            DRESS CODE
                          </span>
                          <span className="font-sans text-xs sm:text-sm font-semibold block">
                            {activeItem.dressCode}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tagline (If available) */}
                    {activeItem.tagline && (
                      <div className="flex items-start gap-3 pt-2">
                        <HeartHandshake className="h-5 w-5 text-[#bf953f] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-cinzel text-xs sm:text-sm font-extrabold tracking-widest text-[#bf953f] uppercase block">
                            {activeItem.tagline}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Single Elegant Location Button */}
                  {activeItem.googleMapsUrl && (
                    <div className="pt-4 border-t border-[#bf953f]/25">
                      <a
                        href={activeItem.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-cinzel text-xs font-extrabold transition-all duration-300 cursor-pointer shadow-lg ${
                          activeItem.visualTheme === 'wedding'
                            ? 'border-[#fcf6ba] bg-gradient-to-r from-[#bf953f] to-[#d4af37] text-[#4a0e17] hover:scale-105'
                            : 'border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] hover:bg-[#7a1c29] hover:scale-105'
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>VIEW LOCATION</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
