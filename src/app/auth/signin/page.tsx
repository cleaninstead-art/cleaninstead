"use client"

import { useState } from "react"
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

export default function SignInPage() {
  const [role, setRole] = useState("customer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const roleParam = searchParams.get("role")
  if (roleParam && ["admin", "cleaner", "customer"].includes(roleParam) && role !== roleParam) {
    setRole(roleParam)
  }

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
