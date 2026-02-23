import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Eindhoven | Binnen 15 Min Klaar",
  description:
    "Professionele zakelijke profielfoto laten maken in Eindhoven? De innovatieve keuze voor tech-professionals. Ontvang 40+ AI profielfoto's voor LinkedIn binnen 15 min voor €19.99.",
  keywords: [
    "LinkedIn profielfoto Eindhoven",
    "Zakelijke foto Eindhoven",
    "Profielfoto ASML professional",
    "Strijp-S fotoshoot",
    "AI fotograaf Eindhoven",
  ],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Eindhoven | Binnen 15 Min Klaar",
    description:
      "Professionele zakelijke profielfoto laten maken in Eindhoven? De innovatieve keuze voor tech-professionals. Ontvang 40+ AI profielfoto's voor LinkedIn binnen 15 min voor €19.99.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-eindhoven",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Eindhoven | Binnen 15 Min Klaar",
    description:
      "Professionele zakelijke profielfoto laten maken in Eindhoven? De innovatieve keuze voor tech-professionals. Ontvang 40+ AI profielfoto's voor LinkedIn binnen 15 min voor €19.99.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-eindhoven",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function EindhovenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
