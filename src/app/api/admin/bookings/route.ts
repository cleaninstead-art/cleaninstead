import { NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackBookings = [
  { id: 1001, customerName: "Amanda Johnson", serviceType: "Regular Clean", date: new Date().toISOString().split("T")[0], startTime: "09:00", endTime: "11:00", amount: 120, status: "confirmed", address: "123 Elm Street, Surrey", city: "Surrey", cleanerName: "Maria Santos" },
  { id: 1002, customerName: "Michael Chen", serviceType: "Deep Clean", date: new Date().toISOString().split("T")[0], startTime: "10:00", endTime: "13:00", amount: 220, status: "in_progress", address: "789 Pine St, Burnaby", city: "Burnaby", cleanerName: "Sarah Chen" },
  { id: 1003, customerName: "Carol Williams", serviceType: "Move Out Clean", date: new Date(Date.now() + 86400000).toISOString().split("T")[0], startTime: "08:00", endTime: "14:00", amount: 350, status: "pending", address: "321 Maple Dr, Surrey", city: "Surrey", cleanerName: "Unassigned" },
  { id: 1004, customerName: "David Brown", serviceType: "Eco Clean", date: new Date().toISOString().split("T")[0], startTime: "14:00", endTime: "16:00", amount: 150, status: "confirmed", address: "654 Cedar Ln, Richmond", city: "Richmond", cleanerName: "Lisa Park" },
  { id: 1005, customerName: "Emily Davis", serviceType: "Regular Clean", date: new Date(Date.now() - 86400000).toISOString().split("T")[0], startTime: "09:00", endTime: "11:00", amount: 120, status: "completed", address: "987 Birch Rd, Vancouver", city: "Vancouver", cleanerName: "James Wilson" },
  { id: 1006, customerName: "Jennifer Martinez", serviceType: "Eco Clean", date: new Date().toISOString().split("T")[0], startTime: "09:00", endTime: "12:00", amount: 180, status: "confirmed", address: "741 Spruce Way, North Vancouver", city: "North Vancouver", cleanerName: "Maria Santos" },
  { id: 1007, customerName: "Robert Taylor", serviceType: "Move In Clean", date: new Date(Date.now() + 86400000).toISOString().split("T")[0], startTime: "10:00", endTime: "15:00", amount: 300, status: "pending", address: "369 Ash Ct, Port Moody", city: "Port Moody", cleanerName: "Unassigned" },
  { id: 1008, customerName: "Bob Martinez", serviceType: "Deep Clean", date: new Date().toISOString().split("T")[0], startTime: "12:00", endTime: "14:00", amount: 180, status: "in_progress", address: "456 Oak Avenue, Vancouver", city: "Vancouver", cleanerName: "James Wilson" },
]

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
    return NextResponse.json(bookings.map((b) => ({
      id: b.bookingNumber, customerName: b.customer.name, customerEmail: b.customer.email,
      customerPhone: b.customer.phone, cleanerName: b.cleaner?.name || "Unassigned",
      cleanerEmail: b.cleaner?.email, serviceType: b.serviceType, date: b.date,
      startTime: b.startTime, endTime: b.endTime, amount: b.amount, status: b.status,
      address: b.address, city: b.city, reviewed: b.reviewed, notes: b.notes,
      specialInstructions: b.specialInstructions, accessInfo: b.accessInfo,
      transactionStatus: b.transaction?.status, paymentMethod: b.transaction?.method,
    })))
  } catch {
    console.warn("Bookings API using fallback data")
    return NextResponse.json(fallbackBookings)
  }
}
