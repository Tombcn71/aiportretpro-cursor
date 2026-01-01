import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Tilburg | AI Portret Pro",
  description: "Professionele zakelijke profielfoto laten maken in Tilburg? Dé oplossing voor Tilburg University professionals en ondernemers in de Spoorzone. Ontvang 40+ AI foto's in 15 min.",
  keywords: ["LinkedIn profielfoto Tilburg", "Zakelijke foto Tilburg", "Tilburg University profielfoto", "Spoorzone Tilburg portret", "AI fotograaf Tilburg", "Logistiek Tilburg headshots"],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Tilburg | AI Portret Pro",
    description: "Professionele zakelijke profielfoto laten maken in Tilburg? Dé oplossing voor Tilburg University professionals en ondernemers in de Spoorzone. Ontvang 40+ AI foto's in 15 min.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-tilburg",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Tilburg | AI Portret Pro",
    description: "Professionele zakelijke profielfoto laten maken in Tilburg? Dé oplossing voor Tilburg University professionals en ondernemers in de Spoorzone. Ontvang 40+ AI foto's in 15 min.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-tilburg",
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

export default function TilburgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
