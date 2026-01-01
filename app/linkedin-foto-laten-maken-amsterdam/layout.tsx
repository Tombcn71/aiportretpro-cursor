import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Profielfoto Laten Maken Amsterdam | Binnen 15 Min Klaar",
  description: "Snel een zakelijke profielfoto laten maken in Amsterdam? Geen dure fotostudio nodig. Ontvang 40+ AI profielfoto's voor LinkedIn en CV binnen 15 minuten voor slechts €29.",
  keywords: ["LinkedIn profielfoto Amsterdam", "Zakelijke foto Amsterdam", "Profielfoto Zuidas", "CV foto laten maken Amsterdam", "AI fotograaf Amsterdam"],
  openGraph: {
    title: "LinkedIn Profielfoto Laten Maken Amsterdam | Binnen 15 Min Klaar",
    description: "Snel een zakelijke profielfoto laten maken in Amsterdam? Geen dure fotostudio nodig. Ontvang 40+ AI profielfoto's voor LinkedIn en CV binnen 15 minuten voor slechts €29.",
    url: "https://aiportretpro.nl/linkedin-foto-laten-maken-amsterdam",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profielfoto Laten Maken Amsterdam | Binnen 15 Min Klaar",
    description: "Snel een zakelijke profielfoto laten maken in Amsterdam? Geen dure fotostudio nodig. Ontvang 40+ AI profielfoto's voor LinkedIn en CV binnen 15 minuten voor slechts €29.",
  },
  alternates: {
    canonical: "https://aiportretpro.nl/linkedin-foto-laten-maken-amsterdam",
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

export default function AmsterdamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
