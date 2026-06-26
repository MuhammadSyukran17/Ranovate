import type { Metadata } from "next";
import { Inter, Host_Grotesk, Chivo, Urbanist } from "next/font/google";
import "./globals.css";
import GlobalNav from "./components/GlobalNav";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "./lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  display: "swap",
});

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ranovate",
    default: "Ranovate — Software House",
  },
  description:
    "Ranovate adalah software house yang menyediakan jasa desain UI/UX, pengembangan website, otomasi AI, serta konsultasi dan maintenance teknis.",
  keywords: [
    "software house",
    "jasa pembuatan website",
    "desain UI/UX",
    "AI automation",
    "landing page",
    "company profile",
    "konsultasi IT",
    "Ranovate",
  ],
  metadataBase: new URL("https://ranovate.id"),
  openGraph: {
    title: "Ranovate — Software House",
    description:
      "Jasa desain UI/UX, pengembangan website, otomasi AI, dan konsultasi teknis.",
    url: "https://ranovate.id",
    siteName: "Ranovate",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranovate — Software House",
    description:
      "Jasa desain UI/UX, pengembangan website, otomasi AI, dan konsultasi teknis.",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${hostGrotesk.variable} ${chivo.variable} ${urbanist.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA],
          }}
        />
        <GlobalNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
