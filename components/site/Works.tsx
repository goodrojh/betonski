"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { asset } from "@/lib/site";
import { useLead } from "./LeadModal";

// ⚠️ Демо-примеры: замените на реальные объекты компании (фото, посёлок, площадь, сроки).
const works = [
  { img: "/img/hero.webp", title: "Площадка и крыльцо у дома в бору", place: "Берёзовский", area: "118 м²", days: "5 дней", finish: "Графитовый, затирка" },
  { img: "/img/path.webp", title: "Дорожка-«пошаговка» через сосны", place: "Горный Щит", area: "46 м²", days: "3 дня", finish: "Светлый, метла" },
  { img: "/img/terrace.webp", title: "Терраса с очагом за домом", place: "Арамиль", area: "64 м²", days: "4 дня", finish: "Графит, пропитка" },
  { img: "/img/porch.webp", title: "Парящее крыльцо с подсветкой", place: "Екатеринбург", area: "22 м²", days: "6 дней", finish: "Затирка, LED" },
  { img: "/img/parking.webp", title: "Парковка на две машины", place: "Среднеуральск", area: "96 м²", days: "4 дня", finish: "Светлый, швы" },
  { img: "/img/stairs.webp", title: "Лестница и подпорная стенка", place: "Патруши", area: "38 м²", days: "7 дней", finish: "Опалубочный" },
];

export default function Works() {
  const { openLead } = useLead();
  return (
    <section id="works" className="bg-concrete py-20 md:py-28 px-5 md:px-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">08 / Работы</span>
            <h2 className="mt-4 font-bold text-[34px] md:text-[52px] text-ink leading-[1.02] tracking-[-0.03em] m-0">Примеры объектов</h2>
          </div>
          <div className="relative group self-start md:self-end">
            <div className="absolute -bottom-[6px] right-0 w-[120px] h-[24px] bg-[radial-gradient(circle,_rgba(255,106,26,0.55),_rgba(255,106,26,0.15))] blur-[14px] rounded-full -z-0" />
            <button
              onClick={() =>
                openLead({
                  source: "Работы: объекты рядом",
                  badge: "Приезжайте посмотреть",
                  title: "Показать объекты рядом с вами",
                  subtitle: "Подберём готовые работы в вашем районе — можно приехать и потрогать бетон, пообщаться с хозяевами.",
                  cta: "Подобрать объекты",
                  fields: ["comment", "contactWay"],
                })
              }
              className="relative bg-ink text-white rounded-[12px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-ink-3 transition-colors"
            >
              Объекты в моём районе <span className="text-[14px] leading-none">↳</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {works.map((w, i) => (
            <motion.button
              type="button"
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() =>
                openLead({
                  source: `Работы: ${w.title}`,
                  badge: `${w.area} · ${w.days}`,
                  title: "Хочу как на этом объекте",
                  subtitle: `«${w.title}» — ${w.finish.toLowerCase()}. Посчитаем похожее решение для вашего участка.`,
                  cta: "Рассчитать похожий проект",
                  fields: ["area", "contactWay"],
                })
              }
              className="text-left bg-white border border-line rounded-[16px] p-4 md:p-5 flex flex-col cursor-pointer transition-all duration-200 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] group"
            >
              <div className="relative w-full h-[230px] md:h-[240px] rounded-[10px] overflow-hidden mb-[18px]">
                <img src={asset(w.img)} alt={w.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[12px] font-semibold">
                  <MapPin className="w-3 h-3 text-signal-2" /> {w.place}
                </span>
              </div>
              <h3 className="font-bold text-[18px] text-ink leading-[1.3] mb-3">{w.title}</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  ["Площадь", w.area],
                  ["Срок", w.days],
                  ["Фактура", w.finish.split(",")[0]],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-concrete px-2.5 py-2">
                    <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-stone">{k}</div>
                    <div className="text-[13px] font-semibold truncate">{v}</div>
                  </div>
                ))}
              </div>
              <span className="mt-auto text-[14px] font-semibold text-ink inline-flex items-center gap-1.5 group-hover:text-signal-2 transition-colors">
                Хочу так же <span className="text-[16px] leading-none">↳</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
