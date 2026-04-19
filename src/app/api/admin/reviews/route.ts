export async function GET() {
  const reviews = [
    {
      id: 1,
      customerName: "Amanda Johnson",
      cleanerName: "Maria Santos",
      rating: 5,
      comment:
        "Absolutely fantastic service! Maria was thorough, professional, and left the apartment spotless. Will definitely book again.",
      date: "2025-01-14",
      isApproved: true,
    },
    {
      id: 2,
      customerName: "Michael Chen",
      cleanerName: "Sarah Chen",
      rating: 4,
      comment:
        "Great cleaning job. Sarah paid attention to detail and was very punctual. Only minor thing is the windows could have been cleaner.",
      date: "2025-01-13",
      isApproved: true,
    },
    {
      id: 3,
      customerName: "Emily Davis",
      cleanerName: "James Wilson",
      rating: 5,
      comment:
        "James did an amazing deep clean of our kitchen and bathrooms. Everything looks brand new. Highly recommend!",
      date: "2025-01-12",
      isApproved: true,
    },
    {
      id: 4,
      customerName: "Jennifer Martinez",
      cleanerName: "Lisa Park",
      rating: 3,
      comment:
        "The cleaning was okay but took longer than expected. Some areas were missed in the living room.",
      date: "2025-01-12",
      isApproved: false,
    },
    {
      id: 5,
      customerName: "Robert Taylor",
      cleanerName: "Maria Santos",
      rating: 5,
      comment:
        "Maria is the best cleaner we have ever had. She is efficient, friendly, and uses eco-friendly products that smell wonderful.",
      date: "2025-01-11",
      isApproved: false,
    },
    {
      id: 6,
      customerName: "David Brown",
      cleanerName: "Sarah Chen",
      rating: 4,
      comment:
        "Very happy with the eco clean service. Sarah explained all the products she used and the results were impressive.",
      date: "2025-01-10",
      isApproved: true,
    },
    {
      id: 7,
      customerName: "Lisa Park",
      cleanerName: "James Wilson",
      rating: 5,
      comment:
        "Outstanding move-in cleaning service. Every corner was spotless. Made our new home feel welcoming from day one.",
      date: "2025-01-09",
      isApproved: true,
    },
    {
      id: 8,
      customerName: "Christopher Lee",
      cleanerName: "Lisa Park",
      rating: 4,
      comment:
        "Lisa was very professional and thorough. The apartment looked amazing after her visit. Great value for money.",
      date: "2025-01-08",
      isApproved: false,
    },
  ];

  return Response.json(reviews);
}
