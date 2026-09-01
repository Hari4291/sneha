import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/assets/wedding_music.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('Audio play request handled:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onToggle}
        aria-label="Toggle Wedding Music"
        className="group flex items-center gap-2.5 rounded-full border border-[#bf953f] bg-[#fffdfa] px-4 py-2.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#8a5d12] hover:bg-[#f7f2e8] cursor-pointer"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#bf953f] bg-[#4a0e17]">
          {isPlaying ? (
            <Volume2 className="h-4 w-4 text-[#fcf6ba] animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4 text-gray-300" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <span className="font-cinzel text-[10px] font-bold tracking-widest text-[#4a0e17] uppercase">
            SACRED MUSIC
          </span>
          <span className="font-sans text-[9px] font-semibold tracking-wider text-[#8a5d12]">
            {isPlaying ? '♪ MUSIC PLAYING' : 'MUTED (CLICK TO PLAY)'}
          </span>
        </div>
      </button>
    </div>
  );
};
