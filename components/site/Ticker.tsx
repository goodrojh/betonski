"use client";

const words = ["Дорожки", "Площадки под авто", "Крыльца и ступени", "Отмостки", "Террасы", "Мытый бетон", "Штамп под камень", "Лестницы", "Подпорные стенки"];

export default function Ticker() {
  const row = [...words, ...words];
  return (
    <div className="relative bg-signal text-ink overflow-hidden -rotate-[1.2deg] -mt-6 md:-mt-10 z-20 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] border-y-2 border-ink">
      <div className="flex w-max animate-marquee py-3.5 md:py-4">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-8 pr-6 md:pr-8 text-[18px] md:text-[26px] font-bold uppercase tracking-tight whitespace-nowrap">
            {w}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
              <rect x="2" y="2" width="12" height="12" transform="rotate(45 8 8)" fill="#121211" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
