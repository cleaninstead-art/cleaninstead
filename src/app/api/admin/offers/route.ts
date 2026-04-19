import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const offers = await db.offer.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      offers.map((o) => ({
        id: o.id,
        code: o.code,
        type: o.type,
        value: o.value,
        minBooking: o.minBooking,
        maxUses: o.maxUses,
        usedCount: o.usedCount,
        isActive: o.isActive,
        expiresAt: o.expiresAt,
        createdAt: o.createdAt.toISOString().split("T")[0],
      }))
    )
  } catch (error) {
    console.error("Offers API error:", error)
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, type, value, minBooking, maxUses, expiresAt } = body

    const offer = await db.offer.create({
      data: {
        code: code.toUpperCase(),
        type,
        value: parseFloat(value),
        minBooking: parseFloat(minBooking) || 0,
        maxUses: parseInt(maxUses) || 100,
        expiresAt,
        isActive: true,
      },
    })

    return NextResponse.json({
      id: offer.id,
      code: offer.code,
      type: offer.type,
      value: offer.value,
      minBooking: offer.minBooking,
      maxUses: offer.maxUses,
      usedCount: 0,
      isActive: true,
      expiresAt: offer.expiresAt,
    })
  } catch (error) {
    console.error("Offer create error:", error)
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { offerId, isActive } = body

    const offer = await db.offer.update({
      where: { id: offerId },
      data: { isActive },
    })

    return NextResponse.json({
      id: offer.id,
      code: offer.code,
      isActive: offer.isActive,
    })
  } catch (error) {
    console.error("Offer update error:", error)
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 })
  }
}
