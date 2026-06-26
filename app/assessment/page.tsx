import type { Metadata } from "next";
import AssessmentIntroSection from "../components/assessment/AssessmentIntroSection";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema } from "../lib/site";

const DESCRIPTION =
  "Belum yakin mulai dari mana? Jawab beberapa pertanyaan singkat, tidak sampai semenit, dan Ranovate akan mengarahkan Anda ke solusi yang tepat.";

export const metadata: Metadata = {
  title: "Assessment",
  description: DESCRIPTION,
  alternates: {
    canonical: "/assessment",
  },
  openGraph: {
    title: "Assessment | Ranovate",
    description: DESCRIPTION,
    url: "/assessment",
  },
  twitter: {
    title: "Assessment | Ranovate",
    description: DESCRIPTION,
  },
};

export default function AssessmentPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Assessment", path: "/assessment" },
        ])}
      />
      <AssessmentIntroSection />
    </main>
  );
}
