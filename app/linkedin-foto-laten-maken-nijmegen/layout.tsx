import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Nijmegen | AI Portret Pro",
  description: "Professionele zakelijke profielfoto laten maken in Nijmegen? Dé oplossing voor Radboud professionals en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min.",
  keywords: ["LinkedIn profielfoto Nijmegen", "Zakelijke foto Nijmegen", "Radboud Universiteit profielfoto", "Novio Tech Campus headshots", "AI fotograaf Nijmegen"],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Nijmegen | AI Portret Pro",
    description: "Professionele zakelijke profielfoto laten maken in Nijmegen? Dé oplossing voor Radboud professionals en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-nijmegen",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Nijmegen | AI Portret Pro",
    description: "Professionele zakelijke profielfoto laten maken in Nijmegen? Dé oplossing voor Radboud professionals en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-nijmegen",
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

export default function NijmegenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
