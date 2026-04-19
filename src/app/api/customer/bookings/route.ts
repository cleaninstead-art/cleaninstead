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

    const customerId = session.user.id
    const today = new Date()
    const todayStr = today.toISOString().split("T")[0]

    // Get all bookings for this customer
    const bookings = await db.booking.findMany({
      where: { customerId },
      include: {
        cleaner: { select: { name: true, cleanerProfile: { select: { rating: true } } } },
        reviews: { take: 1, select: { rating: true } },
      },
      orderBy: { date: "desc" },
    })

    const upcoming = bookings
      .filter((b) => b.date >= todayStr && b.status !== "cancelled" && b.status !== "completed")
      .map((b) => ({
        id: `#${b.bookingNumber}`,
        bookingDbId: b.id,
        date: b.date,
        dayLabel: new Date(b.date + "T00:00:00").toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: `${b.startTime} - ${b.endTime}`,
        service: b.serviceType,
        cleaner: b.cleaner?.name || "Unassigned",
        cleanerRating: b.cleaner?.cleanerProfile?.rating || 0,
        amount: b.amount,
        address: b.address,
        status: b.status.charAt(0).toUpperCase() + b.status.slice(1).replace("_", " "),
        notes: b.notes,
        specialInstructions: b.specialInstructions,
        reviewed: b.reviewed,
      }))

    const past = bookings
      .filter((b) => b.date < todayStr || b.status === "completed")
      .map((b) => ({
        id: `#${b.bookingNumber}`,
        bookingDbId: b.id,
        date: b.date,
        dayLabel: new Date(b.date + "T00:00:00").toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: `${b.startTime} - ${b.endTime}`,
        service: b.serviceType,
        cleaner: b.cleaner?.name || "Unassigned",
        cleanerRating: b.cleaner?.cleanerProfile?.rating || 0,
        amount: b.amount,
        address: b.address,
        status: b.status === "completed" ? "Completed" : b.status.charAt(0).toUpperCase() + b.status.slice(1).replace("_", " "),
        reviewed: b.reviewed,
        rating: b.reviews.length > 0 ? b.reviews[0].rating : null,
      }))

    const completedCount = past.filter((b) => b.status === "Completed").length
    const totalSpent = bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.amount, 0)

    // Average rating of reviews given
    const allRatings = bookings
      .flatMap((b) => b.reviews)
      .map((r) => r.rating)
    const averageRating = allRatings.length > 0
      ? Math.round((allRatings.reduce((a, b) => a + b, 0) / allRatings.length) * 10) / 10
      : null

    return NextResponse.json({
      upcoming,
      past,
      summary: {
        totalBookings: bookings.length,
        upcomingCount: upcoming.length,
        pastCount: past.length,
        totalSpent: Math.round(totalSpent),
        averageRating,
      },
    })
  } catch (error) {
    console.error("Customer bookings API error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
