import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Navigation } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface EventChaptersProps {
  isPreview?: boolean;
}

export const EventChapters: React.FC<EventChaptersProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const visibleEvents = cmsContent.events.filter((e) => e.visible);

  return (
    <section id="events" className="relative bg-[#f7f2e8] py-24 px-4 overflow-hidden border-t border-[#bf953f]/30">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase">
            CHAPTER III • THE SACRED CELEBRATIONS
          </span>
          <h2 className="mt-2 font-cormorant text-4xl md:text-5xl font-bold text-[#4a0e17]">
            Events & Ceremonial Itinerary
          </h2>
          <p className="mt-3 font-cormorant text-base italic text-[#734f10] font-medium">
            "Join us as we step into our forever amidst music, laughter & sacred rituals."
          </p>
          <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent" />
        </div>

        {/* Dynamic Events List */}
        <div className="space-y-16">
          {visibleEvents.map((evt, index) => (
            <motion.div
              key={evt.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border-2 border-[#bf953f]/40 bg-[#fffdf9] p-6 md:p-10 shadow-2xl overflow-hidden ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Event Image */}
              <div className="lg:col-span-6 relative h-80 md:h-[400px] rounded-2xl overflow-hidden border border-[#bf953f]/40 group">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a0e17]/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 rounded-full border border-[#bf953f] bg-[#4a0e17]/90 px-4 py-1 font-cinzel text-xs font-bold text-[#fcf6ba] shadow-lg">
                  CHAPTER {evt.chapter}
                </div>
              </div>

              {/* Event Details */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="font-cinzel text-xs font-bold tracking-widest text-[#8a5d12] uppercase block">
                    {evt.day}
                  </span>
                  <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-[#4a0e17]">
                    {evt.title}
                  </h3>
                  {evt.teluguTitle && (
                    <span className="font-cormorant text-base italic text-[#734f10] block mt-0.5 font-semibold">
                      {evt.teluguTitle}
                    </span>
                  )}
                </div>

                <p className="font-cormorant text-base text-[#3b1217] italic font-medium">
                  "{evt.message}"
                </p>

                <div className="space-y-3 font-sans text-xs text-[#4a0e17] border-y border-[#bf953f]/30 py-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Calendar className="h-4 w-4 text-[#8a5d12] shrink-0" />
                    <span>DATE: {evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4 text-[#8a5d12] shrink-0" />
                    <span>TIME: {evt.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-[#8a5d12] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">{evt.venue}</strong> — {evt.address}, {evt.district}
                    </div>
                  </div>
                  {evt.dressCode && (
                    <div className="flex items-center gap-2 text-[#734f10] font-semibold">
                      <Sparkles className="h-4 w-4 text-[#8a5d12] shrink-0" />
                      <span>DRESS CODE: {evt.dressCode}</span>
                    </div>
                  )}
                </div>

                {evt.googleMapsUrl && (
                  <a
                    href={evt.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#bf953f] bg-gradient-to-r from-[#4a0e17] to-[#7a1c29] px-6 py-3 font-cinzel text-xs font-bold tracking-widest text-[#fcf6ba] shadow-lg hover:scale-105 transition-transform"
                  >
                    <Navigation className="h-4 w-4 text-[#fcf6ba]" />
                    <span>GET DIRECTIONS (GOOGLE MAPS)</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
