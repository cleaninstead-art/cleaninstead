import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Test 1: Check database connection
    const userCount = await db.user.count()
    
    // Test 2: Look up admin user
    const admin = await db.user.findUnique({
      where: { email: "admin@cleaninstead.com" },
      select: { id: true, email: true, name: true, password: true, role: true },
    })
    
    // Test 3: Look up cleaner user
    const cleaner = await db.user.findUnique({
      where: { email: "maria@cleaninstead.com" },
      select: { id: true, email: true, name: true, password: true, role: true },
    })

    // Test 4: Look up customer user
    const customer = await db.user.findUnique({
      where: { email: "amanda@example.com" },
      select: { id: true, email: true, name: true, password: true, role: true },
    })

    // Test 5: Password comparison
    const adminMatch = admin?.password === "admin123"
    const cleanerMatch = cleaner?.password === "cleaner123"
    const customerMatch = customer?.password === "customer123"

    return NextResponse.json({
      totalUsers: userCount,
      admin: admin ? { ...admin, passwordMatch: adminMatch } : null,
      cleaner: cleaner ? { ...cleaner, passwordMatch: cleanerMatch } : null,
      customer: customer ? { ...customer, passwordMatch: customerMatch } : null,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + "...",
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
  }
}
