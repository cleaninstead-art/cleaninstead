export async function GET() {
  return Response.json({
    revenue: 24580,
    bookings: 156,
    customers: 89,
    avgRating: 4.8,
    revenueChange: 12.5,
    bookingsChange: 8.3,
    customersChange: 15.2,
    ratingChange: 0.2,
    weeklyRevenue: [
      { day: "Mon", amount: 3200 },
      { day: "Tue", amount: 2800 },
      { day: "Wed", amount: 3500 },
      { day: "Thu", amount: 4100 },
      { day: "Fri", amount: 3800 },
      { day: "Sat", amount: 4200 },
      { day: "Sun", amount: 2980 },
    ],
  });
}
