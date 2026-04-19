import { NextRequest, NextResponse } from "next/server"

const fallbackToday = {
  date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  summary: { totalJobs: 3, completed: 1, upcoming: 2, totalEarnings: 395, completedEarnings: 95 },
  jobs: [
    { id: "job-1", bookingNumber: 1001, customerName: "Amanda Johnson", customerInitials: "AJ", customerPhone: "604-555-2345", time: "9:00 AM", endTime: "11:00 AM", serviceType: "Regular Clean", address: "123 Elm Street, Surrey", amount: 120, status: "upcoming", progress: 0, specialInstructions: "Please be careful with the antique dining table.", accessInfo: "Key under the front mat." },
    { id: "job-2", bookingNumber: 1002, customerName: "Bob Martinez", customerInitials: "BM", customerPhone: "604-555-3456", time: "12:00 PM", endTime: "2:00 PM", serviceType: "Deep Clean", address: "456 Oak Avenue, Vancouver", amount: 180, status: "upcoming", progress: 0, specialInstructions: "Focus on kitchen and bathrooms.", accessInfo: "Door code: 4521#" },
    { id: "job-3", bookingNumber: 1003, customerName: "Carol Williams", customerInitials: "CW", customerPhone: "604-555-4567", time: "3:00 PM", endTime: "4:30 PM", serviceType: "Eco Clean", address: "789 Pine Road, Burnaby", amount: 95, status: "completed", progress: 100, specialInstructions: "Use only eco-friendly products.", accessInfo: "Spare key in lockbox. Code: 1984." },
  ],
  unreadMessages: 2,
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

    const cleanerId = user.id
    const todayStr = new Date().toISOString().split("T")[0]

    let db: any = null
    try {
      const mod = await import("@/lib/db")
      db = mod.db
    } catch (e: any) {
      console.warn("[Today API] DB import failed, using fallback:", e?.message)
      return NextResponse.json(fallbackToday)
    }

    const todayBookings = await db.booking.findMany({
      where: { cleanerId, date: todayStr, status: { in: ["confirmed", "in_progress", "completed"] } },
      include: { customer: { select: { name: true, phone: true } }, cleanerJob: true },
      orderBy: { startTime: "asc" },
    })

    const completed = todayBookings.filter((b: any) => b.status === "completed").length
    const upcoming = todayBookings.filter((b: any) => b.status !== "completed").length
    const completedEarnings = todayBookings.filter((b: any) => b.status === "completed").reduce((sum: number, b: any) => sum + b.amount, 0)
    const totalEarnings = todayBookings.reduce((sum: number, b: any) => sum + b.amount, 0)

    const jobs = todayBookings.map((b: any) => {
      const customerName = b.customer?.name || "Unknown"
      const initials = customerName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
      let status = "upcoming"
      if (b.status === "completed") status = "completed"
      else if (b.status === "in_progress") status = "in_progress"
      return { id: b.id, bookingNumber: b.bookingNumber, customerName, customerInitials: initials, customerPhone: b.customer?.phone, time: b.startTime, endTime: b.endTime, serviceType: b.serviceType, address: b.address, amount: b.amount, status, progress: b.cleanerJob?.progress || 0, specialInstructions: b.specialInstructions, accessInfo: b.accessInfo, notes: b.notes }
    })

    const unreadMessages = await db.message.count({ where: { receiverId: cleanerId, isRead: false } })

    return NextResponse.json({
      date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      summary: { totalJobs: todayBookings.length, completed, upcoming, totalEarnings: Math.round(totalEarnings), completedEarnings: Math.round(completedEarnings) },
      jobs, unreadMessages,
    })
  } catch (error) {
    console.warn("Cleaner today API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackToday)
  }
}
