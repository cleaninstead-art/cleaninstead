import { NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackReviews = [
  { id: "1", customerName: "Amanda Johnson", cleanerName: "Maria Santos", rating: 5, comment: "Absolutely fantastic service! Maria was thorough, professional, and left the apartment spotless. Will definitely book again.", date: "2025-01-14", isApproved: true },
  { id: "2", customerName: "Michael Chen", cleanerName: "Sarah Chen", rating: 4, comment: "Great cleaning job. Sarah paid attention to detail and was very punctual.", date: "2025-01-13", isApproved: true },
  { id: "3", customerName: "Emily Davis", cleanerName: "James Wilson", rating: 5, comment: "James did an amazing deep clean of our kitchen and bathrooms. Everything looks brand new.", date: "2025-01-12", isApproved: true },
  { id: "4", customerName: "Jennifer Martinez", cleanerName: "Lisa Park", rating: 3, comment: "The cleaning was okay but took longer than expected.", date: "2025-01-12", isApproved: false },
  { id: "5", customerName: "David Brown", cleanerName: "Sarah Chen", rating: 4, comment: "Very happy with the eco clean service.", date: "2025-01-10", isApproved: true },
]

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: {},
      include: { customer: { select: { name: true } }, booking: { select: { bookingNumber: true, serviceType: true } }, cleaner: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(reviews.map((r) => ({
      id: r.id, customerName: r.customer.name, cleanerName: r.cleaner?.name || "Unknown",
      bookingId: r.booking.bookingNumber, serviceType: r.booking.serviceType, rating: r.rating,
      comment: r.comment, isPublic: r.isPublic, isApproved: r.isApproved,
      date: r.createdAt.toISOString().split("T")[0],
    })))
  } catch {
    console.warn("Reviews API using fallback data")
    return NextResponse.json(fallbackReviews)
  }
}
