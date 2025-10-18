import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Shumskaya Hair — Мастер по наращиванию волос, Молодечно",
  description:
    "Наращивание волос в Молодечно: лёгкие капсулы, не тянут и не сползают. Настя — 15 лет в бьюти-сфере, преподаватель.",
  openGraph: {
    title: "Shumskaya Hair — Мастер по наращиванию волос, Молодечно",
    description:
      "Решим редкие височные зоны и добавим длину за пару часов. Капсулы не тянут и не сползают.",
    url: "https://shumskaya-hair.example.com",
    siteName: "Shumskaya Hair",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-[#faf7f2] text-[#111827] antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: "Shumskaya Hair",
              image: "https://shumskaya-hair.example.com/og.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Молодечно",
                addressCountry: "BY",
              },
              areaServed: ["Молодечно", "Минск", "Минская область"],
              url: "https://shumskaya-hair.example.com",
              sameAs: ["https://instagram.com/shumskaya_hair"],
              telephone: "+375290000000",
              description:
                "Наращивание волос. Лёгкие капсулы, не тянут и не сползают.",
            }),
          }}
        />
      </body>
    </html>
  );
}
