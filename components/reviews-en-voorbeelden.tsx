"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

// Gallery photos: All images from the shoot folder (1.png through 26.png)
const galleryPhotos = Array.from(
  { length: 26 },
  (_, i) => `/images/shoot/${i + 1}.png`,
);

// Voorbeeld reviews - 20 met foto, 10 zonder foto, goed gemengd
// Foto indices: man-vrouw-man-vrouw patroon (0=man, 1=vrouw, 2=man, 3=vrouw, etc.)
// Eerste 8 reviews: Begint met Anna en Shanti (2 vrouwen) op mobile, dan Tom, Ruben, Mike, Iris, Mark en Emma
const reviews = [
  {
    type: "voorbeeld" as const,
    name: "Anna de Wit",
    role: "Project Manager",
    location: "Breda",
    review:
      "Verrassend hoe goed de kwaliteit is. Ik had eerlijk gezegd lagere verwachtingen, maar de belichting en scherpte zijn prima in orde. Snelle service ook.",
    rating: 5,
    photoIndex: 5, // Vrouw (foto 6.png)
    avatarInitials: "AW",
  },
  {
    type: "voorbeeld" as const,
    name: "Shanti Smit",
    role: "Event Manager",
    location: "Rotterdam",
    review:
      "Goede prijs-kwaliteitverhouding. Ik had m'n foto's snel binnen en ze zien er professioneel uit. Ideaal voor een snelle update van mijn profiel.",
    rating: 5,
    photoIndex: 15, // Vrouw (foto 16.png)
    avatarInitials: "SS",
  },
  {
    type: "voorbeeld" as const,
    name: "Tom van der Berg",
    role: "Business Consultant",
    location: "Den Haag",
    review:
      "Binnen een kwartier klaar. Ik had snel een nieuwe foto nodig voor een sollicitatie en dit werkte perfect. Het resultaat is netjes en het proces spreekt voor zich.",
    rating: 5,
    photoIndex: 0, // Man (foto 1.png)
    avatarInitials: "TB",
  },
  {
    type: "review" as const,
    name: "Ruben van Dijk",
    role: "Software Engineer",
    location: "Amsterdam",
    review:
      "Geen zin in een fotograaf, dus dit geprobeerd. De foto's passen goed bij mijn huidige profiel en de levering was supersnel. Gewoon goed.",
    rating: 5,
    avatarInitials: "RV",
  },
  {
    type: "review" as const,
    name: "Iris de Nooyer",
    role: "Business Analyst",
    location: "Groningen",
    review:
      "Handig systeem. Je uploadt een paar foto's en de AI doet de rest. De uitstraling is zakelijk en degelijk. Precies wat ik zocht voor mijn nieuwe rol.",
    rating: 5,
    avatarInitials: "IN",
  },
  {
    type: "voorbeeld" as const,
    name: "Mike van den Berg",
    role: "Operations Manager",
    location: "Eindhoven",
    review:
      "Snel, simpel en goedkoop. Binnen een kwartier was alles klaar. De kwaliteit is bovengemiddeld goed voor AI-begrippen.",
    rating: 5,
    photoIndex: 10, // Man (foto 11.png)
    avatarInitials: "MB",
  },
  {
    type: "review" as const,
    name: "Mark Hovenkamp",
    role: "IT Consultant",
    location: "Rotterdam",
    review:
      "Prima oplossing voor als je geen zin hebt in het gedoe van een fotoshoot. De kwaliteit is gewoon goed genoeg voor m'n website en visitekaartjes, en het scheelt behoorlijk in de portemonnee.",
    rating: 5,
    avatarInitials: "MH",
  },
  {
    type: "review" as const,
    name: "Emma de Jager",
    role: "HR Manager",
    location: "Eindhoven",
    review:
      "Blij mee. De foto's zien er verzorgd uit en de prijs is fair. Een stuk efficiënter dan een middag bij een fotograaf.",
    rating: 5,
    avatarInitials: "EJ",
  },
  {
    type: "voorbeeld" as const,
    name: "Sophie Bakker",
    role: "Marketing Manager",
    location: "Amsterdam",
    review:
      "Geen zin om honderden euro's uit te geven aan een shoot. Voor drie tientjes heb ik nu een set foto's waar ik mee voor de dag kan komen. Ziet er strak uit.",
    rating: 5,
    photoIndex: 1, // Vrouw (foto 2.png)
    avatarInitials: "SB",
  },
  {
    type: "voorbeeld" as const,
    name: "David Mulder",
    role: "Sales Director",
    location: "Groningen",
    review:
      "De zakelijke uitstraling van de foto's is precies wat ik zocht. Prima geschikt voor LinkedIn en m'n eigen site. Snelle service en goede kwaliteit.",
    rating: 5,
    photoIndex: 2, // Man (foto 3.png)
    avatarInitials: "DM",
  },
  {
    type: "review" as const,
    name: "Emma de Jager",
    role: "HR Manager",
    location: "Eindhoven",
    review:
      "Blij mee. De foto's zien er verzorgd uit en de prijs is fair. Een stuk efficiënter dan een middag bij een fotograaf.",
    rating: 5,
    avatarInitials: "EJ",
  },
  {
    type: "voorbeeld" as const,
    name: "Lisa Janssen",
    role: "Financial Advisor",
    location: "Utrecht",
    review:
      "Ik was vooraf behoorlijk sceptisch, maar het resultaat valt me alleszins mee. Voor wie snel iets representatiefs nodig heeft voor een nieuwe baan is dit ideaal.",
    rating: 5,
    photoIndex: 3, // Vrouw (foto 4.png)
    avatarInitials: "LJ",
  },
  {
    type: "voorbeeld" as const,
    name: "Jeroen Visser",
    role: "CEO",
    location: "Tilburg",
    review:
      "De kwaliteit van deze AI-foto's is verrassend hoog. Het is een stuk vlotter geregeld dan een traditionele fotoshoot en prima bruikbaar voor zakelijk gebruik.",
    rating: 5,
    photoIndex: 4, // Man (foto 5.png)
    avatarInitials: "JV",
  },
  {
    type: "voorbeeld" as const,
    name: "Pieter Bakker",
    role: "Accountant",
    location: "Almere",
    review:
      "Ik had op korte termijn wat nodig voor een nieuwe klus. Binnen no-time geregeld en het resultaat is gewoon representatief. Aanrader als je weinig tijd hebt.",
    rating: 5,
    photoIndex: 6, // Man (foto 7.png)
    avatarInitials: "PB",
  },
  {
    type: "review" as const,
    name: "Laura Peters",
    role: "Designer",
    location: "Utrecht",
    review:
      "Goede foto's en een stuk voordeliger dan een shoot op locatie. Voor mijn portfolio en LinkedIn werkt dit perfect. Een prettige ervaring.",
    rating: 5,
    avatarInitials: "LP",
  },
  {
    type: "voorbeeld" as const,
    name: "Jayden Jansen",
    role: "Communicatie Adviseur",
    location: "Nijmegen",
    review:
      "Efficiënte manier om je profiel op te frissen. De foto's zijn zakelijk en de levering was sneller dan verwacht. Erg tevreden met het resultaat.",
    rating: 5,
    photoIndex: 7, // Vrouw (foto 8.png)
    avatarInitials: "JJ",
  },
  {
    type: "voorbeeld" as const,
    name: "Bas Meijer",
    role: "Consultant",
    location: "Den Haag",
    review:
      "Prima alternatief voor een traditionele fotograaf. De foto's zijn van goede kwaliteit en passen goed bij m'n LinkedIn. Scheelt een hoop tijd en geld.",
    rating: 5,
    photoIndex: 8, // Man (foto 9.png)
    avatarInitials: "BM",
  },
  {
    type: "review" as const,
    name: "Kevin Hoekstra",
    role: "Product Manager",
    location: "Rotterdam",
    review:
      "Werkt vlot en de kwaliteit is prima. Goede optie voor wie snel een professionele indruk wil maken zonder al te veel gedoe.",
    rating: 5,
    avatarInitials: "KH",
  },
  {
    type: "voorbeeld" as const,
    name: "Sanne de Boer",
    role: "Recruiter",
    location: "Utrecht",
    review:
      "Echt een uitkomst dit. De foto's ogen heel natuurlijk en de resolutie is hoog. Veel goedkoper dan een fotograaf en het resultaat mag er wezen.",
    rating: 5,
    photoIndex: 9, // Vrouw (foto 10.png)
    avatarInitials: "SB",
  },
  {
    type: "voorbeeld" as const,
    name: "Femke van der Laan",
    role: "Marketing Specialist",
    location: "Amsterdam",
    review:
      "Ik ben positief verrast. De foto's zijn bruikbaar voor zowel LinkedIn als m'n bedrijfswebsite. Prima prijs-kwaliteitverhouding.",
    rating: 5,
    photoIndex: 11, // Vrouw (foto 12.png)
    avatarInitials: "FL",
  },
  {
    type: "voorbeeld" as const,
    name: "Rick van der Meer",
    role: "Sales Manager",
    location: "Nijmegen",
    review:
      "Krijg veel vragen over waar ik m'n nieuwe foto's heb laten maken. Als ik zeg dat het AI is, geloven ze het vaak niet eens. Mooi resultaat.",
    rating: 5,
    photoIndex: 12, // Man (foto 13.png)
    avatarInitials: "RM",
  },
  {
    type: "review" as const,
    name: "Daan Steijn",
    role: "Data Scientist",
    location: "Amsterdam",
    review:
      "Technisch zit het goed in elkaar. Je ziet bijna niet dat er geen camera aan te pas is gekomen. Voor mijn LinkedIn is dit ruim voldoende. Werkt gewoon.",
    rating: 5,
    avatarInitials: "DS",
  },
  {
    type: "voorbeeld" as const,
    name: "Nina Jansen",
    role: "Content Manager",
    location: "Utrecht",
    review:
      "Precies wat ik nodig had: een nette foto zonder al te veel poespas. Werkt intuïtief en de resultaten zijn gewoon degelijk.",
    rating: 5,
    photoIndex: 13, // Vrouw (foto 14.png)
    avatarInitials: "NJ",
  },
  {
    type: "voorbeeld" as const,
    name: "Martijn Visser",
    role: "Finance Director",
    location: "Tilburg",
    review:
      "Degelijke kwaliteit en een vlotte afhandeling. De foto's zijn representatief voor m'n vakgebied. Niks op aan te merken.",
    rating: 5,
    photoIndex: 14, // Man (foto 15.png)
    avatarInitials: "MV",
  },
  {
    type: "review" as const,
    name: "Saskia van Ambacht",
    role: "Communicatie Manager",
    location: "Breda",
    review:
      "Geen poespas, gewoon doen wat het belooft. De foto's zijn scherp en bruikbaar voor zakelijke uitingen. Absoluut de moeite waard.",
    rating: 5,
    avatarInitials: "SA",
  },
  {
    type: "voorbeeld" as const,
    name: "Tim van Dijk",
    role: "Tech Lead",
    location: "Eindhoven",
    review:
      "Handige tool. Veel sneller dan een afspraak maken bij een studio en het resultaat is nagenoeg hetzelfde. Ben er erg blij mee.",
    rating: 5,
    photoIndex: 16, // Man (foto 17.png)
    avatarInitials: "TD",
  },
  {
    type: "review" as const,
    name: "Joris van Leeuwen",
    role: "Strategy Consultant",
    location: "Utrecht",
    review:
      "Was even benieuwd of het wat zou zijn, maar het resultaat mag er wezen. De foto's ogen professioneel en iedereen op kantoor is onder de indruk.",
    rating: 5,
    avatarInitials: "JL",
  },
  {
    type: "voorbeeld" as const,
    name: "Eva Mulder",
    role: "Brand Manager",
    location: "Almere",
    review:
      "Vlotte service en de foto's zijn van goede kwaliteit. Voor mijn professionele doeleinden werkt dit uitstekend. Veel makkelijker dan een echte shoot.",
    rating: 5,
    photoIndex: 17, // Vrouw (foto 18.png)
    avatarInitials: "EM",
  },
  {
    type: "voorbeeld" as const,
    name: "Lars Bakker",
    role: "Business Developer",
    location: "Rotterdam",
    review:
      "Snelle levering en een eerlijke prijs. De foto's passen perfect bij mijn LinkedIn-profiel. Absoluut een aanrader voor de zakelijke gebruiker.",
    rating: 5,
    photoIndex: 18, // Man (foto 19.png)
    avatarInitials: "LB",
  },
  {
    type: "review" as const,
    name: "Maud Verbeek",
    role: "Marketing Director",
    location: "Amsterdam",
    review:
      "Verrassend resultaat. Het is even wennen aan het idee, maar de foto's zijn van hoge kwaliteit en heel bruikbaar. Een fijne ervaring.",
    rating: 5,
    avatarInitials: "MV",
  },
  {
    type: "voorbeeld" as const,
    name: "Roos de Boer",
    role: "HR Specialist",
    location: "Groningen",
    review:
      "Mooi resultaat voor weinig moeite. De foto's sluiten goed aan bij wat ik nodig had voor m'n profiel. Precies wat ik zocht.",
    rating: 5,
    photoIndex: 19, // Vrouw (foto 20.png)
    avatarInitials: "RB",
  },
];

interface ReviewsEnVoorbeeldenProps {
  title?: string;
}

export default function ReviewsEnVoorbeelden({
  title = "Reviews en Voorbeelden",
}: ReviewsEnVoorbeeldenProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  // Mobile: eerste 6 reviews zoals ze zijn (Anna, Shanti, Tom, Ruben, Iris, Mike)
  const displayedReviewsMobile = showAllReviews ? reviews : reviews.slice(0, 6);

  // Desktop: originele volgorde (Tom, Mark, Sophie, David, Emma, Lisa, Jeroen, Ruben, Anna, Pieter, Laura, Jayden, Bas, Kevin, Sanne, Mike, Iris, ...)
  // Huidige indices: Tom(2), Mark(6), Sophie(8), David(9), Emma(7), Lisa(11), Jeroen(12), Ruben(3), Anna(0), Pieter(13), Laura(14), Jayden(15), Bas(16), Kevin(17), Sanne(18), Mike(5), Iris(4)
  const originalDesktopOrder = [
    2, 6, 8, 9, 7, 11, 12, 3, 0, 13, 14, 15, 16, 17, 18, 5, 4,
  ];
  const displayedReviewsDesktop = showAllReviews
    ? reviews
    : originalDesktopOrder.map((idx) => reviews[idx]).filter(Boolean);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 md:w-7 md:h-7 fill-yellow-400"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.19.992a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.19.992c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.19.992a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.19.992z" />
              </svg>
            ))}
            {/* Half star */}
            <div className="relative w-6 h-6 md:w-7 md:h-7">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 fill-gray-300"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.19.992a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.19.992c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.19.992a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.19.992z" />
              </svg>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}>
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 fill-yellow-400"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.19.992a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.19.992c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.19.992a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.19.992z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700">
            5000+ foto's gemaakt voor 1200+ tevreden klanten
          </p>
        </div>

        {/* First 2 reviews in grid on mobile, then masonry for the rest */}
        <div className="grid grid-cols-2 md:hidden gap-4 max-w-7xl mx-auto mb-4">
          {displayedReviewsMobile.slice(0, 2).map((review, index) => {
            if (review.type === "review") {
              // Review card zonder grote foto
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow break-inside-avoid mb-4 min-h-[120px]">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {review.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">
                        {review.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {review.role}, {review.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-900 text-xs leading-tight">
                    {review.review}
                  </p>
                </div>
              );
            } else {
              // Voorbeeld card met avatar en review boven foto - variabele card hoogte
              const photoSrc =
                galleryPhotos[review.photoIndex % galleryPhotos.length];
              return (
                <div
                  key={index}
                  className="cursor-pointer group break-inside-avoid"
                  onClick={() => openLightbox(photoSrc)}>
                  {/* Card achtergrond - stopt waar review tekst stopt */}
                  <div className="bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Avatar, naam en review - variabele hoogte */}
                    <div className="mb-2">
                      <div className="flex items-start gap-2 mb-1">
                        {/* Avatar - kleine versie van de foto */}
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                          <Image
                            src={photoSrc || "/placeholder.svg"}
                            alt={`Avatar van ${review.name}`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Naam en customer label - alleen voornaam */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm truncate">
                            {review.name.split(" ")[0]}
                          </div>
                          <div className="text-xs text-gray-600">
                            klant AI Portret Pro
                          </div>
                        </div>
                      </div>
                      {/* Review tekst - volledige tekst, bepaalt card hoogte */}
                      <p className="text-gray-900 text-xs leading-tight">
                        {review.review}
                      </p>
                    </div>

                    {/* Foto met aspect ratio 3:4 - vaste grootte */}
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mt-2">
                      <Image
                        src={photoSrc || "/placeholder.svg"}
                        alt={`Voorbeeld van ${review.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Badge rechtsboven op foto */}
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 z-10">
                        <div className="bg-[#0077B5] text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                          AI Resultaat
                        </div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4 text-xs">
                          Klik om te vergroten
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* All reviews in masonry layout on desktop with old order */}
        <div className="hidden md:block columns-4 gap-4 max-w-7xl mx-auto [column-fill:balance]">
          {displayedReviewsDesktop.map((review, index) => {
            if (review.type === "review") {
              // Review card zonder grote foto
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow break-inside-avoid mb-4 min-h-[120px]">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {review.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">
                        {review.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {review.role}, {review.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-900 text-xs leading-tight">
                    {review.review}
                  </p>
                </div>
              );
            } else {
              // Voorbeeld card met avatar en review boven foto - variabele card hoogte
              const photoSrc =
                galleryPhotos[review.photoIndex % galleryPhotos.length];
              return (
                <div
                  key={index}
                  className="cursor-pointer group break-inside-avoid"
                  onClick={() => openLightbox(photoSrc)}>
                  {/* Card achtergrond - stopt waar review tekst stopt */}
                  <div className="bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Avatar, naam en review - variabele hoogte */}
                    <div className="mb-2">
                      <div className="flex items-start gap-2 mb-1">
                        {/* Avatar - kleine versie van de foto */}
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                          <Image
                            src={photoSrc || "/placeholder.svg"}
                            alt={`Avatar van ${review.name}`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Naam en customer label - alleen voornaam */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm truncate">
                            {review.name.split(" ")[0]}
                          </div>
                          <div className="text-xs text-gray-600">
                            klant AI Portret Pro
                          </div>
                        </div>
                      </div>
                      {/* Review tekst - volledige tekst, bepaalt card hoogte */}
                      <p className="text-gray-900 text-xs leading-tight">
                        {review.review}
                      </p>
                    </div>

                    {/* Foto met aspect ratio 3:4 - vaste grootte */}
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mt-2">
                      <Image
                        src={photoSrc || "/placeholder.svg"}
                        alt={`Voorbeeld van ${review.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Badge rechtsboven op foto */}
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 z-10">
                        <div className="bg-[#0077B5] text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                          AI Resultaat
                        </div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4 text-xs">
                          Klik om te vergroten
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Rest of reviews in masonry layout on mobile only */}
        <div className="md:hidden columns-2 gap-4 max-w-7xl mx-auto [column-fill:balance]">
          {displayedReviewsMobile.slice(2).map((review, index) => {
            if (review.type === "review") {
              // Review card zonder grote foto
              return (
                <div
                  key={`mobile-${index}`}
                  className="bg-gray-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow break-inside-avoid mb-4 min-h-[120px]">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {review.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm truncate">
                        {review.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {review.role}, {review.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-900 text-xs leading-tight">
                    {review.review}
                  </p>
                </div>
              );
            } else {
              // Voorbeeld card met avatar en review boven foto - variabele card hoogte
              const photoSrc =
                galleryPhotos[review.photoIndex % galleryPhotos.length];
              return (
                <div
                  key={`mobile-${index}`}
                  className="cursor-pointer group break-inside-avoid"
                  onClick={() => openLightbox(photoSrc)}>
                  {/* Card achtergrond - stopt waar review tekst stopt */}
                  <div className="bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Avatar, naam en review - variabele hoogte */}
                    <div className="mb-2">
                      <div className="flex items-start gap-2 mb-1">
                        {/* Avatar - kleine versie van de foto */}
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                          <Image
                            src={photoSrc || "/placeholder.svg"}
                            alt={`Avatar van ${review.name}`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Naam en customer label - alleen voornaam */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm truncate">
                            {review.name.split(" ")[0]}
                          </div>
                          <div className="text-xs text-gray-600">
                            klant AI Portret Pro
                          </div>
                        </div>
                      </div>
                      {/* Review tekst - volledige tekst, bepaalt card hoogte */}
                      <p className="text-gray-900 text-xs leading-tight">
                        {review.review}
                      </p>
                    </div>

                    {/* Foto met aspect ratio 3:4 - vaste grootte */}
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mt-2">
                      <Image
                        src={photoSrc || "/placeholder.svg"}
                        alt={`Voorbeeld van ${review.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Badge rechtsboven op foto */}
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 z-10">
                        <div className="bg-[#0077B5] text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                          AI Resultaat
                        </div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4 text-xs">
                          Klik om te vergroten
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Show More Button */}
        {!showAllReviews && reviews.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllReviews(true)}
              className="bg-[#0077B5] hover:bg-[#005885] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              Bekijk meer reviews
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Sluiten">
              <X size={32} />
            </button>
            <Image
              src={lightboxImage || "/placeholder.svg"}
              alt="Vergrote foto"
              width={800}
              height={1000}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
