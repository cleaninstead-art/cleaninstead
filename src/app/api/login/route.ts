import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackUsers: Record<string, { password: string; role: string; name: string }> = {
  "admin@cleaninstead.com": { password: "admin123", role: "admin", name: "Admin User" },
  "maria@cleaninstead.com": { password: "cleaner123", role: "cleaner", name: "Maria Santos" },
  "james@cleaninstead.com": { password: "cleaner123", role: "cleaner", name: "James Wilson" },
  "sarah@cleaninstead.com": { password: "cleaner123", role: "cleaner", name: "Sarah Chen" },
  "amanda@example.com": { password: "customer123", role: "customer", name: "Amanda Johnson" },
  "bob@example.com": { password: "customer123", role: "customer", name: "Bob Martinez" },
  "carol@example.com": { password: "customer123", role: "customer", name: "Carol Williams" },
  "david@example.com": { password: "customer123", role: "customer", name: "David Thompson" },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Try database first
    let user = null
    try {
      const dbUser = await db.user.findUnique({
        where: { email: email.trim().toLowerCase() },
      })
      if (dbUser && dbUser.password === password) {
        user = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
        }
      }
    } catch (e: any) {
      console.error("[Login API] DB error:", e?.message)
    }

    // Fallback to hardcoded
    if (!user) {
      const fallback = fallbackUsers[email.trim().toLowerCase()]
      if (fallback && fallback.password === password) {
        user = {
          id: `fallback-${email}`,
          email,
          name: fallback.name,
          role: fallback.role,
        }
      }
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create a JWT token
    const { SignJWT } = await import("jose")
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "cleaninstead-secret-key-2024")

    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    })

    // Set session cookie (use __Secure- prefix for HTTPS)
    response.cookies.set("__Secure-ci-session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    })

    // Also set without __Secure- for compatibility (no secure flag for localhost/HTTP)
    response.cookies.set("ci-session", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    })

    return response
  } catch (error: any) {
    console.error("[Login API] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
