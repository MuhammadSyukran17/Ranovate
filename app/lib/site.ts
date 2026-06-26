import { WA_NUMBER } from "./whatsapp";

export const SITE_URL = "https://ranovate.id";

export const SITE_NAME = "Ranovate";

export const SITE_DESCRIPTION =
  "Ranovate adalah software house yang menyediakan jasa desain UI/UX, pengembangan website, otomasi AI, serta konsultasi dan maintenance teknis.";

export const ORG_LOGO = `${SITE_URL}/favicon_io/android-chrome-512x512.png`;

export const SOCIAL_LINKS: string[] = [
  "https://www.instagram.com/ranovate",
  "https://www.linkedin.com/company/ranovate",
  "https://t.me/ranovate",
];

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: ORG_LOGO,
  description: SITE_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${WA_NUMBER}`,
    contactType: "customer service",
    availableLanguage: ["id", "en"],
  },
  ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS } : {}),
} as const;

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "id-ID",
  publisher: { "@id": `${SITE_URL}/#organization` },
} as const;
