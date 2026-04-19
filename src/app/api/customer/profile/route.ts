import { NextRequest, NextResponse } from "next/server"

const fallbackProfile = {
  name: "Amanda Johnson", email: "amanda@example.com", phone: "604-555-7890",
  address: "123 Elm Street, Surrey, BC V3R 1M7", city: "Surrey",
  loyaltyPoints: 60, totalBookings: 12, totalCleans: 10, ecoBottlesSaved: 24,
  referralCode: "AMANDA12", referralCount: 3, memberSince: "2024-11-15",
  preferredTime: "morning", ecoProductsOnly: true, petFriendly: true,
  notificationsEnabled: true, specialInstructions: null,
}

async function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get("ci-session")?.value
  if (!token) return null

  try {
    const { jwtVerify } = await import("jose")
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "cleaninstead-secret-key-2024")
    const { payload } = await jwtVerify(token, secret)
    return { id: payload.sub, email: payload.email, name: payload.name, role: payload.role }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    let db: any = null
    try {
      const mod = await import("@/lib/db")
      db = mod.db
    } catch (e: any) {
      console.warn("[Customer Profile API] DB import failed, using fallback:", e?.message)
      return NextResponse.json(fallbackProfile)
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { name: true, email: true, phone: true, address: true, city: true, ecoOnly: true, notificationsEnabled: true, createdAt: true,
        customerProfile: { select: { totalBookings: true, loyaltyPoints: true, totalCleans: true, referralCode: true, preferredTime: true, petFriendly: true, ecoProducts: true, specialInstructions: true } } },
    })
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const profile = dbUser.customerProfile
    const ecoBookings = await db.booking.count({ where: { customerId: user.id, serviceType: "Eco Clean", status: "completed" } })
    const referralCount = await db.referral.count({ where: { referrerId: user.id, status: "completed" } })

    return NextResponse.json({
      name: dbUser.name, email: dbUser.email, phone: dbUser.phone, address: dbUser.address, city: dbUser.city,
      loyaltyPoints: profile?.loyaltyPoints || 0, totalBookings: profile?.totalBookings || 0,
      totalCleans: profile?.totalCleans || 0, ecoBottlesSaved: ecoBookings * 3,
      referralCode: profile?.referralCode || "", referralCount,
      memberSince: dbUser.createdAt.toISOString().split("T")[0],
      preferredTime: profile?.preferredTime || "morning",
      ecoProductsOnly: profile?.ecoProducts ?? dbUser.ecoOnly,
      petFriendly: profile?.petFriendly ?? true,
      notificationsEnabled: dbUser.notificationsEnabled,
      specialInstructions: profile?.specialInstructions,
    })
  } catch (error) {
    console.warn("Customer profile API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackProfile)
  }
}
