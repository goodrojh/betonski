"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "./LeadModal";

const plans = [
  {
    name: "Дорожка",
    tagline: "Сделать главное — аккуратно и навсегда.",
    price: "3 200 ₽",
    unit: "/м²",
    isPopular: false,
    features: ["Бесплатный замер", "Основание 20 см щебня", "Армирование сеткой", "Бетон М300 F200", "Затирка или метла", "Гарантия 3 года"],
  },
  {
    name: "Двор под ключ",
    tagline: "Площадка, дорожки, крыльцо — одним проектом.",
    price: "3 600 ₽",
    unit: "/м²",
    isPopular: true,
    features: ["Всё из «Дорожки»", "3D-эскиз двора", "Водоотвод и уклоны", "Нарезка швов, пропитка", "Скидка 7% на комплекс", "Гарантия 5 лет"],
  },
  {
    name: "Архитектурный",
    tagline: "Мытый бетон, штамп, подсветка, лестницы.",
    price: "Проект",
    unit: "",
    isPopular: false,
    features: ["Всё из «Двора под ключ»", "Декоративные фактуры", "Цветной бетон в массе", "Подсветка и закладные", "Персональный инженер", "Гарантия 5 лет"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-white" />
      ))}
    </div>
  );
}

export default function Pricing() {
  const { openLead } = useLead();
  return (
    <section id="pricing" className="w-full px-0 py-20 md:py-28 bg-white overflow-hidden relative">
      <div className="text-center px-5 mb-10 md:mb-12 relative z-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">07 / Цены</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-4 font-bold text-[34px] md:text-[52px] text-ink leading-[1.02] tracking-[-0.03em]"
        >
          Прозрачные цены под ключ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-[15px] md:text-base text-stone max-w-xl mx-auto"
        >
          В цену входят материалы, доставка, техника и работа. Стоимость из сметы не меняется — это прописано в договоре.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-3 md:mx-10 xl:mx-auto max-w-[1320px] relative rounded-[24px] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img src={asset("/img/aerial.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-ink/25" />
        </div>

        <div className="relative z-10 bg-white/55 backdrop-blur-xl m-3 sm:m-6 md:m-[40px] rounded-[16px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-8 md:py-10 " + (plan.isPopular ? "bg-white/60" : "")}
              >
                <div className="pb-7 border-b border-ink/10">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="font-bold text-2xl text-ink tracking-tight">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-signal text-white font-mono rounded-sm">Выбирают чаще</span>
                    )}
                  </div>
                  <p className="text-sm text-ink/80 mt-1">{plan.tagline}</p>

                  <div className="mt-7 flex items-baseline gap-1">
                    {plan.unit && <span className="text-sm font-semibold text-ink/60 mr-1">от</span>}
                    <span className="font-bold text-5xl text-ink leading-none tracking-[-0.03em]">{plan.price}</span>
                    <span className="text-xs font-medium tracking-[0.1em] uppercase text-ink/60 font-mono ml-1">{plan.unit || "/индивидуально"}</span>
                  </div>

                  <button
                    onClick={() =>
                      openLead({
                        source: `Тариф: ${plan.name}`,
                        badge: `Тариф «${plan.name}»`,
                        title: plan.unit ? `Смета по тарифу «${plan.name}»` : "Обсудить архитектурный проект",
                        subtitle: plan.unit
                          ? "Пришлём подробную смету с разбивкой по материалам и работам. Без скрытых строк."
                          : "Расскажите об идее — инженер-проектировщик предложит решения и примеры, соберёт концепцию и смету.",
                        cta: plan.unit ? "Получить смету" : "Обсудить проект",
                        fields: plan.unit ? ["area", "date", "contactWay"] : ["comment", "contactWay"],
                        presetService: plan.name,
                      })
                    }
                    className={
                      "mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " +
                      (plan.isPopular ? "bg-signal text-white hover:bg-signal-2" : "bg-ink text-white hover:bg-ink-3")
                    }
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-semibold text-left">{plan.unit ? "Получить смету" : "Обсудить проект"}</span>
                    <span
                      className={
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-90 " +
                        (plan.isPopular ? "bg-ink" : "bg-signal")
                      }
                    >
                      <DotGridIcon />
                    </span>
                  </button>
                </div>

                <div className="pt-7 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-ink/5 border border-ink/15 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-ink stroke-[3]" />
                      </div>
                      <span className="text-[11.5px] font-medium tracking-[0.08em] uppercase text-ink font-mono">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
