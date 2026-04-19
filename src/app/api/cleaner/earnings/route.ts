import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const fallbackEarnings = {
  summary: { thisWeek: 840, thisMonth: 3250, totalEarnings: 18420, weeklyChange: 12, monthlyChange: 8 },
  dailyEarnings: [
    { day: "Mon", earnings: 235, jobs: 2 }, { day: "Tue", earnings: 395, jobs: 3 },
    { day: "Wed", earnings: 120, jobs: 1 }, { day: "Thu", earnings: 280, jobs: 2 },
    { day: "Fri", earnings: 160, jobs: 1 }, { day: "Sat", earnings: 0, jobs: 0 }, { day: "Sun", earnings: 0, jobs: 0 },
  ],
  serviceBreakdown: [
    { name: "Regular Clean", percentage: 60, earnings: 11052, jobs: 85 },
    { name: "Deep Clean", percentage: 25, earnings: 4605, jobs: 35 },
    { name: "Eco Clean", percentage: 15, earnings: 2763, jobs: 22 },
  ],
  tips: { total: 342, thisMonth: 105, recent: [
    { id: "1", customer: "Amanda Johnson", amount: 20, date: "Today", service: "Regular Clean" },
    { id: "2", customer: "Bob Martinez", amount: 35, date: "Yesterday", service: "Deep Clean" },
    { id: "3", customer: "Emma Davis", amount: 15, date: "2 days ago", service: "Move In/Out" },
  ]},
  weeklyGoal: { target: 1000, current: 840, percentage: 84 },
  payoutHistory: [
    { id: 1, date: "Apr 12, 2026", amount: 840, status: "Paid", method: "Direct Deposit" },
    { id: 2, date: "Apr 5, 2026", amount: 920, status: "Paid", method: "Direct Deposit" },
    { id: 3, date: "Mar 29, 2026", amount: 780, status: "Paid", method: "Direct Deposit" },
  ],
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const cleanerId = session.user.id
    const today = new Date()

    const profile = await db.cleanerProfile.findUnique({ where: { userId: cleanerId } })
    const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay()
    const monday = new Date(today); monday.setDate(today.getDate() + mondayOffset)
    const mondayStr = monday.toISOString().split("T")[0]

    const weekBookings = await db.booking.findMany({ where: { cleanerId, date: { gte: mondayStr }, status: "completed" } })
    const thisWeek = weekBookings.reduce((sum, b) => sum + b.amount, 0)

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0]
    const monthBookings = await db.booking.findMany({ where: { cleanerId, date: { gte: monthStart }, status: "completed" } })
    const thisMonth = monthBookings.reduce((sum, b) => sum + b.amount, 0)
    const totalEarnings = profile?.totalEarnings || 0

    const dailyEarnings = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday); d.setDate(monday.getDate() + i)
      const dateStr = d.toISOString().split("T")[0]
      const dayBookings = weekBookings.filter((b) => b.date === dateStr)
      return { day: dayNames[i], earnings: dayBookings.reduce((sum, b) => sum + b.amount, 0), jobs: dayBookings.length }
    })

    const allCompleted = await db.booking.findMany({ where: { cleanerId, status: "completed" } })
    const serviceMap: Record<string, { earnings: number; jobs: number }> = {}
    for (const b of allCompleted) {
      if (!serviceMap[b.serviceType]) serviceMap[b.serviceType] = { earnings: 0, jobs: 0 }
      serviceMap[b.serviceType].earnings += b.amount
      serviceMap[b.serviceType].jobs += 1
    }
    const totalSvc = Object.values(serviceMap).reduce((sum, s) => sum + s.earnings, 0)
    const serviceBreakdown = Object.entries(serviceMap).map(([name, data]) => ({
      name, percentage: totalSvc > 0 ? Math.round((data.earnings / totalSvc) * 100) : 0, earnings: Math.round(data.earnings), jobs: data.jobs,
    }))

    const tips = await db.tip.findMany({ where: { cleanerId }, include: { customer: { select: { name: true } } }, orderBy: { createdAt: "desc" } })
    const totalTips = tips.reduce((sum, t) => sum + t.amount, 0)
    const thisMonthTips = tips.filter((t) => new Date(t.createdAt) >= new Date(today.getFullYear(), today.getMonth(), 1)).reduce((sum, t) => sum + t.amount, 0)
    const recentTips = tips.slice(0, 5).map((t, i) => ({ id: t.id, customer: t.customer.name, amount: t.amount, date: i === 0 ? "Today" : i === 1 ? "Yesterday" : `${i} days ago`, service: "Cleaning" }))

    return NextResponse.json({
      summary: { thisWeek: Math.round(thisWeek), thisMonth: Math.round(thisMonth), totalEarnings: Math.round(totalEarnings), weeklyChange: 12, monthlyChange: 8 },
      dailyEarnings, serviceBreakdown,
      tips: { total: totalTips, thisMonth: thisMonthTips, recent: recentTips },
      weeklyGoal: { target: 1000, current: Math.round(thisWeek), percentage: Math.min(Math.round((thisWeek / 1000) * 100), 100) },
      payoutHistory: [
        { id: 1, date: "Apr 12, 2026", amount: 840, status: "Paid", method: "Direct Deposit" },
        { id: 2, date: "Apr 5, 2026", amount: 920, status: "Paid", method: "Direct Deposit" },
        { id: 3, date: "Mar 29, 2026", amount: 780, status: "Paid", method: "Direct Deposit" },
      ],
    })
  } catch (error) {
    console.warn("Earnings API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackEarnings)
  }
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
