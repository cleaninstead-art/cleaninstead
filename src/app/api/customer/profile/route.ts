import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        ecoOnly: true,
        notificationsEnabled: true,
        createdAt: true,
        customerProfile: {
          select: {
            totalBookings: true,
            loyaltyPoints: true,
            totalCleans: true,
            referralCode: true,
            preferredTime: true,
            petFriendly: true,
            ecoProducts: true,
            specialInstructions: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const profile = user.customerProfile

    // Count eco-related bookings for eco bottles saved estimate
    const ecoBookings = await db.booking.count({
      where: {
        customerId: userId,
        serviceType: "Eco Clean",
        status: "completed",
      },
    })

    // Count referrals
    const referralCount = await db.referral.count({
      where: { referrerId: userId, status: "completed" },
    })

    return NextResponse.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      loyaltyPoints: profile?.loyaltyPoints || 0,
      totalBookings: profile?.totalBookings || 0,
      totalCleans: profile?.totalCleans || 0,
      ecoBottlesSaved: ecoBookings * 3, // Estimate: 3 bottles saved per eco clean
      referralCode: profile?.referralCode || "",
      referralCount,
      memberSince: user.createdAt.toISOString().split("T")[0],
      preferredTime: profile?.preferredTime || "morning",
      ecoProductsOnly: profile?.ecoProducts ?? user.ecoOnly,
      petFriendly: profile?.petFriendly ?? true,
      notificationsEnabled: user.notificationsEnabled,
      specialInstructions: profile?.specialInstructions,
    })
  } catch (error) {
    console.error("Customer profile API error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, address, city, preferredTime, petFriendly, ecoProducts, specialInstructions } = body

    // Update user
    await db.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(city && { city }),
      },
    })

    // Update customer profile
    const profile = await db.customerProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (profile) {
      await db.customerProfile.update({
        where: { userId: session.user.id },
        data: {
          ...(preferredTime && { preferredTime }),
          ...(petFriendly !== undefined && { petFriendly }),
          ...(ecoProducts !== undefined && { ecoProducts }),
          ...(specialInstructions !== undefined && { specialInstructions }),
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
