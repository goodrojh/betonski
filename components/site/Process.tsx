"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Ruler, Box, FileCheck, Thermometer, Phone } from "lucide-react";
import { asset, PHONE_HREF } from "@/lib/site";
import { useLead } from "./LeadModal";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const glass = "w-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-4 flex flex-col justify-center gap-2 shadow-2xl shadow-black/10 overflow-hidden";

function Step1() {
  return (
    <div className={glass}>
      {[
        { icon: Ruler, t: "Геодезия участка", s: "Перепады, уклоны, грунт", dim: true },
        { icon: Box, t: "3D-эскиз двора", s: "Видите результат до заливки", dim: false },
        { icon: FileCheck, t: "Смета зафиксирована", s: "Цена не меняется", dim: true },
      ].map((c, i) => (
        <motion.div
          key={c.t}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className={
            "relative rounded-[8px] flex items-center gap-2 overflow-hidden " +
            (c.dim ? "bg-white/45 backdrop-blur-md border border-white/40 px-2 py-1.5" : "bg-white px-2.5 py-2 shadow-2xl shadow-signal/20 border border-signal/30 z-10")
          }
        >
          {!c.dim && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity as number, ease: "linear" as const }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-signal/20 to-transparent -skew-x-12 pointer-events-none"
            />
          )}
          <div className={"rounded-[6px] flex items-center justify-center shrink-0 " + (c.dim ? "w-6 h-6 bg-white/40" : "w-8 h-8 bg-signal/10")}>
            <c.icon className={c.dim ? "h-3 w-3 text-ink/70" : "h-4 w-4 text-signal-2"} />
          </div>
          <div className="flex flex-col">
            <span className={"font-bold leading-none mb-0.5 text-ink " + (c.dim ? "text-[10px]" : "text-[12px]")}>{c.t}</span>
            <span className={"text-ink/60 leading-none " + (c.dim ? "text-[8px]" : "text-[9.5px]")}>{c.s}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Step2() {
  const layers = [
    { t: "Бетон М300 · 10–15 см", c: "bg-stone-2", h: "h-5" },
    { t: "Арматурная сетка Ø8", c: "bg-signal", h: "h-1.5" },
    { t: "Щебень 20–40 · 20 см", c: "bg-[repeating-linear-gradient(90deg,#8c877f_0_6px,#a9a59e_6px_10px)]", h: "h-6" },
    { t: "Геотекстиль", c: "bg-white", h: "h-1" },
    { t: "Уплотнённый грунт", c: "bg-[#6b5a45]", h: "h-4" },
  ];
  return (
    <div className={glass + " gap-1"}>
      <div className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink/70 mb-1">Разрез основания</div>
      {layers.map((l, i) => (
        <motion.div
          key={l.t}
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + (layers.length - i) * 0.1 }}
          className="flex items-center gap-2 origin-left"
        >
          <div className={"flex-1 rounded-[3px] " + l.c + " " + l.h} />
          <span className="text-[9px] font-bold text-ink bg-white/80 rounded px-1.5 py-0.5 whitespace-nowrap">{l.t}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Step3() {
  return (
    <div className={glass + " flex-row items-center justify-between"}>
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity as number, ease: "easeInOut" as const }}
          className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white] z-10"
        />
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ scale: [0.2, 1.8], opacity: [0, 0.6, 0] }}
            transition={{ duration: 4, repeat: Infinity as number, ease: "easeOut" as const, delay: i * 0.8 }}
            className="absolute border border-white/50 rounded-full w-full h-full"
          />
        ))}
      </div>
      <div className="flex flex-col gap-1.5 items-end">
        {["Паспорт бетона", "М300 F200 W6", "Приёмка с завода"].map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={"rounded-[8px] px-3 py-1.5 shadow-xl shadow-black/10 border min-w-[96px] text-center " + (i === 1 ? "bg-signal border-signal text-white" : "bg-white border-white text-ink")}
          >
            <span className="text-[10.5px] font-bold tracking-tight leading-none">{t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className={glass + " gap-2.5"}>
      <div className="bg-white rounded-[8px] p-2 flex items-center gap-3 shadow-xl shadow-black/5 relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity as number, ease: "linear" as const }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-signal/10 to-transparent -skew-x-12 pointer-events-none"
        />
        <div className="w-9 h-9 rounded-[8px] bg-signal/10 flex items-center justify-center shrink-0">
          <Thermometer className="w-4 h-4 text-signal-2" />
        </div>
        <div className="flex-1 flex items-end gap-1 h-8">
          {[30, 45, 58, 66, 74, 80, 86, 90, 94, 97, 99, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: h + "%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="flex-1 bg-signal/60 rounded-[1px]"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {["Нарезка швов", "Пропитка", "Уход 7 дней"].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="bg-white rounded-[8px] px-2.5 py-1.5 shadow-lg shadow-black/5 text-[10px] font-bold flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { n: "01", img: "/img/step-measure.webp", t: "Замер и эскиз", d: "Инженер приезжает бесплатно, снимает уровни и показывает 3D-эскиз двора. Цена фиксируется в договоре.", day: "День 0", Mock: Step1 },
  { n: "02", img: "/img/step-formwork.webp", t: "Основание и опалубка", d: "Выбираем грунт, трамбуем щебень, ставим опалубку и арматуру. 80% долговечности — здесь.", day: "Дни 1–2", Mock: Step2 },
  { n: "03", img: "/img/step-pour.webp", t: "Заливка", d: "Бетон с завода миксером, с паспортом качества. Принимаем, вибрируем, выводим в уровень.", day: "День 3", Mock: Step3 },
  { n: "04", img: "/img/step-finish.webp", t: "Финиш и уход", d: "Затираем, создаём фактуру, режем швы и наносим пропитку. Через 7 дней можно заезжать.", day: "Дни 3–6", Mock: Step4 },
];

export default function Process() {
  const { openLead } = useLead();
  return (
    <section id="process" className="w-full px-5 md:px-10 lg:px-16 py-20 md:py-28 bg-concrete relative overflow-hidden">
      <div className="absolute inset-0 blueprint opacity-50 pointer-events-none" />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity as number, ease: "easeInOut" as const }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-signal/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        viewport={{ once: true }}
        className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">06 / Как мы работаем</span>
        <h2 className="font-bold text-[34px] md:text-[52px] text-center leading-[1.02] tracking-[-0.03em] max-w-3xl">
          От пустыря до готового двора
          <br />
          <span className="text-stone">за 4 понятных шага</span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 mb-14 md:mb-16 max-w-7xl mx-auto relative z-10"
      >
        {steps.map(({ n, img, t, d, day, Mock }) => (
          <motion.div key={n} variants={stepVariants} className="flex flex-col gap-5 group cursor-default">
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3.4] w-full shadow-lg">
              <img src={asset(img)} alt={t} className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-ink/15" />
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-5 lg:p-6">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="w-full">
                  <Mock />
                </motion.div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-fit rounded-full text-signal-2 text-xs font-bold px-3 py-1 border border-signal">Шаг {n}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-stone">{day}</span>
              </div>
              <h3 className="text-[22px] font-bold leading-tight tracking-tight">{t}</h3>
              <p className="text-[15px] text-stone leading-relaxed">{d}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openLead({
              source: "Процесс: вызвать инженера",
              badge: "Шаг 01 — бесплатно",
              title: "Вызвать инженера на участок",
              subtitle: "Выберите удобное время — инженер приедет с оборудованием и образцами фактур. Выезд по Екатеринбургу и области бесплатный.",
              cta: "Вызвать инженера",
              fields: ["service", "date", "comment", "contactWay"],
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-[0.12em] uppercase bg-signal text-white shadow-xl shadow-signal/25 hover:shadow-2xl hover:shadow-signal/35 transition-all duration-300"
        >
          Вызвать инженера
        </motion.button>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href={PHONE_HREF}
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-[0.12em] uppercase bg-white text-ink border border-line shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" /> Позвонить
        </motion.a>
      </motion.div>
    </section>
  );
}
