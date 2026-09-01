import React from 'react';
import { ChevronUp, Heart } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface FooterClosingProps {
  isPreview?: boolean;
}

export const FooterClosing: React.FC<FooterClosingProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const data = cmsContent.footer;
  const { bride, groom } = cmsContent.couple;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/916304043014?text=Hello%2C%20I%20saw%20your%20wedding%20invitation%20website!";

  return (
    <footer className="relative bg-[#f8f3ea] py-16 px-4 text-[#4a0e17] overflow-hidden border-t-2 border-[#bf953f]/60">
      {/* Background Subtle Luxury Line Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,248,241,0.9)_0%,rgba(248,243,234,1)_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-8">
        {/* Lord Vinayaka Emblem & Devotional Heading */}
        <div className="mx-auto flex flex-col items-center">
          <img
            src={cmsContent.preloader.ganeshaImage}
            alt="Sacred Lord Vinayaka Statue"
            className="h-20 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(138,93,18,0.25)]"
          />
          {/* Strictly Single Line for Phone View */}
          <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#8a5d12] uppercase mt-3 whitespace-nowrap overflow-hidden text-ellipsis block max-w-full px-2">
            {data.devotionalHeading}
          </span>
        </div>

        {/* Couple Names Stacked Line-by-Line */}
        <div className="flex flex-col items-center justify-center space-y-1">
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a0e17] tracking-wide">
            {bride.fullName}
          </h2>
          <span className="font-script text-2xl sm:text-3xl text-[#8a5d12] my-0.5">&</span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a0e17] tracking-wide">
            {groom.fullName}
          </h2>
          <p className="font-cormorant text-base italic text-[#8a5d12] font-semibold pt-2">
            {cmsContent.hero.weddingDate} • {cmsContent.hero.location}
          </p>
        </div>

        <p className="font-cormorant text-lg italic text-[#5c1c24] max-w-lg mx-auto font-medium">
          "{data.closingMessage}"
        </p>

        {/* Scroll Back To Top Button */}
        <div className="pt-4 flex flex-col items-center space-y-4">
          <button
            onClick={scrollToTop}
            className="inline-flex flex-col items-center gap-1.5 font-cinzel text-[10px] font-bold tracking-[0.3em] text-[#8a5d12] uppercase hover:text-[#4a0e17] transition-colors cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bf953f] bg-[#4a0e17] shadow-md hover:bg-[#63141f]">
              <ChevronUp className="h-5 w-5 text-[#fcf6ba]" />
            </div>
            <span>{data.revisitText}</span>
          </button>

          {/* Made with Love Symbol -> WhatsApp Link */}
          <div className="pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#bf953f]/50 bg-[#fffdf9] px-4 py-2 text-xs font-cinzel font-bold text-[#4a0e17] hover:bg-[#4a0e17] hover:text-[#fcf6ba] hover:border-[#bf953f] transition-all duration-300 shadow-md cursor-pointer group"
              title="Click to chat on WhatsApp (+91 6304043014)"
            >
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-600 fill-red-600 group-hover:scale-125 transition-transform duration-300" />
            </a>
          </div>
        </div>

        <div className="border-t border-[#bf953f]/30 pt-6 text-[11px] font-sans text-gray-600">
          <p>© 2026 {bride.fullName} & {groom.fullName} Royal Wedding Celebration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
