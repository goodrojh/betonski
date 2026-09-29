"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Phone } from "lucide-react";
import { asset, ADDRESS, EMAIL, NAV, PHONE, PHONE_HREF, TELEGRAM_HREF, WHATSAPP_HREF } from "@/lib/site";
import { formatPhone, phoneDigits, submitLead } from "./LeadModal";
import Logo from "./Logo";

const socials = [
  {
    name: "WhatsApp",
    href: WHATSAPP_HREF,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.5c1.9.8 2.6.9 3.6.7a3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: TELEGRAM_HREF,
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.4-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/watch?v=PaJYHqRUQtw",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M23 7s-.3-1.9-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.2 3 12 3 12 3s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5.1 1 7 1 7S.7 9.1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 1.9 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.5 12 21.5 12 21.5s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8 3.6-8 3.5z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://ru.pinterest.com/BETONSKI_2041/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .8-.5 2.1-.8 3.2-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1a4.3 4.3 0 0 0-4.5 4.4c0 .8.3 1.7.7 2.2.1.1.1.2.1.3l-.3 1.1c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z" />
      </svg>
    ),
  },
];

function CallbackForm() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits(phone) < 11) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      await submitLead({ source: "Футер: обратный звонок", phone });
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done")
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 md:mt-10 w-full max-w-[560px] h-16 rounded-full bg-signal text-white flex items-center justify-center gap-2 font-semibold">
        <Check className="w-5 h-5" strokeWidth={3} /> Перезвоним в течение 15 минут
      </motion.div>
    );

  return (
    <form onSubmit={submit} className="mt-8 md:mt-10 w-full max-w-[560px]">
      <div className={"h-16 bg-white/15 backdrop-blur-md rounded-full border flex overflow-hidden p-1.5 " + (state === "error" ? "border-signal" : "border-white/25")}>
        <input
          type="tel"
          inputMode="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onFocus={() => !phone && setPhone("+7")}
          onChange={(e) => {
            setPhone(formatPhone(e.target.value));
            if (state === "error") setState("idle");
          }}
          className="flex-1 min-w-0 bg-transparent px-4 md:px-6 text-[16px] text-white placeholder:text-white/60 outline-none border-none"
          aria-label="Ваш телефон"
        />
        <button className="h-full px-5 md:px-8 bg-signal text-white rounded-full text-[12px] md:text-[13px] font-bold tracking-[0.1em] hover:bg-signal-2 transition-colors whitespace-nowrap flex items-center gap-2">
          {state === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : "ПЕРЕЗВОНИТЕ МНЕ"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-[13px] text-signal text-center">Введите номер полностью</p>}
    </form>
  );
}

export default function Footer() {
  return (
    <section id="contacts" className="w-full bg-concrete pb-24 md:pb-2">
      <div className="m-2 rounded-[20px] overflow-hidden relative min-h-[100svh] md:min-h-[820px] flex flex-col">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${asset("/img/after.webp")}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink/90" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal"
          >
            Сезон бронируется — позвоните сегодня
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
            className="mt-5 text-[40px] sm:text-[56px] md:text-[84px] font-[800] text-white leading-[0.98] tracking-[-0.04em]"
          >
            Позвоните.
            <br />
            <span className="text-white/70">Посчитаем за 5 минут.</span>
          </motion.h2>

          <motion.a
            href={PHONE_HREF}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group mt-8 inline-flex items-center gap-3 md:gap-4 text-white hover:text-signal transition-colors"
          >
            <span className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-signal flex items-center justify-center shrink-0">
              <span className="absolute inset-0 rounded-full bg-signal animate-ping-slow" />
              <Phone className="relative w-5 h-5 md:w-7 md:h-7 text-white" />
            </span>
            <span className="text-[30px] sm:text-[40px] md:text-[56px] font-bold tracking-[-0.03em] whitespace-nowrap">{PHONE}</span>
          </motion.a>
          <p className="mt-3 text-white/60 text-[14px]">Ежедневно 8:00–21:00 · или оставьте номер — перезвоним сами</p>

          <CallbackForm />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[20px] md:rounded-[24px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
            <div className="md:w-[32%]">
              <Logo />
              <p className="mt-4 text-white/60 text-[13px] leading-relaxed max-w-[280px]">
                Подрядчик работ по архитектурному бетону. Дорожки, площадки, крыльца и отмостки для частных домов Екатеринбурга и области.
              </p>
            </div>

            <div className="grid grid-cols-2 md:flex md:gap-16 gap-8">
              <div>
                <h4 className="text-white text-[13px] font-semibold mb-4">Разделы</h4>
                <ul className="space-y-2">
                  {NAV.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-white/60 text-[13px] hover:text-white transition-colors">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[13px] font-semibold mb-4">Контакты</h4>
                <ul className="space-y-2 text-[13px]">
                  <li>
                    <a href={PHONE_HREF} className="text-white hover:text-signal transition-colors font-semibold whitespace-nowrap">
                      {PHONE}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`} className="text-white/60 hover:text-white transition-colors break-all">
                      {EMAIL}
                    </a>
                  </li>
                  <li className="text-white/60 max-w-[200px]">{ADDRESS}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-[12px]">Мы в сети:</span>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-signal hover:border-signal transition-colors"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <span className="text-white/40 text-[12px]">© {new Date().getFullYear()} BETONSKI · Екатеринбург</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
