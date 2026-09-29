export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const PHONE = "+7 000 000 00 00";
export const PHONE_HREF = "tel:+70000000000";
export const WHATSAPP_HREF = "https://wa.me/70000000000";
export const TELEGRAM_HREF = "https://t.me/+70000000000";
export const EMAIL = "beton2041@gmail.com";
export const ADDRESS = "г. Екатеринбург, ул. Радищева, 6А, оф. 214";

export const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Фактуры", href: "#textures" },
  { label: "Как работаем", href: "#process" },
  { label: "Цены", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
];

export const SERVICES = [
  "Дорожки",
  "Площадка под авто",
  "Крыльцо и ступени",
  "Отмостка",
  "Терраса / зона барбекю",
  "Лестницы и подпорные стенки",
  "Пока не знаю — нужна консультация",
];
