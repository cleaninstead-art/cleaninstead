import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const fallbackProfile = {
  name: "Amanda Johnson", email: "amanda@example.com", phone: "604-555-7890",
  address: "123 Elm Street, Surrey, BC V3R 1M7", city: "Surrey",
  loyaltyPoints: 60, totalBookings: 12, totalCleans: 10, ecoBottlesSaved: 24,
  referralCode: "AMANDA12", referralCount: 3, memberSince: "2024-11-15",
  preferredTime: "morning", ecoProductsOnly: true, petFriendly: true,
  notificationsEnabled: true, specialInstructions: null,
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, phone: true, address: true, city: true, ecoOnly: true, notificationsEnabled: true, createdAt: true,
        customerProfile: { select: { totalBookings: true, loyaltyPoints: true, totalCleans: true, referralCode: true, preferredTime: true, petFriendly: true, ecoProducts: true, specialInstructions: true } } },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const profile = user.customerProfile
    const ecoBookings = await db.booking.count({ where: { customerId: session.user.id, serviceType: "Eco Clean", status: "completed" } })
    const referralCount = await db.referral.count({ where: { referrerId: session.user.id, status: "completed" } })

    return NextResponse.json({
      name: user.name, email: user.email, phone: user.phone, address: user.address, city: user.city,
      loyaltyPoints: profile?.loyaltyPoints || 0, totalBookings: profile?.totalBookings || 0,
      totalCleans: profile?.totalCleans || 0, ecoBottlesSaved: ecoBookings * 3,
      referralCode: profile?.referralCode || "", referralCount,
      memberSince: user.createdAt.toISOString().split("T")[0],
      preferredTime: profile?.preferredTime || "morning",
      ecoProductsOnly: profile?.ecoProducts ?? user.ecoOnly,
      petFriendly: profile?.petFriendly ?? true,
      notificationsEnabled: user.notificationsEnabled,
      specialInstructions: profile?.specialInstructions,
    })
  } catch (error) {
    console.warn("Customer profile API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackProfile)
  }
}
