import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "BETONSKI — дорожки, площадки и крыльца из монолитного бетона в Екатеринбурге",
  description:
    "Архитектурный бетон для частного дома: дорожки, площадки под авто, крыльца, отмостки и террасы под ключ. Бесплатный замер, фиксированная смета, гарантия. Екатеринбург и область.",
};

export const viewport: Viewport = {
  themeColor: "#121211",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${interTight.variable} ${jetbrains.variable} antialiased`}>{children}</body>
    </html>
  );
}
