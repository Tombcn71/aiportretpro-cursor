import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Foto Laten Maken Utrecht | Zakelijk Portret AI",
  description: "Professionele LinkedIn profielfoto laten maken in Utrecht? Ontvang 40+ AI headshots binnen 15 min. Dé keuze voor consultancy, Rabobank & Utrecht Science Park professionals.",
  keywords: ["LinkedIn foto Utrecht", "Zakelijke portretfotografie Utrecht", "LinkedIn profielfoto laten maken Utrecht", "AI fotograaf Utrecht", "Profielfoto consultancy Utrecht"],
  openGraph: {
    title: "LinkedIn Foto Laten Maken Utrecht | Zakelijk Portret AI",
    description: "Professionele LinkedIn profielfoto laten maken in Utrecht? Ontvang 40+ AI headshots binnen 15 min. Dé keuze voor consultancy, Rabobank & Utrecht Science Park professionals.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-utrecht",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Foto Laten Maken Utrecht | Zakelijk Portret AI",
    description: "Professionele LinkedIn profielfoto laten maken in Utrecht? Ontvang 40+ AI headshots binnen 15 min. Dé keuze voor consultancy, Rabobank & Utrecht Science Park professionals.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-utrecht",
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

export default function UtrechtLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
