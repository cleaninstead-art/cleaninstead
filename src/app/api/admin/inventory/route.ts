import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const inventory = await db.inventory.findMany({
      orderBy: { category: "asc" },
    })

    return NextResponse.json(
      inventory.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        minStock: item.minStock,
        costPerUnit: item.costPerUnit,
        isLowStock: item.quantity <= item.minStock,
        lastUpdated: item.lastUpdated.toISOString().split("T")[0],
      }))
    )
  } catch (error) {
    console.error("Inventory API error:", error)
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { itemId, quantity } = body

    const item = await db.inventory.update({
      where: { id: itemId },
      data: {
        quantity: parseInt(quantity),
        lastUpdated: new Date(),
      },
    })

    return NextResponse.json({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      isLowStock: item.quantity <= item.minStock,
    })
  } catch (error) {
    console.error("Inventory update error:", error)
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 })
  }
}
