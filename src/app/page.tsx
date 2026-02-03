import React from "react";
import Hero from "@/components/Home/Hero";
import Work from "@/components/Home/work";
import TimeLine from "@/components/Home/timeline";
import Portfolio from "@/components/Home/portfolio";
import Upgrade from "@/components/Home/upgrade";
import Perks from "@/components/Home/perks";
import { Metadata } from "next";
import Platform from "@/components/Home/platform";

export const metadata: Metadata = {
  title: "MT Trading – منصة تداول الفوركس والعملات الرقمية بثقة",
  description: "MT Trading – افتح حساب فوركس وعملات رقمية موثق واستفد من توصيات الخبراء وتنفيذ سريع ودعم احترافي مستمر.",
  keywords: "تداول فوركس, عملات رقمية, MT Trading, استثمار, توصيات تداول",

  // يضيف canonical URL لترتيب نتائج البحث
  alternates: {
    canonical: "https://mttrading.netlify.app/",
  },

  // عناصر Open Graph لتحسين المشاركة في فيسبوك وليّنكدإن وغيرها
  openGraph: {
    title: "MT Trading – منصة تداول الفوركس والعملات الرقمية بثقة",
    description: "استثمر بثقة في الفوركس والعملات الرقمية مع MT Trading. تنفيذ سريع، توصيات من الخبراء، ودعم مستمر.",
    url: "https://mttrading.netlify.app/",
    siteName: "MT Trading",
    images: [
      {
        url: "https://mttrading.netlify.app/og-image.jpg", // should be 1200×630
        width: 1200,
        height: 630,
        alt: "MT Trading – تداول الذكاء المالي",
      },
    ],
    type: "website",
  },

  // Twitter card tags
  twitter: {
    card: "summary_large_image",
    title: "MT Trading – منصة تداول الفوركس والعملات الرقمية بثقة",
    description:
      "استثمر بثقة في الفوركس والعملات الرقمية مع MT Trading. تنفيذ سريع، توصيات من الخبراء، ودعم مستمر.",
    images: ["https://mttrading.netlify.app/og-image.jpg"], // should be 1200×630
  },

  // يمكن تحديد لغة المحتوى
  metadataBase: new URL("https://mttrading.netlify.app/"),
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <TimeLine />
      <Portfolio />
      <Upgrade />
      <Perks />
      <Platform />
    </main>
  );
}
