import HeroSection from "./components/HeroSection";
import FlowSection from "./components/FlowSection";
import PortfolioSection from "./components/PortfolioSection";
import PrinciplesSection from "./components/PrinciplesSection";
import ServicesSection from "./components/ServicesSection";
import TechnologySection from "./components/TechnologySection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import JsonLd from "./components/JsonLd";
import { FAQ_ITEMS } from "./lib/faq";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <main>
      <JsonLd data={faqSchema} />
      <HeroSection />
      <FlowSection />
      <PortfolioSection />
      <PrinciplesSection />
      <ServicesSection />
      <TechnologySection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
