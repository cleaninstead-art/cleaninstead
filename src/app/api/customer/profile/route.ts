import { NextResponse } from "next/server";

const customerProfile = {
  name: "Amanda Johnson",
  email: "amanda@example.com",
  phone: "604-555-7890",
  address: "123 Elm Street, Surrey, BC V3R 1M7",
  loyaltyPoints: 60,
  totalBookings: 12,
  ecoBottlesSaved: 24,
  referralCode: "AMANDA12",
  referralCount: 3,
  memberSince: "2024-11-15",
  preferredTime: "morning",
  ecoProductsOnly: true,
  petFriendly: true,
};

export async function GET() {
  return NextResponse.json(customerProfile);
}
