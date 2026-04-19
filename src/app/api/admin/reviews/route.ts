import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get("approved")

    const where: any = {}
    if (approved === "true") {
      where.isApproved = true
    } else if (approved === "false") {
      where.isApproved = false
    }

    const reviews = await db.review.findMany({
      where,
      include: {
        customer: { select: { name: true } },
        booking: {
          select: {
            bookingNumber: true,
            serviceType: true,
          },
        },
        cleaner: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      reviews.map((r) => ({
        id: r.id,
        customerName: r.customer.name,
        cleanerName: r.cleaner?.name || "Unknown",
        bookingId: r.booking.bookingNumber,
        serviceType: r.booking.serviceType,
        rating: r.rating,
        punctuality: r.punctuality,
        quality: r.quality,
        profession: r.profession,
        communication: r.communication,
        comment: r.comment,
        isPublic: r.isPublic,
        isApproved: r.isApproved,
        date: r.createdAt.toISOString().split("T")[0],
      }))
    )
  } catch (error) {
    console.error("Reviews API error:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { reviewId, isApproved, isPublic } = body

    const review = await db.review.update({
      where: { id: reviewId },
      data: {
        ...(isApproved !== undefined && { isApproved }),
        ...(isPublic !== undefined && { isPublic }),
      },
    })

    return NextResponse.json({
      id: review.id,
      isApproved: review.isApproved,
      isPublic: review.isPublic,
    })
  } catch (error) {
    console.error("Review update error:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}
