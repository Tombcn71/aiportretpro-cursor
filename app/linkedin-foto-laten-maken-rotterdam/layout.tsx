import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Rotterdam | Direct Online Klaar",
  description: "Professionele zakelijke profielfoto laten maken in Rotterdam? Dé no-nonsense oplossing voor havenprofessionals en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min.",
  keywords: ["LinkedIn profielfoto Rotterdam", "Zakelijke foto Rotterdam", "Havenprofessional profielfoto", "Kop van Zuid zakelijke portretten", "AI fotograaf Rotterdam"],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Rotterdam | Direct Online Klaar",
    description: "Professionele zakelijke profielfoto laten maken in Rotterdam? Dé no-nonsense oplossing voor havenprofessionals en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-rotterdam",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Rotterdam | Direct Online Klaar",
    description: "Professionele zakelijke profielfoto laten maken in Rotterdam? Dé no-nonsense oplossing voor havenprofessionals en ondernemers. Ontvang 40+ AI LinkedIn foto's binnen 15 min.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-rotterdam",
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

export default function RotterdamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
