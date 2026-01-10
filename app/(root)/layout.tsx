import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Zakelijke Profielfoto Laten Maken (AI) | LinkedIn & CV | AI Portret Pro",
  description:
    "Ontvang exact 40 professionele zakelijke profielfoto's in 15 minuten voor slechts €29. Dé slimme keuze voor je LinkedIn-profiel en CV in 2026.",
  keywords: [
    "zakelijke profielfoto laten maken",
    "profielfoto LinkedIn AI",
    "professionele CV foto",
    "AI profielfoto 2026",
  ],
  alternates: {
    canonical: "https://aiportretpro.nl",
  },
  openGraph: {
    title:
      "Zakelijke Profielfoto Laten Maken (AI) | LinkedIn & CV | AI Portret Pro",
    description:
      "Ontvang exact 40 professionele zakelijke profielfoto's in 15 minuten voor slechts €29. Dé slimme keuze voor je LinkedIn-profiel en CV in 2026.",
    url: "https://aiportretpro.nl",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Zakelijke Profielfoto Laten Maken (AI) | LinkedIn & CV | AI Portret Pro",
    description:
      "Ontvang exact 40 professionele zakelijke profielfoto's in 15 minuten voor slechts €29. Dé slimme keuze voor je LinkedIn-profiel en CV in 2026.",
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

export default function RootPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
