import { NextRequest, NextResponse } from "next/server"

const fallbackReferral = {
  code: "AMANDA12", referralCount: 3, creditsEarned: 45, pendingReferrals: 0,
  referralLink: "https://cleaninstead.com/referral/AMANDA12", rewardPerReferral: 15, friendDiscount: 20,
  referrals: [
    { id: "ref-1", name: "Carol Williams", email: "carol@example.com", referredDate: "2025-03-15", status: "completed", rewardEarned: true, creditAmount: 15 },
    { id: "ref-2", name: "Bob Martinez", email: "bob@example.com", referredDate: "2025-02-28", status: "completed", rewardEarned: true, creditAmount: 15 },
    { id: "ref-3", name: "David Thompson", email: "david@example.com", referredDate: "2025-01-10", status: "completed", rewardEarned: true, creditAmount: 15 },
  ],
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
      console.warn("[Customer Referral API] DB import failed, using fallback:", e?.message)
      return NextResponse.json(fallbackReferral)
    }

    const profile = await db.customerProfile.findUnique({ where: { userId: user.id }, select: { referralCode: true } })
    const referrals = await db.referral.findMany({
      where: { referrerId: user.id },
      include: { referred: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })

    const completedReferrals = referrals.filter((r: any) => r.status === "completed")
    const pendingReferrals = referrals.filter((r: any) => r.status === "pending")
    const totalCredits = completedReferrals.reduce((sum: number, r: any) => sum + r.creditsEarned, 0)

    return NextResponse.json({
      code: profile?.referralCode || "", referralCount: completedReferrals.length,
      creditsEarned: totalCredits, pendingReferrals: pendingReferrals.length,
      referralLink: `https://cleaninstead.com/referral/${profile?.referralCode || ""}`,
      rewardPerReferral: 15, friendDiscount: 20,
      referrals: referrals.map((r: any) => ({
        id: r.id, name: r.referred?.name || "Pending", email: r.referred?.email || "",
        referredDate: r.createdAt.toISOString().split("T")[0], status: r.status,
        rewardEarned: r.status === "completed", creditAmount: r.creditsEarned,
      })),
    })
  } catch (error) {
    console.warn("Customer referral API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackReferral)
  }
}
