# BETONSKI — лендинг

Сайт подрядчика по архитектурному бетону (Екатеринбург). Next.js 15 (App Router) + Tailwind CSS 4 + framer-motion + lucide-react, статический экспорт для GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статический сайт в папке out/
```

## Что заменить перед запуском
- `lib/site.ts` — телефон, WhatsApp/Telegram, e-mail, адрес.
- `lib/pricing.ts` и `components/site/Services.tsx`, `Pricing.tsx` — цены (сейчас ориентировочные).
- `components/site/Hero.tsx` (факты), `Works.tsx` (объекты), `BeforeAfter.tsx` — цифры и примеры сейчас демонстрационные.
- Заявки: задайте `NEXT_PUBLIC_LEAD_ENDPOINT` (Formspree, вебхук Telegram-бота, свой API) — формы шлют туда JSON. Без него заявка только пишется в консоль.

Фото сгенерированы в Higgsfield (Nano Banana Pro); исходники пересобираются скриптом `scripts/optimize.mjs`.
