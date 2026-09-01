import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative bg-[#f7f2e8] py-10 px-4 border-t border-[#bf953f]/20">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border-2 border-[#bf953f]/60 bg-[#fffdf9] p-6 md:p-8 backdrop-blur-md text-center shadow-xl">
          <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#8a5d12] uppercase block mb-1">
            SACRED TIMING
          </span>
          <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-[#4a0e17]">
            SUMUHURTHAM
          </h3>
          <div className="mx-auto h-[2px] w-16 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent my-3" />

          <div className="grid grid-cols-4 gap-2.5 md:gap-6 mt-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-3 shadow-sm"
              >
                <span className="font-cinzel text-xl sm:text-3xl md:text-4xl font-black text-[#4a0e17]">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-1 font-sans text-[9px] sm:text-xs font-bold tracking-widest text-[#734f10]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
