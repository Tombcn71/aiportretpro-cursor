"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, ChevronDown, ChevronUp, Shield, Check } from "lucide-react"
import Header from "@/components/header"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import SchemaMarkup from "@/components/schema-markup"
import CityNavigation from "@/components/city-navigation"
import FAQSchema from "@/components/faq-schema"
import ReviewSchema from "@/components/review-schema"
import ReviewsEnVoorbeelden from "@/components/reviews-en-voorbeelden"
import HowItWorks from "@/components/how-it-works"
import { trackContact } from "@/lib/facebook-pixel"

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

const faqData = [
  {
    question: "Hoe werkt het precies?",
    answer:
      "Je uploadt minimaal 4 normale foto's (selfies) van jezelf. Onze AI analyseert je gezicht en maakt binnen 15 minuten 40 nieuwe, professionele profielfoto's in verschillende zakelijke outfits en achtergronden",
  },
  {
    question: "Hoe lang duurt het?",
    answer:
      "Zodra je foto's zijn geüpload, gaat onze AI aan de slag. Na maximaal 15 minuten staan je 40 profielfoto's klaar in je dashboard.",
  },
  {
    question: "Zijn mijn foto's en betaling veilig?",
    answer:
      "Ja. Wij gebruiken je foto's alleen om jouw profielfoto's te genereren en verwijderen ze daarna van onze servers. Betalingen verlopen via Stripe, de veiligste betaalprovider ter wereld (iDEAL & Creditcard).",
  },
  {
    question: "Mag ik de foto's overal gebruiken?",
    answer: "Ja, je krijgt de volledige commerciële rechten. De foto's zijn jouw eigendom en perfect voor LinkedIn, je CV, je website of print.",
  },
  {
    question: "Wat als ik niet tevreden ben?",
    answer:
      "Heb jij niet minstens 4 profielwaardige foto's? Geen zorgen, we hebben een 14 dagen niet-goed-geld-terug garantie.",
  },
  {
    question: "Hebben jullie een klantenservice?",
    answer:
      "Zeker! Wij zijn een Nederlandse klantenservice. Heb je een vraag? Je kunt ons direct bereiken via info@aiportretpro.nl of chat en we helpen je persoonlijk verder.",
  },
]

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "AI Portret Pro - Zakelijke Profielfoto Laten Maken",
            "image": "https://aiportretpro.nl/images/logo-icon.png",
            "@id": "https://aiportretpro.nl/#service",
            "url": "https://aiportretpro.nl",
            "description": "Online service voor het laten maken van 40 professionele zakelijke profielfoto's met AI. Perfect voor LinkedIn, CV en website. Binnen 15 minuten klaar voor slechts €29.",
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
      <SchemaMarkup type="home" />
      <ReviewSchema businessName="AI Portret Pro" />
      <FAQSchema faqs={faqData} />
      <Header />

      <main id="main-content" role="main">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-6 text-center">
        {/* Stars and Trust Badge */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {/* Half star */}
              <div className="relative w-4 h-4">
                <svg className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-sm md:text-base font-semibold text-gray-900">4.6/5</span>
          </div>
        </div>
        
        <h1 className="tracking-tight text-3xl md:text-4xl font-bold mb-6 leading-tight">
          <div className="text-center">
            <span className="inline md:block">Professionele zakelijke foto's, </span>
            <span className="inline md:block text-[#0077B5]">zonder gedoe van een fotoshoot</span>
          </div>
        </h1>
        <p className="hidden md:block text-base md:text-xl mb-6 text-[#374151] font-normal">Upload een paar selfies en onze AI doet de rest. Ontvang binnen 15 minuten 40 professionele foto's</p>

        <div className="text-md md:text-lg text-[#374151] mb-8 max-w-2xl mx-auto text-center">
          <div className="inline-grid grid-cols-[auto_1fr] gap-x-2 items-start text-start justify-center" style={{ minHeight: '120px', containIntrinsicSize: '120px' }}>
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
          className="bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 md:px-10 py-8 md:py-8 text-base md:text-lg mb-3 md:max-w-sm font-black"
          style={{ textShadow: '0 0 1px white' }}
        >
         <Link href="/login?callbackUrl=/payment" onClick={() => trackContact()} aria-label="Start jouw fotoshoot nu voor negenentwintig euro">
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
      <section className="w-full overflow-hidden mb-16 md:mb-24 bg-gradient-to-r from-blue-50 via-white to-blue-50" style={{ minHeight: '400px' }}>
        <div className="relative">
          <div className="carousel-container">
            <div className="carousel-track">
              {galleryPhotos.map((photo, index) => (
                <div key={`carousel-${index}`} className="carousel-item">
                  <div className="relative">
                    <div className="w-52 h-[13.33rem] md:w-80 md:h-[20rem] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shadow-md md:shadow-lg" style={{ aspectRatio: "4/5" }}>
                      {index === 0 ? (
                        <Image
                          src="/images/shoot/1.png"
                          alt="AI profielfoto voorbeeld 1"
                          width={320}
                          height={400}
                          priority={true}
                          fetchPriority="high"
                          loading="eager"
                          decoding="sync"
                          className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                          sizes="(max-width: 768px) 208px, 320px"
                        />
                      ) : (
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={`AI profielfoto voorbeeld ${index + 1}`}
                          width={320}
                          height={400}
                          className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                          loading="lazy"
                          quality={75}
                          sizes="(max-width: 768px) 208px, 320px"
                        />
                      )}
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
                        alt={`AI profielfoto voorbeeld ${index + 1}`}
                        width={320}
                        height={400}
                        className="w-full h-full object-cover bg-gray-50 brightness-110 contrast-105"
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 768px) 208px, 320px"
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
                  <span className="text-[#374151]">Vaak tussen de €150 en €350.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Tijd:</span>
                  <span className="text-[#374151]">Afspraak plannen, reistijd en een uur poseren.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Geduld:</span>
                  <span className="text-[#374151]">1 tot 2 weken wachten op de nabewerking.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Resultaat:</span>
                  <span className="text-[#374151]">Slechts 3 tot 5 foto's inbegrepen (bijbetalen voor meer).</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Risico:</span>
                  <span className="text-[#374151]">Niet tevreden? Jammer, je betaalt de fotograaf voor zijn tijd.</span>
                </li>
              </ul>
            </div>

            {/* AI Portret Pro */}
            <div className="bg-gradient-to-br from-[#0077B5] to-[#005a8c] rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-[#0077B5] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FF8C00] text-white px-4 py-1 text-sm font-black transform rotate-12 translate-x-4 -translate-y-2" aria-label="De slimme keuze badge" style={{ textShadow: '0 0 0.5px white' }}>
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
                <Button asChild size="lg" className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white font-black">
                  <Link href="/login?callbackUrl=/payment" onClick={() => trackContact()}>
                    Bespaar €170+ Nu <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-12 md:py-16 bg-gray-50">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">Veelgestelde Vragen</h2>
        <p className="text-lg text-[#374151] text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          Alles wat je moet weten voor je begint.
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
            className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white bg-transparent"
          >
            <Link href="/contact">Neem Contact Op</Link>
          </Button>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-2xl font-semibold text-[#374151] mb-6 text-center">
              Professionele Zakelijke Profielfoto's Laten Maken Online – De Slimme Keuze voor Professionals in 2026
            </h2>
            
            <div className="prose prose-sm md:prose-base max-w-none text-[#374151] leading-relaxed space-y-4 md:space-y-6">
              <p className="text-sm md:text-base">
                In de snel veranderende zakelijke wereld van 2026 is je digitale eerste indruk belangrijker dan ooit. Wie vandaag de dag professionele zakelijke profielfoto's wil laten maken, hoeft niet langer te rekenen op de hoge kosten of het tijdrovende proces van een traditionele fotostudio. Dankzij onze revolutionaire AI-technologie van de nieuwste generatie ontvang je nu veertig professionele profielfoto's in slechts vijftien minuten tijd voor het vaste tarief van negenentwintig euro. Dit maakt onze service de meest efficiënte keuze voor iedereen die een krachtige indruk wil maken op LinkedIn, een CV, de bedrijfswebsite of digitale visitekaartjes.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#374151] mt-6 mb-4">De voordelen van AI LinkedIn profielfoto's in het nieuwe jaar</h3>
              
              <p className="text-sm md:text-base">
                Het jaar 2026 markeert een definitieve omslag in de manier waarop we naar professionele fotografie kijken. Onze service is meer dan zes keer goedkoper dan traditionele fotoshoots, zonder dat dit ten koste gaat van de kwaliteit. Je hebt geen afspraak meer nodig en hoeft niet door de stad te reizen voor een sessie; je start het proces simpelweg direct vanuit huis of vanaf je werkplek. Met de keuze uit veertig verschillende poses en achtergronden ben je verzekerd van een gevarieerd pakket dat perfect aansluit bij jouw specifieke sector. Bovendien bieden wij volledige zekerheid met onze veertien dagen geld-terug-garantie, omdat wij overtuigd zijn van de professionele kwaliteit die onze 2026-engine levert.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#374151] mt-6 mb-4">Een veelzijdige oplossing voor elke zakelijke behoefte</h3>
              
              <p className="text-sm md:text-base">
                Onze AI-fotografie is ontworpen om te voldoen aan elk denkbaar professioneel doel. Of je nu op zoek bent naar LinkedIn profielfoto's die direct opvallen bij recruiters, representatieve foto's voor een overtuigend CV of beelden voor een complete bedrijfswebsite, onze technologie levert resultaten die onmogelijk te onderscheiden zijn van echte studiofotografie. Ook voor e-mail handtekeningen, moderne visitekaartjes en zakelijke social media profielen biedt onze service in 2026 de perfecte uitkomst. Geen gedoe meer met dure studiokosten of lange wachttijden op de nabewerking door een fotograaf; je krijgt direct de uitstraling die bij je carrière past.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#374151] mt-6 mb-4">Hoe het proces in 2026 werkt</h3>
              
              <p className="text-sm md:text-base">
                Het proces is volledig geoptimaliseerd voor snelheid en gebruiksvriendelijkheid. Je begint door vier tot twaalf verschillende foto's van jezelf te uploaden. Vervolgens analyseert onze geavanceerde AI je gelaatstrekken en leert het je unieke kenmerken kennen om een natuurgetrouw resultaat te garanderen. Terwijl de technologie op de achtergrond zijn werk doet, hoef je slechts vijftien minuten te wachten tot je veertig professionele foto's in hoge resolutie kunt downloaden vanuit je persoonlijke dashboard.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#374151] mt-6 mb-4">Waarom AI Portret Pro de standaard is voor jouw succes</h3>
              
              <p className="text-sm md:text-base">
                In 2026 combineren wij de nieuwste ontwikkelingen op het gebied van kunstmatige intelligentie met de fijne kneepjes van klassieke LinkedIn profielfoto's. Onze algoritmes zijn getraind op tienduizenden zakelijke headshots, waardoor we de ideale balans vinden tussen een natuurlijke uitstraling en zakelijke autoriteit. Met professionele belichting en moderne achtergronden die aansluiten bij de trends van dit jaar, bieden wij de kwaliteit van een topstudio tegen een fractionele prijs. Sluit je aan bij de duizenden professionals die hun zakelijke uitstraling in 2026 al naar een hoger niveau hebben getild.
              </p>

              <h3 className="text-base md:text-lg font-semibold text-[#374151] mt-6 mb-4">Over onze zakelijke profielfoto's in 2026</h3>
              
              <p className="text-sm md:text-base">
                Onze expertise strekt zich uit over alle facetten van digitale zakelijke LinkedIn profielfoto's. AI Portret Pro is de primaire bron voor het laten maken van LinkedIn profielfoto's en zakelijke profielfoto's online, met een specifieke focus op de Nederlandse markt. Onze diensten omvatten het genereren van corporate headshots, professionele CV-foto's en visuele content voor moderne bedrijfswebsites. Technologisch lopen we voorop met AI LinkedIn profielfoto's die specifiek zijn getraind voor zakelijke doeleinden, waardoor we een superieur en sneller alternatief bieden voor de traditionele fotograaf. Of je nu zoekt naar een LinkedIn profielfoto upgrade of een volledige online fotoshoot, onze virtuele studio levert in 2026 de meest scherpe en representatieve resultaten die momenteel technisch mogelijk zijn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hidden md:block">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Klaar voor je professionele profielfoto's?
          </h2>
          <p className="text-xl text-[#374151] mb-8">Laat zien wie je bent met een krachtige, professionele foto</p>
          {isClient && (
            <Link href="/login?callbackUrl=/payment" onClick={() => trackContact()} aria-label="Start jouw fotoshoot nu voor negenentwintig euro">
              <Button size="lg" className="bg-[#FF8C00] hover:bg-[#FFA500] text-white px-8 py-4 text-lg font-black" style={{ textShadow: '0 0 1px white' }}>
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
              className="absolute -top-8 md:-top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Vergroot profielfoto"
              width={800}
              height={1000}
              className="max-w-full max-h-[90vh] object-contain rounded-lg brightness-110 contrast-105"
            />
          </div>
        </div>
      )}

      </main>

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
                  className="rounded-lg"
                  style={{ width: '30px', height: '30px' }}
                />
                <h3 className="text-xl font-bold text-white">AI Portret Pro</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Professionele AI zakelijke profielfoto's in minuten.
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
                <Link href="/linkedin-foto-laten-maken-tilburg" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Tilburg
                </Link>
                <Link href="/linkedin-foto-laten-maken-groningen" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Groningen
                </Link>
                <Link href="/linkedin-foto-laten-maken-almere" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Almere
                </Link>
                <Link href="/linkedin-foto-laten-maken-breda" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Breda
                </Link>
                <Link href="/linkedin-foto-laten-maken-nijmegen" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Nijmegen
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

            {/* Social Media */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Volg Ons</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61578343760041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/aiportretpro.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
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

      {/* City Navigation - Footer */}
      <CityNavigation variant="footer" />

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
              className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 py-8 text-base font-black"
              style={{ textShadow: '0 0 1px white' }}
            >
              <Link href="/login?callbackUrl=/payment" onClick={() => trackContact()} aria-label="Start jouw fotoshoot nu voor negenentwintig euro">
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
      animation: carousel 200s linear infinite;
      min-height: 400px;
    }

    .carousel-item {
      flex-shrink: 0;
      margin: 0 0.5rem;
    }
    
    .carousel-item:first-child {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
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
        animation: carousel 200s linear infinite;
      }
    }
  `}</style>

    </>
  )
}
