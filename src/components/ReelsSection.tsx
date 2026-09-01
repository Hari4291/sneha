import React, { useRef, useEffect, useState } from 'react';
import { Film } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';
import type { ReelItemData } from '../cms/types/cmsTypes';

interface ReelsSectionProps {
  isPreview?: boolean;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const header = cmsContent.reelsHeader || {
    title: 'WEDDING REELS & CINEMATIC HIGHLIGHTS',
    heading: 'Sacred Memories in Motion',
    subheading: 'Moments of love, laughter, and divine togetherness captured in motion.',
    scrollSpeed: 65,
  };
  const scrollSpeed = header.scrollSpeed || 65;
  const activeReels = (cmsContent.reels || []).filter((r) => r.visible);

  if (!activeReels || activeReels.length === 0) {
    return null;
  }

  // Generate continuous repeating base sequence (e.g. 6-8 items max to avoid browser GPU decoder overload)
  const targetMinBaseCount = 6;
  const repeatMultiplier = Math.max(2, Math.ceil(targetMinBaseCount / activeReels.length));
  const baseSequence: ReelItemData[] = [];
  for (let i = 0; i < repeatMultiplier; i++) {
    baseSequence.push(...activeReels);
  }

  // Duplicate baseSequence to create a 100% seamless -50% translateX marquee loop
  const marqueeItems = [...baseSequence, ...baseSequence];

  const handleReelClick = (instagramUrl?: string) => {
    if (instagramUrl) {
      window.open(instagramUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="reels"
      className="relative bg-[#f8f3ea] py-20 overflow-hidden border-t-2 border-[#bf953f]/50 text-[#4a0e17]"
    >
      {/* CSS Animation Keyframes for Seamless Continuous Right-to-Left Loop */}
      <style>{`
        @keyframes marqueeRightToLeft {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-reels-marquee {
          display: flex;
          width: max-content;
          animation: marqueeRightToLeft 65s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>

      {/* Background Luxury Radial Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,248,241,0.95)_0%,rgba(248,243,234,1)_85%)] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Film className="h-4 w-4 text-[#8a5d12]" />
            <span className="font-cinzel text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase block">
              {header.title}
            </span>
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#4a0e17] tracking-wide">
            {header.heading}
          </h2>
          {header.subheading && (
            <p className="font-cormorant text-base italic text-[#5c1c24] font-semibold">
              "{header.subheading}"
            </p>
          )}
          <div className="mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent" />
        </div>

        {/* Continuous Infinite Horizontal Reels Marquee Container */}
        <div className="w-full overflow-hidden py-4">
          <div
            className="animate-reels-marquee flex items-center gap-6"
            style={{ animationDuration: `${scrollSpeed}s` }}
          >
            {marqueeItems.map((reel, index) => (
              <ReelCard
                key={`${reel.id}-${index}`}
                reel={reel}
                onClick={() => handleReelClick(reel.instagramUrl)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ReelCardProps {
  reel: ReelItemData;
  onClick: () => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  // IntersectionObserver to manage hardware video decoder contexts
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play video only when card is inside the viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && !hasVideoError) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback: keep muted
        });
      }
    } else {
      video.pause();
    }
  }, [isInView, hasVideoError]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="group relative w-60 sm:w-72 aspect-[9/16] shrink-0 rounded-2xl overflow-hidden border-2 border-[#bf953f] bg-[#12080a] shadow-xl shadow-[#4a0e17]/20 cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:border-[#8a5d12]"
    >
      {/* Poster Image / Fallback image */}
      {reel.posterUrl && (
        <img
          src={reel.posterUrl}
          alt={reel.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isInView && !hasVideoError ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Video Element: Autoplay, Muted, PlaysInline, Loop, No Controls */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.posterUrl}
          muted
          playsInline
          loop
          preload="metadata"
          onError={() => setHasVideoError(true)}
          className="h-full w-full object-cover pointer-events-none"
        />
      )}

      {/* Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 opacity-80 group-hover:opacity-95 transition-opacity" />

      {/* Subtle Caption & Title at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 text-left z-10 space-y-1">
        <span className="font-cinzel text-[9px] font-bold tracking-widest text-[#fcf6ba] uppercase bg-[#4a0e17]/90 px-2 py-0.5 rounded border border-[#bf953f]/40 inline-block">
          {reel.title}
        </span>
        <p className="font-cormorant text-base font-semibold text-[#fffdfa] italic leading-snug drop-shadow-md line-clamp-2">
          {reel.caption}
        </p>
      </div>
    </div>
  );
};
