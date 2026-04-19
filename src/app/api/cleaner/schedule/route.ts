import { NextResponse } from "next/server"

export async function GET() {
  const today = new Date()
  const currentDay = today.getDay()
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset)

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  function getDaySchedule(dayIndex: number, date: Date) {
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    const dayJobs: Array<{
      id: string
      customerName: string
      time: string
      endTime: string
      serviceType: string
      address: string
      amount: number
      status: string
    }> = []

    switch (dayIndex) {
      case 0: // Monday
        dayJobs.push(
          {
            id: "w0-1",
            customerName: "Sarah Lee",
            time: "8:00 AM",
            endTime: "9:30 AM",
            serviceType: "Regular Clean",
            address: "321 Cedar Blvd, Vancouver",
            amount: 75,
            status: "completed",
          },
          {
            id: "w0-2",
            customerName: "Tom Baker",
            time: "11:00 AM",
            endTime: "1:00 PM",
            serviceType: "Deep Clean",
            address: "654 Maple Lane, Burnaby",
            amount: 160,
            status: "completed",
          }
        )
        break
      case 1: // Tuesday (today)
        dayJobs.push(
          {
            id: "w0-3",
            customerName: "Amanda Johnson",
            time: "9:00 AM",
            endTime: "11:00 AM",
            serviceType: "Regular Clean",
            address: "123 Elm Street, Surrey",
            amount: 120,
            status: "scheduled",
          },
          {
            id: "w0-4",
            customerName: "Bob Martinez",
            time: "12:00 PM",
            endTime: "2:00 PM",
            serviceType: "Deep Clean",
            address: "456 Oak Avenue, Vancouver",
            amount: 180,
            status: "scheduled",
          },
          {
            id: "w0-5",
            customerName: "Carol Williams",
            time: "3:00 PM",
            endTime: "4:30 PM",
            serviceType: "Eco Clean",
            address: "789 Pine Road, Burnaby",
            amount: 95,
            status: "scheduled",
          }
        )
        break
      case 2: // Wednesday
        dayJobs.push({
          id: "w0-6",
          customerName: "David Thompson",
          time: "10:00 AM",
          endTime: "12:00 PM",
          serviceType: "Regular Clean",
          address: "101 Birch Way, Richmond",
          amount: 120,
          status: "scheduled",
        })
        break
      case 3: // Thursday
        dayJobs.push(
          {
            id: "w0-7",
            customerName: "Emma Davis",
            time: "9:00 AM",
            endTime: "11:30 AM",
            serviceType: "Move In/Out",
            address: "222 Spruce Court, Vancouver",
            amount: 200,
            status: "scheduled",
          },
          {
            id: "w0-8",
            customerName: "Frank Miller",
            time: "1:00 PM",
            endTime: "2:30 PM",
            serviceType: "Eco Clean",
            address: "555 Willow St, Surrey",
            amount: 95,
            status: "scheduled",
          }
        )
        break
      case 4: // Friday
        dayJobs.push({
          id: "w0-9",
          customerName: "Grace Kim",
          time: "10:00 AM",
          endTime: "12:00 PM",
          serviceType: "Deep Clean",
          address: "888 Aspen Drive, Burnaby",
          amount: 180,
          status: "scheduled",
        })
        break
      // Saturday (5) and Sunday (6) - no jobs
    }

    return {
      date: formatDate(date),
      isToday,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      jobs: dayJobs,
      availability: dayJobs.length > 2 ? "Busy" : dayJobs.length > 0 ? "Moderate" : "Available",
    }
  }

  const week = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    week.push(getDaySchedule(i, date))
  }

  const totalJobs = week.reduce((sum, day) => sum + day.jobs.length, 0)
  const completedJobs = week.reduce(
    (sum, day) => sum + day.jobs.filter((j) => j.status === "completed").length,
    0
  )
  const totalEarnings = week.reduce((sum, day) => sum + day.jobs.reduce((s, j) => s + j.amount, 0), 0)

  return NextResponse.json({
    weekStart: formatDate(monday),
    weekEnd: formatDate(week[6].date),
    totalJobs,
    completedJobs,
    remainingJobs: totalJobs - completedJobs,
    totalEarnings,
    days: week,
  })
}
