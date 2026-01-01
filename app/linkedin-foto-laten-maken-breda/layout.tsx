import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Breda | Binnen 15 Min Klaar",
  description: "Professionele zakelijke profielfoto laten maken in Breda? Geen fotostudio nodig. Ontvang 40+ AI profielfoto's voor LinkedIn en CV binnen 15 minuten voor slechts €29.",
  keywords: ["LinkedIn profielfoto Breda", "Zakelijke foto Breda", "Profielfoto Brabant", "CV foto laten maken Breda", "AI fotograaf Breda"],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Breda | Binnen 15 Min Klaar",
    description: "Professionele zakelijke profielfoto laten maken in Breda? Geen fotostudio nodig. Ontvang 40+ AI profielfoto's voor LinkedIn en CV binnen 15 minuten voor slechts €29.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-breda",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Breda | Binnen 15 Min Klaar",
    description: "Professionele zakelijke profielfoto laten maken in Breda? Geen fotostudio nodig. Ontvang 40+ AI profielfoto's voor LinkedIn en CV binnen 15 minuten voor slechts €29.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-breda",
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
}

export default function BredaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
