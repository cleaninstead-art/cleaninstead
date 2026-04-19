import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"

const users: Record<string, { password: string; role: string; name: string }> = {
  "admin@cleaninstead.com": { password: "admin123", role: "admin", name: "Admin User" },
  "maria@cleaninstead.com": { password: "cleaner123", role: "cleaner", name: "Maria Santos" },
  "james@cleaninstead.com": { password: "cleaner123", role: "cleaner", name: "James Wilson" },
  "sarah@cleaninstead.com": { password: "cleaner123", role: "cleaner", name: "Sarah Chen" },
  "amanda@example.com": { password: "customer123", role: "customer", name: "Amanda Johnson" },
  "bob@example.com": { password: "customer123", role: "customer", name: "Bob Martinez" },
  "carol@example.com": { password: "customer123", role: "customer", name: "Carol Williams" },
  "david@example.com": { password: "customer123", role: "customer", name: "David Thompson" },
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
        if (!credentials?.email || !credentials?.password) return null

        const demoUser = users[credentials.email]
        if (!demoUser) return null

        if (demoUser.password !== credentials.password) return null

        return {
          id: demoUser.email,
          email: credentials.email,
          name: demoUser.name,
          role: demoUser.role,
        }
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
