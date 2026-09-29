"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Menu, X, ArrowRight, MapPin } from "lucide-react";
import { asset, NAV, PHONE, PHONE_HREF } from "@/lib/site";
import { useLead } from "./LeadModal";
import Logo from "./Logo";

const facts = [
  { value: "с 2019", label: "льём бетон на Урале" },
  { value: "3–7 дней", label: "от замера до двора" },
  { value: "5 лет", label: "гарантия в договоре" },
  { value: "М300 F200", label: "только заводской бетон" },
];

export default function Hero() {
  const { openLead } = useLead();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const openMeasure = (source: string) =>
    openLead({
      source,
      badge: "Бесплатно · без обязательств",
      title: "Бесплатный выезд инженера на замер",
      subtitle: "Приедем с нивелиром, измерим участок, подскажем решение и зафиксируем цену в смете. Замер ни к чему не обязывает.",
      cta: "Записаться на замер",
      fields: ["service", "date", "contactWay"],
    });

  return (
    <section className="relative min-h-[100svh] md:min-h-[110vh] flex flex-col bg-ink w-full overflow-hidden">
      {/* Фото-фон с медленным наездом камеры */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={asset("/img/hero.webp")}
          alt="Современный дом с монолитной бетонной площадкой и крыльцом"
          className="absolute inset-0 w-full h-full object-cover animate-kenburns will-change-transform"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/70 via-ink/25 to-ink/80" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(18,18,17,0.35),transparent_65%)]" />

      {/* Навигация */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-3 md:pt-6"
      >
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between p-[8px] md:p-[10px] rounded-full backdrop-blur-xl border transition-colors duration-500 " +
            (scrolled ? "bg-ink/80 border-white/10 shadow-2xl" : "bg-white/5 border-white/10")
          }
        >
          <a href="#top" className="flex-1 flex items-center pl-3 flex-shrink-0 whitespace-nowrap" aria-label="BETONSKI — на главную">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-7 flex-shrink-0">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-signal transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end gap-2 md:gap-3 flex-shrink-0 whitespace-nowrap">
            <a href={PHONE_HREF} className="hidden md:inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-signal transition-colors px-2 py-2">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <a href={PHONE_HREF} aria-label="Позвонить" className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => openMeasure("Шапка: замер")}
              className="hidden sm:inline-flex rounded-full px-5 py-2.5 text-[14px] font-semibold bg-signal text-white hover:bg-signal-2 transition-all hover:scale-105 active:scale-95"
            >
              Бесплатный замер
            </button>
            <button
              onClick={() => setMenu(true)}
              aria-label="Меню"
              className="lg:hidden w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl flex flex-col px-6 pt-5 pb-8 blueprint-dark lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-10 flex flex-col">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-baseline gap-4 py-3 border-b border-white/10 text-white text-[28px] font-semibold tracking-tight"
                >
                  <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <a href={PHONE_HREF} className="h-14 rounded-2xl bg-white text-ink font-bold flex items-center justify-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> {PHONE}
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  openMeasure("Мобильное меню: замер");
                }}
                className="h-14 rounded-2xl bg-signal text-white font-bold"
              >
                Бесплатный замер
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="top" className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-[120px] md:pt-[148px] pb-10 md:pb-16 z-10">
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/15 pl-2 pr-4 py-1.5"
          >
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-signal animate-ping-slow" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-signal" />
            </span>
            <span className="font-mono text-[10.5px] md:text-[11px] uppercase tracking-[0.14em] text-white/85">Открыта запись на сезон · Екатеринбург и область</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
            className="text-center font-semibold text-[38px] sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.02] tracking-[-0.035em] text-white max-w-5xl mt-0 mb-5"
          >
            Двор из монолитного бетона.
            <br />
            <span className="italic font-medium text-white/90">Один раз</span> <span className="text-signal">и навсегда.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
            className="text-center text-[16px] md:text-lg text-white/85 max-w-[600px] leading-relaxed mb-8"
          >
            Дорожки, площадки под авто, крыльца и отмостки для частного дома. Не проседает, не зарастает травой и спокойно переживает уральскую зиму.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
            className="flex flex-col items-center gap-3 w-full"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() =>
                  openLead({
                    source: "Hero: расчёт",
                    badge: "Смета за 15 минут",
                    title: "Рассчитаем стоимость вашего двора",
                    subtitle: "Опишите задачу в двух словах — инженер перезвонит и назовёт цену «под ключ» с материалами и работой.",
                    cta: "Получить расчёт",
                    fields: ["service", "area", "contactWay"],
                  })
                }
                className="group rounded-full px-8 py-4 text-base font-semibold bg-signal text-white hover:bg-signal-2 transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center gap-2 shadow-[0_18px_40px_-12px_rgba(255,106,26,0.75)]"
              >
                Рассчитать стоимость
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={PHONE_HREF}
                className="rounded-full px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center gap-2"
                style={{ boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.35)" }}
              >
                <Phone className="w-4 h-4" /> {PHONE}
              </a>
            </div>
            <span className="text-sm text-white/60 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Замер и 3D-эскиз — бесплатно, цена фиксируется в договоре
            </span>
          </motion.div>

          {/* Факты вместо логотипов */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
            }}
            initial="hidden"
            animate="show"
            className="mt-12 md:mt-[64px] w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md"
          >
            {facts.map((f) => (
              <motion.div
                key={f.label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="bg-ink/40 px-4 py-4 md:py-5 text-left"
              >
                <div className="text-white text-xl md:text-2xl font-semibold tracking-tight">{f.value}</div>
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-white/55 mt-1">{f.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
