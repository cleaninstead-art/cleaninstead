import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("ci-session")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const { jwtVerify } = await import("jose")
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "cleaninstead-secret-key-2024")

    try {
      const { payload } = await jwtVerify(token, secret)
      return NextResponse.json({
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        },
      })
    } catch {
      return NextResponse.json({ user: null })
    }
  } catch {
    return NextResponse.json({ user: null })
  }
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.set("ci-session", "", { maxAge: 0, path: "/" })
  return response
}
