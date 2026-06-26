import type { Metadata } from "next";
import AboutIntroSection from "../components/about/AboutIntroSection";
import AboutStorySection from "../components/about/AboutStorySection";
import PrinciplesSection from "../components/PrinciplesSection";
import FaqSection from "../components/FaqSection";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema } from "../lib/site";

const DESCRIPTION =
  "Kenalan dengan Ranovate. Dua kata yang lahir menjadi satu nama dan satu komitmen: membarui cara bisnis bekerja dengan inovasi yang benar-benar bisa diandalkan.";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Tentang Kami | Ranovate",
    description: DESCRIPTION,
    url: "/about",
  },
  twitter: {
    title: "Tentang Kami | Ranovate",
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Tentang Kami", path: "/about" },
        ])}
      />
      <AboutIntroSection />
      <AboutStorySection />
      <PrinciplesSection />
      <FaqSection />
    </main>
  );
}
