"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  // Afmetingen bepalen op basis van de size prop
  const sizes = {
    sm: { box: "w-4 h-4", text: "text-base" },
    md: { box: "w-5 h-5", text: "text-lg" },
    lg: { box: "w-8 h-8", text: "text-2xl" },
  };

  return (
    <Link
      href="/"
      className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity no-underline">
      {/* De afbeelding van het logo */}
      <div className={`${sizes[size].box} relative flex-shrink-0`}>
        <Image
          src="/images/logo.png"
          alt="AI Portret Pro Logo"
          width={40}
          height={40}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* De tekst van het logo - Altijd zwart en dikgedrukt */}
      <span
        className={`${sizes[size].text}  text-black tracking-tight whitespace-nowrap`}>
        AiPortretPro
      </span>
    </Link>
  );
}

export default Logo;
