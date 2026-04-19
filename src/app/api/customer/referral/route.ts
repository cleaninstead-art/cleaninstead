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

    // Get customer profile for referral code
    const profile = await db.customerProfile.findUnique({
      where: { userId },
      select: { referralCode: true },
    })

    // Get all referrals made by this user
    const referrals = await db.referral.findMany({
      where: { referrerId: userId },
      include: {
        referred: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    const completedReferrals = referrals.filter((r) => r.status === "completed")
    const pendingReferrals = referrals.filter((r) => r.status === "pending")
    const totalCredits = completedReferrals.reduce((sum, r) => sum + r.creditsEarned, 0)

    return NextResponse.json({
      code: profile?.referralCode || "",
      referralCount: completedReferrals.length,
      creditsEarned: totalCredits,
      pendingReferrals: pendingReferrals.length,
      referralLink: `https://cleaninstead.com/referral/${profile?.referralCode || ""}`,
      rewardPerReferral: 15,
      friendDiscount: 20,
      referrals: referrals.map((r) => ({
        id: r.id,
        name: r.referred?.name || "Pending",
        email: r.referred?.email || "",
        referredDate: r.createdAt.toISOString().split("T")[0],
        status: r.status,
        rewardEarned: r.status === "completed",
        creditAmount: r.creditsEarned,
      })),
    })
  } catch (error) {
    console.error("Customer referral API error:", error)
    return NextResponse.json({ error: "Failed to fetch referral data" }, { status: 500 })
  }
}
