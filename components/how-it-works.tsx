"use client"

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Hoe het werkt</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          In 3 simpele stappen klaar
        </p>

        {/* Mobile: Compact numbered list */}
        <div className="md:hidden space-y-4 max-w-lg mx-auto px-4">
          <div className="flex items-start gap-4 text-left">
            <div className="w-6 h-6 bg-[#0077B5] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Upload je foto's</h3>
              <p className="text-gray-600 text-sm">Selecteer een paar selfies of foto's vanaf je bovenlichaam.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 text-left">
            <div className="w-6 h-6 bg-[#0077B5] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">AI doet de rest</h3>
              <p className="text-gray-600 text-sm">Onze AI traint je model en maakt 40 portretten. Klaar in 15 min.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 text-left">
            <div className="w-6 h-6 bg-[#0077B5] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Direct downloaden</h3>
              <p className="text-gray-600 text-sm">Kies je favorieten voor LinkedIn, je CV of je website.</p>
            </div>
          </div>
        </div>

        {/* Desktop: With numbers */}
        <div className="hidden md:flex flex-row justify-center items-start gap-16 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 bg-[#0077B5] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload je foto's</h3>
            <p className="text-gray-600 text-sm">
              Selecteer een paar selfies of foto's vanaf je bovenlichaam.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 bg-[#0077B5] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI doet de rest</h3>
            <p className="text-gray-600 text-sm">Onze AI traint je model en maakt 40 portretten. Klaar in 15 min.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 bg-[#0077B5] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct downloaden</h3>
            <p className="text-gray-600 text-sm">
              Kies je favorieten voor LinkedIn, je CV of je website.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
