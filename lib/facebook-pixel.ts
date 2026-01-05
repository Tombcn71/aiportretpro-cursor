declare global {
  interface Window {
    fbq: any
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number
  }
}

// Initialize fbq queue early to prevent "fbq is not defined" errors
if (typeof window !== "undefined" && window !== null) {
  if (!window.fbq) {
    window.fbq = function(...args: any[]) {
      if (!window.fbq.q) {
        window.fbq.q = []
      }
      if (Array.isArray(window.fbq.q)) {
        window.fbq.q.push(args)
      }
    }
  }
  // Ensure q property exists
  if (!window.fbq.q || !Array.isArray(window.fbq.q)) {
    window.fbq.q = []
  }
}

export const FB_PIXEL_ID = "8110588262372718"

export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", eventName, parameters || {})
      console.log(`📊 Facebook Pixel Event: ${eventName}`, parameters || {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  } else {
    console.log("❌ Facebook Pixel not loaded")
  }
}

export const trackPageView = () => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "PageView")
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackViewContent = (contentName: string, contentCategory?: string) => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "ViewContent", {
        content_name: contentName || "",
        content_category: contentCategory || "",
      } || {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackAddToCart = (value: number, currency = "EUR") => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "AddToCart", {
        value: value || 0,
        currency: currency || "EUR",
      } || {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackInitiateCheckout = (value: number, currency = "EUR", eventID?: string) => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      const parameters: any = {
        value: value,
        currency: currency,
      }
      
      if (eventID) {
        window.fbq("track", "InitiateCheckout", parameters, { eventID: eventID })
      } else {
        window.fbq("track", "InitiateCheckout", parameters)
      }
      console.log(`📊 Facebook Pixel Event: InitiateCheckout`, parameters, eventID ? { eventID } : {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  } else {
    console.log("❌ Facebook Pixel not loaded")
  }
}

export const trackPurchase = (value: number, currency = "EUR") => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "Purchase", {
        value: value || 0,
        currency: currency || "EUR",
      } || {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackSignUp = (method?: string) => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "CompleteRegistration", {
        method: method || "google",
      } || {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackCompleteRegistration = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration")
  }
}

export const trackLead = () => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "Lead")
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackContact = () => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "Contact")
      console.log("📊 Facebook Pixel Event: Contact")
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  } else {
    console.log("❌ Facebook Pixel not loaded")
  }
}

// Custom events for your app
export const trackPhotoUpload = () => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("trackCustom", "PhotoUpload", {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackGenerationComplete = () => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("trackCustom", "GenerationComplete", {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const trackHeadshotDownload = () => {
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined" && window.fbq) {
    try {
      window.fbq("trackCustom", "HeadshotDownload", {})
    } catch (error) {
      console.log("❌ Facebook Pixel error:", error)
    }
  }
}

export const checkPixelStatus = () => {
  if (typeof window !== "undefined") {
    if (window.fbq) {
      console.log("✅ Facebook Pixel is loaded and ready")
      return true
    } else {
      console.log("❌ Facebook Pixel is not loaded")
      return false
    }
  }
  return false
}
