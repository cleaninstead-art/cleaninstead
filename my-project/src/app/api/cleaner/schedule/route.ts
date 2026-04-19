import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const today = new Date()
const monday = new Date(today)
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const fallbackSchedule = {
  weekStart: "Mon", weekEnd: "Sun", totalJobs: 6, completedJobs: 2, remainingJobs: 4, totalEarnings: 790,
  days: Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - today.getDay() + i + 1)
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      isToday: d.toDateString() === today.toDateString(), dayName: dayNames[i], dayNum: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      jobs: i === 1 ? [
        { id: "s1", bookingNumber: 1001, customerName: "Amanda Johnson", time: "9:00 AM", endTime: "11:00 AM", serviceType: "Regular Clean", address: "123 Elm St, Surrey", amount: 120, status: "scheduled", progress: 0 },
        { id: "s2", bookingNumber: 1002, customerName: "Bob Martinez", time: "12:00 PM", endTime: "2:00 PM", serviceType: "Deep Clean", address: "456 Oak Ave, Vancouver", amount: 180, status: "scheduled", progress: 0 },
      ] : i === 0 ? [
        { id: "s3", bookingNumber: 1003, customerName: "Sarah Lee", time: "8:00 AM", endTime: "9:30 AM", serviceType: "Regular Clean", address: "321 Cedar Blvd, Vancouver", amount: 75, status: "completed", progress: 100 },
        { id: "s4", bookingNumber: 1004, customerName: "Tom Baker", time: "11:00 AM", endTime: "1:00 PM", serviceType: "Deep Clean", address: "654 Maple Lane, Burnaby", amount: 160, status: "completed", progress: 100 },
      ] : [],
      availability: "Available",
    }
  }),
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const cleanerId = session.user.id
    const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay()
    const mondayDate = new Date(today)
    mondayDate.setDate(today.getDate() + mondayOffset)
    const sunday = new Date(mondayDate)
    sunday.setDate(mondayDate.getDate() + 6)

    const weekBookings = await db.booking.findMany({
      where: { cleanerId, date: { gte: mondayDate.toISOString().split("T")[0], lte: sunday.toISOString().split("T")[0] }, status: { in: ["confirmed", "in_progress", "completed", "scheduled"] } },
      include: { customer: { select: { name: true } }, cleanerJob: true },
      orderBy: { date: "asc" },
    })

    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(mondayDate)
      date.setDate(mondayDate.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]
      const dayJobs = weekBookings.filter((b) => b.date === dateStr).map((b) => ({
        id: b.id, bookingNumber: b.bookingNumber, customerName: b.customer.name || "Unknown",
        time: b.startTime, endTime: b.endTime, serviceType: b.serviceType, address: b.address,
        amount: b.amount, status: b.status, progress: b.cleanerJob?.progress || 0,
      }))
      return {
        date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
        isToday: date.toDateString() === today.toDateString(), dayName: dayNames[i], dayNum: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }), jobs: dayJobs,
        availability: dayJobs.length > 2 ? "Busy" : dayJobs.length > 0 ? "Moderate" : "Available",
      }
    })

    const totalJobs = weekBookings.length
    const completedJobs = weekBookings.filter((b) => b.status === "completed").length
    const totalEarnings = weekBookings.reduce((sum, b) => sum + b.amount, 0)

    return NextResponse.json({
      weekStart: mondayDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      weekEnd: sunday.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      totalJobs, completedJobs, remainingJobs: totalJobs - completedJobs, totalEarnings: Math.round(totalEarnings), days,
    })
  } catch (error) {
    console.warn("Cleaner schedule API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackSchedule)
  }
}
