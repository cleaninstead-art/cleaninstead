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
    const currentDay = today.getDay()

    // Get Monday of current week
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)
    monday.setHours(0, 0, 0, 0)

    // Get Sunday of current week
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    // Get all bookings for this week
    const weekBookings = await db.booking.findMany({
      where: {
        cleanerId,
        date: {
          gte: monday.toISOString().split("T")[0],
          lte: sunday.toISOString().split("T")[0],
        },
        status: { in: ["confirmed", "in_progress", "completed", "scheduled"] },
      },
      include: {
        customer: { select: { name: true } },
        cleanerJob: true,
      },
      orderBy: { date: "asc" },
    })

    // Group by day
    const days: Array<{
      date: string
      isToday: boolean
      dayName: string
      dayNum: number
      month: string
      jobs: Array<{
        id: string
        bookingNumber: number
        customerName: string
        time: string
        endTime: string
        serviceType: string
        address: string
        amount: number
        status: string
        progress: number
      }>
      availability: string
    }> = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]

      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      const dayJobs = weekBookings
        .filter((b) => b.date === dateStr)
        .map((b) => ({
          id: b.id,
          bookingNumber: b.bookingNumber,
          customerName: b.customer.name || "Unknown",
          time: b.startTime,
          endTime: b.endTime,
          serviceType: b.serviceType,
          address: b.address,
          amount: b.amount,
          status: b.status,
          progress: b.cleanerJob?.progress || 0,
        }))

      days.push({
        date: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isToday,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        jobs: dayJobs,
        availability:
          dayJobs.length > 2 ? "Busy" : dayJobs.length > 0 ? "Moderate" : "Available",
      })
    }

    const totalJobs = weekBookings.length
    const completedJobs = weekBookings.filter((b) => b.status === "completed").length
    const totalEarnings = weekBookings.reduce((sum, b) => sum + b.amount, 0)

    return NextResponse.json({
      weekStart: monday.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      weekEnd: sunday.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      totalJobs,
      completedJobs,
      remainingJobs: totalJobs - completedJobs,
      totalEarnings: Math.round(totalEarnings),
      days,
    })
  } catch (error) {
    console.error("Cleaner schedule API error:", error)
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
  }
}
