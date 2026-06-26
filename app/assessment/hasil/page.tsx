import type { Metadata } from "next";
import AssessmentResult from "../../components/assessment/AssessmentResult";

export const metadata: Metadata = {
  title: "Assessment — Hasil",
  description:
    "Hasil assessment Anda beserta rekomendasi solusi yang paling sesuai dari Ranovate.",
  alternates: {
    canonical: "/assessment/hasil",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AssessmentResultPage() {
  return (
    <main>
      <AssessmentResult />
    </main>
  );
}
