"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    /* AANPASSING: sticky en top-0 verwijderd, relative toegevoegd */
    <div className="relative bg-[#0077B5] text-white py-2.5 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-semibold tracking-wide text-center">
            ⚡ Introductie-actie: Start vandaag je fotoshoot voor slechts{" "}
            <span className="underline decoration-2 underline-offset-4">
              €19,99
            </span>{" "}
            <span className="text-blue-100/80 font-normal line-through ml-1">
              (ipv €29)
            </span>
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-1 transition-colors"
          aria-label="Sluit banner">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
