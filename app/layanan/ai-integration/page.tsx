import type { Metadata } from "next";
import WebsiteHero from "../../components/services/website/WebsiteHero";
import BenefitsSection, { type Benefit } from "../../components/services/website/BenefitsSection";
import PortfolioShowcaseSection from "../../components/services/website/PortfolioShowcaseSection";
import CtaSection from "../../components/CtaSection";
import JsonLd from "../../components/JsonLd";
import { waHref } from "../../lib/whatsapp";
import { breadcrumbSchema, SITE_URL } from "../../lib/site";

const CONSULT_HREF = waHref([
  "Halo Ranovate,",
  "",
  "Saya tertarik dengan layanan AI Integration dan ingin konsultasi gratis untuk mengintegrasikan AI ke dalam operasional bisnis saya.",
  "",
  "Boleh dibantu untuk diskusi lebih lanjut? Terima kasih.",
]);

const DESCRIPTION =
  "Tingkatkan cara kerja bisnis Anda dengan AI yang tepat. Ranovate mengintegrasikan AI yang benar-benar sesuai dengan kebutuhan operasional bisnis Anda.";

export const metadata: Metadata = {
  title: "AI Integration",
  description: DESCRIPTION,
  alternates: {
    canonical: "/layanan/ai-integration",
  },
  openGraph: {
    title: "AI Integration | Ranovate",
    description: DESCRIPTION,
    url: "/layanan/ai-integration",
  },
  twitter: {
    title: "AI Integration | Ranovate",
    description: DESCRIPTION,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Integration",
  serviceType: "Integrasi & Otomasi AI",
  description: DESCRIPTION,
  url: `${SITE_URL}/layanan/ai-integration`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "ID",
};

const ICONS = "/images/services/website/benefits/icons";
const BG = "/images/services/website/benefits";

const AI_BENEFITS: Benefit[] = [
  {
    icon: `${ICONS}/main-1.svg`,
    bg: `${BG}/bg-1.png`,
    tags: [
      { label: "AI Readiness Assessment", icon: `${ICONS}/prd.svg` },
      { label: "Implementation Roadmap", icon: `${ICONS}/meta.svg` },
    ],
    title: "Kesiapan bisnis Anda untuk AI terpetakan dengan jelas",
    desc: "Sebelum kami mengintegrasikan apapun, kami lakukan assessment mendalam yang terdokumentasi dalam AI Readiness Assessment dan Implementation Roadmap.",
  },
  {
    icon: `${ICONS}/main-2.svg`,
    bg: `${BG}/bg-2.png`,
    tags: [
      { label: "Business Process Automation", icon: `${ICONS}/cms.svg` },
      { label: "Workflow Intelligence", icon: `${ICONS}/futureready.svg` },
    ],
    title: "Proses yang paling menyita waktu tim Anda berjalan otomatis",
    desc: "Kami identifikasi dulu proses mana yang paling berdampak, baru kami bangun solusinya. Tim Anda fokus pada hal yang benar-benar membutuhkan manusia.",
  },
  {
    icon: `${ICONS}/main-3.svg`,
    bg: `${BG}/bg-3.png`,
    tags: [
      { label: "AI Chatbot", icon: `${ICONS}/support.svg` },
      { label: "Virtual Assistant", icon: `${ICONS}/training.svg` },
      { label: "Omnichannel Integration", icon: `${ICONS}/crossbrowser.svg` },
    ],
    title: "Pertanyaan pelanggan terjawab kapan saja, tanpa menambah beban tim",
    desc: "AI Chatbot yang memahami konteks bisnis Anda secara spesifik, bukan chatbot generik yang tidak tahu cara kerja bisnis Anda.",
  },
  {
    icon: `${ICONS}/main-4.svg`,
    bg: `${BG}/bg-4.png`,
    tags: [
      { label: "AI-powered Reporting", icon: `${ICONS}/seo.svg` },
      { label: "Data Processing", icon: `${ICONS}/pagespeed.svg` },
      { label: "Business Intelligence", icon: `${ICONS}/meta.svg` },
    ],
    title: "Data bisnis Anda berbicara sendiri, tanpa perlu diolah manual",
    desc: "Laporan yang dulu butuh waktu berjam-jam kini tersaji otomatis dan siap dipakai untuk keputusan yang lebih cepat dan tepat.",
  },
  {
    icon: `${ICONS}/main-5.svg`,
    bg: `${BG}/bg-1.png`,
    tags: [
      { label: "Document Processing", icon: `${ICONS}/uiux.svg` },
      { label: "Data Extraction", icon: `${ICONS}/brand.svg` },
      { label: "Classification", icon: `${ICONS}/typography.svg` },
    ],
    title: "Dokumen bisnis Anda diproses secara otomatis dan akurat",
    desc: "Invoice, kontrak, atau dokumen apapun diproses AI tanpa input manual, lebih cepat dan lebih minim kesalahan.",
  },
  {
    icon: `${ICONS}/main-4.svg`,
    bg: `${BG}/bg-5.png`,
    tags: [
      { label: "Post-integration Support", icon: `${ICONS}/support.svg` },
      { label: "Performance Monitoring", icon: `${ICONS}/maintenance.svg` },
      { label: "Continuous Improvement", icon: `${ICONS}/futureready.svg` },
    ],
    title: "Kami tetap hadir setelah AI Anda digunakan",
    desc: "Integrasi bukan akhir dari tanggung jawab kami. Kami dampingi sampai AI yang diintegrasikan benar-benar bekerja dan memberikan dampak nyata untuk bisnis Anda.",
  },
];

export default function AiIntegrationPage() {
  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "AI Integration", path: "/layanan/ai-integration" },
        ])}
      />
      <WebsiteHero
        consultHref={CONSULT_HREF}
        badge="AI Integration"
        titleLead="Tingkatkan cara kerja bisnis Anda dengan "
        titleAccent="AI yang tepat"
        subtitle="Dari bisnis yang baru memulai perjalanan AI hingga yang ingin membawanya lebih jauh, kami rancang solusi yang benar-benar sesuai dengan kebutuhan Anda."
      />
      <BenefitsSection
        titleLead="Bukan AI yang paling canggih, "
        titleAccent="Tapi yang paling tepat untuk bisnis Anda"
        subtitle="Solusi yang kami integrasikan dirancang khusus untuk kebutuhan bisnis Anda, bukan paket yang sama untuk semua orang."
        benefits={AI_BENEFITS}
      />
      <PortfolioShowcaseSection />
      <CtaSection
        titleLead="Wujudkan operasional bisnis yang lebih cerdas dengan "
        titleAccent="AI yang tepat"
        titleWidth={719}
      />
    </main>
  );
}
