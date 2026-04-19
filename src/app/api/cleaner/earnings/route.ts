import { NextResponse } from "next/server"

export async function GET() {
  const data = {
    summary: {
      thisWeek: 840,
      thisMonth: 3250,
      totalEarnings: 18420,
      weeklyChange: 12,
      monthlyChange: 8,
    },
    dailyEarnings: [
      { day: "Mon", earnings: 235, jobs: 2 },
      { day: "Tue", earnings: 395, jobs: 3 },
      { day: "Wed", earnings: 120, jobs: 1 },
      { day: "Thu", earnings: 280, jobs: 2 },
      { day: "Fri", earnings: 160, jobs: 1 },
      { day: "Sat", earnings: 0, jobs: 0 },
      { day: "Sun", earnings: 0, jobs: 0 },
    ],
    serviceBreakdown: [
      { name: "Regular Clean", percentage: 60, earnings: 11052, jobs: 85 },
      { name: "Deep Clean", percentage: 25, earnings: 4605, jobs: 35 },
      { name: "Eco Clean", percentage: 15, earnings: 2763, jobs: 22 },
    ],
    tips: {
      total: 342,
      thisMonth: 105,
      recent: [
        {
          id: 1,
          customer: "Amanda Johnson",
          amount: 20,
          date: "Today",
          service: "Regular Clean",
        },
        {
          id: 2,
          customer: "Bob Martinez",
          amount: 35,
          date: "Yesterday",
          service: "Deep Clean",
        },
        {
          id: 3,
          customer: "Emma Davis",
          amount: 15,
          date: "2 days ago",
          service: "Move In/Out",
        },
        {
          id: 4,
          customer: "David Thompson",
          amount: 25,
          date: "3 days ago",
          service: "Regular Clean",
        },
        {
          id: 5,
          customer: "Sarah Lee",
          amount: 10,
          date: "4 days ago",
          service: "Eco Clean",
        },
      ],
    },
    weeklyGoal: {
      target: 1000,
      current: 840,
      percentage: 84,
    },
    payoutHistory: [
      {
        id: 1,
        date: "Apr 12, 2026",
        amount: 840,
        status: "Paid",
        method: "Direct Deposit",
      },
      {
        id: 2,
        date: "Apr 5, 2026",
        amount: 920,
        status: "Paid",
        method: "Direct Deposit",
      },
      {
        id: 3,
        date: "Mar 29, 2026",
        amount: 780,
        status: "Paid",
        method: "Direct Deposit",
      },
      {
        id: 4,
        date: "Mar 22, 2026",
        amount: 650,
        status: "Paid",
        method: "Direct Deposit",
      },
      {
        id: 5,
        date: "Mar 15, 2026",
        amount: 710,
        status: "Pending",
        method: "Direct Deposit",
      },
    ],
    nextPayout: {
      date: "Apr 19, 2026",
      estimatedAmount: 840,
    },
  }

  return NextResponse.json(data)
}
