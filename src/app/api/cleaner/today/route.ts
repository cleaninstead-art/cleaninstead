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
    const todayStr = today.toISOString().split("T")[0]

    // Get today's jobs with cleaner job details
    const todayBookings = await db.booking.findMany({
      where: {
        cleanerId,
        date: todayStr,
        status: { in: ["confirmed", "in_progress", "completed"] },
      },
      include: {
        customer: { select: { name: true, phone: true } },
        cleanerJob: true,
      },
      orderBy: { startTime: "asc" },
    })

    const completed = todayBookings.filter((b) => b.status === "completed").length
    const upcoming = todayBookings.filter((b) => b.status !== "completed").length
    const completedEarnings = todayBookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.amount, 0)
    const totalEarnings = todayBookings.reduce((sum, b) => sum + b.amount, 0)

    const jobs = todayBookings.map((b) => {
      const customerName = b.customer.name || "Unknown"
      const initials = customerName.split(" ").map((n: string) => n[0]).join("").toUpperCase()

      let status = "upcoming"
      if (b.status === "completed") status = "completed"
      else if (b.status === "in_progress") status = "in_progress"
      else if (b.cleanerJob?.status === "in_progress") status = "in_progress"

      return {
        id: b.id,
        bookingNumber: b.bookingNumber,
        customerName,
        customerInitials: initials,
        customerPhone: b.customer.phone,
        time: b.startTime,
        endTime: b.endTime,
        serviceType: b.serviceType,
        address: b.address,
        amount: b.amount,
        status,
        progress: b.cleanerJob?.progress || 0,
        specialInstructions: b.specialInstructions,
        accessInfo: b.accessInfo,
        notes: b.notes,
      }
    })

    // Get unread message count
    const unreadMessages = await db.message.count({
      where: {
        receiverId: cleanerId,
        isRead: false,
      },
    })

    return NextResponse.json({
      date: today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      summary: {
        totalJobs: todayBookings.length,
        completed,
        upcoming,
        totalEarnings: Math.round(totalEarnings),
        completedEarnings: Math.round(completedEarnings),
      },
      jobs,
      unreadMessages,
    })
  } catch (error) {
    console.error("Cleaner today API error:", error)
    return NextResponse.json({ error: "Failed to fetch today's data" }, { status: 500 })
  }
}
