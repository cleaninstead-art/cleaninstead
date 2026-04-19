import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
        cleaner: { select: { id: true, name: true, email: true, phone: true } },
        transaction: { select: { id: true, transactionId: true, status: true, method: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      bookings.map((b) => ({
        id: b.bookingNumber,
        customerName: b.customer.name,
        customerEmail: b.customer.email,
        customerPhone: b.customer.phone,
        cleanerName: b.cleaner?.name || "Unassigned",
        cleanerEmail: b.cleaner?.email,
        serviceType: b.serviceType,
        date: b.date,
        startTime: b.startTime,
        endTime: b.endTime,
        amount: b.amount,
        status: b.status,
        address: b.address,
        city: b.city,
        reviewed: b.reviewed,
        notes: b.notes,
        specialInstructions: b.specialInstructions,
        accessInfo: b.accessInfo,
        transactionStatus: b.transaction?.status,
        paymentMethod: b.transaction?.method,
      }))
    )
  } catch (error) {
    console.error("Bookings API error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
