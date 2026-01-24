"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, ChevronDown, ChevronUp, Shield, Check, LinkedinIcon, Sparkles, Camera } from "lucide-react"
import Header from "@/components/header"
import { Facebook, Instagram } from "lucide-react"
import SchemaMarkup from "@/components/schema-markup"
import FAQSchema from "@/components/faq-schema"
import Breadcrumb from "@/components/breadcrumb"
import { trackContact } from "@/lib/facebook-pixel"
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
// Breda-specific FAQ data
const faqData = [
  {
    question: "Waarom zijn AI LinkedIn foto's een goede keuze voor Bredanaars?",
    answer:
      "Breda heeft meer dan 90.000 LinkedIn professionals in logistiek, maakindustrie, en zakelijke dienstverlening. Als belangrijke stad in Noord-Brabant met bedrijven zoals Bavaria en vele internationale bedrijven is een professionele LinkedIn foto cruciaal. Onze AI service voor €29 biedt Bredase professionals een moderne, betaalbare oplossing.",
  },
  {
    question: "Wat maakt een perfecte LinkedIn profielfoto?",
    answer:
      "De perfecte LinkedIn profielfoto is professioneel, helder en vertrouwenwekkend. Key elementen zijn: gezicht vult 60% van de foto, professionele kleding, neutrale achtergrond, natuurlijke glimlach, en goede belichting. Onze AI genereert automatisch LinkedIn-geoptimaliseerde foto's die voldoen aan alle LinkedIn richtlijnen en best practices.",
  },
  {
    question: "Werkt een AI LinkedIn foto voor de Bredase zakelijke markt?",
    answer:
      "Absoluut! Breda combineert Brabantse gezelligheid met zakelijk professionalisme. Onze AI LinkedIn foto's zijn perfect voor deze balans - professioneel maar toegankelijk. Of je nu werkt in logistiek, bij een internationaal bedrijf, of in de creatieve sector - onze foto's maken de juiste indruk.",
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

const LocalBredaSEO = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "AI Portret Pro - LinkedIn Profielfoto Breda",
        "image": "https://aiportretpro.nl/images/logo-icon.png",
        "@id": "https://aiportretpro.nl/linkedin-foto-laten-maken-breda#service",
        "url": "https://aiportretpro.nl/linkedin-foto-laten-maken-breda",
        "description": "Online service voor het laten maken van 40 professionele LinkedIn profielfoto's in Breda met AI. Binnen 15 minuten klaar voor slechts €29. Perfect voor Brabant professionals.",
        "priceRange": "€29",
        "address": { "@type": "PostalAddress", "addressLocality": "Breda", "addressCountry": "NL" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Breda Centrum" },
          { "@type": "AdministrativeArea", "name": "Ginneken" },
          { "@type": "AdministrativeArea", "name": "Prinsenbeek" },
          { "@type": "AdministrativeArea", "name": "Breda-Noord" },
          {
            "@type": "City",
            "name": "Breda",
            "sameAs": "https://www.wikidata.org/wiki/Q1009"
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
        "knowsAbout": ["LinkedIn profielfoto Breda", "Zakelijke foto Brabant", "Profielfoto zonder fotograaf Breda", "CV foto laten maken Breda"]
      })
    }}
  />
);

export default function LinkedInBredaPage() {
  const [isClient, setIsClient] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Dit is de 'magie': alleen true als je omhoog scrollt
      const scrollingUp = currentScrollY < lastScrollY && currentScrollY > 400

      setIsVisible(scrollingUp)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      <LocalBredaSEO />
      <FAQSchema faqs={faqData} city="Breda" />
            <SchemaMarkup type="city" city="Breda" url="https://aiportretpro.com/linkedin-foto-laten-maken-breda" />
      <Header />

      {/* Hero Container */}
      <div className="flex flex-col items-center justify-center pt-12 text-center px-4 w-full antialiased">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>AI Fotostudio Breda</span>
        </div>

        {/* Titel en Subtekst als één vloeiend geheel zonder extra witruimte */}
        <div className="flex flex-col items-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            40 zakelijke foto's van studio <br />
            kwaliteit,{" "}
            <span className="text-blue-900">zonder een fotograaf</span>
          </p>

          <p className="mt-2 text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-5xl">
            Ontvang binnen 15 minuten een volledige zakelijke fotoshoot voor
            LinkedIn en uw CV, <br />
            met de kwaliteit van een fotograaf maar zonder de reistijd of hoge
            kosten.
          </p>
        </div>

        {/* De knop sluit nu ook nauwer aan */}
        <div className="pt-8">
          <Link
            href="/login?callbackUrl=/payment"
            onClick={() => trackContact()}
            aria-label="Start jouw fotoshoot nu voor negenentwintig euro"
            className="w-full max-w-sm md:w-auto">
            <Button
              size="lg"
              className="gap-2 h-14 px-10 bg-blue-900 hover:bg-blue-800 text-white border-none shadow-xl transition-all text-base md:text-lg font-semibold w-full md:w-auto">
              <Camera className="w-5 h-5 md:w-6 md:h-6" />
              <span className="whitespace-nowrap">
                Start uw fotoshoot—{" "}
                <span className="line-through text-xs opacity-80 decoration-1">
                  € 29
                </span>
                € 19,99
              </span>
            </Button>
          </Link>

          <p className="mt-3 text-xs text-slate-600">
            Geen abonnement • Eenmalige betaling • 14 dagen geld terug
            garantie
          </p>
        </div>
      </div>

      {/* Photo Carousel - FIXED: Smooth continuous scrolling */}
      <section className="w-full overflow-hidden mt-8 md:mt-12 pb-0 md:pb-16 bg-white leading-none">
        {" "}
        <div className="relative">
          <div className="carousel-container">
            <div className="carousel-track">
              {galleryPhotos.map((photo, index) => (
                <div key={`carousel-${index}`} className="carousel-item">
                  <div className="relative">
                    <div
                      className="w-52 h-[13.33rem] md:w-80 md:h-[20rem] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shadow-md md:shadow-lg"
                      style={{ aspectRatio: "4/5" }}>
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

      {/* Target Professionals Section */}
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

      {/* SEO Content Section - Breda Specific */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-500 mb-6 text-center">Professionele LinkedIn Profielfoto Laten Maken in Breda: De Parel van het Zuiden in 2026            </h2>
            
            <div className="prose prose-sm md:prose-base max-w-none text-gray-400 md:text-gray-500 leading-relaxed space-y-4 md:space-y-6">
              <p className="text-sm md:text-base">
            Breda is de stad van Brabantse gezelligheid én zakelijke ambitie. Of je nu werkt in het Ginneken of op een van de bedrijventerreinen rond de A16, een professionele LinkedIn profielfoto is je digitale visitekaartje in 2026. Bespaar op een dure fotograaf in het centrum. In het zakelijke jaar 2026 staat Breda bekend als een stad waar Brabantse gastvrijheid en krachtig ondernemerschap naadloos in elkaar overvloeien. Als professional in de Parel van het Zuiden begrijp je dat persoonlijke relaties de basis vormen van succes, maar dat de eerste vonk van die connectie tegenwoordig vrijwel altijd online overspringt. Je LinkedIn profielfoto is in deze warme, maar uiterst professionele omgeving je digitale handdruk. Een professionele LinkedIn profielfoto laten maken in Breda is in 2026 dan ook essentieel om je persoonlijke gunfactor te combineren met een overtuigende zakelijke uitstraling.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Brabantse ondernemersgeest ontmoet innovatieve AI-technologie</h2>
              
              <p className="text-sm md:text-base">
            De ruim 95.000 LinkedIn-professionals in Breda waarderen een eerlijke en efficiënte aanpak. In een stad waar vertrouwen en persoonlijk contact centraal staan, kiezen steeds meer ondernemers en werknemers voor de moderne weg van AI-fotografie. Waar een traditionele fotograaf in de regio voorheen tussen de honderdvijfenzestig en honderdnegentig euro rekende, biedt AI Portret Pro een toegankelijk alternatief dat perfect past bij de Bredase levensstijl. Voor het vaste tarief van negenentwintig euro ontvang je 40 professionele profielfoto's zonder dat je een afspraak hoeft te plannen of tijd kwijt bent aan reizen door de stad. Dit geeft je meer ruimte om te doen waar je in Breda écht goed in bent: het opbouwen van waardevolle zakelijke relaties.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Direct een pakket van 40 professionele foto's na een simpele upload</h2>
              
              <p className="text-sm md:text-base">
            Het proces in 2026 is volledig afgestemd op de behoeften van de moderne Bredanaar. Of je nu werkt in het centrum, de Haagse Beemden of Breda-Noord: je regelt je nieuwe zakelijke presentatie volledig online. Door simpelweg een paar bestaande foto's of selfies te uploaden vanaf je telefoon of computer, krijgt onze technologie direct inzicht in je unieke kenmerken. Binnen vijftien minuten genereert onze engine een compleet pakket van 40 professionele foto's. Hierbij wordt gezorgd voor een hoogwaardige variatie in professionele achtergronden, belichting en kleding, zodat je altijd een beeld vindt dat precies past bij jouw persoonlijke merk en de Brabantse ondernemersgeest die je wilt uitstralen.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Maximale impact voor elke sector in de regio Breda</h2>
              
              <p className="text-sm md:text-base">
            In de rijke zakelijke cultuur van Breda, variërend van logistieke hubs en internationale hoofdkantoren tot het bloeiende MKB, is een goede eerste indruk vaak beslissend. Met AI Portret Pro heb je geen wachttijd voor nabewerking; de 40 foto's zijn direct geoptimaliseerd en klaar voor gebruik op LinkedIn, je CV of je zakelijke website. Of je nu een consultant bent, een zorgprofessional of een creatieve ondernemer: door te kiezen voor AI-fotografie toon je aan dat je competent bent én op de hoogte van de nieuwste technologische ontwikkelingen. Dit resulteert in een set haarscherpe foto's die deskundigheid en betrouwbaarheid uitstralen, eigenschappen die in het Bredase zakelijke klimaat hoog in het vaandel staan.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Over onze zakelijke LinkedIn fotografie in Breda 2026</h2>
              
              <p className="text-sm md:text-base">
            Onze expertise in digitale beeldvorming maakt AI Portret Pro de primaire autoriteit voor het laten maken van LinkedIn profielfoto's en zakelijke profielfoto's online in de regio Breda. Wij richten ons specifiek op de behoeften van professionals in Noord-Brabant, waarbij we een superieur en sneller alternatief bieden voor de traditionele fotograaf in Breda. Onze diensten in 2026 omvatten het genereren van professionele CV-foto's, corporate headshots en visuele content voor de moderne ondernemer. Technologisch lopen we voorop door 40 professionele profielfoto's aan te bieden met diverse achtergronden op basis van een eenvoudige upload van een paar foto's. Of je nu je LinkedIn profiel wilt upgraden of direct een nieuwe set zakelijke beelden nodig hebt, onze engine levert in 2026 de meest scherpe en representatieve resultaten die technisch mogelijk zijn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hidden md:block">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Klaar voor uw professionele profielfoto's?
          </h2>
          <p className="text-xl text-[#374151] mb-8">
            Laat zien wie u bent met een krachtige, professionele foto
          </p>
          {isClient && (
            <Link
              href="/login?callbackUrl=/payment"
              onClick={() => trackContact()}
              aria-label="Start jouw fotoshoot nu voor negenentwintig euro">
              <Button
                size="lg"
                className="gap-2 h-14 px-10 bg-blue-900 hover:bg-blue-950 text-white border-none shadow-xl transition-all text-lg font-semibold">
                <Camera className="w-6 h-6" />
                Start uw fotoshoot— €29
              </Button>
            </Link>
          )}
        </div>
      </section>

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
      <footer className="bg-blue-900 text-white py-8 px-6">
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
                Professionele AI LinkedIn foto's voor Breda professionals.
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
                <Link href="/linkedin-foto-laten-maken-breda" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Breda
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
        <div className="fixed bottom-4 left-4 right-4 z-[2147483647] md:hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <Button
              asChild
              size="lg"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white px-6 py-8 text-base font-black"
              style={{ textShadow: "0 0 1px white" }}>
              <Link
                href="/login?callbackUrl=/payment"
                aria-label="Start nu voor negentien euro negenennegentig">
                <span className="flex items-center justify-center gap-2">
                  <span>Start nu:</span>
                  <span className="line-through text-xs opacity-80 decoration-1">
                    € 29
                  </span>
                  <span className="text-lg">€ 19,99</span>
                  <ArrowRight className="ml-2 h-6 w-6" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      )}

{/* Inline Styles for Animation */}

      {/* Footer Breadcrumb Navigation */}
      <Breadcrumb items={[
        { label: "LinkedIn Fotografie", href: "/linkedin-foto-laten-maken" },
        { label: "Breda" }
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