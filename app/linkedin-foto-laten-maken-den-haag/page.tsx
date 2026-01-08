"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, ChevronDown, ChevronUp, Shield, Check, LinkedinIcon } from "lucide-react"
import Header from "@/components/header"
import { Facebook, Instagram } from "lucide-react"
import ReviewsEnVoorbeelden from "@/components/reviews-en-voorbeelden"
import SchemaMarkup from "@/components/schema-markup"
import SEOContentBlock from "@/components/seo-content-block"
import ReviewSchema from "@/components/review-schema"
import FAQSchema from "@/components/faq-schema"
import Breadcrumb from "@/components/breadcrumb"
import HowItWorks from "@/components/how-it-works"

// Gallery photos: All images from the shoot folder (1.png through 26.png)
const galleryPhotos = Array.from({ length: 26 }, (_, i) => `/images/shoot/${i + 1}.png`)

const companies = [
  { name: "Microsoft", logo: "/placeholder.svg?height=40&width=120&text=Microsoft" },
  { name: "Google", logo: "/placeholder.svg?height=40&width=120&text=Google" },
  { name: "Apple", logo: "/placeholder.svg?height=40&width=120&text=Apple" },
  { name: "Amazon", logo: "/placeholder.svg?height=40&width=120&text=Amazon" },
  { name: "Meta", logo: "/placeholder.svg?height=40&width=120&text=Meta" },
  { name: "Netflix", logo: "/placeholder.svg?height=40&width=120&text=Netflix" },
  { name: "Tesla", logo: "/placeholder.svg?height=40&width=120&text=Tesla" },
  { name: "Spotify", logo: "/placeholder.svg?height=40&width=120&text=Spotify" },
]

// LinkedIn-specific FAQ data with SEO keywords
// Den Haag-specific FAQ data
const faqData = [
  {
    question: "Waarom zijn AI LinkedIn foto's een goede keuze voor Hagenaars?",
    answer:
      "Den Haag is de regeringsstad met meer dan 280.000 LinkedIn professionals in overheid, internationale organisaties, en juridische sector. Als centrum van politiek en diplomatie is een professionele uitstraling essentieel. Onze AI service voor €29 biedt dezelfde kwaliteit als dure Haagse fotostudio's (€150-€400) maar dan sneller en betaalbaarder.",
  },
  {
    question: "Wat maakt een perfecte LinkedIn profielfoto?",
    answer:
      "De perfecte LinkedIn profielfoto is professioneel, helder en vertrouwenwekkend. Key elementen zijn: gezicht vult 60% van de foto, professionele kleding, neutrale achtergrond, natuurlijke glimlach, en goede belichting. Onze AI genereert automatisch LinkedIn-geoptimaliseerde foto's die voldoen aan alle LinkedIn richtlijnen en best practices.",
  },
  {
    question: "Passen AI LinkedIn foto's bij de formele Haagse zakelijke cultuur?",
    answer:
      "Absoluut! Den Haag staat bekend om zijn professionele, formele zakelijke omgeving. Onze AI LinkedIn foto's zijn perfect geschikt voor deze context - strak, professioneel, en betrouwbaar. Of je nu werkt bij een ministerie, internationale organisatie, of advocatenkantoor - onze foto's maken de juiste indruk.",
  },
  {
    question: "Hoeveel LinkedIn foto's krijg ik en hoe snel zijn ze klaar?",
    answer:
      "Je ontvangt 40 verschillende professionele LinkedIn profielfoto variaties binnen 15 minuten. Alle foto's zijn geoptimaliseerd voor LinkedIn's specificaties (minimaal 400x400 pixels) en perfect bruikbaar voor je LinkedIn profiel, website, email handtekening en andere professionele doeleinden.",
  },
  {
    question: "Zijn de AI-gegenereerde LinkedIn foto's even professioneel als studio foto's?",
    answer:
      "Absoluut! Onze AI is gespecialiseerd in het creëren van studio-kwaliteit LinkedIn profielfoto's. Ze zijn onherkenbaar van traditionele fotograaf foto's maar dan 6 x goedkoper en binnen 15 minuten klaar. Perfect voor professionals die snel een professionele LinkedIn foto nodig hebben zonder de hoge kosten van een fotostudio.",
  },
  {
    question: "Voldoen de foto's aan alle LinkedIn richtlijnen en specificaties?",
    answer:
      "Ja, alle LinkedIn foto's voldoen volledig aan LinkedIn's community richtlijnen en technische specificaties. Ze zijn professioneel, passend gekleed, en geoptimaliseerd voor maximale impact op het LinkedIn platform. Je kunt ze direct uploaden als LinkedIn profielfoto zonder zorgen over policy violations.",
  },
  {
    question: "Kan ik de LinkedIn foto's ook gebruiken voor andere professionele doeleinden?",
    answer:
      "Zeker! Hoewel geoptimaliseerd voor LinkedIn, zijn alle foto's perfect bruikbaar voor je zakelijke website, email handtekening, corporate presentaties, persberichten, en andere professionele toepassingen. Je hebt volledige commerciële rechten op alle foto's.",
  }
]

const LocalDenHaagSEO = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "AI Portret Pro - LinkedIn Profielfoto Den Haag",
        "image": "https://aiportretpro.nl/images/logo-icon.png",
        "@id": "https://aiportretpro.nl/linkedin-foto-laten-maken-den-haag#service",
        "url": "https://aiportretpro.nl/linkedin-foto-laten-maken-den-haag",
        "description": "Online service voor het laten maken van 40 professionele LinkedIn profielfoto's in Den Haag met AI. Binnen 15 minuten klaar voor slechts €29. Perfect voor overheid, internationale organisaties en juridische sector.",
        "priceRange": "€29",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Den Haag",
          "addressCountry": "NL"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Internationale Zone" },
          { "@type": "AdministrativeArea", "name": "Beatrixkwartier" },
          { "@type": "AdministrativeArea", "name": "Scheveningen" },
          { "@type": "AdministrativeArea", "name": "Ypenburg" },
          {
            "@type": "City",
            "name": "Den Haag",
            "sameAs": "https://www.wikidata.org/wiki/Q36600"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1200",
          "bestRating": "5",
          "worstRating": "1"
        },
        "knowsAbout": ["LinkedIn profielfoto Den Haag", "Zakelijke foto overheid", "Corporate headshots Den Haag", "AI business headshots"]
      })
    }}
  />
);

export default function LinkedInDenHaagPage() {
  const [isClient, setIsClient] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
    // Return undefined (no cleanup function needed)
    return undefined
  }, [])

  useEffect(() => {
    setIsClient(true)
    // Return undefined (no cleanup function needed)
    return undefined
  }, [])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen pt-20">
      <LocalDenHaagSEO />
      <ReviewSchema businessName="AI Portret Pro" city="Den Haag" />
      <FAQSchema faqs={faqData} city="Den Haag" />
            <SchemaMarkup type="city" city="Den Haag" url="https://aiportretpro.com/linkedin-foto-laten-maken-den-haag" />
      <Header />

      {/* Hero Section - Den Haag Specific */}
      <section className="container mx-auto px-4 py-6 text-center">
        {/* Stars and Trust Badge */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm md:text-base font-semibold text-gray-900">4.6/5</span>
          </div>
        </div>
        
        <h1 className="tracking-tight text-3xl md:text-4xl font-bold mb-6 leading-tight">
          <span className="inline md:block">Zakelijke linkedin profielfoto laten maken in Den Haag, </span>
          <span className="text-[#0077B5] inline md:block">zonder gedoe van een fotoshoot</span>
        </h1>
        <p className="hidden md:block text-gray-500 text-lg md:text-xl mb-6">
          Upload een paar selfies en onze AI doet de rest. Ontvang binnen 15 minuten 40 professionele foto's
        </p>

        <div className="text-md md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-center">
          <div className="inline-grid grid-cols-[auto_1fr] gap-x-2 items-start text-start justify-center">
            <span className="text-center text-xl md:text-2xl">🏷️</span>
            <span>6x goedkoper dan een fotograaf</span>
            <span className="text-center text-xl md:text-2xl">✨</span>
            <span>100% online, direct beginnen</span>
            <span className="text-center text-xl md:text-2xl">⏱️</span>
            <span>Foto's hebben binnen 15 minuten</span>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className=" bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 md:px-10 py-8 md:py-8 text-base md:text-lg mb-3 md:max-w-sm"
        >
          <Link href="/login?callbackUrl=/payment">
            <LinkedinIcon className="mr-2 h-5 md:h-6 w-5 md:w-6" />
            Start jouw fotoshoot nu - € 29 <ArrowRight className="ml-2 h-6 md:h-7 w-6 md:w-7" />
          </Link>
        </Button>

        {/* Trust Shield */}
        <div className="flex items-center justify-center gap-2 text-[#0077B5] font-medium text-sm mb-8">
          <div className="relative">
            <Shield className="h-5 w-5 fill-current text-[#0077B5]" />
            <Check className="h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
          </div>
          <span>14-DAGEN GELD TERUG GARANTIE</span>
        </div>
      </section>

      {/* Photo Carousel - FIXED: Smooth continuous scrolling */}
      <section className="w-full overflow-hidden mb-16 md:mb-24 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="relative">
          <div className="carousel-container">
            <div className="carousel-track">
              {galleryPhotos.map((photo, index) => (
                <div key={`carousel-${index}`} className="carousel-item">
                  <div className="relative">
                    <div className="w-52 h-[13.33rem] md:w-80 md:h-[20rem] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shadow-md md:shadow-lg">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt="Zakelijke LinkedIn profielfoto Den Haag professional overheid Beatrixkwartier"
                        width={320}
                        height={400}
                        className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                        priority={index < 10}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate items for seamless looping */}
              {galleryPhotos.map((photo, index) => (
                <div key={`carousel-dup-${index}`} className="carousel-item">
                  <div className="relative">
                    <div className="w-52 h-[13.33rem] md:w-80 md:h-[20rem] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shadow-md md:shadow-lg">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt="Zakelijke LinkedIn profielfoto Den Haag professional overheid Beatrixkwartier"
                        width={320}
                        height={400}
                        className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Reviews en Voorbeelden */}
      <ReviewsEnVoorbeelden />
     
      {/* Comparison Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 max-w-3xl mx-auto">
            Waarom €200+ betalen voor een middag in een studio?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Traditional Photographer */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">❌</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">De traditionele fotograaf</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Prijs:</span>
                  <span className="text-gray-600">Vaak tussen de €150 en €350.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Tijd:</span>
                  <span className="text-gray-600">Afspraak plannen, reistijd en een uur poseren.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Geduld:</span>
                  <span className="text-gray-600">1 tot 2 weken wachten op de nabewerking.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Resultaat:</span>
                  <span className="text-gray-600">Slechts 3 tot 5 foto's inbegrepen (bijbetalen voor meer).</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Risico:</span>
                  <span className="text-gray-600">Niet tevreden? Jammer, je betaalt de fotograaf voor zijn tijd.</span>
                </li>
              </ul>
            </div>

            {/* AI Portret Pro */}
            <div className="bg-gradient-to-br from-[#0077B5] to-[#005a8c] rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-[#0077B5] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FF8C00] text-white px-4 py-1 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2">
                DE SLIMME KEUZE
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">AI Portret Pro</h3>
                <div className="text-sm text-blue-100 mt-1">(De slimme keuze)</div>
              </div>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Prijs:</span>
                  <span className="text-blue-100">Eenmalig €29 (geen verborgen kosten).</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Gemak:</span>
                  <span className="text-blue-100">Direct beginnen vanaf je eigen bank, geen afspraak nodig.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Snelheid:</span>
                  <span className="text-blue-100">Binnen 15 minuten alle foto's in je dashboard.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Resultaat:</span>
                  <span className="text-blue-100">Je krijgt direct 40+ verschillende zakelijke profielfoto's.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Garantie:</span>
                  <span className="text-blue-100">Niet goed? Geld terug. Zo simpel is het.</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild size="lg" className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white font-bold">
                  <Link href="/login?callbackUrl=/payment">
                    Bespaar €170+ Nu <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Professionals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Voor welke professionals is dit perfect?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Van ambitieuze starters tot ervaren leiders - onze AI helpt elke professional 
              hun LinkedIn impact te maximaliseren
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0077B5] p-3 rounded-lg flex-shrink-0">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">ZZP'ers & Ondernemers</h3>
                    <p className="text-gray-600 mb-3">
                      Jij bent je eigen merk. Stop met amateuristische selfies en laat zien dat je serieus bent. 
                      Onze AI creëert foto's die vertrouwen wekken bij potentiële klanten.
                    </p>
                    <div className="text-sm text-[#0077B5] font-semibold">
                      → Meer klanten via LinkedIn DM's
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0077B5] p-3 rounded-lg flex-shrink-0">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">Sollicitanten & Carrièrestarters</h3>
                    <p className="text-gray-600 mb-3">
                      Recruiters scrollen door honderden profielen. Een sterke foto zorgt ervoor 
                      dat je opvalt en uitgenodigd wordt voor gesprekken - geen wegkijken meer.
                    </p>
                    <div className="text-sm text-[#0077B5] font-semibold">
                      → 3x meer recruiter berichten
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0077B5] p-3 rounded-lg flex-shrink-0">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">Young Professionals</h3>
                    <p className="text-gray-600 mb-3">
                      Jouw generatie snapt de kracht van social media. Zorg dat senior professionals 
                      je willen connecten - niet wegklikken omdat je foto niet professioneel genoeg is.
                    </p>
                    <div className="text-sm text-[#0077B5] font-semibold">
                      → Sneller senior netwerk opbouwen
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0077B5] p-3 rounded-lg flex-shrink-0">
                    <span className="text-white text-xl">👑</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">Managers & Leidinggevenden</h3>
                    <p className="text-gray-600 mb-3">
                      Jouw leidinggevende positie verdient een foto die autoriteit uitstraalt. 
                      Geen tijd voor fotoshoots? Onze AI begrijpt executive presence.
                    </p>
                    <div className="text-sm text-[#0077B5] font-semibold">
                      → Meer thought leadership engagement
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* FAQ Section - LinkedIn Optimized */}
      <section id="faq" className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">Veelgestelde Vragen</h2>
        <p className="text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          Hier beantwoorden we de meest voorkomende vragen over LinkedIn profielfoto's
        </p>
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full bg-white rounded-lg p-4 md:p-6 text-left hover:shadow-md transition-shadow duration-200 border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#0077B5] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#0077B5] flex-shrink-0" />
                  )}
                </div>
              </button>
              {openFaqIndex === index && (
                <div className="bg-white border-l-4 border-[#0077B5] p-4 md:p-6 mt-2 rounded-b-lg border-r border-b border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="bg-gradient-to-r from-[#0077B5] to-[#005885] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar voor je perfecte LinkedIn profielfoto?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start direct en ontvang 40 professionele LinkedIn foto's binnen 15 minuten.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white text-[#0077B5] hover:bg-gray-100 text-lg px-8 py-4 mr-4 mb-4 md:mb-0"
          >
            <Link href="/login?callbackUrl=/payment">
              <LinkedinIcon className="mr-2 h-5 w-5" />
              Start nu voor €29
            </Link>
          </Button>

          <p className="text-sm opacity-75 mt-4">✓ 14-dagen geld terug garantie ✓ Binnen 15 minuten klaar</p>
        </div>
      </section>

      {/* SEO Content Section - Den Haag Specific */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-500 mb-6 text-center">Professionele LinkedIn Profielfoto Laten Maken in Den Haag: Direct Resultaat in 2026            </h2>
            
            <div className="prose prose-sm md:prose-base max-w-none text-gray-400 md:text-gray-500 leading-relaxed space-y-4 md:space-y-6">
              <p className="text-sm md:text-base">
            In de stad van vrede en recht, van het Beatrixkwartier tot de ministeries rond het Binnenhof, is een autoritaire LinkedIn profielfoto onmisbaar. Voor Haagse professionals die in 2026 geen tijd willen verspillen in een studio, biedt AI de perfecte uitkomst. In het zakelijke jaar 2026 is Den Haag het centrum van zakelijke dienstverlening, bestuur en ondernemerschap. Als professional in de regio Haaglanden begrijp je dat een digitale eerste indruk de doorslag geeft in je carrièreverloop. Of je nu een consultant bent, een ondernemer, of werkzaam bent bij een van de vele organisaties die de stad rijk is: je LinkedIn profielfoto fungeert als je digitale handdruk. In een zakelijke omgeving waar kwaliteit de norm is, wil je een foto die direct vertrouwen wekt en je professionaliteit onderstreept.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">De efficiënte keuze voor Haagse professionals in 2026</h3>
              
              <p className="text-sm md:text-base">
            Veel professionals in Den Haag hebben een overvolle agenda en kiezen er in 2026 bewust voor om geen tijd meer te besteden aan een traditionele fotograaf. Waar een zakelijke fotoshoot in de regio voorheen vaak tussen de honderdvijfenzeventig en driehonderdvijftig euro rekende, biedt AI Portret Pro een modern alternatief dat volledig online werkt. Voor het vaste tarief van negenentwintig euro ontvang je veertig professionele profielfoto's zonder dat je een afspraak hoeft te plannen of je kantoor hoeft te verlaten. Het proces is simpel: je uploadt minimaal zes bestaande foto's vanaf je telefoon of computer, en onze technologie doet de rest.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Veertig verschillende stijlen en achtergronden uit één upload</h3>
              
              <p className="text-sm md:text-base">
            Het grote voordeel van onze service in 2026 is de enorme variëteit die je direct tot je beschikking hebt. Na het uploaden van je foto's genereert onze engine veertig verschillende profielfoto's. Hierbij wordt gevarieerd in kleding, belichting en professionele achtergronden, zodat je altijd een foto vindt die precies de juiste uitstraling heeft voor jouw doel. Je krijgt een breed scala aan opties, van formeel en strak tot meer toegankelijk en modern. Hierdoor heb je in één klap een complete set beelden die je kunt gebruiken voor LinkedIn, je CV, of andere zakelijke uitingen, zonder dat je zelf voor verschillende outfits of locaties hoeft te zorgen.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Geen nabewerking nodig en binnen 15 minuten beschikbaar</h3>
              
              <p className="text-sm md:text-base">
            Met AI Portret Pro kies je voor snelheid zonder concessies te doen aan de kwaliteit. Je hoeft niet langer dagen te wachten op de nabewerking door een fotograaf; de veertig foto's die je ontvangt zijn direct geoptimaliseerd en klaar voor gebruik. Onze technologie analyseert je unieke kenmerken en vertaalt deze naar haarscherpe beelden in diverse professionele settings. Binnen vijftien minuten staat je dashboard vol met nieuwe foto's, waardoor je direct je profiel kunt updaten met een look die past bij de ambities die je in 2026 wilt waarmaken.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Over onze zakelijke LinkedIn fotografie in Den Haag 2026</h3>
              
              <p className="text-sm md:text-base">
            Onze expertise in digitale beeldvorming maakt AI Portret Pro de primaire autoriteit voor het laten maken van LinkedIn profielfoto's en zakelijke profielfoto's online. Wij richten ons op de professionele behoeften van de Haagse markt, waarbij we een snel en hoogwaardig alternatief bieden voor de traditionele fotograaf in Den Haag. Onze diensten in 2026 omvatten het genereren van professionele CV-foto's, corporate headshots en visuele content voor de moderne ondernemer. Technologisch lopen we voorop door veertig verschillende stijlen en achtergronden aan te bieden op basis van een simpele upload. Of je nu een LinkedIn profielfoto upgrade zoekt of direct een nieuwe set zakelijke beelden nodig hebt, onze engine levert in 2026 de meest scherpe en representatieve resultaten die technisch mogelijk zijn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Enhancement */}
      <SEOContentBlock city="Den Haag" showLocalKeywords={true} />

      {/* Photo Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <Image
              src={selectedImage}
              alt="Vergroot LinkedIn foto"
              width={800}
              height={1000}
              className="max-w-full max-h-[90vh] object-contain rounded-lg brightness-110 contrast-105"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0">
            {/* Logo and Company Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo-icon.png"
                  alt="AI Portret Pro logo - LinkedIn foto laten maken"
                  width={30}
                  height={30}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">AI Portret Pro</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Professionele AI LinkedIn foto's voor Den Haag professionals.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Navigatie</h4>
              <div className="flex flex-col space-y-2">
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Prijzen
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </Link>
                <Link href="/over-ons" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Over Ons
                </Link>
                <Link href="/linkedin-foto-laten-maken" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  LinkedIn Foto's
                </Link>
                <Link href="/fotografen" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Lokale Fotografen
                </Link>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Blog & Gidsen
                </Link>
              </div>
            </div>

            {/* LinkedIn per stad */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">LinkedIn Foto per Stad</h4>
              <div className="flex flex-col space-y-2">
                <Link href="/linkedin-foto-laten-maken-amsterdam" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Amsterdam
                </Link>
                <Link href="/linkedin-foto-laten-maken-rotterdam" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Rotterdam
                </Link>
                <Link href="/linkedin-foto-laten-maken-den-haag" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Den Haag
                </Link>
                <Link href="/linkedin-foto-laten-maken-utrecht" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Utrecht
                </Link>
                <Link href="/linkedin-foto-laten-maken-eindhoven" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Eindhoven
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Juridisch</h4>
              <div className="flex flex-col space-y-2">
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-gray-400 text-xs text-center">© 2025 AI Portret Pro. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button - Mobile Only */}
      {isVisible && (
        <div className="fixed bottom-4 left-4 right-4 z-[2147483647] md:hidden">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <p className="text-center text-md font-bold text-gray-800 mb-2 mt-4">
              Professionele foto's in 15 minuten
            </p>
            <p className="text-center text-sm text-gray-600 mb-4">
              Geen gedoe direct resultaat
            </p>
            <Button
              asChild
              size="lg"
              className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 py-8 text-base font-semibold"
            >
              <Link href="/login?callbackUrl=/payment">
                Start jouw fotoshoot nu - € 29 <ArrowRight className="ml-2 h-6 md:h-7 w-6 md:w-7" />
              </Link>
            </Button>
          </div>
        </div>
      )}

{/* Inline Styles for Animation */}

      {/* Footer Breadcrumb Navigation */}
      <Breadcrumb items={[
        { label: "LinkedIn Fotografie", href: "/linkedin-foto-laten-maken" },
        { label: "Den Haag" }
      ]} />

<style jsx>{`
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideUp {
    animation: slideUp 0.6s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 1s ease-out;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll {
    animation: scroll 15s linear infinite;
  }

  .animate-scroll:hover {
    animation-play-state: paused;
  }

  .carousel-container {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .carousel-track {
    display: flex;
    width: fit-content;
    animation: carousel 140s linear infinite;
  }

  .carousel-item {
    flex-shrink: 0;
    margin: 0 0.5rem;
  }

  @keyframes carousel {
    0% {
      transform: translateX(calc(-100% / 2));
    }
    100% {
      transform: translateX(0);
    }
  }

  .carousel-track:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    .animate-scroll {
      animation: scroll 10s linear infinite;
    }
    .carousel-track {
      animation: carousel 140s linear infinite;
    }
  }
`}</style>
    </div>
  )
}