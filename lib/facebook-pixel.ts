declare global {
  interface Window {
    fbq: any
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number
  }
}

export const FB_PIXEL_ID = "8110588262372718"

export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters)
    console.log(`📊 Facebook Pixel Event: ${eventName}`, parameters)
  } else {
    console.log("❌ Facebook Pixel not loaded")
  }
}

export const trackPageView = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView")
  }
}

export const trackViewContent = (contentName: string, contentCategory?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_name: contentName,
      content_category: contentCategory,
    })
  }
}

export const trackAddToCart = (value: number, currency = "EUR") => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      value: value,
      currency: currency,
    })
  }
}

export const trackInitiateCheckout = (value: number, currency = "EUR", eventID?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
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
  } else {
    console.log("❌ Facebook Pixel not loaded")
  }
}

export const trackPurchase = (value: number, currency = "EUR") => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      value: value,
      currency: currency,
    })
  }
}

export const trackSignUp = (method?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration", {
      method: method || "google",
    })
  }
}

export const trackCompleteRegistration = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration")
  }
}

export const trackLead = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead")
  }
}

export const trackContact = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact")
    console.log("📊 Facebook Pixel Event: Contact")
  } else {
    console.log("❌ Facebook Pixel not loaded")
  }
}

// Custom events for your app
export const trackPhotoUpload = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "PhotoUpload")
  }
}

export const trackGenerationComplete = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "GenerationComplete")
  }
}

export const trackHeadshotDownload = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "HeadshotDownload")
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
