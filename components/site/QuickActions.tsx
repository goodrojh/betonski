"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/site";
import { useLead } from "./LeadModal";

/** Нижняя панель на телефоне + плавающая кнопка звонка на десктопе. Появляются после первого экрана. */
export default function QuickActions() {
  const { openLead } = useLead();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const quick = () =>
    openLead({
      source: "Плавающая кнопка: быстрый расчёт",
      badge: "Ответ за 15 минут",
      title: "Быстрый расчёт",
      subtitle: "Оставьте телефон — инженер перезвонит, задаст 3 вопроса и назовёт цену.",
      cta: "Жду звонка",
      fields: ["service", "contactWay"],
    });

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2"
          >
            <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2 p-2 rounded-[22px] bg-ink/90 backdrop-blur-xl border border-white/10 shadow-2xl">
              <a href={PHONE_HREF} className="h-12 rounded-2xl bg-white text-ink flex items-center justify-center gap-1.5 text-[13px] font-bold">
                <Phone className="w-4 h-4" /> Звонок
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center gap-1.5 text-[13px] font-bold">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button onClick={quick} className="h-12 rounded-2xl bg-signal text-white flex items-center justify-center gap-1.5 text-[13px] font-bold">
                <Calculator className="w-4 h-4" /> Расчёт
              </button>
            </div>
          </motion.div>

          <motion.a
            href={PHONE_HREF}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="hidden md:flex fixed bottom-8 right-8 z-40 group items-center"
            aria-label="Позвонить"
          >
            <span className="mr-3 rounded-full bg-ink text-white text-[14px] font-semibold px-4 py-2.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-xl whitespace-nowrap">
              Позвонить инженеру
            </span>
            <span className="relative w-16 h-16 rounded-full bg-signal flex items-center justify-center shadow-[0_14px_36px_-8px_rgba(255,106,26,0.8)]">
              <span className="absolute inset-0 rounded-full bg-signal animate-ping-slow" />
              <Phone className="relative w-6 h-6 text-white" />
            </span>
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
