import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where: any = { role: "cleaner" }
    if (status === "active") {
      where.isAvailable = true
    } else if (status === "suspended") {
      where.isAvailable = false
    }

    const cleaners = await db.user.findMany({
      where,
      include: {
        cleanerProfile: true,
        _count: {
          select: {
            assignedJobs: true,
            reviews: true,
            receivedTips: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(
      cleaners.map((c) => {
        const profile = c.cleanerProfile
        const initials = c.name
          ? c.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
          : "??"
        return {
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone,
          avatar: c.avatar,
          rating: profile?.rating || 0,
          totalJobs: profile?.totalJobs || 0,
          totalEarnings: profile?.totalEarnings || 0,
          areas: profile?.serviceAreas ? profile.serviceAreas.split(",").map((s: string) => s.trim()) : [],
          skills: profile?.skills ? profile.skills.split(",").map((s: string) => s.trim()) : [],
          status: c.isAvailable ? "active" : "suspended",
          initials,
          joinDate: profile?.joinDate?.toISOString().split("T")[0] || c.createdAt.toISOString().split("T")[0],
          isTopRated: profile?.isTopRated || false,
          bio: profile?.bio,
          totalReviews: c._count.reviews,
          totalTips: c._count.receivedTips,
          activeJobs: c._count.assignedJobs,
        }
      })
    )
  } catch (error) {
    console.error("Cleaners API error:", error)
    return NextResponse.json({ error: "Failed to fetch cleaners" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { cleanerId, isAvailable } = body

    const cleaner = await db.user.update({
      where: { id: cleanerId },
      data: { isAvailable },
    })

    return NextResponse.json({
      id: cleaner.id,
      name: cleaner.name,
      status: cleaner.isAvailable ? "active" : "suspended",
    })
  } catch (error) {
    console.error("Cleaner update error:", error)
    return NextResponse.json({ error: "Failed to update cleaner" }, { status: 500 })
  }
}
