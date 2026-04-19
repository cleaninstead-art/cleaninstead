import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"

// Fallback users for when database is not available
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

async function authenticate(email: string, password: string): Promise<{ id: string; email: string; name: string; role: string; image?: string | null } | null> {
  // Try database lookup first
  try {
    const user = await db.user.findUnique({
      where: { email },
    })

    if (user && user.password && user.password === password) {
      return {
        id: user.id,
        email: user.email,
        name: user.name || "",
        role: user.role,
        image: user.avatar,
      }
    }
  } catch (dbError: any) {
    console.error("[Auth] DB lookup error:", dbError?.message)
  }

  // Fallback to hardcoded credentials
  const fallback = fallbackUsers[email]
  if (fallback && fallback.password === password) {
    return {
      id: `fallback-${email}`,
      email,
      name: fallback.name,
      role: fallback.role,
    }
  }

  return null
}

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[Auth] Missing credentials")
          return null
        }

        const email = String(credentials.email).trim()
        const password = String(credentials.password)

        console.log("[Auth] Attempting login for:", email)

        const user = await authenticate(email, password)

        if (user) {
          console.log("[Auth] Login successful for:", email, "role:", user.role)
        } else {
          console.log("[Auth] Login failed for:", email)
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "cleaninstead-secret-key-2024",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
