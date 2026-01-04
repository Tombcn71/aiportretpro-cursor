"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { trackViewContent, trackInitiateCheckout } from "@/lib/facebook-pixel"
import { ProgressIndicator } from "@/components/progress-indicator"

export default function PricingPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [projectData, setProjectData] = useState<any>(null)
  const [hasExistingProject, setHasExistingProject] = useState(false)
  const router = useRouter()

  // Track pricing page view
  useEffect(() => {
    trackViewContent("Pricing Page", "29")
    
    // Get project data from localStorage
    const pendingProject = localStorage.getItem("pendingProject")
    if (pendingProject) {
      const projectData = JSON.parse(pendingProject)
      setProjectData(projectData)
      setHasExistingProject(true)
      
      // If it's a temporary project ID, we'll create the real project after payment
      if (projectData.projectId && typeof projectData.projectId === "string" && projectData.projectId.startsWith("temp_")) {
        console.log("Using temporary project ID, will create real project after payment")
      }
    } else {
      // No pending project - user came directly after login
      // This is fine, they can pay first and then go through the wizard
      setHasExistingProject(false)
      console.log("No pending project - user will pay first, then go through wizard")
    }
    
    // Return undefined (no cleanup function needed)
    return undefined
  }, [])

  const handlePlanSelect = () => {
    // Track checkout initiation
    trackInitiateCheckout(29)

    // Wait for session to load
    if (status === "loading") {
      console.log("Session still loading, please wait...")
      return
    }

    if (!session) {
      // Redirect to login with callback to payment page
      router.push(`/login?callbackUrl=/payment`)
      return
    }
    handleCheckout()
  }

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          planId: "professional",
          projectId: projectData?.projectId 
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Er is een fout opgetreden. Probeer het opnieuw.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Er is een fout opgetreden. Probeer het opnieuw.")
    } finally {
      setLoading(false)
    }
  }

  const features = [
    "40 Professionele portretfoto's",
    "Verschillende outfits & achtergronden",
    "HD kwaliteit (geschikt voor print)",
    "Klaar binnen 15 minuten",
    "Perfect voor LinkedIn, CV & Website",
    "Niet goed? Geld terug",
  ]

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B5] mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <Header />
      <div className="container mx-auto px-4 py-6 md:py-20">
        <ProgressIndicator currentStep={2} />
        <div className="text-center mb-3 md:mb-8 max-w-3xl mx-auto">
          <h1 className="text-base md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-4 leading-tight">
            Kies jouw pakket
          </h1>
          <p className="text-xs md:text-base lg:text-lg text-gray-600 leading-relaxed mb-3 md:mb-0">
            Eenmalig, geen abonnement, geld terug garantie
          </p>
        </div>

        <div className="max-w-md mx-auto px-2 md:px-0">
          <Card className="relative border-2 border-[#0077B5] shadow-xl">
            <CardHeader className="text-center pt-4 md:pt-8 px-3 md:px-6">
              <CardTitle className="text-lg md:text-2xl font-bold">Professional</CardTitle>
              <div className="mt-2 md:mt-4">
                <span className="text-xl md:text-4xl font-bold text-[#0077B5]">€ 29</span>
                <span className="text-gray-600 ml-2 text-sm md:text-base">eenmalig</span>
              </div>
              <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Geen abonnement</p>
            </CardHeader>

            <CardContent className="space-y-3 md:space-y-6 px-3 md:px-6 pb-4 md:pb-8">
              <ul className="space-y-2 md:space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 md:space-y-3 pt-2">
                <Button
                  onClick={handlePlanSelect}
                  disabled={loading}
                  className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white py-2.5 md:py-4 text-sm md:text-lg font-semibold"
                >
                  {loading ? "Laden..." : "Betaal Veilig & Start Direct"}
                </Button>
                <p className="text-center text-xs md:text-sm text-gray-600">
                  🔒 Veilig via iDEAL of Creditcard
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
