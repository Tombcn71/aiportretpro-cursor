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
  Sparkles,
  Camera,
} from "lucide-react";
import Header from "@/components/header";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import SchemaMarkup from "@/components/schema-markup";
import CityNavigation from "@/components/city-navigation";
import FAQSchema from "@/components/faq-schema";
import HowItWorks from "@/components/how-it-works";
import { trackContact } from "@/lib/facebook-pixel";

// Gallery photos: All images from the shoot folder (1.png through 26.png)
const galleryPhotos = Array.from(
  { length: 26 },
  (_, i) => `/images/shoot/${i + 1}.png`,
);

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
    answer:
      "Ja, je krijgt de volledige commerciële rechten. De foto's zijn jouw eigendom en perfect voor LinkedIn, je CV, je website of print.",
  },

  {
    question: "Hebben jullie een klantenservice?",
    answer:
      "Zeker! Wij zijn een Nederlandse klantenservice. Heb je een vraag? Je kunt ons direct bereiken via info@aiportretpro.nl of chat en we helpen je persoonlijk verder.",
  },
];

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const [lastScrollY, setLastScrollY] = useState(0);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "AI Portret Pro - Zakelijke Profielfoto Laten Maken",
            image: "https://aiportretpro.nl/images/logo-icon.png",
            "@id": "https://aiportretpro.nl/#service",
            url: "https://aiportretpro.nl",
            description:
              "Online service voor het laten maken van 40 professionele zakelijke profielfoto's met AI. Perfect voor LinkedIn, CV en website. Binnen 15 minuten klaar voor slechts €19.99.",
            priceRange: "€19.99",
            address: {
              "@type": "PostalAddress",
              addressCountry: "NL",
            },
            areaServed: [
              {
                "@type": "Country",
                name: "Nederland",
                sameAs: "https://www.wikidata.org/wiki/Q55",
              },
              {
                "@type": "City",
                name: "Amsterdam",
                sameAs: "https://www.wikidata.org/wiki/Q727",
              },
              {
                "@type": "City",
                name: "Rotterdam",
                sameAs: "https://www.wikidata.org/wiki/Q34370",
              },
              {
                "@type": "City",
                name: "Den Haag",
                sameAs: "https://www.wikidata.org/wiki/Q36600",
              },
              {
                "@type": "City",
                name: "Utrecht",
                sameAs: "https://www.wikidata.org/wiki/Q803",
              },
              {
                "@type": "City",
                name: "Eindhoven",
                sameAs: "https://www.wikidata.org/wiki/Q983",
              },
              {
                "@type": "City",
                name: "Groningen",
                sameAs: "https://www.wikidata.org/wiki/Q749",
              },
              {
                "@type": "City",
                name: "Tilburg",
                sameAs: "https://www.wikidata.org/wiki/Q1001",
              },
              {
                "@type": "City",
                name: "Almere",
                sameAs: "https://www.wikidata.org/wiki/Q992",
              },
              {
                "@type": "City",
                name: "Breda",
                sameAs: "https://www.wikidata.org/wiki/Q1009",
              },
              {
                "@type": "City",
                name: "Nijmegen",
                sameAs: "https://www.wikidata.org/wiki/Q47887",
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
          }),
        }}
      />
      <SchemaMarkup type="home" />
      <FAQSchema faqs={faqData} />
      <Header />

      <main id="main-content" role="main">
        {/* Hero Container */}
        <div className="flex flex-col items-center justify-center pt-12   text-center px-4 w-full antialiased">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Online Fotostudio</span>
          </div>

          {/* Titel en Subtekst als één vloeiend geheel zonder extra witruimte */}
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              40 zakelijke foto’s van studio <br />
              kwaliteit,{" "}
              <span className="text-blue-900">zonder een fotograaf</span>
            </p>

            <p className="mt-2 text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-5xl text-center [text-wrap:balance]">
              Ontvang binnen 15 minuten een volledige zakelijke fotoshoot voor
              LinkedIn en uw CV, met de kwaliteit van een fotograaf maar zonder
              de reistijd of hoge kosten.
            </p>
          </div>
          <div className="pt-8 w-full flex flex-col items-center px-4">
            {" "}
            {/* Iets minder padding op container */}
            <Link
              href="/login?callbackUrl=/payment"
              onClick={() => trackContact()}
              aria-label="Start jouw fotoshoot nu voor negenentwintig euro"
              className="max-w-[340px] md:w-auto">
              {" "}
              {/* w-full weg bij de Link */}
              <Button
                size="lg"
                className="gap-2 h-14 w-full bg-blue-900 hover:bg-blue-800 text-white border-none shadow-xl transition-all text-sm md:text-lg font-semibold px-6 md:px-10">
                {/* text-sm voor mobile zorgt dat het icoon er weer naast past */}
                <Camera className="shrink-0 w-5 h-5 md:w-6 md:h-6" />
                <span className="whitespace-nowrap">
                  Start uw fotoshoot — € 14.99
                </span>
              </Button>
            </Link>
            <p className="mt-3 text-xs text-slate-600">
              Geen abonnement • Eenmalige betaling • perfecte profiel afmetingen
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

        {/* FAQ Section */}
        <section
          id="faq"
          className="container mx-auto px-6 pt-4 pb-20 mb-16 md:py-16">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-4 mb-4">
            Veelgestelde Vragen
          </p>
          <p className="text-lg text-[#374151] text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            Alles wat je moet weten voor je begint.
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

        {/* SEO Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-left md:text-center leading-tight">
                Professionele Zakelijke Profielfoto's Laten Maken Online – De
                Slimme Keuze voor Professionals in 2026
              </h1>

              <div className="text-gray-700 space-y-8">
                <p className="text-base md:text-lg leading-relaxed text-left">
                  In de snel veranderende zakelijke wereld van 2026 is je
                  digitale eerste indruk belangrijker dan ooit. Wie vandaag de
                  dag professionele zakelijke profielfoto's wil laten maken,
                  hoeft niet langer te rekenen op de hoge kosten of het
                  tijdrovende proces van een traditionele fotostudio. Dankzij
                  onze revolutionaire AI-technologie van de nieuwste generatie
                  ontvang je nu veertig professionele profielfoto's in slechts
                  vijftien minuten tijd voor het vaste tarief van negenentwintig
                  euro. Dit maakt onze service de meest efficiënte keuze voor
                  iedereen die een krachtige indruk wil maken op LinkedIn, een
                  CV, de bedrijfswebsite of digitale visitekaartjes.
                </p>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                    Waarom kiezen voor AI profielfoto's?
                  </h2>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    De voordelen van AI LinkedIn profielfoto's in het nieuwe
                    jaar
                  </h3>

                  <p className="text-base md:text-lg leading-relaxed text-left">
                    Het jaar 2026 markeert een definitieve omslag in de manier
                    waarop we naar professionele fotografie kijken. Onze service
                    is meer dan zes keer goedkoper dan traditionele fotoshoots,
                    zonder dat dit ten koste gaat van de kwaliteit. Je hebt geen
                    afspraak meer nodig en hoeft niet door de stad te reizen
                    voor een sessie; je start het proces simpelweg direct vanuit
                    huis of vanaf je werkplek. Met de keuze uit veertig
                    verschillende poses en achtergronden ben je verzekerd van
                    een gevarieerd pakket dat perfect aansluit bij jouw
                    specifieke sector. Bovendien bieden wij volledige zekerheid
                    met onze veertien dagen geld-terug-garantie, omdat wij
                    overtuigd zijn van de professionele kwaliteit die onze
                    2026-engine levert.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    Een veelzijdige oplossing voor elke zakelijke behoefte
                  </h3>

                  <p className="text-base md:text-lg leading-relaxed text-left">
                    Onze AI-fotografie is ontworpen om te voldoen aan elk
                    denkbaar professioneel doel. Of je nu op zoek bent naar
                    LinkedIn profielfoto's die direct opvallen bij recruiters,
                    representatieve foto's voor een overtuigend CV of beelden
                    voor een complete bedrijfswebsite, onze technologie levert
                    resultaten die onmogelijk te onderscheiden zijn van echte
                    studiofotografie. Ook voor e-mail handtekeningen, moderne
                    visitekaartjes en zakelijke social media profielen biedt
                    onze service in 2026 de perfecte uitkomst. Geen gedoe meer
                    met dure studiokosten of lange wachttijden op de nabewerking
                    door een fotograaf; je krijgt direct de uitstraling die bij
                    je carrière past.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                    Hoe werkt AI Portret Pro?
                  </h2>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    Het proces in 2026
                  </h3>

                  <p className="text-base md:text-lg leading-relaxed text-left">
                    Het proces is volledig geoptimaliseerd voor snelheid en
                    gebruiksvriendelijkheid. Je begint door vier tot twaalf
                    verschillende foto's van jezelf te uploaden. Vervolgens
                    analyseert onze geavanceerde AI je gelaatstrekken en leert
                    het je unieke kenmerken kennen om een natuurgetrouw
                    resultaat te garanderen. Terwijl de technologie op de
                    achtergrond zijn werk doet, hoef je slechts vijftien minuten
                    te wachten tot je veertig professionele foto's in hoge
                    resolutie kunt downloaden vanuit je persoonlijke dashboard.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    Waarom AI Portret Pro de standaard is voor jouw succes
                  </h3>

                  <p className="text-base md:text-lg leading-relaxed text-left">
                    In 2026 combineren wij de nieuwste ontwikkelingen op het
                    gebied van kunstmatige intelligentie met de fijne kneepjes
                    van klassieke LinkedIn profielfoto's. Onze algoritmes zijn
                    getraind op tienduizenden zakelijke headshots, waardoor we
                    de ideale balans vinden tussen een natuurlijke uitstraling
                    en zakelijke autoriteit. Met professionele belichting en
                    moderne achtergronden die aansluiten bij de trends van dit
                    jaar, bieden wij de kwaliteit van een topstudio tegen een
                    fractionele prijs. Sluit je aan bij de duizenden
                    professionals die hun zakelijke uitstraling in 2026 al naar
                    een hoger niveau hebben getild.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-12">
                    Over AI Portret Pro
                  </h2>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    Onze zakelijke profielfoto's in 2026
                  </h3>

                  <p className="text-base md:text-lg leading-relaxed text-left">
                    Onze expertise strekt zich uit over alle facetten van
                    digitale zakelijke LinkedIn profielfoto's. AI Portret Pro is
                    de primaire bron voor het laten maken van LinkedIn
                    profielfoto's en zakelijke profielfoto's online, met een
                    specifieke focus op de Nederlandse markt. Onze diensten
                    omvatten het genereren van corporate headshots,
                    professionele CV-foto's en visuele content voor moderne
                    bedrijfswebsites. Technologisch lopen we voorop met AI
                    LinkedIn profielfoto's die specifiek zijn getraind voor
                    zakelijke doeleinden, waardoor we een superieur en sneller
                    alternatief bieden voor de traditionele fotograaf. Of je nu
                    zoekt naar een LinkedIn profielfoto upgrade of een volledige
                    online fotoshoot, onze virtuele studio levert in 2026 de
                    meest scherpe en representatieve resultaten die momenteel
                    technisch mogelijk zijn.
                  </p>
                </div>
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

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}>
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-8 md:-top-12 right-0 text-white hover:text-gray-300 transition-colors">
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
      <footer className="bg-blue-900 text-white py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-8 lg:space-y-0">
            {/* Logo and Company Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.png"
                  alt="AI Portret Pro logo - LinkedIn foto laten maken"
                  width={30}
                  height={30}
                  className="rounded-lg"
                  style={{ width: "30px", height: "30px" }}
                />
                <h3 className="text-xl font-bold text-white">AI Portret Pro</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Professionele AI zakelijke profielfoto's in minuten.
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
                  href="/linkedin-foto-laten-maken-amsterdam"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Amsterdam
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
                <Link
                  href="/linkedin-foto-laten-maken-tilburg"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Tilburg
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-groningen"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Groningen
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-almere"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Almere
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-breda"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Breda
                </Link>
                <Link
                  href="/linkedin-foto-laten-maken-nijmegen"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Nijmegen
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

            {/* Social Media */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                Volg Ons
              </h4>
              <div className="flex space-x-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn">
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61578343760041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label="Facebook">
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://www.instagram.com/aiportretpro.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label="Instagram">
                  <Instagram size={20} />
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

      {/* City Navigation - Footer */}
      <CityNavigation variant="footer" />

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
                onClick={() => trackContact()}
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
          line-height: 0;
        }

        .carousel-track {
          display: flex;
          width: fit-content;
          animation: carousel 200s linear infinite;
          line-height: 0;
        }

        .carousel-item {
          flex-shrink: 0;
          margin: 0 0.5rem;
          line-height: 0;
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
  );
}
