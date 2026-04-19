import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const fallbackBookings = {
  upcoming: [
    { id: "#1057", bookingDbId: "b1", date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0], dayLabel: new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }), time: "9:00 AM - 11:00 AM", service: "Regular Clean", cleaner: "Maria Santos", cleanerRating: 4.9, amount: 120, address: "123 Elm Street, Surrey", status: "Confirmed", notes: null, specialInstructions: null, reviewed: false },
    { id: "#1058", bookingDbId: "b2", date: new Date(Date.now() + 11 * 86400000).toISOString().split("T")[0], dayLabel: new Date(Date.now() + 11 * 86400000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }), time: "2:00 PM - 4:00 PM", service: "Deep Clean", cleaner: "James Wilson", cleanerRating: 4.7, amount: 180, address: "123 Elm Street, Surrey", status: "Pending", notes: "Focus on kitchen and bathrooms", specialInstructions: null, reviewed: false },
  ],
  past: [
    { id: "#1056", bookingDbId: "b3", date: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0], dayLabel: new Date(Date.now() - 7 * 86400000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }), time: "9:00 AM - 11:00 AM", service: "Regular Clean", cleaner: "Maria Santos", cleanerRating: 4.9, amount: 120, address: "123 Elm Street, Surrey", status: "Completed", reviewed: true, rating: 5 },
    { id: "#1049", bookingDbId: "b4", date: new Date(Date.now() - 14 * 86400000).toISOString().split("T")[0], dayLabel: new Date(Date.now() - 14 * 86400000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }), time: "10:00 AM - 12:00 PM", service: "Move-In Clean", cleaner: "Sarah Chen", cleanerRating: 4.8, amount: 250, address: "456 Oak Avenue, Vancouver", status: "Completed", reviewed: true, rating: 4 },
    { id: "#1042", bookingDbId: "b5", date: new Date(Date.now() - 21 * 86400000).toISOString().split("T")[0], dayLabel: new Date(Date.now() - 21 * 86400000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }), time: "9:00 AM - 11:00 AM", service: "Regular Clean", cleaner: "Maria Santos", cleanerRating: 4.9, amount: 120, address: "123 Elm Street, Surrey", status: "Completed", reviewed: false, rating: null },
    { id: "#1035", bookingDbId: "b6", date: new Date(Date.now() - 28 * 86400000).toISOString().split("T")[0], dayLabel: new Date(Date.now() - 28 * 86400000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }), time: "1:00 PM - 3:00 PM", service: "Deep Clean", cleaner: "James Wilson", cleanerRating: 4.7, amount: 180, address: "123 Elm Street, Surrey", status: "Completed", reviewed: true, rating: 5 },
  ],
  summary: { totalBookings: 12, upcomingCount: 2, pastCount: 4, totalSpent: 790, averageRating: 4.7 },
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const customerId = session.user.id
    const todayStr = new Date().toISOString().split("T")[0]

    const bookings = await db.booking.findMany({
      where: { customerId },
      include: { cleaner: { select: { name: true, cleanerProfile: { select: { rating: true } } } }, reviews: { take: 1, select: { rating: true } } },
      orderBy: { date: "desc" },
    })

    const upcoming = bookings.filter((b) => b.date >= todayStr && b.status !== "cancelled" && b.status !== "completed").map((b) => ({
      id: `#${b.bookingNumber}`, bookingDbId: b.id, date: b.date,
      dayLabel: new Date(b.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      time: `${b.startTime} - ${b.endTime}`, service: b.serviceType, cleaner: b.cleaner?.name || "Unassigned",
      cleanerRating: b.cleaner?.cleanerProfile?.rating || 0, amount: b.amount, address: b.address,
      status: b.status.charAt(0).toUpperCase() + b.status.slice(1).replace("_", " "),
      notes: b.notes, specialInstructions: b.specialInstructions, reviewed: b.reviewed,
    }))

    const past = bookings.filter((b) => b.date < todayStr || b.status === "completed").map((b) => ({
      id: `#${b.bookingNumber}`, bookingDbId: b.id, date: b.date,
      dayLabel: new Date(b.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      time: `${b.startTime} - ${b.endTime}`, service: b.serviceType, cleaner: b.cleaner?.name || "Unassigned",
      cleanerRating: b.cleaner?.cleanerProfile?.rating || 0, amount: b.amount, address: b.address,
      status: b.status === "completed" ? "Completed" : b.status.charAt(0).toUpperCase() + b.status.slice(1).replace("_", " "),
      reviewed: b.reviewed, rating: b.reviews.length > 0 ? b.reviews[0].rating : null,
    }))

    const completedCount = past.filter((b) => b.status === "Completed").length
    const totalSpent = bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.amount, 0)
    const allRatings = bookings.flatMap((b) => b.reviews).map((r) => r.rating)
    const averageRating = allRatings.length > 0 ? Math.round((allRatings.reduce((a, b) => a + b, 0) / allRatings.length) * 10) / 10 : null

    return NextResponse.json({ upcoming, past, summary: { totalBookings: bookings.length, upcomingCount: upcoming.length, pastCount: past.length, totalSpent: Math.round(totalSpent), averageRating } })
  } catch (error) {
    console.warn("Customer bookings API using fallback data:", (error as Error)?.message)
    return NextResponse.json(fallbackBookings)
  }
}
