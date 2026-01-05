"use client"

import Script from "next/script"
import { useEffect } from "react"

export default function FacebookPixel() {
  useEffect(() => {
    // Defer Facebook Pixel loading until after LCP
    const loadPixel = () => {
      if (typeof window !== "undefined" && !window.fbq) {
        const script = document.createElement("script")
        script.async = true
        script.src = "https://connect.facebook.net/en_US/fbevents.js"
        script.onload = () => {
          if (window.fbq) {
            window.fbq("init", "8110588262372718")
            window.fbq("track", "PageView")
            console.log("✅ Facebook Pixel loaded with ID: 8110588262372718")
          }
        }
        document.head.appendChild(script)
      }
    }

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== "undefined") {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(loadPixel, { timeout: 2000 })
      } else {
        setTimeout(loadPixel, 2000)
      }
    }
  }, [])

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=1508299057002595&ev=PageView&noscript=1"
      />
    </noscript>
  )
}
