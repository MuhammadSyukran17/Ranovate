export type QuestionOption = {
  value: string;
  label: string;
};

export type SelectionType = "single" | "multiple";

export type Question = {
  code: string;
  selection: SelectionType;
  summaryLabel: string;
  lead: string;
  highlight: string;
  subtitle: string;
  options: QuestionOption[];
};

export const QUESTIONS: Question[] = [
  {
    code: "PERTANYAAN 1",
    selection: "single",
    summaryLabel: "Kondisi",
    lead: "Bagaimana kondisi bisnis ",
    highlight: "Anda saat ini?",
    subtitle: "Supaya kami paham titik awalnya.",
    options: [
      { value: "belum-punya-website", label: "Belum punya website" },
      { value: "perlu-dibenahi", label: "Sudah punya, tapi perlu dibenahi" },
      { value: "butuh-sistem-khusus", label: "Membutuhkan sistem/fitur khusus" },
    ],
  },
  {
    code: "PERTANYAAN 2",
    selection: "multiple",
    summaryLabel: "Tujuan",
    lead: "Apa tujuan utama ",
    highlight: "yang ingin dicapai?",
    subtitle: "Biar arah solusinya pas.",
    options: [
      { value: "tarik-pelanggan", label: "Menarik lebih banyak pelanggan" },
      { value: "kredibilitas", label: "Meningkatkan kredibilitas brand" },
      { value: "otomasi", label: "Mengotomasi pekerjaan manual" },
      { value: "jualan-online", label: "Menjual produk secara online" },
    ],
  },
  {
    code: "PERTANYAAN 3",
    selection: "single",
    summaryLabel: "Waktu mulai",
    lead: "Seberapa cepat Anda ",
    highlight: "ingin mulai?",
    subtitle: "Untuk menyesuaikan prioritas.",
    options: [
      { value: "secepatnya", label: "Secepatnya" },
      { value: "1-3-bulan", label: "Dalam 1–3 bulan" },
      { value: "eksplorasi", label: "Masih tahap eksplorasi" },
    ],
  },
  {
    code: "PERTANYAAN 4",
    selection: "single",
    summaryLabel: "Budget",
    lead: "Berapa kisaran ",
    highlight: "anggaran Anda?",
    subtitle: "Supaya rekomendasi kami realistis.",
    options: [
      { value: "lt-5jt", label: "< Rp5 juta" },
      { value: "5-15jt", label: "Rp5–15 juta" },
      { value: "15-50jt", label: "Rp15–50 juta" },
      { value: "gt-50jt", label: "> Rp50 juta" },
    ],
  },
  {
    code: "PERTANYAAN 5",
    selection: "multiple",
    summaryLabel: "Layanan",
    lead: "Layanan apa yang paling ",
    highlight: "Anda butuhkan?",
    subtitle: "Kami arahkan ke tim yang tepat.",
    options: [
      { value: "ui-ux", label: "Desain UI/UX" },
      { value: "website", label: "Pengembangan website" },
      { value: "ai", label: "Otomasi berbasis AI" },
      { value: "konsultasi", label: "Konsultasi & maintenance" },
    ],
  },
];
