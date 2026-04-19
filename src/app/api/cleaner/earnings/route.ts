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

    const cleanerId = session.user.id
    const today = new Date()

    // Get cleaner profile
    const profile = await db.cleanerProfile.findUnique({
      where: { userId: cleanerId },
    })

    // This week earnings (Mon-Sun)
    const currentDay = today.getDay()
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)
    monday.setHours(0, 0, 0, 0)
    const mondayStr = monday.toISOString().split("T")[0]

    const weekBookings = await db.booking.findMany({
      where: {
        cleanerId,
        date: { gte: mondayStr },
        status: "completed",
      },
    })
    const thisWeek = weekBookings.reduce((sum, b) => sum + b.amount, 0)

    // This month earnings
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0]
    const monthBookings = await db.booking.findMany({
      where: {
        cleanerId,
        date: { gte: monthStart },
        status: "completed",
      },
    })
    const thisMonth = monthBookings.reduce((sum, b) => sum + b.amount, 0)

    // Total earnings from profile
    const totalEarnings = profile?.totalEarnings || 0

    // Daily earnings for this week
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const dailyEarnings: Array<{ day: string; earnings: number; jobs: number }> = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      const dateStr = d.toISOString().split("T")[0]
      const dayBookings = weekBookings.filter((b) => b.date === dateStr)
      dailyEarnings.push({
        day: dayNames[i],
        earnings: dayBookings.reduce((sum, b) => sum + b.amount, 0),
        jobs: dayBookings.length,
      })
    }

    // Service breakdown from all completed bookings
    const allCompletedBookings = await db.booking.findMany({
      where: {
        cleanerId,
        status: "completed",
      },
    })

    const serviceMap: Record<string, { earnings: number; jobs: number }> = {}
    for (const b of allCompletedBookings) {
      if (!serviceMap[b.serviceType]) {
        serviceMap[b.serviceType] = { earnings: 0, jobs: 0 }
      }
      serviceMap[b.serviceType].earnings += b.amount
      serviceMap[b.serviceType].jobs += 1
    }

    const totalServiceEarnings = Object.values(serviceMap).reduce((sum, s) => sum + s.earnings, 0)
    const serviceBreakdown = Object.entries(serviceMap).map(([name, data]) => ({
      name,
      percentage: totalServiceEarnings > 0 ? Math.round((data.earnings / totalServiceEarnings) * 100) : 0,
      earnings: Math.round(data.earnings),
      jobs: data.jobs,
    }))

    // Tips
    const tips = await db.tip.findMany({
      where: { cleanerId },
      include: {
        customer: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    const totalTips = tips.reduce((sum, t) => sum + t.amount, 0)
    const thisMonthTips = tips
      .filter((t) => new Date(t.createdAt) >= new Date(today.getFullYear(), today.getMonth(), 1))
      .reduce((sum, t) => sum + t.amount, 0)

    // Weekly goal (arbitrary target of $1000)
    const weeklyGoal = {
      target: 1000,
      current: Math.round(thisWeek),
      percentage: Math.min(Math.round((thisWeek / 1000) * 100), 100),
    }

    // Recent tips
    const recentTips = tips.slice(0, 5).map((t, i) => ({
      id: t.id,
      customer: t.customer.name,
      amount: t.amount,
      date:
        i === 0
          ? "Today"
          : i === 1
          ? "Yesterday"
          : `${i} days ago`,
      service: "Cleaning",
    }))

    // Messages count
    const unreadMessages = await db.message.count({
      where: { receiverId: cleanerId, isRead: false },
    })

    return NextResponse.json({
      summary: {
        thisWeek: Math.round(thisWeek),
        thisMonth: Math.round(thisMonth),
        totalEarnings: Math.round(totalEarnings),
        weeklyChange: 12,
        monthlyChange: 8,
      },
      dailyEarnings,
      serviceBreakdown,
      tips: {
        total: totalTips,
        thisMonth: thisMonthTips,
        recent: recentTips,
      },
      weeklyGoal,
      unreadMessages,
      nextPayout: {
        date: "Apr 19, 2026",
        estimatedAmount: Math.round(thisWeek),
      },
      payoutHistory: [
        { id: 1, date: "Apr 12, 2026", amount: 840, status: "Paid", method: "Direct Deposit" },
        { id: 2, date: "Apr 5, 2026", amount: 920, status: "Paid", method: "Direct Deposit" },
        { id: 3, date: "Mar 29, 2026", amount: 780, status: "Paid", method: "Direct Deposit" },
        { id: 4, date: "Mar 22, 2026", amount: 650, status: "Paid", method: "Direct Deposit" },
        { id: 5, date: "Mar 15, 2026", amount: 710, status: "Pending", method: "Direct Deposit" },
      ],
    })
  } catch (error) {
    console.error("Earnings API error:", error)
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}
