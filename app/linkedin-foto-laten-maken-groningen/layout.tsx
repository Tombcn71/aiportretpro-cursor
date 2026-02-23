import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Groningen | Direct Online Klaar",
  description:
    "Professionele zakelijke profielfoto laten maken in Groningen? De slimme keuze voor RUG, UMCG en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min voor €19.99.",
  keywords: [
    "LinkedIn profielfoto Groningen",
    "Zakelijke foto Groningen",
    "Profielfoto UMCG medewerker",
    "CV foto Groningen",
    "AI fotograaf Groningen",
  ],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Groningen | Direct Online Klaar",
    description:
      "Professionele zakelijke profielfoto laten maken in Groningen? De slimme keuze voor RUG, UMCG en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min voor €19.99.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-groningen",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Groningen | Direct Online Klaar",
    description:
      "Professionele zakelijke profielfoto laten maken in Groningen? De slimme keuze voor RUG, UMCG en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min voor €19.99.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-groningen",
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

export default function GroningenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
