"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "./LeadModal";

const services = [
  {
    title: "Дорожки",
    price: "от 3 200 ₽/м²",
    img: "/img/path.webp",
    text: "Сплошные или из крупных плит с газоном в швах. Ровные, без луж и бордюров, которые выпирают.",
    tags: ["толщина 10 см", "армирование", "уклон для воды"],
  },
  {
    title: "Площадка под авто",
    price: "от 3 600 ₽/м²",
    img: "/img/parking.webp",
    text: "Под машину, гостевую парковку или въезд в гараж. Нарезка швов, чтобы плита не трескалась.",
    tags: ["до 3,5 т", "15 см", "двойная сетка"],
  },
  {
    title: "Крыльцо и ступени",
    price: "от 45 000 ₽",
    img: "/img/porch.webp",
    text: "Монолитное крыльцо любой формы: «парящие» ступени, подсветка, пандус. Лицо дома — с первого шага.",
    tags: ["любая геометрия", "подсветка", "антискольжение"],
  },
  {
    title: "Отмостка",
    price: "от 2 900 ₽/м²",
    img: "/img/apron.webp",
    text: "Защищает фундамент от воды. Уклон от стены, демпферный шов, аккуратный край с дренажом.",
    tags: ["уклон 2–3%", "демпфер", "утепление"],
  },
  {
    title: "Терраса и зона барбекю",
    price: "от 3 900 ₽/м²",
    img: "/img/terrace.webp",
    text: "Место для очага, мангала и большого стола. Не боится углей, жира и мебели на ножках.",
    tags: ["графитовый цвет", "встроенные скамьи", "пропитка"],
  },
  {
    title: "Лестницы и подпорные стенки",
    price: "по проекту",
    img: "/img/stairs.webp",
    text: "Для участков с перепадом: террасирование, лестницы, стенки с закладными под свет.",
    tags: ["опалубочный бетон", "расчёт нагрузок", "LED"],
  },
];

export default function Services() {
  const { openLead } = useLead();
  return (
    <section id="services" className="bg-white py-20 md:py-28 px-5 md:px-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">02 / Что мы льём</span>
            <h2 className="mt-4 text-[34px] md:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-ink">
              Весь бетон на участке —<br className="hidden md:block" /> одной бригадой
            </h2>
          </div>
          <p className="text-stone text-[16px] max-w-sm leading-relaxed">
            Цена «под ключ»: подготовка основания, щебень, арматура, заводской бетон, работа и финишная пропитка.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() =>
                openLead({
                  source: `Услуги: ${s.title}`,
                  badge: s.price,
                  title: `Расчёт: ${s.title.toLowerCase()}`,
                  subtitle: "Назовём точную цену после бесплатного замера. Если знаете примерную площадь — укажите, посчитаем сразу по телефону.",
                  cta: "Рассчитать стоимость",
                  fields: ["area", "date", "contactWay"],
                  presetService: s.title,
                })
              }
              className="group text-left bg-concrete border border-line rounded-[24px] p-3 flex flex-col transition-shadow duration-300 hover:shadow-[0_24px_50px_-20px_rgba(18,18,17,0.35)]"
            >
              <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden">
                <img src={asset(s.img)} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.12em] bg-white/90 backdrop-blur text-ink rounded-full px-2.5 py-1">
                  0{i + 1}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-signal text-white text-[13px] font-bold px-3 py-1.5">{s.price}</span>
                <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center transition-all group-hover:bg-signal group-hover:text-white group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
              <div className="px-2 pt-5 pb-3 flex flex-col gap-2.5 flex-1">
                <h3 className="text-[21px] font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="text-[14.5px] text-stone leading-relaxed">{s.text}</p>
                <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/70 border border-line rounded-full px-2.5 py-1 bg-white">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
