import { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

export interface SessionUser {
  id: string
  email: string
  name: string
  role: string
}

export async function getCustomSession(request: NextRequest): Promise<SessionUser | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("ci-session")?.value

  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "cleaninstead-secret-key-2024")
    const { payload } = await jwtVerify(token, secret)
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}
