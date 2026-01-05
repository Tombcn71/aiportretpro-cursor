"use client"

import Script from "next/script"
import { useEffect } from "react"

export default function FacebookPixel() {
  useEffect(() => {
    // Initialize fbq queue before loading script to prevent "fbq is not defined" errors
    if (typeof window !== "undefined" && window !== null) {
      if (!window.fbq) {
        window.fbq = function(...args: any[]) {
          if (!window.fbq || !window.fbq.q) {
            if (window.fbq) {
              window.fbq.q = []
            }
          }
          if (window.fbq && window.fbq.q && Array.isArray(window.fbq.q)) {
            window.fbq.q.push(args)
          }
        }
      }
      // Ensure q property exists
      if (!window.fbq.q || !Array.isArray(window.fbq.q)) {
        window.fbq.q = []
      }
    }

    // Defer Facebook Pixel loading until after LCP
    const loadPixel = () => {
      if (typeof window !== "undefined" && window !== null && typeof document !== "undefined" && document !== null) {
        if (!window.fbq || (window.fbq && !window.fbq.loaded)) {
          const script = document.createElement("script")
          script.async = true
          script.src = "https://connect.facebook.net/en_US/fbevents.js"
          script.onload = () => {
            if (typeof window !== "undefined" && window !== null && typeof window.fbq === "function") {
              try {
                const pixelId = "8110588262372718"
                if (pixelId && typeof pixelId === "string") {
                  window.fbq("init", pixelId)
                  window.fbq("track", "PageView", {})
                  console.log("✅ Facebook Pixel loaded with ID: " + pixelId)
                }
              } catch (error) {
                console.log("❌ Facebook Pixel initialization error:", error)
              }
            }
          }
          script.onerror = () => {
            console.log("❌ Facebook Pixel script failed to load")
          }
          if (document.head) {
            document.head.appendChild(script)
          }
        }
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
