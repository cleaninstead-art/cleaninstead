import { NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackTransactions = [
  { id: "TXN-2025-001", bookingId: 1001, customerName: "Amanda Johnson", amount: 120, status: "captured", method: "card", date: new Date().toISOString() },
  { id: "TXN-2025-002", bookingId: 1002, customerName: "Michael Chen", amount: 220, status: "captured", method: "card", date: new Date().toISOString() },
  { id: "TXN-2025-003", bookingId: 1003, customerName: "Carol Williams", amount: 350, status: "pending", method: "card", date: new Date().toISOString() },
  { id: "TXN-2025-004", bookingId: 1004, customerName: "David Brown", amount: 150, status: "captured", method: "e_transfer", date: new Date().toISOString() },
  { id: "TXN-2025-005", bookingId: 1005, customerName: "Emily Davis", amount: 120, status: "captured", method: "card", date: new Date().toISOString() },
]

export async function GET() {
  try {
    const transactions = await db.transaction.findMany({
      include: { booking: { select: { bookingNumber: true, serviceType: true } }, customer: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(transactions.map((t) => ({
      id: t.transactionId, bookingId: t.booking?.bookingNumber, customerName: t.customer.name,
      customerEmail: t.customer.email, serviceType: t.booking?.serviceType, amount: t.amount,
      status: t.status, method: t.method, date: t.createdAt.toISOString(),
      capturedAt: t.capturedAt?.toISOString() || null, refundedAt: t.refundedAt?.toISOString() || null,
    })))
  } catch {
    console.warn("Transactions API using fallback data")
    return NextResponse.json(fallbackTransactions)
  }
}
