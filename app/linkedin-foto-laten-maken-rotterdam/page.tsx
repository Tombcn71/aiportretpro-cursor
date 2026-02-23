"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  Check,
  LinkedinIcon,
  Sparkles,
  Camera,
} from "lucide-react";
import Header from "@/components/header";
import { Facebook, Instagram } from "lucide-react";
import HowItWorks from "@/components/how-it-works";
import SchemaMarkup from "@/components/schema-markup";
import FAQSchema from "@/components/faq-schema";
import Breadcrumb from "@/components/breadcrumb";
// Gallery photos: All images from the shoot folder (1.png through 26.png)
const galleryPhotos = Array.from(
  { length: 26 },
  (_, i) => `/images/shoot/${i + 1}.png`,
);

const companies = [
  {
    name: "Microsoft",
    logo: "/placeholder.svg?height=40&width=120&text=Microsoft",
  },
  { name: "Google", logo: "/placeholder.svg?height=40&width=120&text=Google" },
  { name: "Apple", logo: "/placeholder.svg?height=40&width=120&text=Apple" },
  { name: "Amazon", logo: "/placeholder.svg?height=40&width=120&text=Amazon" },
  { name: "Meta", logo: "/placeholder.svg?height=40&width=120&text=Meta" },
  {
    name: "Netflix",
    logo: "/placeholder.svg?height=40&width=120&text=Netflix",
  },
  { name: "Tesla", logo: "/placeholder.svg?height=40&width=120&text=Tesla" },
  {
    name: "Spotify",
    logo: "/placeholder.svg?height=40&width=120&text=Spotify",
  },
];

// LinkedIn-specific FAQ data with SEO keywords - Rotterdam specific
const faqData = [
  {
    question:
      "Waarom zijn AI LinkedIn foto's een goede keuze voor Rotterdammers?",
    answer:
      "Rotterdam is de grootste havenstad van Europa met meer dan 320.000 LinkedIn professionals in logistiek, maritieme sector, en innovatie. Traditionele fotostudio's in Rotterdam vragen €150-€350 per sessie, terwijl onze AI service slechts €19.99 kost. Voor Rotterdamse zakenmensen past dit perfect bij de efficiënte, no-nonsense mentaliteit van de stad.",
  },
  {
    question: "Wat maakt een perfecte LinkedIn profielfoto?",
    answer:
      "De perfecte LinkedIn profielfoto is professioneel, helder en vertrouwenwekkend. Key elementen zijn: gezicht vult 60% van de foto, professionele kleding, neutrale achtergrond, natuurlijke glimlach, en goede belichting. Onze AI genereert automatisch LinkedIn-geoptimaliseerde foto's die voldoen aan alle LinkedIn richtlijnen en best practices.",
  },
  {
    question: "Past een AI LinkedIn foto bij de Rotterdamse zakelijke cultuur?",
    answer:
      "Absoluut! Rotterdam staat bekend om zijn pragmatische, no-nonsense mentaliteit. Onze AI LinkedIn foto's passen perfect bij deze cultuur: efficiënt, betaalbaar, en professioneel. Of je nu werkt in de haven, bij Unilever, Coolblue, of een startup - onze foto's maken de juiste zakelijke indruk zonder poespas.",
  },
  {
    question: "Hoeveel LinkedIn foto's krijg ik en hoe snel zijn ze klaar?",
    answer:
      "Je ontvangt 40 verschillende professionele LinkedIn profielfoto variaties binnen 15 minuten. Alle foto's zijn geoptimaliseerd voor LinkedIn's specificaties (minimaal 400x400 pixels) en perfect bruikbaar voor je LinkedIn profiel, website, email handtekening en andere professionele doeleinden.",
  },
  {
    question:
      "Zijn de AI-gegenereerde LinkedIn foto's even professioneel als studio foto's?",
    answer:
      "Absoluut! Onze AI is gespecialiseerd in het creëren van studio-kwaliteit LinkedIn profielfoto's. Ze zijn onherkenbaar van traditionele fotograaf foto's maar dan 6 x goedkoper en binnen 15 minuten klaar. Perfect voor professionals die snel een professionele LinkedIn foto nodig hebben zonder de hoge kosten van een fotostudio.",
  },
  {
    question:
      "Voldoen de foto's aan alle LinkedIn richtlijnen en specificaties?",
    answer:
      "Ja, alle LinkedIn foto's voldoen volledig aan LinkedIn's community richtlijnen en technische specificaties. Ze zijn professioneel, passend gekleed, en geoptimaliseerd voor maximale impact op het LinkedIn platform. Je kunt ze direct uploaden als LinkedIn profielfoto zonder zorgen over policy violations.",
  },
  {
    question:
      "Kan ik de LinkedIn foto's ook gebruiken voor andere professionele doeleinden?",
    answer:
      "Zeker! Hoewel geoptimaliseerd voor LinkedIn, zijn alle foto's perfect bruikbaar voor je zakelijke website, email handtekening, corporate presentaties, persberichten, en andere professionele toepassingen. Je hebt volledige commerciële rechten op alle foto's.",
  },
];

const LocalRotterdamSEO = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "AI Portret Pro - LinkedIn Profielfoto Rotterdam",
        image: "https://aiportretpro.nl/images/logo-icon.png",
        "@id":
          "https://aiportretpro.nl/linkedin-foto-laten-maken-rotterdam#service",
        url: "https://aiportretpro.nl/linkedin-foto-laten-maken-rotterdam",
        description:
          "Online service voor het laten maken van 40 professionele LinkedIn profielfoto's in Rotterdam met AI. Binnen 15 minuten klaar voor slechts €19.99. Perfect voor Kop van Zuid, haven en logistiek professionals.",
        priceRange: "€19.99",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rotterdam",
          addressCountry: "NL",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kop van Zuid" },
          { "@type": "AdministrativeArea", name: "Scheepvaartkwartier" },
          { "@type": "AdministrativeArea", name: "Waalhaven" },
          { "@type": "AdministrativeArea", name: "Kralingen" },
          {
            "@type": "City",
            name: "Rotterdam",
            sameAs: "https://www.wikidata.org/wiki/Q34370",
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1200",
          bestRating: "5",
          worstRating: "1",
        },
        knowsAbout: [
          "LinkedIn profielfoto laten maken Rotterdam",
          "Zakelijke foto voor CV Rotterdam",
          "Profielfoto zonder fotograaf havenlogistiek",
          "Nieuwe LinkedIn foto maken AI",
          "Profielfoto zonder fotograaf",
        ],
      }),
    }}
  />
);

export default function LinkedInRotterdamPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    // Return undefined (no cleanup function needed)
    return undefined;
  }, []);

  useEffect(() => {
    setIsClient(true);
    // Return undefined (no cleanup function needed)
    return undefined;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Dit is de 'magie': alleen true als je omhoog scrollt
      const scrollingUp = currentScrollY < lastScrollY && currentScrollY > 400;

      setIsVisible(scrollingUp);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <LocalRotterdamSEO />
      <FAQSchema faqs={faqData} city="Rotterdam" />
      <SchemaMarkup
        type="city"
        city="Rotterdam"
        url="https://aiportretpro.com/linkedin-foto-laten-maken-rotterdam"
      />
      <Header />

      {/* Hero Container */}
      <div className="flex flex-col items-center justify-center pt-12 text-center px-4 w-full antialiased">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>AI Fotostudio Rotterdam</span>
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
                  € 19.99
                </span>
                € 14.99
              </span>
            </Button>
          </Link>

          <p className="mt-3 text-xs text-slate-600">
            Geen abonnement • Eenmalige betaling • perfecte profiel afmetingen
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
          Veelgestelde Vragen
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          Hier beantwoorden we de meest voorkomende vragen over LinkedIn
          profielfoto's
        </p>
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full bg-white rounded-lg p-4 md:p-6 text-left hover:shadow-md transition-shadow duration-200 border border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#0077B5] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#0077B5] flex-shrink-0" />
                  )}
                </div>
                {openFaqIndex === index && (
                  <div className="mt-4 text-[#374151] text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
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
              Van ambitieuze starters tot ervaren leiders - onze AI helpt elke
              professional hun LinkedIn impact te maximaliseren
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#0077B5] p-3 rounded-lg flex-shrink-0">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">
                      ZZP'ers & Ondernemers
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Jij bent je eigen merk. Stop met amateuristische selfies
                      en laat zien dat je serieus bent. Onze AI creëert foto's
                      die vertrouwen wekken bij potentiële klanten.
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
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">
                      Sollicitanten & Carrièrestarters
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Recruiters scrollen door honderden profielen. Een sterke
                      foto zorgt ervoor dat je opvalt en uitgenodigd wordt voor
                      gesprekken - geen wegkijken meer.
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
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">
                      Young Professionals
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Jouw generatie snapt de kracht van social media. Zorg dat
                      senior professionals je willen connecten - niet wegklikken
                      omdat je foto niet professioneel genoeg is.
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
                    <h3 className="text-xl font-bold mb-2 text-[#0077B5]">
                      Managers & Leidinggevenden
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Jouw leidinggevende positie verdient een foto die
                      autoriteit uitstraalt. Geen tijd voor fotoshoots? Onze AI
                      begrijpt executive presence.
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

      {/* SEO Content Section - Rotterdam Specific */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-left md:text-center leading-tight">
              Professionele LinkedIn Profielfoto Laten Maken in Rotterdam: De
              No-Nonsense Keuze voor 2026
            </h1>

            <div className="prose prose-sm md:prose-base max-w-none text-gray-400 md:text-gray-500 leading-relaxed space-y-4 md:space-y-6">
              <p className="text-sm md:text-base">
                In het zakelijke hart van Nederland, van de Kop van Zuid tot de
                Waalhaven, is stilstaan geen optie. In 2026 is je digitale
                aanwezigheid in de Rotterdamse haven- en techsector belangrijker
                dan ooit. Een professionele LinkedIn foto laten maken in
                Rotterdam hoeft geen middag te kosten bij een fotograaf in het
                centrum. Met AI Portret Pro kies je voor de Rotterdamse aanpak:
                efficiënt, kwalitatief hoogstaand en zonder onnodige kosten. Of
                je nu op de Coolsingel werkt of in de logistiek op de
                Maasvlakte, wij zorgen dat je digitale handdruk staat als een
                huis. Rotterdam versterkt in 2026 zijn positie als de
                internationale handelsmetropool van Europa, waar een sterke
                digitale aanwezigheid essentieel is voor elke professional. Of
                je nu werkzaam bent in de maritieme sector op de Maasvlakte, de
                logistieke ketens aanstuurt of je carrière opbouwt in de
                financiële dienstverlening rondom de Coolsingel: je LinkedIn
                profielfoto is je belangrijkste visitekaartje. Een professionele
                LinkedIn profielfoto laten maken in Rotterdam is in het huidige
                zakelijke klimaat van 2026 de meest effectieve manier om je
                no-nonsense mentaliteit en vakmanschap te tonen aan een
                wereldwijd netwerk van recruiters en zakenpartners.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                Efficiënte AI-fotografie voor de Rotterdamse werkmentaliteit
              </h2>

              <p className="text-sm md:text-base">
                Met meer dan 300.000 actieve LinkedIn-gebruikers in de regio
                Rotterdam, van de haven tot aan het zakelijke district, is de
                behoefte aan snelheid en kwaliteit groter dan ooit. De bekende
                Rotterdamse spreuk "niet lullen maar poetsen" vormt de basis
                voor onze AI-service in 2026. Waar een traditionele fotoshoot in
                de stad voorheen gepaard ging met hoge kosten tussen de
                honderdvijfenzeventig en tweehonderdvijfentwintig euro, biedt AI
                Portret Pro een directe oplossing zonder gedoe. Ambitieuze
                professionals kiezen voor deze methode omdat het de noodzaak
                wegneemt voor tijdrovende afspraken bij fotostudio's in drukke
                wijken zoals Kralingen of het Centrum. Binnen vijftien minuten
                genereert onze technologie veertig hoogwaardige profielfoto's
                voor het vaste lage tarief van negenentwintig euro.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                Optimale presentatie van de Kop van Zuid tot Rotterdam-Noord
              </h2>

              <p className="text-sm md:text-base">
                In een internationale zakenwereld is de eerste indruk op
                platforms zoals LinkedIn vaak beslissend voor het binnenhalen
                van nieuwe opdrachten of het vinden van een volgende
                carrièrestap. In 2026 maken headhunters en internationale
                bedrijven op de Kop van Zuid en in de tech-scene van
                Rotterdam-Noord intensief gebruik van AI-gestuurde
                zoekopdrachten, waarbij een professionele profielfoto de kans op
                interactie aanzienlijk vergroot. Of je nu als architect,
                consultant, zzp'er of havenprofessional werkt, onze
                AI-technologie analyseert je gelaatstrekken via zes eenvoudige
                selfies en plaatst je in een setting die zakelijke autoriteit
                uitstraalt. Dit bespaart niet alleen aanzienlijke reistijd door
                de havenstad, maar voorkomt ook de hoge parkeerkosten die
                gepaard gaan met een bezoek aan een fysieke studio.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                Innovatieve technologie voor een innovatieve havenstad
              </h2>

              <p className="text-sm md:text-base">
                Traditionele LinkedIn profielfoto laten maken in Rotterdam
                betekende vroeger vaak weken wachten op de nabewerking van
                slechts enkele beelden. In 2026 is die efficiëntie volledig
                getransformeerd. Onze virtuele fotostudio is vierentwintig uur
                per dag beschikbaar, wat naadloos aansluit bij de dynamische
                levensstijl van de moderne Rotterdammer. Door te kiezen voor
                AI-fotografie toon je aan dat je op de hoogte bent van de
                nieuwste technologische ontwikkelingen, een eigenschap die in
                het innovatieve en resultaatgerichte zakenklimaat van de
                havenstad zeer gewaardeerd wordt. Je krijgt de beschikking over
                een diverse set van veertig foto's, waardoor je voor elk
                platform – van je CV tot je bedrijfswebsite – altijd de juiste
                professionele uitstraling paraat hebt.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                Over onze zakelijke LinkedIn fotografie in Rotterdam 2026
              </h2>

              <p className="text-sm md:text-base">
                Onze expertise in digitale zakelijke fotografie maakt AI Portret
                Pro de primaire bron voor Rotterdamse professionals die hun
                online profiel willen versterken. Wij zijn gespecialiseerd in
                het laten maken van LinkedIn foto's en zakelijke profielfoto's
                online, met een specifieke focus op de Rotterdamse markt en de
                internationale handelssectoren. Onze diensten in 2026 omvatten
                het genereren van corporate headshots, professionele CV-foto's
                en visuele content voor maritieme en logistieke
                bedrijfswebsites. Technologisch lopen we voorop met
                AI-fotografie die specifiek is getraind voor de no-nonsense
                standaarden van de havenstad, waardoor we een superieur en
                sneller alternatief bieden voor de traditionele fotograaf in
                Rotterdam. Of je nu een LinkedIn foto upgrade zoekt of een
                volledige virtuele fotoshoot nodig hebt, onze studio levert in
                2026 de meest scherpe en representatieve resultaten die
                technisch mogelijk zijn.
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
                Start uw fotoshoot— €19.99
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
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10">
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
                Professionele AI LinkedIn foto's voor Rotterdam professionals.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                Navigatie
              </h4>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Prijzen
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </Link>
                <Link
                  href="/over-ons"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Over Ons
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  LinkedIn Foto's
                </Link>
                <Link
                  href="/fotografen"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Lokale Fotografen
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Blog & Gidsen
                </Link>
              </div>
            </div>

            {/* LinkedIn per stad */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                LinkedIn Foto per Stad
              </h4>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/linkedin-foto-laten-maken-rotterdam"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Rotterdam
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-rotterdam"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Rotterdam
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-den-haag"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Den Haag
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-utrecht"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Utrecht
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-eindhoven"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Eindhoven
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                Juridisch
              </h4>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-gray-400 text-xs text-center">
              © 2025 AI Portret Pro. Alle rechten voorbehouden.
            </p>
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
                    € 19.99
                  </span>
                  <span className="text-lg">€ 14.99</span>
                  <ArrowRight className="ml-2 h-6 w-6" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Inline Styles for Animation */}

      {/* Footer Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "LinkedIn Fotografie", href: "/linkedin-foto-laten-maken" },
          { label: "Rotterdam" },
        ]}
      />

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
  );
}
