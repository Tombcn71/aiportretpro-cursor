import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Den Haag | Binnen 15 Min Klaar",
  description: "Professionele zakelijke profielfoto laten maken in Den Haag? Ideaal voor overheid, juridisch en internationaal. Ontvang 40+ AI profielfoto's binnen 15 minuten voor €29.",
  keywords: ["LinkedIn profielfoto Den Haag", "Zakelijke foto Den Haag", "Profielfoto overheid", "CV foto laten maken Den Haag", "AI fotograaf Den Haag"],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Den Haag | Binnen 15 Min Klaar",
    description: "Professionele zakelijke profielfoto laten maken in Den Haag? Ideaal voor overheid, juridisch en internationaal. Ontvang 40+ AI profielfoto's binnen 15 minuten voor €29.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-den-haag",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Den Haag | Binnen 15 Min Klaar",
    description: "Professionele zakelijke profielfoto laten maken in Den Haag? Ideaal voor overheid, juridisch en internationaal. Ontvang 40+ AI profielfoto's binnen 15 minuten voor €29.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-den-haag",
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

export default function DenHaagLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
