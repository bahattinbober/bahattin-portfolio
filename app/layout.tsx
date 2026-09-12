import type { Metadata } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import ParticleField from "@/components/cursor/ParticleField";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bahattinbober.com"),
  title: "Bahattin Böber — Full-Stack & AI/ML Mühendisi",
  description:
    "Bahattin Böber'in portfolyosu: gerçek proje fotoğrafları, canlı GitHub verisi ve gerçek zamanlı performans kanıtıyla anlatılan bir mühendislik hikâyesi.",
  openGraph: {
    title: "Bahattin Böber — Full-Stack & AI/ML Mühendisi",
    description:
      "Gerçek proje fotoğrafları, canlı GitHub verisi ve gerçek zamanlı performans kanıtıyla anlatılan bir mühendislik hikâyesi.",
    url: "https://bahattinbober.com",
    siteName: "Bahattin Böber",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${unbounded.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <ParticleField />
        {children}
      </body>
    </html>
  );
}
