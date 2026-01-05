"use client"

import { useEffect } from "react"

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = "G-S595VN7FVP"

  useEffect(() => {
    // Defer Google Analytics loading until after LCP
    const loadGA = () => {
      if (typeof window !== "undefined" && !window.dataLayer) {
        // Load gtag.js
        const script1 = document.createElement("script")
        script1.async = true
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
        document.head.appendChild(script1)

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
          window.dataLayer.push(args)
        }
        window.gtag = gtag
        gtag("js", new Date())
        gtag("config", GA_MEASUREMENT_ID)
      }
    }

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== "undefined") {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(loadGA, { timeout: 2000 })
      } else {
        setTimeout(loadGA, 2000)
      }
    }
  }, [])

  return null
}

