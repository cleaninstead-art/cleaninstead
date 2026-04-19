"use client"

import { Suspense, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Leaf, User, Shield, Sparkles, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const roles = [
  { id: "customer", label: "Customer", icon: User, color: "bg-emerald-100 text-emerald-700", demo: "amanda@example.com" },
  { id: "cleaner", label: "Cleaner", icon: Sparkles, color: "bg-teal-100 text-teal-700", demo: "maria@cleaninstead.com" },
  { id: "admin", label: "Admin", icon: Shield, color: "bg-green-100 text-green-700", demo: "admin@cleaninstead.com" },
]

function getInitialCredentials(roleParam: string | null) {
  if (roleParam && ["admin", "cleaner", "customer"].includes(roleParam)) {
    const r = roles.find((x) => x.id === roleParam)
    if (r) {
      return {
        email: r.demo,
        password: r.demo.includes("admin") ? "admin123" : r.demo.includes("cleaner") ? "cleaner123" : "customer123",
      }
    }
  }
  return { email: "", password: "" }
}

function SignInForm() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get("role")
  const initialCreds = getInitialCredentials(roleParam)

  const [role, setRole] = useState(roleParam && ["admin", "cleaner", "customer"].includes(roleParam) ? roleParam : "customer")
  const [email, setEmail] = useState(initialCreds.email)
  const [password, setPassword] = useState(initialCreds.password)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid email or password")
      return
    }

    if (role === "admin") router.push("/admin")
    else if (role === "cleaner") router.push("/cleaner-portal")
    else router.push("/my-account")
  }

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword(demoEmail.includes("admin") ? "admin123" : demoEmail.includes("cleaner") ? "cleaner123" : "customer123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CleanInstead</h1>
          <p className="text-gray-500 mt-1">Premium Eco-Friendly Cleaning</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Select your role and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {roles.map((r) => {
                const Icon = r.icon
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { setRole(r.id); fillDemo(r.demo) }}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      role === r.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${role === r.id ? "text-emerald-600" : "text-gray-400"}`} />
                    {r.label}
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={roles.find((r) => r.id === role)?.demo}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center">
                Demo credentials pre-filled. Click a role tab above, then Sign In.
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                Password: admin123 / cleaner123 / customer123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SignInFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInForm />
    </Suspense>
  )
}
