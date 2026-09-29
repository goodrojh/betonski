"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Check, ArrowRight, Loader2, MessageCircle, Send, ShieldCheck, Clock } from "lucide-react";
import { PHONE, PHONE_HREF, SERVICES } from "@/lib/site";

export type LeadField = "service" | "area" | "date" | "comment" | "contactWay";

export interface LeadConfig {
  /** Откуда пришла заявка — уходит вместе с формой, чтобы менеджер понимал контекст */
  source: string;
  title: string;
  subtitle?: string;
  cta?: string;
  fields?: LeadField[];
  presetService?: string;
  /** Готовая сводка (например, из калькулятора) — показывается в форме и отправляется */
  summary?: { label: string; value: string }[];
  badge?: string;
}

interface Ctx {
  openLead: (cfg: LeadConfig) => void;
}

const LeadContext = createContext<Ctx | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside <LeadProvider>");
  return ctx;
}

export function formatPhone(input: string) {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("8") || d.startsWith("7")) d = d.slice(1);
  d = d.slice(0, 10);
  let out = "+7";
  if (d.length > 0) out += " (" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

export const phoneDigits = (v: string) => v.replace(/\D/g, "").length;

/**
 * Отправка заявки. Если задан NEXT_PUBLIC_LEAD_ENDPOINT (Formspree, свой API, вебхук Telegram-бота и т.п.) —
 * шлём туда JSON. Без него заявка только логируется, чтобы демо работало.
 */
export async function submitLead(payload: Record<string, unknown>) {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("lead failed");
    return;
  }
  console.info("[lead]", payload);
  await new Promise((r) => setTimeout(r, 900));
}

const contactWays = [
  { id: "call", label: "Звонок", icon: Phone },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "telegram", label: "Telegram", icon: Send },
];

function LeadForm({ cfg, onClose }: { cfg: LeadConfig; onClose: () => void }) {
  const fields = cfg.fields ?? ["contactWay"];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(cfg.presetService ?? "");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [way, setWay] = useState("call");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => phoneRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits(phone) < 11) {
      setError("Введите номер полностью — перезвоним именно на него");
      phoneRef.current?.focus();
      return;
    }
    setError("");
    setState("sending");
    try {
      await submitLead({
        source: cfg.source,
        name,
        phone,
        service,
        area,
        date,
        comment,
        contactWay: way,
        summary: cfg.summary,
        page: typeof window !== "undefined" ? window.location.href : "",
      });
      setState("done");
    } catch {
      setState("idle");
      setError("Не получилось отправить. Позвоните нам: " + PHONE);
    }
  };

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-6">
        <div className="relative mb-6">
          <span className="absolute inset-0 rounded-2xl bg-signal/40 animate-ping-slow" />
          <div className="relative w-16 h-16 rounded-2xl bg-signal flex items-center justify-center">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Заявка принята{name ? `, ${name}` : ""}!</h3>
        <p className="mt-3 text-stone max-w-[360px] leading-relaxed">
          Инженер свяжется с вами в течение 15 минут в рабочее время
          {way === "whatsapp" ? " в WhatsApp" : way === "telegram" ? " в Telegram" : ""}. Не хотите ждать?
        </p>
        <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 font-semibold hover:bg-ink-3 transition-colors">
          <Phone className="w-4 h-4" /> {PHONE}
        </a>
        <button onClick={onClose} className="mt-4 text-sm text-stone hover:text-ink transition-colors">
          Вернуться на сайт
        </button>
      </motion.div>
    );
  }

  const input =
    "w-full h-13 rounded-2xl bg-concrete border border-line px-4 text-[16px] text-ink placeholder:text-stone-2 outline-none focus:border-ink focus:bg-white transition-colors";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      {cfg.summary && cfg.summary.length > 0 && (
        <div className="rounded-2xl bg-ink text-white p-4 mb-1 grid grid-cols-2 gap-x-4 gap-y-2">
          {cfg.summary.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">{s.label}</div>
              <div className="text-sm font-semibold truncate">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className={input} placeholder="Как к вам обращаться" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" aria-label="Имя" />
        <input
          ref={phoneRef}
          className={input + (error ? " border-signal" : "")}
          placeholder="+7 (___) ___-__-__"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          onFocus={() => !phone && setPhone("+7")}
          aria-label="Телефон"
          required
        />
      </div>

      {fields.includes("service") && (
        <select className={input + " appearance-none cursor-pointer"} value={service} onChange={(e) => setService(e.target.value)} aria-label="Что нужно сделать">
          <option value="">Что нужно сделать?</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {(fields.includes("area") || fields.includes("date")) && (
        <div className={"grid gap-3 " + (fields.includes("area") && fields.includes("date") ? "grid-cols-2" : "grid-cols-1")}>
          {fields.includes("area") && (
            <input className={input} placeholder="Площадь, м²" inputMode="numeric" value={area} onChange={(e) => setArea(e.target.value.replace(/[^\d.,]/g, ""))} aria-label="Площадь" />
          )}
          {fields.includes("date") && (
            <select className={input + " appearance-none cursor-pointer"} value={date} onChange={(e) => setDate(e.target.value)} aria-label="Когда удобно">
              <option value="">Когда начать?</option>
              <option>Как можно скорее</option>
              <option>В течение месяца</option>
              <option>Следующий сезон</option>
              <option>Пока присматриваюсь</option>
            </select>
          )}
        </div>
      )}

      {fields.includes("comment") && (
        <textarea
          className={input + " h-24 py-3 resize-none"}
          placeholder="Ваш вопрос или пара слов об участке"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-label="Комментарий"
        />
      )}

      {fields.includes("contactWay") && (
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone mb-2">Как удобнее связаться</div>
          <div className="grid grid-cols-3 gap-2">
            {contactWays.map((w) => (
              <button
                type="button"
                key={w.id}
                onClick={() => setWay(w.id)}
                className={
                  "h-11 rounded-xl border text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all " +
                  (way === w.id ? "bg-ink text-white border-ink" : "bg-white text-ink border-line hover:border-ink")
                }
              >
                <w.icon className="w-3.5 h-3.5" />
                {w.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-[13px] text-signal-2 font-medium">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-2 h-14 rounded-2xl bg-signal text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-signal-2 transition-colors shadow-[0_12px_30px_-8px_rgba(255,106,26,0.6)] disabled:opacity-70"
      >
        {state === "sending" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {cfg.cta ?? "Отправить заявку"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-stone mt-1">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Ответим за 15 минут
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Без спама и навязчивых звонков
        </span>
      </div>
      <p className="text-[11px] text-stone-2 text-center leading-snug">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<LeadConfig | null>(null);
  const [key, setKey] = useState(0);

  const openLead = useCallback((c: LeadConfig) => {
    setCfg(c);
    setKey((k) => k + 1);
  }, []);
  const close = useCallback(() => setCfg(null), []);

  useEffect(() => {
    if (!cfg) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [cfg, close]);

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      <AnimatePresence>
        {cfg && (
          <motion.div
            key={key}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={cfg.title}
          >
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={close} />
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full sm:max-w-[520px] max-h-[94dvh] overflow-y-auto no-scrollbar bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl"
            >
              {/* Полоса «строительной ленты» */}
              <div className="h-2 w-full bg-[repeating-linear-gradient(135deg,#ff6a1a_0_14px,#121211_14px_28px)] sm:rounded-t-[28px]" />
              <div className="sm:hidden mx-auto mt-2 h-1 w-10 rounded-full bg-line" />
              <button
                onClick={close}
                aria-label="Закрыть"
                className="absolute top-5 right-4 w-10 h-10 rounded-full bg-concrete hover:bg-concrete-2 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-7 sm:pb-8">
                {cfg.badge && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-signal/10 text-signal-2 font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                    {cfg.badge}
                  </span>
                )}
                <h2 className="text-[26px] sm:text-[30px] font-bold leading-[1.08] tracking-[-0.02em] pr-10">{cfg.title}</h2>
                {cfg.subtitle && <p className="mt-2.5 text-[15px] text-stone leading-relaxed">{cfg.subtitle}</p>}
                <div className="mt-6">
                  <LeadForm cfg={cfg} onClose={close} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadContext.Provider>
  );
}
