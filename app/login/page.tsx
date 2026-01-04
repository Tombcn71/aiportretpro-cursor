"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MailPlus } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Check if user came from login button (header) or CTA - go directly to login form
  const isDirectLogin = searchParams.get("mode") === "login"
  const hasCallbackUrl = searchParams.get("callbackUrl") !== null
  
  const [loading, setLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(isDirectLogin || hasCallbackUrl) // Show form immediately if direct login or CTA
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(!isDirectLogin) // If direct login, start in login mode. Otherwise signup (including CTA)
  const [error, setError] = useState("")
  const [isProcessingSignup, setIsProcessingSignup] = useState(false) // Prevent useEffect redirect during signup

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      // Check if this is a homepage CTA login or has callbackUrl
      // If callbackUrl is /payment (from CTA), go to dashboard for logged in users
      const isHomepageCTA = searchParams.get("source") === "homepage"
      let callbackUrl = searchParams.get("callbackUrl") || (isHomepageCTA ? "/pricing" : "/dashboard")
      // Note: Google sign in will handle the redirect after authentication
      // If user is already logged in, the useEffect will redirect to dashboard
      
      await signIn("google", { callbackUrl })
    } catch (error) {
      console.error("Login error:", error)
      setError("Er is een fout opgetreden bij het inloggen met Google")
      setLoading(false)
    }
  }

  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Get the source parameter to determine where user came from
      const source = searchParams.get("source") || "header"

      if (isSignUp) {
        // Handle sign up
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, source }),
        })

        // If account already exists (409), try to sign in instead
        if (response.status === 409) {
          console.log("Account already exists, attempting to sign in instead...")
          const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
          })

          if (signInResult?.error) {
            setError("Dit email adres is al in gebruik. Probeer in te loggen.")
            setIsSignUp(false) // Switch to login mode
            return
          } else if (signInResult?.ok) {
            const isHomepageCTA = searchParams.get("source") === "homepage"
            const redirectUrl = isHomepageCTA ? "/pricing" : "/dashboard"
            console.log("✅ Signed in successfully, redirecting to:", redirectUrl)
            router.push(redirectUrl)
            return
          }
        }

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Registratie mislukt")
        }

        const data = await response.json()
        
        // CRITICAL FIX: After successful signup, automatically sign in the user
        console.log("✅ Signup successful, now signing in...")
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (signInResult?.error) {
          setError("Account aangemaakt, maar inloggen mislukt. Probeer handmatig in te loggen.")
          setIsSignUp(false) // Switch to login mode
        } else if (signInResult?.ok) {
          // After SIGNUP: always go to pricing (new customers need to pay)
          // If callbackUrl is /payment, redirect to /pricing instead
          const callbackUrl = searchParams.get("callbackUrl")
          const redirectUrl = callbackUrl === "/payment" ? "/pricing" : (callbackUrl || "/pricing")
          console.log("✅ Signup + Sign in successful, redirecting to:", redirectUrl)
          router.push(redirectUrl)
          return
        }
      } else {
        // Handle sign in
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError("Ongeldige email of wachtwoord")
        } else if (result?.ok) {
          // After LOGIN: if callbackUrl is /payment (from CTA), go to dashboard instead
          // This way logged in users can see their photos and start new projects
          const callbackUrl = searchParams.get("callbackUrl")
          const redirectUrl = callbackUrl === "/payment" ? "/dashboard" : (callbackUrl || "/dashboard")
          console.log("✅ Login successful, redirecting to:", redirectUrl)
          router.push(redirectUrl)
        }
      }
    } catch (error) {
      console.error("Email auth error:", error)
      setError(error instanceof Error ? error.message : "Er is een fout opgetreden")
    } finally {
      setLoading(false)
    }
  }

  // If user is already authenticated, redirect them
  // But don't redirect if user just signed up (let the signup handler do it)
  useEffect(() => {
    if (status === "authenticated" && session && !isProcessingSignup) {
      // Check if user has credits - if not, they're new and should go to pricing
      const checkCreditsAndRedirect = async () => {
        try {
          const response = await fetch("/api/credits/balance")
          if (response.ok) {
            const data = await response.json()
            const callbackUrl = searchParams.get("callbackUrl")
            
            // If user has no credits, they're new - send to pricing
            if (data.credits === 0) {
              const redirectUrl = callbackUrl === "/payment" ? "/pricing" : (callbackUrl || "/pricing")
              console.log("New user (no credits), redirecting to:", redirectUrl)
              router.push(redirectUrl)
              return
            }
            
            // Existing user with credits - go to dashboard (unless explicit callbackUrl)
            let redirectUrl = "/dashboard"
            if (callbackUrl && callbackUrl !== "/payment") {
              redirectUrl = callbackUrl
            }
            console.log("Existing user (has credits), redirecting to:", redirectUrl)
            router.push(redirectUrl)
          }
        } catch (error) {
          console.error("Error checking credits:", error)
          // On error, default to pricing for safety
          const callbackUrl = searchParams.get("callbackUrl")
          const redirectUrl = callbackUrl === "/payment" ? "/pricing" : (callbackUrl || "/pricing")
          router.push(redirectUrl)
        }
      }
      
      checkCreditsAndRedirect()
    }
    // Return undefined (no cleanup function needed)
    return undefined
  }, [status, session, router, searchParams, isProcessingSignup])

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077B5]"></div>
      </div>
    )
  }

  // Don't render if already authenticated
  if (status === "authenticated" && session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-left">
            {/* Logo with text */}
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/images/logo-icon.png"
                alt="AI Portrait Pro Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg text-gray-900">AIPortretPro</span>
            </div>
            
            {/* Main title - Show "Bijna bij de kassa" for CTA, "Welkom terug" only for direct login */}
            {hasCallbackUrl ? (
              <CardTitle className="text-xl md:text-2xl text-gray-900 mb-3 font-normal pl-0">
                Bijna bij de kassa
                <br />
                <span className="text-gray-700">Log in om je bestelling af te ronden.</span>
              </CardTitle>
            ) : !showEmailForm ? (
              <CardTitle className="text-xl md:text-2xl text-gray-900 mb-3 font-normal pl-0">
                Bijna bij de kassa
                <br />
                <span className="text-gray-700">Log in om je bestelling af te ronden.</span>
              </CardTitle>
            ) : !isSignUp ? (
              <CardTitle className="text-xl md:text-2xl text-gray-900 mb-3 font-normal pl-0">
                Welkom terug!
                <br />
                <span className="text-[#0077B5]">Log in om verder te gaan.</span>
              </CardTitle>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-4">
            {!showEmailForm ? (
              <>
                {/* Main choice buttons */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-[#4285f4] hover:bg-[#3367d6] text-white flex items-center justify-center space-x-3 py-6 text-lg font-semibold"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Ga door met Google</span>
                </Button>

                <Button
                  onClick={() => setShowEmailForm(true)}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white flex items-center justify-center space-x-3 py-6 text-lg font-semibold"
                >
                  <MailPlus className="h-6 w-6" />
                  <span>Ga door met e-mail</span>
                </Button>
                <div className="text-sm text-gray-600 text-center mt-3">
                  🔒 Veilig betalen met iDEAL <span className="text-green-500">✓</span> 14 dagen geld-terug-garantie
                </div>
              </>
            ) : (
              <>
                {/* Show Google button in both login and signup mode */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-[#4285f4] hover:bg-[#3367d6] text-white flex items-center justify-center space-x-3 py-6 text-lg font-semibold mb-4"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Ga door met Google</span>
                </Button>
                
                {/* Email form */}
                <form onSubmit={handleEmailContinue} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.com"
                      required
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-gray-700">Wachtwoord</label>
                      {!isSignUp && (
                        <a 
                          href="/forgot-password" 
                          className="text-xs text-[#0077B5] hover:underline"
                        >
                          Wachtwoord vergeten?
                        </a>
                      )}
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                      minLength={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:border-transparent"
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading || !email || !password}
                    className="w-full bg-[#0077B5] hover:bg-[#005885] text-white py-6 text-lg font-semibold"
                  >
                    {loading ? "Bezig..." : (isSignUp ? "Account aanmaken en doorgaan" : "Inloggen")}
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-gray-600 hover:text-[#0077B5]"
                    disabled={loading}
                  >
                    {isSignUp ? "Heb je al een account? Log hier in" : "Nieuw hier? Maak een account aan"}
                  </Button>
                </div>
              </>
            )}

            <div className="text-left">
              <p className="text-xs text-gray-500 mb-4">
                Door te registreren ga je akkoord met onze{" "}
                <Button variant="link" className="text-xs text-[#0077B5] p-0 h-auto font-normal underline">
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Algemene Voorwaarden
                  </a>
                </Button>
                {" "}en ons{" "}
                <Button variant="link" className="text-xs text-[#0077B5] p-0 h-auto font-normal underline">
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacybeleid
                  </a>
                </Button>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
