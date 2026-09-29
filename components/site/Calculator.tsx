"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import { Check, Lock, Ruler, CalendarDays, ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";
import { WORK_TYPES, FINISHES, EXTRAS, rub } from "@/lib/pricing";
import { useLead } from "./LeadModal";

function AnimatedRub({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = rub(v);
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);
  return <span ref={ref}>{rub(value)}</span>;
}

export default function Calculator() {
  const { openLead } = useLead();
  const [type, setType] = useState<string>("parking");
  const [area, setArea] = useState(40);
  const [finish, setFinish] = useState<string>("trowel");
  const [extras, setExtras] = useState<string[]>([]);

  const t = WORK_TYPES.find((w) => w.id === type)!;
  const f = FINISHES.find((x) => x.id === finish)!;

  const { min, max } = useMemo(() => {
    let total = t.base * f.k * area;
    for (const id of extras) {
      const e = EXTRAS.find((x) => x.id === id)!;
      total += "perM2" in e ? e.perM2 * area : e.fixed;
    }
    // Малые объёмы дороже в пересчёте на м² (выезд бригады, миксер)
    if (area < 15) total *= 1.15;
    return { min: total * 0.93, max: total * 1.08 };
  }, [t, f, area, extras]);

  const days = area > 120 ? [t.days[0] + 2, t.days[1] + 3] : area > 60 ? [t.days[0] + 1, t.days[1] + 1] : t.days;
  const fill = ((area - 5) / (400 - 5)) * 100;

  const toggle = (id: string) => setExtras((x) => (x.includes(id) ? x.filter((i) => i !== id) : [...x, id]));

  const lock = () =>
    openLead({
      source: "Калькулятор: зафиксировать цену",
      badge: "Цена фиксируется на 14 дней",
      title: "Зафиксируем эту цену за вами",
      subtitle: "Инженер проверит расчёт, приедет на бесплатный замер и закрепит стоимость в договоре — без «доплат по факту».",
      cta: "Зафиксировать цену",
      fields: ["date", "contactWay"],
      presetService: t.label,
      summary: [
        { label: "Работа", value: t.label },
        { label: "Площадь", value: `${area} м²` },
        { label: "Фактура", value: f.label },
        { label: "Предв. цена", value: `${rub(min)} – ${rub(max)}` },
      ],
    });

  return (
    <section id="calculator" className="relative bg-ink text-white py-20 md:py-28 px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0">
        <img src={asset("/img/wall.webp")} alt="" className="w-full h-full object-cover opacity-[0.18]" loading="lazy" />
      </div>
      <div className="absolute inset-0 blueprint-dark" />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-signal/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">03 / Калькулятор</span>
            <h2 className="mt-4 text-[34px] md:text-5xl font-bold tracking-[-0.03em] leading-[1.02]">
              Узнайте цену за 30 секунд.
              <br />
              <span className="text-white/45">Без звонка и регистрации.</span>
            </h2>
          </div>
          <p className="text-white/60 text-[16px] max-w-sm leading-relaxed">Считаем как сметчик: основание, арматура, бетон, работа и пропитка уже внутри.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5 md:gap-6">
          {/* Параметры */}
          <div className="rounded-[28px] bg-white/[0.04] backdrop-blur-xl border border-white/10 p-5 md:p-8 flex flex-col gap-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 mb-3">1 — Что заливаем</div>
              <div className="flex flex-wrap gap-2">
                {WORK_TYPES.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setType(w.id)}
                    className={
                      "rounded-full px-4 py-2.5 text-[14px] font-semibold border transition-all " +
                      (type === w.id ? "bg-signal border-signal text-white shadow-[0_10px_24px_-8px_rgba(255,106,26,0.7)]" : "bg-white/5 border-white/15 text-white/80 hover:border-white/40")
                    }
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between mb-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">2 — Площадь</div>
                <div className="flex items-baseline gap-1">
                  <input
                    type="number"
                    min={5}
                    max={400}
                    value={area}
                    onChange={(e) => setArea(Math.max(5, Math.min(400, Number(e.target.value) || 5)))}
                    className="w-20 bg-transparent text-right text-4xl font-bold tracking-tight outline-none border-b border-white/20 focus:border-signal"
                    aria-label="Площадь в квадратных метрах"
                  />
                  <span className="text-xl text-white/60 font-semibold">м²</span>
                </div>
              </div>
              <input
                type="range"
                min={5}
                max={400}
                step={1}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="range w-full"
                style={{ ["--fill" as string]: fill + "%" } as React.CSSProperties}
                aria-label="Площадь"
              />
              <div className="flex justify-between font-mono text-[10px] text-white/35 mt-2">
                <span>5 м²</span>
                <span>дорожка 1×20 = 20 м²</span>
                <span>400 м²</span>
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 mb-3">3 — Фактура поверхности</div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {FINISHES.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setFinish(x.id)}
                    className={"relative rounded-2xl overflow-hidden aspect-square border-2 transition-all text-left " + (finish === x.id ? "border-signal scale-[1.03]" : "border-transparent opacity-70 hover:opacity-100")}
                    aria-label={x.label}
                  >
                    <img src={asset(x.img)} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 right-2 text-[10.5px] md:text-[11px] font-semibold leading-tight">{x.label}</span>
                    {finish === x.id && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-signal flex items-center justify-center">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 mb-3">4 — Дополнительно</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EXTRAS.map((e) => {
                  const on = extras.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggle(e.id)}
                      className={"flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-[13.5px] transition-all " + (on ? "border-signal bg-signal/10" : "border-white/12 bg-white/[0.03] hover:border-white/30")}
                    >
                      <span className={"w-5 h-5 rounded-md border flex items-center justify-center shrink-0 " + (on ? "bg-signal border-signal" : "border-white/30")}>
                        {on && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                      </span>
                      <span className="text-white/85">{e.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Результат */}
          <div className="rounded-[28px] bg-white text-ink p-5 md:p-8 flex flex-col relative overflow-hidden lg:sticky lg:top-28 self-start w-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-signal/15 rounded-full blur-[60px]" />
            <AnimatePresence mode="wait">
              <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="relative h-40 md:h-44 rounded-2xl overflow-hidden mb-6">
                <img src={asset(t.img)} alt={t.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold">{t.label}</span>
              </motion.div>
            </AnimatePresence>

            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">Предварительная стоимость под ключ</div>
            <div className="mt-2 text-[32px] md:text-[40px] font-bold tracking-[-0.03em] leading-[1.05]">
              <AnimatedRub value={min} />
              <span className="text-stone-2 font-semibold"> – </span>
              <br className="md:hidden" />
              <AnimatedRub value={max} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-concrete px-3.5 py-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-stone">
                  <Ruler className="w-3 h-3" /> за м²
                </div>
                <div className="font-bold mt-0.5">≈ {rub((min + max) / 2 / area)}</div>
              </div>
              <div className="rounded-xl bg-concrete px-3.5 py-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-stone">
                  <CalendarDays className="w-3 h-3" /> срок
                </div>
                <div className="font-bold mt-0.5">
                  {days[0]}–{days[1]} дней
                </div>
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-2 text-[13.5px] text-stone">
              {["Материалы, доставка и техника включены", "Бесплатный замер и 3D-эскиз", "Смета фиксируется в договоре"].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-signal-2 shrink-0" strokeWidth={3} />
                  {x}
                </li>
              ))}
            </ul>

            <button
              onClick={lock}
              className="group mt-7 h-14 rounded-2xl bg-signal text-white font-bold flex items-center justify-center gap-2 hover:bg-signal-2 transition-colors shadow-[0_14px_30px_-10px_rgba(255,106,26,0.7)]"
            >
              <Lock className="w-4 h-4" />
              Зафиксировать цену
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-[12px] text-stone-2 text-center">Точная цена — после замера. Обычно отличается не больше чем на 5–7%.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
