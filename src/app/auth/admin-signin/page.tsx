"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function AdminSignInForm() {
  const [email, setEmail] = useState("admin@cleaninstead.com")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success && data.user) {
        if (data.user.role === "admin") {
          router.push("/admin")
        } else {
          setError("This login is for administrators only.")
        }
      } else {
        setError(data.error || "Invalid email or password")
      }
    } catch (err: any) {
      console.error("Admin sign-in error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Admin Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0f2419] rounded-2xl mb-4 ring-4 ring-[#0f2419]/20">
            <Shield className="w-8 h-8 text-[#95D5B2]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 mt-1">CleanInstead Management System</p>
        </div>

        <Card className="shadow-2xl border-gray-700/50" style={{ backgroundColor: "rgba(31, 41, 55, 0.8)" }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-white">Administrator Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Access restricted to authorized personnel only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="admin-email" className="text-gray-300">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@cleaninstead.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 border-gray-600 text-white placeholder:text-gray-500"
                  style={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                />
              </div>
              <div>
                <Label htmlFor="admin-password" className="text-gray-300">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-600 text-white placeholder:text-gray-500 pr-10"
                    style={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0f2419] hover:bg-[#1B4332] text-[#95D5B2] font-semibold h-11"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In to Admin"}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center">
                This is a restricted area. Unauthorized access attempts are monitored and logged.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to main site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            &larr; Back to CleanInstead.com
          </a>
        </div>
      </div>
    </div>
  )
}

function AdminSignInFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-8 h-8 border-3 border-[#95D5B2] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function AdminSignInPage() {
  return (
    <Suspense fallback={<AdminSignInFallback />}>
      <AdminSignInForm />
    </Suspense>
  )
}
