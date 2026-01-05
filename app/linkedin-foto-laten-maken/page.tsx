"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, ChevronDown, ChevronUp, Shield, Check, LinkedinIcon } from "lucide-react"
import Header from "@/components/header"
import { Facebook, Instagram } from "lucide-react"
import dynamic from "next/dynamic"
import ReviewSchema from "@/components/review-schema"
import FAQSchema from "@/components/faq-schema"
import SchemaMarkup from "@/components/schema-markup"

// Lazy load heavy components to reduce initial bundle size
const ReviewsEnVoorbeelden = dynamic(() => import("@/components/reviews-en-voorbeelden"), {
  ssr: false,
})
const HowItWorks = dynamic(() => import("@/components/how-it-works"), {
  ssr: false,
})
import { trackLead } from "@/lib/facebook-pixel"

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
const faqData = [
  {
    question: "Waarom is een LinkedIn profielfoto zo belangrijk voor mijn carrière?",
    answer:
      "Je LinkedIn profielfoto is vaak het eerste wat potentiële werkgevers, recruiters en zakelijke contacten van je zien. Onderzoek toont aan dat profielen met professionele LinkedIn foto's 14x meer profielweergaves krijgen en 36% meer berichten ontvangen. Een krachtige LinkedIn profielfoto verhoogt je zichtbaarheid, vertrouwen en professionele uitstraling aanzienlijk.",
  },
  {
    question: "Wat maakt een perfecte LinkedIn profielfoto?",
    answer:
      "De perfecte LinkedIn profielfoto is professioneel, helder en vertrouwenwekkend. Key elementen zijn: gezicht vult 60% van de foto, professionele kleding, neutrale achtergrond, natuurlijke glimlach, en goede belichting. Onze AI genereert automatisch LinkedIn-geoptimaliseerde foto's die voldoen aan alle LinkedIn richtlijnen en best practices.",
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
  },
  {
    question: "Hoe verhoogt een professionele LinkedIn foto mijn carrièrekansen?",
    answer:
      "Een sterke LinkedIn profielfoto verhoogt significant je zichtbaarheid bij recruiters en potentiële werkgevers. Studies tonen aan dat professionals met professionele LinkedIn foto's meer wordt benaderd voor jobs, hebben hogere klik-through rates op hun profiel, en worden gezien als betrouwbaarder en competenter. Het is een investering in je professionele brand.",
  }
]



export default function LinkedInProfielFotoPage() {
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
      <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "AI Portret Pro - LinkedIn Profielfoto Laten Maken",
            "image": "https://aiportretpro.nl/images/logo-icon.png",
            "@id": "https://aiportretpro.nl/linkedin-foto-laten-maken#service",
            "url": "https://aiportretpro.nl/linkedin-foto-laten-maken",
            "description": "Online service voor het laten maken van 40 professionele LinkedIn profielfoto's met AI. Binnen 15 minuten klaar voor slechts €29. Perfect voor je LinkedIn profiel.",
            "priceRange": "€29",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "NL"
            },
            "areaServed": [
              {
                "@type": "Country",
                "name": "Nederland",
                "sameAs": "https://www.wikidata.org/wiki/Q55"
              },
              {
                "@type": "City",
                "name": "Amsterdam",
                "sameAs": "https://www.wikidata.org/wiki/Q727"
              },
              {
                "@type": "City",
                "name": "Rotterdam",
                "sameAs": "https://www.wikidata.org/wiki/Q34370"
              },
              {
                "@type": "City",
                "name": "Den Haag",
                "sameAs": "https://www.wikidata.org/wiki/Q36600"
              },
              {
                "@type": "City",
                "name": "Utrecht",
                "sameAs": "https://www.wikidata.org/wiki/Q803"
              },
              {
                "@type": "City",
                "name": "Eindhoven",
                "sameAs": "https://www.wikidata.org/wiki/Q983"
              },
              {
                "@type": "City",
                "name": "Groningen",
                "sameAs": "https://www.wikidata.org/wiki/Q749"
              },
              {
                "@type": "City",
                "name": "Tilburg",
                "sameAs": "https://www.wikidata.org/wiki/Q1001"
              },
              {
                "@type": "City",
                "name": "Almere",
                "sameAs": "https://www.wikidata.org/wiki/Q992"
              },
              {
                "@type": "City",
                "name": "Breda",
                "sameAs": "https://www.wikidata.org/wiki/Q1009"
              },
              {
                "@type": "City",
                "name": "Nijmegen",
                "sameAs": "https://www.wikidata.org/wiki/Q47887"
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
            }
          })
        }}
      />
      <SchemaMarkup type="city" city="LinkedIn" url="https://aiportretpro.nl/linkedin-foto-laten-maken" />
      <ReviewSchema businessName="AI Portret Pro" />
      <FAQSchema faqs={faqData} />
      <Header />

      {/* Hero Section - LinkedIn Optimized */}
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
          <div className="text-center">
            <span className="inline md:block">Professionele linkedin foto's, </span>
            <span className="inline md:block text-[#0077B5]">zonder gedoe van een fotoshoot</span>
          </div>
        </h1>
        <p className="hidden md:block text-gray-500 text-lg md:text-xl mb-6">
          Upload een paar selfies en onze AI doet de rest. Ontvang binnen 15 minuten 40 professionele foto's
</p>

        <div className="text-md md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-center">
          <div className="inline-grid grid-cols-[auto_1fr] gap-x-2 items-start text-start justify-center">
            <span className="text-center text-xl md:text-2xl">🏷️</span>
            <span>6x goedkoper dan een fotograaf</span>
            <span className="text-center text-xl md:text-2xl">✨</span>
            <span>Niet van echt te onderscheiden</span>
            <span className="text-center text-xl md:text-2xl">⏱️</span>
            <span>Klaar binnen 15 minuten</span>
            <span className="text-center text-xl md:text-2xl">🤝</span>
            <span>+1200 professionals geholpen</span>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className=" bg-[#CC6600] hover:bg-[#E67A00] text-black px-6 md:px-10 py-8 md:py-8 text-base md:text-lg mb-3 md:max-w-sm"
        >
          <Link href="/login?callbackUrl=/payment" onClick={() => trackLead()}>
            Start jouw fotoshoot nu - € 29 <ArrowRight className="ml-2 h-6 md:h-7 w-6 md:w-7" />
          </Link>
        </Button>

        {/* Trust Shield */}
        <div className="flex items-center justify-center gap-2 text-[#0077B5] font-medium text-sm mb-8">
          <div className="relative">
            <Shield className="h-5 w-5 fill-current text-[#0077B5]" />
            <Check className="h-3 w-3 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
          </div>
          <span>14-DAGEN GELD TERUG GARANTIE</span>
        </div>
      </section>

      {/* Photo Carousel - FIXED: Smooth continuous scrolling */}
      <section className="w-full overflow-hidden mb-16 md:mb-24 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="relative">
          {/* Static LCP Image - Rendered first without JS, outside carousel */}
          <div className="flex justify-center mb-4 md:hidden">
            <div className="w-52 lcp-image-container rounded-xl bg-gray-100 shadow-md">
              <div className="w-full h-full overflow-hidden rounded-xl">
                <Image
                  src={galleryPhotos[0] || "/placeholder.svg"}
                  alt="LinkedIn portret voorbeeld 1"
                  width={320}
                  height={400}
                  className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                  priority={true}
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={50}
                />
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center mb-4">
            <div className="w-80 lcp-image-container rounded-2xl bg-gray-100 shadow-lg">
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={galleryPhotos[0] || "/placeholder.svg"}
                  alt="LinkedIn portret voorbeeld 1"
                  width={320}
                  height={400}
                  className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                  priority={true}
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={50}
                />
              </div>
            </div>
          </div>
          {/* Carousel for remaining images */}
          <div className="carousel-container">
            <div className="carousel-track">
              {galleryPhotos.map((photo, index) => (
                <div key={`carousel-${index}`} className="carousel-item">
                  <div className="relative">
                    <div className="w-52 h-[13.33rem] md:w-80 md:h-[20rem] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shadow-md md:shadow-lg">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`LinkedIn portret voorbeeld ${index + 1}`}
                        width={320}
                        height={400}
                        className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                        priority={false}
                        fetchPriority="auto"
                        sizes="(max-width: 768px) 208px, 320px"
                        quality={75}
                        style={{ aspectRatio: "4/5" }}
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
                        alt={`LinkedIn portret voorbeeld ${index + 1}`}
                        width={320}
                        height={400}
                        className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                        sizes="(max-width: 768px) 208px, 320px"
                        quality={75}
                        style={{ aspectRatio: "4/5" }}
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
      {/* How It Works */}
 <HowItWorks />

      {/* Reviews en Voorbeelden */}
      <ReviewsEnVoorbeelden />

      {/* Comparison Section */}
      <section className="py-16 bg-gradient-to-r from-[#0077B5]/5 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Waarom €200+ betalen voor een middag in een studio?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Traditional Photography */}
              <div className="bg-white p-8 rounded-lg border-2 border-red-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-3xl">❌</span>
                  <h3 className="text-2xl font-semibold text-gray-800">De traditionele fotograaf</h3>
                  </div>
                <div className="space-y-5">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Prijs:</p>
                    <p className="text-[#374151]">Vaak tussen de €150 en €350. Exclusief parkeerkosten in het centrum (€ 5,- per uur).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Tijd:</p>
                    <p className="text-[#374151]">Afspraak plannen, reistijd en een uur poseren.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Geduld:</p>
                    <p className="text-[#374151]">1 tot 2 weken wachten op de nabewerking.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Resultaat:</p>
                    <p className="text-[#374151]">Slechts 3 tot 5 foto's inbegrepen (bijbetalen voor meer).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Risico:</p>
                    <p className="text-[#374151]">Niet tevreden? Jammer, je betaalt de fotograaf voor zijn tijd.</p>
                  </div>
                </div>
              </div>

              {/* AI Photography */}
              <div className="bg-[#0077B5] p-8 rounded-lg text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  DE SLIMME KEUZE
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-3xl">✅</span>
                  <h3 className="text-2xl font-semibold text-white">AI Portret Pro</h3>
                  </div>
                <p className="text-white mb-6 text-sm">(De slimme keuze)</p>
                <div className="space-y-5">
                  <div>
                    <p className="font-semibold text-white mb-1">Prijs:</p>
                    <p className="text-white">Eenmalig €29 (geen verborgen kosten).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Gemak:</p>
                    <p className="text-white">Direct beginnen vanaf je eigen bank, geen afspraak nodig.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Snelheid:</p>
                    <p className="text-white">Binnen 15 minuten alle foto's in je dashboard.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Resultaat:</p>
                    <p className="text-white">Je krijgt direct 40+ verschillende zakelijke profielfoto's.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Garantie:</p>
                    <p className="text-white">Niet goed? Geld terug. Zo simpel is het.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800 mb-6">Bespaar €170+</p>
              <Button
                asChild
                size="lg"
                className="bg-[#CC6600] hover:bg-[#E67A00] text-black px-8 py-6 text-lg"
              >
                <Link href="/login?callbackUrl=/payment" onClick={() => trackLead()}>
                  Nu <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
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
                    <span className="text-black text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">ZZP'ers & Ondernemers</h3>
                    <p className="text-[#374151] mb-3">
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
                    <span className="text-black text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">Sollicitanten & Carrièrestarters</h3>
                    <p className="text-[#374151] mb-3">
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
                    <span className="text-black text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">Young Professionals</h3>
                    <p className="text-[#374151] mb-3">
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
                    <span className="text-black text-xl">👑</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">Managers & Leidinggevenden</h3>
                    <p className="text-[#374151] mb-3">
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

      {/* City Pages Section - Internal Links for SEO */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              LinkedIn Foto Laten Maken in Jouw Stad
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Vind lokale informatie, prijzen en tips voor jouw stad. Elke stad heeft unieke LinkedIn professionals met specifieke behoeften.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link 
                href="/linkedin-foto-laten-maken-amsterdam" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏛️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Amsterdam</h3>
                  <p className="text-sm text-gray-500 mt-1">450k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-rotterdam" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">⚓</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Rotterdam</h3>
                  <p className="text-sm text-gray-500 mt-1">300k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-den-haag" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏛️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Den Haag</h3>
                  <p className="text-sm text-gray-500 mt-1">250k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-utrecht" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🚂</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Utrecht</h3>
                  <p className="text-sm text-gray-500 mt-1">200k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-eindhoven" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💡</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Eindhoven</h3>
                  <p className="text-sm text-gray-500 mt-1">180k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-groningen" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🌾</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Groningen</h3>
                  <p className="text-sm text-gray-500 mt-1">120k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-tilburg" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏭</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Tilburg</h3>
                  <p className="text-sm text-gray-500 mt-1">100k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-breda" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎭</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Breda</h3>
                  <p className="text-sm text-gray-500 mt-1">95k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-nijmegen" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏰</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Nijmegen</h3>
                  <p className="text-sm text-gray-500 mt-1">90k+ professionals</p>
                </div>
              </Link>

              <Link 
                href="/linkedin-foto-laten-maken-almere" 
                className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏙️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0077B5]">Almere</h3>
                  <p className="text-sm text-gray-500 mt-1">85k+ professionals</p>
                </div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Elke stad heeft unieke LinkedIn professionals. Bekijk stad-specifieke prijzen, statistieken en tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - LinkedIn Optimized */}
      <section id="faq" className="container mx-auto px-4 py-12 md:py-16 bg-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">LinkedIn Profielfoto FAQ</h2>
        <p className="text-lg text-[#374151] text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          Alles over professionele LinkedIn foto's en hoe ze je carrière kunnen boosten!
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
                {openFaqIndex === index && (
                  <div className="mt-4 text-[#374151] text-sm md:text-base leading-relaxed">{faq.answer}</div>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 md:mt-12">
          <p className="text-[#374151] mb-4 text-sm md:text-base">Nog vragen? We helpen je graag!</p>
          <Button
            asChild
            variant="outline"
            className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-black bg-transparent"
          >
            <Link href="/contact">Neem Contact Op</Link>
          </Button>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-500 mb-6 text-center">
              LinkedIn Foto Laten Maken: Professionele Profielfoto's Online in 2026
            </h2>
            
            <div className="prose prose-sm md:prose-base max-w-none text-gray-400 md:text-gray-500 leading-relaxed space-y-4 md:space-y-6">
              <p className="text-sm md:text-base text-[#374151]">
              Een professionele LinkedIn foto laten maken is in 2026 de belangrijkste investering in je online aanwezigheid en verdere carrièreverloop. Met onze geavanceerde AI-technologie ontvang je 40 LinkedIn-specifieke foto's in slechts vijftien minuten tijd voor het vaste tarief van negenentwintig euro. Al onze beelden zijn volledig geoptimaliseerd volgens de nieuwste LinkedIn-richtlijnen, waardoor je verzekerd bent van een krachtige uitstraling die direct vertrouwen wekt bij het grootste zakelijke netwerk ter wereld.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">De impact van een hoogwaardige LinkedIn profielfoto</h3>
              
              <p className="text-sm md:text-base text-[#374151]">
              In het huidige zakelijke landschap van 2026 zijn de cijfers onweerlegbaar: profielen met een professionele foto genereren gemiddeld veertien keer meer weergaven en ontvangen zesendertig procent meer berichten van recruiters. Een kwalitatief portret verbetert je netwerkmogelijkheden aanzienlijk en zorgt ervoor dat je direct opvalt tussen de miljoenen andere gebruikers. Of je nu een LinkedIn profielfoto nodig hebt voor een nieuwe carrièrestap, een corporate uitstraling zoekt voor je huidige functie of simpelweg je persoonlijke merk wilt upgraden; onze AI-fotografie biedt de perfecte oplossing zonder de noodzaak voor dure studiosessies of lange wachttijden.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Professionele richtlijnen vertaald naar AI-perfectie</h3>
              
              <p className="text-sm md:text-base text-[#374151]">
              Onze technologie is getraind op de hoogste standaarden voor zakelijke fotografie. We zorgen automatisch voor de juiste professionele kleding, zoals strak gesneden pakken, blazers of zakelijke overhemden, gecombineerd met een neutrale achtergrond die niet afleidt van je gezicht. De AI optimaliseert de belichting en zorgt voor een vriendelijke, zelfverzekerde glimlach die essentieel is voor een goede eerste indruk. Bovendien worden alle 40 foto's direct geleverd in het ideale vierkante formaat, zodat ze zonder extra bewerking direct geüpload kunnen worden naar je LinkedIn-profiel.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Hoe werkt het proces in 2026?</h3>
              
              <p className="text-sm md:text-base text-[#374151]">
              Het maken van een professionele LinkedIn foto is tegenwoordig eenvoudiger dan ooit. Je begint door een paar bestaande foto's van jezelf te uploaden vanaf je telefoon of computer. Dit kunnen normale selfies of vakantiefoto's zijn, zolang je gezicht goed zichtbaar is. Onze AI analyseert vervolgens je gelaatstrekken en de gewenste zakelijke stijl. Terwijl je vijftien minuten wacht, genereert het systeem 40 verschillende variaties van studiokwaliteit. Na deze korte periode kun je de volledige set direct downloaden vanuit je dashboard, klaar om je digitale handdruk te professionaliseren.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Waarom AI Portret Pro de standaard is voor LinkedIn optimalisatie</h3>
              
              <p className="text-sm md:text-base text-[#374151]">
              Onze AI-fotografie maakt gebruik van geavanceerde algoritmes die specifiek getraind zijn op duizenden succesvolle LinkedIn-headshots. We begrijpen de unieke vereisten per sector; of je nu werkzaam bent in tech, finance, marketing of consultancy, wij zorgen ervoor dat je profiel precies de juiste balans vindt tussen autoriteit en toegankelijkheid. Waar je bij een traditionele fotograaf vaak weken moet wachten op resultaat, biedt onze virtuele oplossing in 2026 directheid en variatie die met handmatige fotografie niet te evenaren is tegen deze prijs.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-gray-500 mt-6 mb-4">Over onze LinkedIn foto services in 2026</h3>
              
              <p className="text-sm md:text-base text-[#374151]">
              AI Portret Pro is de toonaangevende bron voor het online laten maken van LinkedIn profielfoto's en zakelijke portretten. Onze expertise omvat het volledige spectrum van digitale profilering: van corporate LinkedIn foto's en business headshots tot aan volledige profieloptimalisatie voor recruiters. Wij bieden een innovatief alternatief voor de traditionele fotograaf door een virtuele fotoshoot mogelijk te maken die gewoon vanuit huis kan worden uitgevoerd. Met een focus op de Nederlandse markt helpen wij professionals – van ambitieuze starters tot C-level executives – om hun LinkedIn uitstraling te perfectioneren met de meest scherpe en representatieve resultaten die technisch mogelijk zijn in 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hidden md:block">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Klaar voor je professionele LinkedIn foto?
          </h2>
          <p className="text-xl text-gray-600 mb-8">Verhoog je LinkedIn zichtbaarheid met een krachtige profielfoto</p>
          {isClient && (
            <Link href="/login?callbackUrl=/payment" onClick={() => trackLead()}>
              <Button size="lg" className="bg-[#CC6600] hover:bg-[#E67A00] text-black px-8 py-4 text-lg">
                Start jouw fotoshoot nu - € 29 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-8 md:-top-12 right-0 text-black hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Vergroot LinkedIn portret"
              width={800}
              height={1000}
              className="max-w-full max-h-[90vh] object-contain rounded-lg brightness-110 contrast-105"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-black py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0">
            {/* Logo and Company Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo-icon.png"
                  alt="AI Portrait Pro Logo"
                  width={30}
                  height={30}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-bold text-black">AI Portret Pro</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Professionele AI LinkedIn portretten in minuten.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-semibold text-sm uppercase tracking-wide">Navigatie</h4>
              <div className="flex flex-col space-y-2">
                <Link href="/pricing" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Prijzen
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Contact
                </Link>
                <Link href="/over-ons" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Over Ons
                </Link>
                <Link href="/" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Homepage
                </Link>
                <Link href="/fotografen" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Lokale Fotografen
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-semibold text-sm uppercase tracking-wide">Juridisch</h4>
              <div className="flex flex-col space-y-2">
                <Link href="/privacy" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-300 hover:text-black transition-colors duration-200 text-sm">
                  Terms
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-semibold text-sm uppercase tracking-wide">Volg Ons</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61578343760041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/aiportretpro.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
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
            <p className="text-center text-sm text-[#374151] mb-4">
              Geen gedoe direct resultaat
            </p>
            <Button
              asChild
              size="lg"
              className="w-full bg-[#CC6600] hover:bg-[#E67A00] text-black px-6 py-8 text-base font-semibold"
            >
              <Link href="/login?callbackUrl=/payment" onClick={() => trackLead()}>
                Start jouw fotoshoot nu - € 29 <ArrowRight className="ml-2 h-6 md:h-7 w-6 md:w-7" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
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
      </main>
    </div>
  )
}
