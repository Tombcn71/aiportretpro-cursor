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
import Breadcrumb from "@/components/breadcrumb"
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

export default function LinkedInBredaPage() {
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
      <ReviewSchema businessName="AI Portret Pro" city="Breda" />
            <SchemaMarkup type="city" city="Breda" url="https://aiportretpro.com/linkedin-foto-laten-maken-breda" />
      <Header />
      {/* Hero Section - Breda Specific */}
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
          <p className="text-sm md:text-base text-gray-700">🎉 Meer dan 1200 professionals geholpen</p>
        </div>
        
        <h1 className="tracking-tight text-xl md:text-4xl font-bold mb-6 leading-tight">
          <span className="block">Professionele foto voor LinkedIn laten maken in Breda? </span>
          <span className="text-[#0077B5] block">Dit kan nu ook online zonder fotograaf!</span>
        </h1>
        <p className="text-gray-500 text-lg mb-6 font-light italic">Even wat foto's uploaden, dat is alles.

</p>

        <div className="text-md md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-center">
          <div className="inline-grid grid-cols-[auto_1fr] gap-x-2 items-start text-start justify-center">
            <span className="text-center">✅</span>
            <span>6 x goedkoper dan een fotograaf</span>
            <span className="text-center">✅</span>
            <span>Niet te onderscheiden van echte foto's</span>
            <span className="text-center">✅</span>
            <span>Gebruikt door 1200+ tevreden klanten</span>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className=" bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 md:px-10 py-8 md:py-8 text-base md:text-lg mb-3 md:max-w-sm"
        >
          <Link href="/pricing">
            <LinkedinIcon className="mr-2 h-5 md:h-6 w-5 md:w-6" />
            Start je LinkedIn fotoshoot breda - € 29 <ArrowRight className="ml-2 h-6 md:h-7 w-6 md:w-7" />
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
                        alt={`LinkedIn portret voorbeeld ${index + 1}`}
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
                        alt={`LinkedIn portret voorbeeld ${index + 1}`}
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
      <section id="hoe-het-werkt" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">Zo werkt het</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0077B5] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload je foto's</h3>
              <p className="text-gray-600">
                Upload minimaal 6 foto's van jezelf met verschillende uitdrukkingen en achtergronden
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0077B5] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI doet zijn werk</h3>
              <p className="text-gray-600">
                Onze AI analyseert je foto's en maakt professionele portretten in verschillende stijlen
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0077B5] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download je foto's</h3>
              <p className="text-gray-600">Ontvang 40 professionele foto's in hoge resolutie binnen 15 minuten</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews en Voorbeelden */}
      <ReviewsEnVoorbeelden />

      {/* Resultaten Sectie */}
      <section id="voorbeelden" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
            Bekijk de resultaten van AI Portret Pro
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(isMobile ? galleryPhotos.slice(-6) : galleryPhotos.slice(0, 12)).map((photo, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <Image src={photo || "/placeholder.svg"} alt={`Voorbeeld ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI vs Traditional Comparison */}
      <section className="py-16 bg-gradient-to-r from-[#0077B5]/5 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              AI fotografie vs. traditionele fotograaf
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Waarom je hierna niet meer naar een fotostudio hoeft te gaan
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional Photography */}
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Traditionele Fotograaf</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">€180+ per sessie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Halve dag kwijt + reistijd</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">5-10 foto's maximum</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Wachten op afspraak</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Stress voor de camera</span>
                  </div>
                </div>
              </div>

              {/* AI Photography */}
              <div className="bg-[#0077B5] p-8 rounded-lg text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  POPULAIR
                </div>
                <h3 className="text-2xl font-semibold mb-6">AI Portret Pro</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Slechts €29 totaal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>15 minuten resultaat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>40 professionele variaties</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Direct beschikbaar 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Gewoon thuis op je bank</span>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

     

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Wat professionals zeggen over hun AI LinkedIn foto's
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Vele professionals gingen je voor
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">SB</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah B.</h4>
                  <p className="text-sm text-gray-600">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Binnen 2 weken na het plaatsen van mijn nieuwe AI LinkedIn foto kreeg ik 3 aanvragen van recruiters. De kwaliteit is echt indrukwekkend!"
              </p>
              <div className="flex text-yellow-400">
                {"★".repeat(5)}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">MH</span>
                </div>
                <div>
                  <h4 className="font-semibold">Mark H.</h4>
                  <p className="text-sm text-gray-600">IT Consultant</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Veel beter dan verwacht! Niemand kan zien dat het AI is. Heb de oude fotostudio foto's direct vervangen."
              </p>
              <div className="flex text-yellow-400">
                {"★".repeat(5)}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">LV</span>
                </div>
                <div>
                  <h4 className="font-semibold">Lisa V.</h4>
                  <p className="text-sm text-gray-600">Financial Advisor</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "40 foto's voor €29? Dit kost bij een fotograaf makkelijk €300+. Super tevreden met de professionele uitstraling."
              </p>
              <div className="flex text-yellow-400">
                {"★".repeat(5)}
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
            Start binnen 5 minuten en ontvang 40 professionele LinkedIn foto's binnen 15 minuten.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white text-[#0077B5] hover:bg-gray-100 text-lg px-8 py-4 mr-4 mb-4 md:mb-0"
          >
            <Link href="/pricing">
              <LinkedinIcon className="mr-2 h-5 w-5" />
              Start nu voor €29
            </Link>
          </Button>

          <p className="text-sm opacity-75 mt-4">✓ 14-dagen geld terug garantie ✓ Binnen 15 minuten klaar</p>
        </div>
      </section>

      {/* SEO Content Section - Breda Specific */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">LinkedIn foto laten maken Breda: Professionele fotoshoot Parel van het Zuiden</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Zoek je een professionele LinkedIn foto Breda? Als Parel van het Zuiden heeft Breda duizenden professionals die Brabantse gastvrijheid combineren met zakelijk ondernemerschap. Een zakelijk portret Breda is essentieel voor je carrière in deze warme maar professionele omgeving. Onze LinkedIn fotoshoot Breda service helpt professionals hun Brabantse ondernemersgeest tonen.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Speciaal voor Breda</h4>
            <p className="text-gray-700">
              Als Bredanaar weet je dat persoonlijk contact belangrijk is, maar online beginnen steeds meer connecties. 
              Of je nu solliciteert, als ondernemer nieuwe klanten zoekt, of je netwerk uitbreidt - 
              een professionele LinkedIn foto maakt een goede eerste indruk voordat je iemand ontmoet.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">LinkedIn foto Breda: Brabantse gastvrijheid meets moderne technologie</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Breda's 95.000 LinkedIn professionals combineren Brabantse warmte met zakelijk professionalisme. In een stad waar persoonlijke relaties tellen, begint die connectie vaak online. Met AI fotografie krijg je voor €29 meteen 40 professionele foto's - een fractie van de €165-190 die Bredase fotografen vragen. Upload je foto's als het jou uitkomt, ontvang binnen 15 minuten resultaat, en investeer de rest van je tijd in het opbouwen van échte connecties. Dat is toch waar het in Breda om draait?
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Profielfoto LinkedIn Breda: Waarom het cruciaal is</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            In Breda's rijke zakelijke cultuur is een goede LinkedIn foto laten maken Breda essentieel. Met veel midden- en kleinbedrijf en internationale hoofdkantoren zoeken recruiters dagelijks naar talent, en je profielfoto LinkedIn Breda is vaak de eerste indruk. Een professionele portretfotografie Breda sessie kan het verschil maken tussen opvallen of onderbelicht blijven.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Voor Bredase professionals betekent dit concreet: meer zichtbaarheid bij recruiters in de regio, betere kansen in de lokale zakelijke gemeenschap, en sterker netwerken in Noord-Brabant. Je LinkedIn foto is je digitale handdruk in een stad waar persoonlijke contacten en vertrouwen essentieel zijn.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">AI fotografie: De toekomst van LinkedIn foto's</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Traditioneel betekende een professionele LinkedIn foto maken in Breda: een fotograaf zoeken, een afspraak inplannen (vaak weken later), door de stad reizen, en €200-300 betalen voor enkele foto's. Onze AI-technologie verandert dit volledig.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Met AI fotografie upload je gewoon 6 selfies vanuit je huis in Breda - of het nu in het centrum, Breda Noord, of de Haagse Beemden is - en ontvang je binnen 15 minuten 40 professionele LinkedIn foto's. Geen parkeerkosten, geen reistijd, geen wachten op de fotograaf. Perfect voor de Brabantse levensstijl van Breda.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Voordelen voor Bredase professionals</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Tijdsbesparing</h4>
              <p className="text-gray-700">Geen reistijd door Breda, geen parkeergedoe, geen wachten in fotostudio's. Maak je foto's tussen twee meetings door.</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Kostenbesparing</h4>
              <p className="text-gray-700">€29 voor 40 foto's versus €225 gemiddeld bij Bredase fotografen. Ideaal voor startups en freelancers.</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Flexibiliteit</h4>
              <p className="text-gray-700">24/7 beschikbaar, perfect voor de flexibele werkstijl van moderne Bredase professionals.</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Variatie</h4>
              <p className="text-gray-700">40 verschillende foto's om uit te kiezen, verschillende stijlen en achtergronden voor diverse doeleinden.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect voor alle Bredase sectoren</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Of je nu werkt in het bedrijfsleven, de tech sector, de zorg, of logistiek - onze AI leert je unieke kenmerken en creëert foto's die passen bij jouw professionele omgeving in Breda. Van corporate tot startup, van consultant tot ondernemer.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Breda is een Brabantse stad waar professionals hun warme netwerk combineren met LinkedIn. Een professionele foto toont niet alleen je competentie, maar ook dat je up-to-date bent met moderne technologieën - een eigenschap die in Breda's Brabantse ondernemersgeest zeer gewaardeerd wordt.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Klaar voor je LinkedIn succes in Breda?</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Doe wat vele professionals al deden: upgrade je LinkedIn profiel met AI-gegenereerde foto's. In een stad als Breda, waar innovatie en efficiëntie centraal staan, is dit de logische volgende stap voor je professionele ontwikkeling.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Start vandaag nog</h4>
            <p className="text-gray-700 mb-4">
              Sluit je aan bij Bredase professionals die de voordelen van AI fotografie al ontdekten. Krijg binnen 15 minuten 40 professionele LinkedIn foto's.
            </p>
            <Button asChild className="bg-[#0077B5] hover:bg-[#005885]">
              <Link href="/pricing">
                Begin nu je LinkedIn fotoshoot breda →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Enhancement */}
      <SEOContentBlock city="Breda" showLocalKeywords={true} />

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
        <div className="fixed bottom-4 left-4 right-4 z-[2147483647] md:hidden">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <p className="text-center text-md font-bold text-gray-800 mb-4 mt-4">
              Doe direct jouw LinkedIn fotoshoot breda online, makkelijk vanuit thuis zonder gedoe!
            </p>
            <Button
              asChild
              size="lg"
              className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 py-8 text-base font-semibold"
            >
              <Link href="/pricing">
                <LinkedinIcon className="mr-2 h-5 w-5" />
                LinkedIn fotoshoot breda - € 29 <ArrowRight className="ml-2 h-6 md:h-7 w-6 md:w-7" />
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