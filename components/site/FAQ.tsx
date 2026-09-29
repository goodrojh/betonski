"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, HardHat, CalendarClock, Wallet, Phone } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/lib/site";
import { useLead } from "./LeadModal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  work: [
    { question: "Бетон не потрескается через пару зим?", answer: "Трещины появляются из-за плохого основания и отсутствия швов. Мы делаем щебёночную подушку 20 см с трамбовкой, армируем сеткой и нарезаем температурные швы — плита «дышит» по швам, а не трескается где попало." },
    { question: "Можно ли заезжать на площадку машиной?", answer: "Да. Площадки под авто делаем толщиной 15 см с двойным армированием — выдерживают внедорожник, газель и даже миксер. Заезжать можно через 7 дней после заливки, полную прочность бетон набирает к 28 дню." },
    { question: "Бетон будет серым и скучным?", answer: "Только если вы этого хотите. Есть цветной бетон с пигментом в массе, мытый бетон с галькой, штамп под камень, солевая фактура, подсветка. Образцы привозим на замер." },
    { question: "Скользко ли зимой?", answer: "Для дорожек и ступеней делаем антискользящую фактуру «метла» или мытый бетон. Они остаются шершавыми даже в гололёд, в отличие от гладкой плитки." },
    { question: "Работаете с плохим грунтом, глиной, перепадами?", answer: "Да, это обычная уральская история. На замере смотрим грунт, при необходимости делаем замену, дренаж и геотекстиль. Перепады решаем ступенями и подпорными стенками." },
  ],
  terms: [
    { question: "Сколько времени занимает работа?", answer: "Дорожка — 2–4 дня, площадка под авто — 3–5 дней, двор под ключ 100–150 м² — около недели. Точный график фиксируем в договоре." },
    { question: "В какой сезон можно заливать?", answer: "Основной сезон — с апреля по октябрь. В холод работаем с противоморозными добавками и прогревом, но для декоративных фактур лучше тёплое время. Записаться на следующий сезон можно заранее — цена фиксируется." },
    { question: "Какая гарантия и что в неё входит?", answer: "До 5 лет письменно в договоре. Если появятся трещины вне швов, отслоения или просадки — устраним за свой счёт." },
    { question: "Нужно ли присутствовать на объекте?", answer: "Нет. Достаточно встретить бригаду в первый день. Каждый вечер присылаем фотоотчёт в мессенджер." },
  ],
  pay: [
    { question: "Сколько стоит замер?", answer: "Замер и 3D-эскиз бесплатные по Екатеринбургу и ближайшим пригородам. Замер ни к чему не обязывает." },
    { question: "Как происходит оплата?", answer: "Аванс на материалы при начале работ, остальное — после приёмки. Принимаем наличные, перевод и безнал для юрлиц." },
    { question: "Может ли цена вырасти в процессе?", answer: "Нет. Цена из сметы фиксируется в договоре. Если вы решите что-то добавить — согласуем отдельно и письменно." },
    { question: "Есть ли скидки?", answer: "При заказе нескольких работ комплексом («двор под ключ») — скидка 7%. Также действует ранняя запись на следующий сезон по текущим ценам." },
  ],
};

const tabs = [
  { id: "work", label: "Работа", icon: HardHat },
  { id: "terms", label: "Сроки и гарантия", icon: CalendarClock },
  { id: "pay", label: "Оплата", icon: Wallet },
];

export default function FAQ() {
  const { openLead } = useLead();
  const [activeTab, setActiveTab] = useState("work");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-[100px] px-5 md:px-[80px]">
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-2">09 / Вопросы</span>
          <h2 className="mt-4 text-[34px] md:text-[52px] font-bold text-ink leading-[1.02] tracking-[-0.03em] mb-3">Спрашивают перед заказом</h2>
          <p className="text-[16px] text-stone">Честные ответы на то, что волнует каждого хозяина дома</p>
        </div>

        <div className="flex justify-start sm:justify-center gap-1 border-b border-line mb-6 overflow-x-auto no-scrollbar -mx-5 px-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-3 text-[15px] cursor-pointer transition-all border-b-2 whitespace-nowrap " +
                (activeTab === tab.id ? "text-ink font-semibold border-signal" : "text-stone font-medium border-transparent")
              }
            >
              <tab.icon className={"w-4 h-4 " + (activeTab === tab.id ? "text-signal-2" : "")} />
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => (
            <div key={activeTab + index} className="border-b border-line py-5">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center gap-4 text-left cursor-pointer" aria-expanded={openIndex === index}>
                <span className="text-[16px] md:text-[17px] font-semibold text-ink">{item.question}</span>
                <span className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors " + (openIndex === index ? "bg-signal text-white" : "bg-concrete text-stone")}>
                  {openIndex === index ? <X size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1 text-[15px] text-stone leading-[1.7] pr-10">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-concrete rounded-[18px] p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 border border-line">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-14 h-14 rounded-2xl bg-ink flex items-center justify-center shrink-0">
              <HardHat className="w-6 h-6 text-signal" />
            </div>
            <div>
              <p className="font-semibold text-[16px] text-ink">Остался вопрос по вашему участку?</p>
              <p className="text-[14px] text-stone">
                Инженер ответит по телефону <a href={PHONE_HREF} className="font-semibold text-ink whitespace-nowrap">{PHONE}</a>
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <a href={PHONE_HREF} aria-label="Позвонить" className="md:hidden h-[52px] w-[52px] shrink-0 rounded-[14px] bg-white border border-line flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() =>
                openLead({
                  source: "FAQ: задать вопрос",
                  title: "Задайте вопрос инженеру",
                  subtitle: "Ответим по делу, без продаж. Можно приложить фото участка — пришлём ссылку на мессенджер.",
                  cta: "Отправить вопрос",
                  fields: ["comment", "contactWay"],
                })
              }
              className="group flex-1 md:flex-none bg-ink text-white rounded-[14px] px-6 h-[52px] text-[15px] font-semibold transition-all hover:bg-ink-3 flex items-center justify-center gap-3"
            >
              Задать вопрос
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M7 7v6a2 2 0 0 0 2 2h9" />
                <path d="m15 11 4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
