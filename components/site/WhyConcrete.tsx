"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Layers, Truck, Snowflake, Droplets, ShieldCheck, Check, X, ArrowRight } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "./LeadModal";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

const compare = [
  { k: "Срок службы", tile: "10–15 лет", beton: "30+ лет" },
  { k: "Проседание и «волны»", tile: "через 2–3 зимы", beton: "нет, монолит" },
  { k: "Трава и муравьи в швах", tile: "каждый сезон", beton: "швов нет" },
  { k: "Уход", tile: "перекладка", beton: "пропитка раз в 3 года" },
];

// Стоимость владения за 15 лет, условные единицы (плитка = 100%)
const bars = [
  { y: "Год 1", tile: 52, beton: 58 },
  { y: "Год 3", tile: 60, beton: 58 },
  { y: "Год 5", tile: 70, beton: 60 },
  { y: "Год 8", tile: 80, beton: 60 },
  { y: "Год 12", tile: 92, beton: 63 },
  { y: "Год 15", tile: 100, beton: 64 },
];

export default function WhyConcrete() {
  const { openLead } = useLead();
  return (
    <section className="w-full px-5 md:px-6 pt-[110px] pb-[90px] md:pt-[150px] md:pb-[130px] bg-concrete relative overflow-hidden">
      <div className="absolute inset-0 blueprint opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-signal/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2"
          >
            01 / Почему монолит
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
            className="mt-4 text-[34px] md:text-5xl lg:text-[56px] font-bold text-ink leading-[1.02] tracking-[-0.03em]"
          >
            Плитку перекладывают.
            <br />
            <span className="text-stone">Бетон — заливают один раз.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
          className="text-[16px] md:text-lg text-stone max-w-md leading-relaxed"
        >
          Монолитная плита на правильном основании работает как единое целое: нагрузку от машины распределяет по всей площади, а воде и корням просто некуда пролезть.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10"
      >
        {/* Карточка 1: фото + два стеклянных преимущества */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[28px] md:rounded-[32px] border border-line p-5 md:p-6 flex flex-col gap-10 group relative overflow-hidden min-h-[480px]"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={asset("/img/trowel.webp")}
              alt="Мастер затирает свежий бетон"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/20 to-ink/75" />
          </div>

          <div className="relative z-10">
            <h3 className="text-[28px] md:text-4xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-lg">
              Ручная работа, <br />
              <span className="italic font-medium">инженерный результат.</span>
            </h3>
            <p className="text-[15px] md:text-base text-white/90 leading-relaxed max-w-[450px] mt-3 drop-shadow-md">
              У нас есть 2–3 часа, пока бетон пластичный. За это время мастер создаёт поверхность, которую не повторит ни одна плитка.
            </p>
          </div>

          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 relative z-10">
            {[
              { icon: Layers, t: "Армированный монолит", d: "Сетка Ø8 мм, толщина 10–15 см. Без стыков, которые разъезжаются." },
              { icon: Truck, t: "Держит 3,5 тонны", d: "Площадка под авто выдержит внедорожник, газель и миксер." },
            ].map((c) => (
              <div
                key={c.t}
                className="flex flex-col gap-4 p-5 md:p-6 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/20 transition-all hover:bg-white/20 group/item shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0 transition-transform group-hover/item:scale-110">
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[15px] font-bold text-white">{c.t}</span>
                  <p className="text-[12.5px] text-white/75 leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Карточка 2: сравнение плитка vs бетон */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-line p-5 md:p-6 flex flex-col overflow-hidden relative min-h-[480px]"
        >
          <div className="absolute inset-0">
            <img src={asset("/img/tiles-bad.webp")} alt="" className="w-full h-full object-cover opacity-25 grayscale" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-concrete/80" />
          </div>
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-signal/15 rounded-full blur-[80px]" />

          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-4">
            <div className="w-full max-w-[440px] bg-white/60 backdrop-blur-xl border border-white rounded-[24px] p-4 md:p-6 shadow-2xl shadow-ink/10">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 pb-3 border-b border-line font-mono text-[10px] uppercase tracking-[0.12em] text-stone">
                <span />
                <span className="text-center">Плитка</span>
                <span className="text-center text-signal-2">Монолит</span>
              </div>
              {compare.map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, ease: "easeOut" as const }}
                  className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center py-3 border-b border-line/70 last:border-0"
                >
                  <span className="text-[12.5px] md:text-[13px] font-semibold text-ink leading-tight">{row.k}</span>
                  <span className="flex items-center justify-center gap-1 text-[11.5px] md:text-[12px] text-stone text-center leading-tight">
                    <X className="w-3 h-3 text-stone-2 shrink-0" />
                    {row.tile}
                  </span>
                  <span className="flex items-center justify-center gap-1 text-[11.5px] md:text-[12px] font-semibold text-ink bg-signal/10 rounded-lg py-1.5 px-1 text-center leading-tight">
                    <Check className="w-3 h-3 text-signal-2 shrink-0" strokeWidth={3} />
                    {row.beton}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-6">
            <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Честное сравнение с плиткой</h3>
            <p className="text-[15px] text-stone leading-relaxed mt-2">
              Плитка красива в первый год. Потом основание «гуляет», швы зарастают, бордюр уходит. Монолит этих проблем не знает по конструкции.
            </p>
          </div>
        </motion.div>

        {/* Карточка 3: уральская зима */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-line overflow-hidden flex flex-col"
        >
          <div className="h-72 md:h-80 relative overflow-hidden">
            <img src={asset("/img/winter.webp")} alt="Бетонная площадка зимой" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity as number, ease: "easeInOut" as const }}
              className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center"
            >
              <Snowflake className="h-7 w-7 text-white drop-shadow-md" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity as number, ease: "easeInOut" as const, delay: 1 }}
              className="absolute top-24 left-6 w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center"
            >
              <Droplets className="h-6 w-6 text-white drop-shadow-md" />
            </motion.div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              {["F200 — 200 циклов мороза", "W6 — не пропускает воду", "−40 °C … +40 °C"].map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={
                    "rounded-full px-3 py-1.5 text-[11px] font-bold backdrop-blur-md border " +
                    (i === 0 ? "bg-signal text-white border-signal" : "bg-white/85 text-ink border-white")
                  }
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Рассчитан на уральскую зиму</h3>
            <p className="text-[15px] text-stone leading-relaxed mt-2">
              Морозостойкий бетон, дренирующая подушка из щебня и нарезка температурных швов. Чистите снег лопатой, трактором или реагентами — поверхности ничего не будет.
            </p>
          </div>
        </motion.div>

        {/* Карточка 4: стоимость владения */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-line overflow-hidden flex flex-col"
        >
          <div className="bg-ink h-72 md:h-80 relative flex flex-col p-5 md:p-7 blueprint-dark">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-signal/15 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-signal" />
                </div>
                <div>
                  <div className="text-white text-[13px] font-semibold">Затраты на покрытие</div>
                  <div className="font-mono text-[10px] text-white/45 uppercase tracking-[0.1em]">за 15 лет эксплуатации</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
                <span className="flex items-center gap-1.5 text-white/50">
                  <span className="w-2.5 h-2.5 rounded-sm bg-white/25" />
                  Плитка
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2.5 h-2.5 rounded-sm bg-signal" />
                  Бетон
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-end gap-2 md:gap-3">
              {bars.map((b, i) => (
                <div key={b.y} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                  <div className="w-full flex-1 flex items-end gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: b.tile + "%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.08, ease: "easeOut" as const }}
                      className="flex-1 bg-white/20 rounded-t-md"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: b.beton + "%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.1 + i * 0.08, ease: "easeOut" as const }}
                      className="flex-1 bg-gradient-to-t from-signal-2 to-signal rounded-t-md shadow-lg shadow-signal/20"
                    />
                  </div>
                  <span className="font-mono text-[9px] md:text-[10px] text-white/45 whitespace-nowrap">{b.y}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Дешевле уже к третьему году</h3>
              <p className="text-[15px] text-stone leading-relaxed mt-2">
                На старте цена сопоставима с хорошей плиткой. Но монолит не нужно перекладывать, подсыпать и чистить от травы — разница копится каждый сезон.
              </p>
            </div>
            <button
              onClick={() =>
                openLead({
                  source: "Почему монолит: сравнение с плиткой",
                  title: "Сравним бетон и плитку на вашем участке",
                  subtitle: "Посчитаем оба варианта с основанием и работой — решите сами, что выгоднее.",
                  cta: "Получить сравнение",
                  fields: ["area", "contactWay"],
                })
              }
              className="self-start inline-flex items-center gap-2 text-[15px] font-semibold text-ink group"
            >
              <span className="border-b-2 border-signal pb-0.5">Сравнить цены для моего участка</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
