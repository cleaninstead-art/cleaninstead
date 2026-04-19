import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        booking: {
          select: { bookingNumber: true, serviceType: true },
        },
        customer: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      transactions.map((t) => ({
        id: t.transactionId,
        bookingId: t.booking?.bookingNumber,
        customerName: t.customer.name,
        customerEmail: t.customer.email,
        serviceType: t.booking?.serviceType,
        amount: t.amount,
        status: t.status,
        method: t.method,
        date: t.createdAt.toISOString(),
        capturedAt: t.capturedAt?.toISOString() || null,
        refundedAt: t.refundedAt?.toISOString() || null,
      }))
    )
  } catch (error) {
    console.error("Transactions API error:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
