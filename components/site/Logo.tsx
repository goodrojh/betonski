export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + (dark ? "text-ink" : "text-white")}>
      {/* Знак: срез бетонной плиты с арматурой */}
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
        <rect x="1" y="1" width="24" height="24" rx="6" fill="currentColor" opacity="0.12" />
        <rect x="1" y="1" width="24" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 17h16" stroke="#ff6a1a" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1.6" fill="currentColor" />
        <circle cx="17" cy="10" r="1.6" fill="currentColor" />
      </svg>
      <span className="font-bold tracking-[0.28em] text-[15px] leading-none">BETONSKI</span>
    </span>
  );
}
