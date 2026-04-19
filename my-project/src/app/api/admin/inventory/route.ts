import { NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackInventory = [
  { id: "1", name: "All-Purpose Cleaner", category: "Cleaning Solutions", quantity: 45, unit: "bottles", minStock: 10, costPerUnit: 5.99, isLowStock: false, lastUpdated: "2025-01-14" },
  { id: "2", name: "Glass Cleaner", category: "Cleaning Solutions", quantity: 3, unit: "bottles", minStock: 8, costPerUnit: 4.49, isLowStock: true, lastUpdated: "2025-01-12" },
  { id: "3", name: "Floor Cleaner", category: "Cleaning Solutions", quantity: 28, unit: "bottles", minStock: 10, costPerUnit: 7.99, isLowStock: false, lastUpdated: "2025-01-13" },
  { id: "4", name: "Disinfectant Spray", category: "Cleaning Solutions", quantity: 2, unit: "bottles", minStock: 8, costPerUnit: 6.99, isLowStock: true, lastUpdated: "2025-01-10" },
  { id: "5", name: "Microfiber Cloths", category: "Tools & Equipment", quantity: 120, unit: "pcs", minStock: 20, costPerUnit: 2.99, isLowStock: false, lastUpdated: "2025-01-15" },
  { id: "6", name: "Trash Bags", category: "Supplies", quantity: 8, unit: "boxes", minStock: 12, costPerUnit: 8.99, isLowStock: true, lastUpdated: "2025-01-09" },
]

export async function GET() {
  try {
    const inventory = await db.inventory.findMany({ orderBy: { category: "asc" } })
    return NextResponse.json(inventory.map((item) => ({
      id: item.id, name: item.name, category: item.category, quantity: item.quantity,
      unit: item.unit, minStock: item.minStock, costPerUnit: item.costPerUnit,
      isLowStock: item.quantity <= item.minStock,
      lastUpdated: item.lastUpdated.toISOString().split("T")[0],
    })))
  } catch {
    console.warn("Inventory API using fallback data")
    return NextResponse.json(fallbackInventory)
  }
}
