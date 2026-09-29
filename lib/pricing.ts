// Базовые цены «под ключ» (основание + армирование + бетон + работа), ₽/м².
// ⚠️ Ориентировочные значения для демо — замените на актуальный прайс компании.
export const WORK_TYPES = [
  { id: "path", label: "Дорожки", base: 3200, days: [2, 4], img: "/img/path.webp" },
  { id: "parking", label: "Площадка под авто", base: 3600, days: [3, 5], img: "/img/parking.webp" },
  { id: "porch", label: "Крыльцо и ступени", base: 6800, days: [3, 6], img: "/img/porch.webp" },
  { id: "apron", label: "Отмостка", base: 2900, days: [2, 3], img: "/img/apron.webp" },
  { id: "terrace", label: "Терраса", base: 3900, days: [3, 5], img: "/img/terrace.webp" },
] as const;

export const FINISHES = [
  { id: "trowel", label: "Затирка «вертолётом»", k: 1, img: "/img/tex-graphite.webp" },
  { id: "broom", label: "Метла (антискольжение)", k: 1, img: "/img/tex-broom.webp" },
  { id: "salt", label: "Солевая фактура", k: 1.12, img: "/img/tex-salt.webp" },
  { id: "aggregate", label: "Мытый бетон", k: 1.35, img: "/img/tex-aggregate.webp" },
  { id: "stamp", label: "Штамп под камень", k: 1.55, img: "/img/tex-stamp.webp" },
] as const;

export const EXTRAS = [
  { id: "demolition", label: "Демонтаж старого покрытия", perM2: 450 },
  { id: "color", label: "Цветной бетон (пигмент в массе)", perM2: 600 },
  { id: "drain", label: "Водоотвод и лотки", perM2: 350 },
  { id: "light", label: "Подсветка и закладные под свет", fixed: 18000 },
] as const;

export const rub = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n / 100) * 100) + " ₽";
