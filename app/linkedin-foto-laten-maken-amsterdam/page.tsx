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

// LinkedIn-specific FAQ data with SEO keywords - Amsterdam specific
const faqData = [
  {
    question: "Waarom zijn AI LinkedIn profielfoto's een goede keuze voor Amsterdammers?",
    answer:
      "Amsterdam heeft meer dan 450.000 LinkedIn professionals die actief zijn in tech, finance, en creatieve sectoren. Traditionele fotograaf tarieven in Amsterdam liggen tussen €150-€400, terwijl onze AI service slechts €29 kost. Voor drukke Amsterdamse professionals is dit een snelle, betaalbare oplossing zonder in te leveren op kwaliteit.",
  },
  {
    question: "Wat maakt een perfecte LinkedIn profielfoto?",
    answer:
      "De perfecte LinkedIn profielfoto is professioneel, helder en vertrouwenwekkend. Key elementen zijn: gezicht vult 60% van de foto, professionele kleding, neutrale achtergrond, natuurlijke glimlach, en goede belichting. Onze AI genereert automatisch LinkedIn-geoptimaliseerde foto's die voldoen aan alle LinkedIn richtlijnen en best practices.",
  },
  {
    question: "Kan ik mijn LinkedIn profielfoto laten maken zonder naar een fotostudio in Amsterdam te gaan?",
    answer:
      "Ja! Dat is precies waar onze service voor is. Geen afspraak maken, geen reizen door Amsterdam, geen wachttijden. Upload gewoon je foto's vanuit huis of kantoor, en binnen 15 minuten heb je 40 professionele LinkedIn profielfoto's klaar. Perfect voor drukke Amsterdamse professionals die geen tijd hebben voor een fysieke fotoshoot.",
  },
  {
    question: "Hoeveel LinkedIn profielfoto's krijg ik en hoe snel zijn ze klaar?",
    answer:
      "Je ontvangt 40 verschillende professionele LinkedIn profielfoto variaties binnen 15 minuten. Alle profielfoto's zijn geoptimaliseerd voor LinkedIn's specificaties (minimaal 400x400 pixels) en perfect bruikbaar voor je LinkedIn profiel, website, email handtekening en andere professionele doeleinden.",
  },
  {
    question: "Zijn de AI-gegenereerde LinkedIn profielfoto's even professioneel als studio foto's?",
    answer:
      "Absoluut! Onze AI is gespecialiseerd in het creëren van studio-kwaliteit LinkedIn profielfoto's. Ze zijn onherkenbaar van traditionele fotograaf foto's maar dan 6 x goedkoper en binnen 15 minuten klaar. Perfect voor professionals die snel een professionele LinkedIn profielfoto nodig hebben zonder de hoge kosten van een fotostudio.",
  },
  {
    question: "Werken jullie LinkedIn profielfoto's goed voor de Amsterdamse zakelijke markt?",
    answer:
      "Zeker! Amsterdam is een internationale business hub met professionals uit tech (Booking.com, TomTom), finance (ING, ABN AMRO), en startups. Onze LinkedIn profielfoto's zijn perfect geschikt voor deze diverse zakelijke omgeving. Of je nu werkt in de Zuidas, het centrum, of Amsterdam Noord - onze profielfoto's maken de juiste professionele indruk.",
  },
  {
    question: "Kan ik de LinkedIn profielfoto's ook gebruiken voor andere professionele doeleinden?",
    answer:
      "Zeker! Hoewel geoptimaliseerd voor LinkedIn, zijn alle profielfoto's perfect bruikbaar voor je zakelijke website, email handtekening, corporate presentaties, persberichten, en andere professionele toepassingen. Je hebt volledige commerciële rechten op alle profielfoto's.",
  }
]

const LocalAmsterdamSEO = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "AI Portret Pro - LinkedIn Profielfoto Amsterdam",
        "image": "https://aiportretpro.nl/images/logo-icon.png",
        "@id": "https://aiportretpro.nl/linkedin-foto-laten-maken-amsterdam#service",
        "url": "https://aiportretpro.nl/linkedin-foto-laten-maken-amsterdam",
        "description": "Online service voor het laten maken van 40 professionele LinkedIn profielfoto's in Amsterdam met AI. Binnen 15 minuten klaar voor slechts €29. Perfect voor Zuidas, Centrum en Amsterdam-Noord professionals.",
        "priceRange": "€29",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Amsterdam",
          "addressCountry": "NL"
        },
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": "Zuidas",
            "sameAs": "https://www.wikidata.org/wiki/Q727"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Amsterdam-Centrum"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Sloterdijk"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Amsterdam-Noord"
          },
          {
            "@type": "City",
            "name": "Amsterdam",
            "sameAs": "https://www.wikidata.org/wiki/Q727"
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
        "knowsAbout": ["LinkedIn profielfoto Amsterdam", "Zakelijke foto Zuidas", "Profielfoto zonder fotograaf Amsterdam", "AI business headshots consultancy"]
      })
    }}
  />
);

export default function LinkedInAmsterdamPage() {
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
      <LocalAmsterdamSEO />
      <SchemaMarkup type="city" city="Amsterdam" url="https://aiportretpro.com/linkedin-foto-laten-maken-amsterdam" />
      <FAQSchema faqs={faqData} city="Amsterdam" />
      <Header />

      {/* Hero Container */}
      <div className="flex flex-col items-center justify-center pt-12 text-center px-4 w-full antialiased">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>AI Fotostudio Amsterdam</span>
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
                {openFaqIndex === index && (
                  <div className="mt-4 text-[#374151] text-sm md:text-base leading-relaxed">{faq.answer}</div>
                )}
              </button>
            </div>
          ))}
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

      {/* SEO Content Section - Amsterdam Specific */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-left md:text-center leading-tight">
              Professionele LinkedIn Profielfoto Laten Maken in Amsterdam: De Slimme Keuze voor 2026
            </h1>
            
            <div className="prose prose-sm md:prose-base max-w-none text-gray-400 md:text-gray-500 leading-relaxed space-y-4 md:space-y-6">
              <p className="text-sm md:text-base">
            In de dynamische zakenwereld van de Amsterdamse Zuidas en de tech-hubs in Noord, is een sterke LinkedIn profielfoto jouw belangrijkste digitale visitekaartje in 2026. Amsterdam fungeert onverminderd als het economische en innovatieve hart van Nederland, waar de dynamiek van de zakelijke markt vraagt om een onberispelijke digitale presentatie. In een omgeving waar dagelijks duizenden professionals strijden om de beste posities, is je LinkedIn profiel het cruciale fundament voor netwerken, carrièrekansen en bedrijfsgroei. Een professionele LinkedIn profielfoto laten maken in Amsterdam is in het huidige jaar het verschil tussen opvallen bij topwerkgevers of onzichtbaar blijven in de massa. Voor de Amsterdamse professional die begrijpt dat een sterke online aanwezigheid essentieel is, biedt AI Portret Pro de meest geavanceerde oplossing om je digitale handdruk te perfectioneren.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">De verschuiving naar AI-fotografie in de Amsterdamse zakelijke wereld</h2>
              
              <p className="text-sm md:text-base">
            Met meer dan 450.000 actieve professionals op LinkedIn in de regio Amsterdam is de concurrentie groter dan ooit. Waar een traditionele fotoshoot in de stad voorheen gepaard ging met hoge kosten tussen de honderdvijfenzestig en tweehonderdvijftig euro, biedt onze AI-technologie in 2026 een efficiënt alternatief. Amsterdamse professionals kiezen massaal voor deze methode omdat het de noodzaak wegneemt om door de drukke binnenstad te reizen of hoge parkeerkosten te betalen bij studio's in Oud-Zuid of de Pijp. Binnen vijftien minuten genereert onze engine resultaten van studiokwaliteit tegen een fractie van de prijs, wat essentieel is voor de snelle levensstijl die de hoofdstad kenmerkt.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Maximale impact op de Zuidas, in de Jordaan en Amsterdam-Noord</h2>
              
              <p className="text-sm md:text-base">
            In een competitieve markt waar de hoofdkantoren van internationale giganten op de Zuidas en innovatieve tech-bedrijven in Amsterdam-Noord gevestigd zijn, is je eerste indruk vaak beslissend. Onderzoek in 2026 bevestigt dat profielen met een professionele, AI-gegenereerde foto veertien keer vaker bekeken worden. Of je nu op zoek bent naar een senior positie in de financiële sector, een creatieve rol in de Jordaan, of een technische functie bij een startup, onze technologie past de belichting en achtergrond aan op jouw specifieke sector. Door simpelweg zes selfies te uploaden vanaf je eigen werkplek, creëert de AI veertig verschillende variaties die naadloos aansluiten bij de internationale standaarden van de Amsterdamse zakenwereld.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Innovatie en efficiëntie voor de moderne hoofdstad</h2>
              
              <p className="text-sm md:text-base">
            Traditionele fotografie in Amsterdam betekende vroeger weken wachten op een afspraak en de uiteindelijke nabewerking. In 2026 is die tijd voorbij. Onze virtuele fotostudio is vierentwintig uur per dag beschikbaar, wat perfect aansluit bij de flexibele werkstijl van moderne freelancers, consultants en ondernemers. Je bespaart niet alleen ruim honderdvijftig euro per sessie, maar krijgt ook direct de beschikking over een diverse set foto's voor LinkedIn, CV's en bedrijfswebsites. Amsterdam is een stad waar innovatie wordt gewaardeerd; door te kiezen voor AI-fotografie toon je aan dat je vooroploopt in digitale ontwikkelingen, een eigenschap die door werkgevers in de zorg, tech en logistiek rondom Schiphol hoog wordt ingeschat.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">Over onze zakelijke LinkedIn fotografie in Amsterdam 2026</h2>
              
              <p className="text-sm md:text-base">
                Onze expertise op het gebied van digitale zakelijke fotografie maakt AI Portret Pro de primaire bron voor Amsterdamse professionals die hun profiel willen optimaliseren. Wij zijn gespecialiseerd in het laten maken van LinkedIn profielfoto's en zakelijke profielfoto's online, met een specifieke focus op de Amsterdamse markt van de Zuidas tot de creatieve industrie in West. Onze diensten in 2026 omvatten het genereren van corporate headshots, professionele CV-foto's en visuele content voor internationale bedrijfswebsites. Technologisch lopen we voorop met AI-fotografie die specifiek is getraind voor de zakelijke standaarden van de hoofdstad, waardoor we een superieur en sneller alternatief bieden voor de traditionele fotograaf in Amsterdam. Of je nu een LinkedIn profielfoto upgrade zoekt of een volledige virtuele fotoshoot nodig hebt, onze studio levert in 2026 de meest scherpe en representatieve resultaten die technisch haalbaar zijn.
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
                Professionele AI LinkedIn foto's voor Amsterdam professionals.
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
        { label: "Amsterdam" }
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