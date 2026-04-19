import { NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackOffers = [
  { id: "1", code: "WELCOME10", type: "percentage", value: 10, minBooking: 80, maxUses: 500, usedCount: 342, isActive: true, expiresAt: "2025-06-30" },
  { id: "2", code: "ECO20", type: "percentage", value: 20, minBooking: 100, maxUses: 200, usedCount: 178, isActive: true, expiresAt: "2025-03-31" },
  { id: "3", code: "SPRING25", type: "fixed", value: 25, minBooking: 150, maxUses: 300, usedCount: 89, isActive: true, expiresAt: "2025-05-31" },
  { id: "4", code: "REFER15", type: "percentage", value: 15, minBooking: 0, maxUses: 1000, usedCount: 567, isActive: true, expiresAt: "2025-12-31" },
  { id: "5", code: "CLEAN50", type: "fixed", value: 50, minBooking: 250, maxUses: 100, usedCount: 45, isActive: false, expiresAt: "2025-02-28" },
]

export async function GET() {
  try {
    const offers = await db.offer.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(offers.map((o) => ({
      id: o.id, code: o.code, type: o.type, value: o.value, minBooking: o.minBooking,
      maxUses: o.maxUses, usedCount: o.usedCount, isActive: o.isActive, expiresAt: o.expiresAt,
    })))
  } catch {
    console.warn("Offers API using fallback data")
    return NextResponse.json(fallbackOffers)
  }
}
