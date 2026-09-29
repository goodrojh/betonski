"use client";
import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "./LeadModal";

export default function BeforeAfter() {
  const { openLead } = useLead();
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className="bg-white py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">05 / До и после</span>
            <h2 className="mt-4 text-[34px] md:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-ink">
              Тот же дом. Тот же двор.
              <br />
              <span className="text-stone">Шесть рабочих дней.</span>
            </h2>
          </div>
          <p className="text-stone max-w-sm text-[16px] leading-relaxed">Потяните ползунок — так выглядит разница между «когда-нибудь сделаем» и «уже сделали».</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          ref={box}
          className="relative w-full aspect-[4/3] md:aspect-[16/8] rounded-[24px] md:rounded-[32px] overflow-hidden select-none touch-pan-y cursor-ew-resize bg-ink"
          onPointerDown={(e) => {
            dragging.current = true;
            setTouched(true);
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            move(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && move(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <img src={asset("/img/after.webp")} alt="Двор после: бетонная площадка, дорожка и крыльцо" className="absolute inset-0 w-full h-full object-cover" draggable={false} loading="lazy" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={asset("/img/before.webp")} alt="Двор до: грязь и строительный мусор" className="absolute inset-0 w-full h-full object-cover" draggable={false} loading="lazy" />
          </div>

          <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-[0.14em] bg-ink/75 backdrop-blur text-white px-3 py-1.5 rounded-full">Было</span>
          <span className="absolute top-4 right-4 font-mono text-[11px] uppercase tracking-[0.14em] bg-signal text-white px-3 py-1.5 rounded-full">Стало</span>

          <div className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)]" style={{ left: `calc(${pos}% - 1.5px)` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {!touched && <span className="absolute inset-0 rounded-full bg-white/60 animate-ping-slow" />}
              <div className="relative w-14 h-14 rounded-full bg-white text-ink shadow-2xl flex items-center justify-center">
                <MoveHorizontal className="w-6 h-6" />
              </div>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="sr-only"
            aria-label="Сравнение до и после"
          />
        </motion.div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-[24px] bg-concrete border border-line p-5 md:p-6">
          <div className="grid grid-cols-3 gap-4 md:gap-10">
            {[
              ["142 м²", "площадка, дорожка, крыльцо"],
              ["6 дней", "от разметки до сдачи"],
              ["0 ₽", "доплат сверх сметы"],
            ].map(([v, l]) => (
              <div key={v}>
                <div className="text-xl md:text-3xl font-bold tracking-tight">{v}</div>
                <div className="font-mono text-[9.5px] md:text-[11px] uppercase tracking-[0.08em] text-stone mt-1 leading-snug">{l}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              openLead({
                source: "До/после: хочу так же",
                badge: "Двор под ключ",
                title: "Хочу такой же двор",
                subtitle: "Пришлите фото участка в WhatsApp или запишитесь на замер — покажем 3D-эскиз вашего двора до начала работ.",
                cta: "Получить эскиз и цену",
                fields: ["area", "date", "contactWay"],
              })
            }
            className="group rounded-full px-7 py-4 bg-ink text-white font-semibold inline-flex items-center justify-center gap-2 hover:bg-ink-3 transition-colors"
          >
            Хочу так же <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
