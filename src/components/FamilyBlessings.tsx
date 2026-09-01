import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface FamilyBlessingsProps {
  isPreview?: boolean;
}

export const FamilyBlessings: React.FC<FamilyBlessingsProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const visibleFamilies = cmsContent.families.filter((f) => f.visible);

  return (
    <section id="family" className="relative bg-[#fffdf9] py-24 px-4 overflow-hidden border-t border-[#bf953f]/30">
      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase">
            CHAPTER II • FAMILY BLESSINGS
          </span>
          <h2 className="mt-2 font-cormorant text-4xl md:text-5xl font-bold text-[#4a0e17]">
            With the Warmth of Our Elders
          </h2>
          <p className="mt-3 font-cormorant text-base italic text-[#734f10] font-medium">
            "Family is not an important thing, it is everything. We welcome you with open hearts."
          </p>
          <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent" />
        </div>

        {/* Family Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFamilies.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border-2 border-[#bf953f]/30 bg-[#f7f2e8] p-6 shadow-md hover:border-[#bf953f] transition-all flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] shadow-md">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="font-cinzel text-[10px] font-bold tracking-widest text-[#8a5d12] uppercase block">
                  {member.role}
                </span>
                <h3 className="font-cormorant text-xl font-bold text-[#4a0e17]">
                  {member.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
