import { QUESTIONS } from "./questions";

export type Solution = {
  title: string;
  subtitle: string;
  description: string;
};

const SERVICE_QUESTION = "PERTANYAAN 5";

const DEFAULT_KEY = "website";

export const SOLUTIONS: Record<string, Solution> = {
  "ui-ux": {
    title: "UI/UX Design",
    subtitle: "DESAIN UI/UX",
    description:
      "Berdasarkan jawaban Anda, prioritas utamanya adalah pengalaman pengguna yang matang — antarmuka yang jelas, nyaman, dan enak dipakai. Desain yang tepat membuat produk Anda terasa profesional sejak detik pertama.",
  },
  website: {
    title: "Website",
    subtitle: "WEBSITE DEVELOPMENT",
    description:
      "Berdasarkan jawaban Anda, fondasi yang paling cocok adalah website yang dirancang khusus — cepat, rapi, dan mudah ditemukan di Google. Ini titik awal yang menampilkan kualitas bisnis Anda dengan benar.",
  },
  ai: {
    title: "AI Automation",
    subtitle: "AI AUTOMATION",
    description:
      "Berdasarkan jawaban Anda, solusi yang paling berdampak adalah otomasi berbasis AI — memangkas pekerjaan manual yang berulang agar tim Anda fokus ke hal yang benar-benar penting.",
  },
  konsultasi: {
    title: "Konsultasi",
    subtitle: "KONSULTASI & MAINTENANCE",
    description:
      "Berdasarkan jawaban Anda, langkah paling pas adalah konsultasi dan pendampingan teknis — memastikan sistem yang sudah ada tetap sehat, aman, dan berkembang sesuai kebutuhan bisnis.",
  },
};

export type Answers = Record<string, string[]>;

export function resolveSolution(answers: Answers): Solution {
  const key = answers[SERVICE_QUESTION]?.[0];
  return (key && SOLUTIONS[key]) || SOLUTIONS[DEFAULT_KEY];
}

export type SummaryRow = { label: string; value: string };

export function buildSummary(answers: Answers): SummaryRow[] {
  return QUESTIONS.map((question) => {
    const values = answers[question.code] ?? [];
    const labels = values
      .map((value) => question.options.find((item) => item.value === value)?.label)
      .filter((label): label is string => Boolean(label));
    return { label: question.summaryLabel, value: labels.length > 0 ? labels.join(", ") : "Belum diisi" };
  });
}
