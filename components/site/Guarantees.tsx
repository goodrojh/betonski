"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileSignature, Wallet, ShieldCheck, Camera } from "lucide-react";

const items = [
  { icon: FileSignature, t: "Договор и фиксированная смета", d: "Цена не растёт «по факту». Все работы и материалы — строками в смете." },
  { icon: Wallet, t: "Оплата по этапам", d: "Аванс на материалы, остальное — после приёмки. Никаких 100% вперёд." },
  { icon: ShieldCheck, t: "Письменная гарантия до 5 лет", d: "Трещины, отслоения, просадки — устраняем за свой счёт." },
  { icon: Camera, t: "Фотоотчёт каждый день", d: "Можно не ездить на участок: всё видно в мессенджере." },
];

export default function Guarantees() {
  return (
    <section className="bg-ink text-white px-5 md:px-10 py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-dark" />
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[24px] overflow-hidden border border-white/10">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-ink p-6 md:p-7 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-signal/15 border border-signal/30 flex items-center justify-center">
                <it.icon className="w-5 h-5 text-signal" />
              </div>
              <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
            </div>
            <h3 className="text-[18px] font-bold tracking-tight leading-snug">{it.t}</h3>
            <p className="text-[14px] text-white/55 leading-relaxed">{it.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
