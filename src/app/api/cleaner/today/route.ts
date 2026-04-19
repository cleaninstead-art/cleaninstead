import { NextResponse } from "next/server"

export async function GET() {
  const today = new Date()

  const data = {
    date: today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    summary: {
      totalJobs: 3,
      completed: 1,
      upcoming: 2,
      totalEarnings: 395,
      completedEarnings: 95,
    },
    jobs: [
      {
        id: "job-1",
        customerName: "Amanda Johnson",
        customerInitials: "AJ",
        customerPhone: "604-555-2345",
        time: "9:00 AM",
        endTime: "11:00 AM",
        serviceType: "Regular Clean",
        address: "123 Elm Street, Surrey",
        amount: 120,
        status: "upcoming",
        specialInstructions:
          "Please be careful with the antique dining table. Use only the provided microfiber cloths. The cat may be in the living room — please do not let it outside.",
        accessInfo: "Key under the front mat. Ring doorbell first.",
      },
      {
        id: "job-2",
        customerName: "Bob Martinez",
        customerInitials: "BM",
        customerPhone: "604-555-3456",
        time: "12:00 PM",
        endTime: "2:00 PM",
        serviceType: "Deep Clean",
        address: "456 Oak Avenue, Vancouver",
        amount: 180,
        status: "upcoming",
        specialInstructions:
          "Focus on kitchen and bathrooms. Oven needs a deep clean. Grout in the master bathroom shower needs attention. Please bring the steam cleaner.",
        accessInfo: "Door code: 4521#. Back door is unlocked.",
      },
      {
        id: "job-3",
        customerName: "Carol Williams",
        customerInitials: "CW",
        customerPhone: "604-555-4567",
        time: "3:00 PM",
        endTime: "4:30 PM",
        serviceType: "Eco Clean",
        address: "789 Pine Road, Burnaby",
        amount: 95,
        status: "completed",
        specialInstructions:
          "Please use only eco-friendly products. Carol has allergies — no scented products. Air purifier is in the bedroom, please leave it on.",
        accessInfo: "Spare key in the lockbox. Code: 1984.",
      },
    ],
  }

  return NextResponse.json(data)
}
