import { NextResponse } from "next/server"
import { db } from "@/lib/db"

const fallbackCleaners = [
  { id: "1", name: "Maria Santos", email: "maria@cleaninstead.com", rating: 4.9, totalJobs: 142, totalEarnings: 18420, areas: ["Vancouver", "Burnaby", "Richmond"], skills: ["Deep Clean", "Eco Clean", "Move In/Out"], status: "active", initials: "MS", joinDate: "2023-03-15", isTopRated: true },
  { id: "2", name: "James Wilson", email: "james@cleaninstead.com", rating: 4.7, totalJobs: 98, totalEarnings: 12800, areas: ["Surrey", "Langley", "White Rock"], skills: ["Regular Clean", "Deep Clean"], status: "active", initials: "JW", joinDate: "2023-06-20", isTopRated: false },
  { id: "3", name: "Sarah Chen", email: "sarah@cleaninstead.com", rating: 4.8, totalJobs: 115, totalEarnings: 15200, areas: ["Vancouver", "North Vancouver", "West Vancouver"], skills: ["Eco Clean", "Regular Clean", "Move In/Out"], status: "active", initials: "SC", joinDate: "2023-01-10", isTopRated: true },
  { id: "4", name: "Tom Kumar", email: "tom@cleaninstead.com", rating: 4.6, totalJobs: 67, totalEarnings: 7800, areas: ["Coquitlam", "Port Moody", "New Westminster"], skills: ["Regular Clean", "Deep Clean"], status: "pending", initials: "TK", joinDate: "2025-01-05", isTopRated: false },
  { id: "5", name: "Lisa Park", email: "lisa@cleaninstead.com", rating: 4.9, totalJobs: 128, totalEarnings: 16900, areas: ["Vancouver", "Burnaby", "Richmond", "Surrey"], skills: ["Eco Clean", "Move In/Out", "Deep Clean"], status: "active", initials: "LP", joinDate: "2022-11-22", isTopRated: true },
  { id: "6", name: "Omar Hassan", email: "omar@cleaninstead.com", rating: 4.5, totalJobs: 53, totalEarnings: 5900, areas: ["Surrey", "Delta", "Langley"], skills: ["Regular Clean", "Eco Clean"], status: "suspended", initials: "OH", joinDate: "2024-04-18", isTopRated: false },
]

export async function GET() {
  try {
    const cleaners = await db.user.findMany({
      where: { role: "cleaner" },
      include: { cleanerProfile: true, _count: { select: { assignedJobs: true, reviews: true, receivedTips: true } } },
      orderBy: { createdAt: "asc" },
    })
    return NextResponse.json(cleaners.map((c) => {
      const profile = c.cleanerProfile
      const initials = c.name ? c.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "??"
      return {
        id: c.id, name: c.name, email: c.email, phone: c.phone, avatar: c.avatar,
        rating: profile?.rating || 0, totalJobs: profile?.totalJobs || 0,
        totalEarnings: profile?.totalEarnings || 0,
        areas: profile?.serviceAreas ? profile.serviceAreas.split(",").map((s: string) => s.trim()) : [],
        skills: profile?.skills ? profile.skills.split(",").map((s: string) => s.trim()) : [],
        status: c.isAvailable ? "active" : "suspended", initials,
        joinDate: profile?.joinDate?.toISOString().split("T")[0] || c.createdAt.toISOString().split("T")[0],
        isTopRated: profile?.isTopRated || false, bio: profile?.bio,
        totalReviews: c._count.reviews, totalTips: c._count.receivedTips, activeJobs: c._count.assignedJobs,
      }
    }))
  } catch {
    console.warn("Cleaners API using fallback data")
    return NextResponse.json(fallbackCleaners)
  }
}
