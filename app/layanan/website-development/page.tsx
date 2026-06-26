import type { Metadata } from "next";
import WebsiteHero from "../../components/services/website/WebsiteHero";
import BenefitsSection from "../../components/services/website/BenefitsSection";
import PortfolioShowcaseSection from "../../components/services/website/PortfolioShowcaseSection";
import CtaSection from "../../components/CtaSection";
import JsonLd from "../../components/JsonLd";
import { waHref } from "../../lib/whatsapp";
import { breadcrumbSchema, SITE_URL } from "../../lib/site";

const CONSULT_HREF = waHref([
  "Halo Ranovate,",
  "",
  "Saya tertarik dengan layanan Website Development dan ingin konsultasi gratis untuk kebutuhan website bisnis saya.",
  "",
  "Boleh dibantu untuk diskusi lebih lanjut? Terima kasih.",
]);

const DESCRIPTION =
  "Tingkatkan kredibilitas dan peluang bisnis Anda lewat website yang tepat. Ranovate merancang website yang mencerminkan kualitas bisnis Anda yang sesungguhnya.";

export const metadata: Metadata = {
  title: "Website Development",
  description: DESCRIPTION,
  alternates: {
    canonical: "/layanan/website-development",
  },
  openGraph: {
    title: "Website Development | Ranovate",
    description: DESCRIPTION,
    url: "/layanan/website-development",
  },
  twitter: {
    title: "Website Development | Ranovate",
    description: DESCRIPTION,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development",
  serviceType: "Pengembangan Website",
  description: DESCRIPTION,
  url: `${SITE_URL}/layanan/website-development`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "ID",
};

export default function WebsiteDevelopmentPage() {
  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Website Development", path: "/layanan/website-development" },
        ])}
      />
      <WebsiteHero consultHref={CONSULT_HREF} />
      <BenefitsSection />
      <PortfolioShowcaseSection />
      <CtaSection
        titleLead="Wujudkan website yang benar-benar bekerja "
        titleAccent="untuk bisnis Anda"
        titleWidth={719}
      />
    </main>
  );
}
