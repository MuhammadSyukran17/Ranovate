import type { Metadata } from "next";
import { Suspense } from "react";
import AssessmentFlow from "../../components/assessment/AssessmentFlow";

export const metadata: Metadata = {
  title: "Assessment — Pertanyaan",
  description:
    "Jawab beberapa pertanyaan singkat agar Ranovate dapat mengarahkan Anda ke solusi yang paling tepat.",
  alternates: {
    canonical: "/assessment/mulai",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AssessmentQuestionPage() {
  return (
    <main>
      <Suspense>
        <AssessmentFlow />
      </Suspense>
    </main>
  );
}
