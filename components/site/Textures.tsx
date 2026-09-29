"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "./LeadModal";

interface Texture {
  id: string;
  name: string;
  description: string;
  img: string;
  where: string;
}

const textures: Texture[] = [
  { id: "trowel", name: "Затирка «вертолётом»", description: "Гладкая плотная поверхность с лёгким облачным рисунком. Современно и строго.", img: "/img/tex-graphite.webp", where: "Площадки, террасы" },
  { id: "broom", name: "Метла", description: "Тонкие параллельные бороздки. Не скользит даже в гололёд.", img: "/img/tex-broom.webp", where: "Дорожки, пандусы" },
  { id: "aggregate", name: "Мытый бетон", description: "Верхний слой смывается — проступает речная галька. Живая, тёплая фактура.", img: "/img/tex-aggregate.webp", where: "Дорожки, зоны отдыха" },
  { id: "stamp", name: "Штамп под камень", description: "Отпечаток натурального сланца с тонировкой. Вид камня — цена бетона.", img: "/img/tex-stamp.webp", where: "Дворы, въезды" },
  { id: "salt", name: "Солевая фактура", description: "Кратеры от крупной соли. Шероховато, тепло, отлично у бассейна.", img: "/img/tex-salt.webp", where: "Бассейны, террасы" },
  { id: "arch", name: "Архитектурный", description: "Бетон с отпечатком опалубки и технологическими отверстиями. Эстетика Тадао Андо.", img: "/img/wall.webp", where: "Стенки, скамьи" },
];

const all = [...textures, ...textures];

export default function Textures() {
  const { openLead } = useLead();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pos = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let id: number;
    const tick = () => {
      if (!paused) {
        pos.current += 0.5;
        if (pos.current >= el.scrollWidth / 2) pos.current = 0;
        el.scrollLeft = pos.current;
      } else {
        pos.current = el.scrollLeft;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [paused]);

  return (
    <section id="textures" className="bg-concrete py-20 md:py-28 overflow-hidden relative grain">
      <div className="max-w-[1300px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">04 / Фактуры</span>
            <h2 className="mt-4 font-bold text-[34px] md:text-5xl text-ink leading-[1.02] tracking-[-0.03em]">
              Бетон бывает разным.
              <br />
              <span className="text-stone">Выберите свой характер.</span>
            </h2>
          </div>
          <button
            onClick={() =>
              openLead({
                source: "Фактуры: образцы",
                badge: "Привезём на замер",
                title: "Посмотреть образцы вживую",
                subtitle: "Инженер привезёт на замер плитки-образцы всех фактур и цветов — выберете при дневном свете на своём участке.",
                cta: "Хочу увидеть образцы",
                fields: ["date", "contactWay"],
              })
            }
            className="rounded-full px-6 py-3 text-sm font-semibold text-white bg-ink hover:bg-ink-3 transition-colors"
          >
            Привезти образцы на замер
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-r from-concrete via-concrete/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-l from-concrete via-concrete/80 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
          className="flex flex-row gap-4 overflow-x-auto pb-4 px-5 no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {all.map((item, index) => (
            <motion.div
              key={item.id + "-" + index}
              whileHover={{ y: -6 }}
              className="min-w-[260px] md:min-w-[300px] bg-white border border-line rounded-[20px] p-3 flex flex-col gap-3 transition-shadow duration-200 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3)]"
            >
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden">
                <img src={asset(item.img)} alt={item.name} className="w-full h-full object-cover" loading="lazy" draggable={false} />
                <span className="absolute top-2.5 left-2.5 font-mono text-[10px] uppercase tracking-[0.1em] bg-ink/75 text-white rounded-full px-2.5 py-1 backdrop-blur">{item.where}</span>
              </div>
              <div className="px-2 pb-2 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-[17px] text-ink">{item.name}</h3>
                <p className="text-[13.5px] text-stone leading-[1.5]">{item.description}</p>
                <button
                  onClick={() =>
                    openLead({
                      source: `Фактура: ${item.name}`,
                      badge: item.name,
                      title: `Хочу фактуру «${item.name}»`,
                      subtitle: "Расскажем, где она будет смотреться лучше всего на вашем участке, и посчитаем стоимость.",
                      cta: "Рассчитать с этой фактурой",
                      fields: ["service", "area", "contactWay"],
                    })
                  }
                  className="mt-auto pt-2 self-start text-[13.5px] font-semibold text-ink hover:text-signal-2 flex items-center gap-1 transition-colors"
                >
                  Рассчитать с этой фактурой <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
