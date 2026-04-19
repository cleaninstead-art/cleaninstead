import { NextResponse } from "next/server";

const referralData = {
  code: "AMANDA12",
  referralCount: 3,
  creditsEarned: 45,
  pendingReferrals: 1,
  referralLink: "https://cleaninstead.com/referral/AMANDA12",
  rewardPerReferral: 15,
  friendDiscount: 20,
  referrals: [
    {
      id: "ref-1",
      name: "Carol Williams",
      email: "carol@example.com",
      referredDate: "2025-03-15",
      status: "completed",
      rewardEarned: true,
      creditAmount: 15,
    },
    {
      id: "ref-2",
      name: "Bob Martinez",
      email: "bob@example.com",
      referredDate: "2025-02-28",
      status: "completed",
      rewardEarned: true,
      creditAmount: 15,
    },
    {
      id: "ref-3",
      name: "David Thompson",
      email: "david@example.com",
      referredDate: "2025-01-10",
      status: "completed",
      rewardEarned: true,
      creditAmount: 15,
    },
  ],
};

export async function GET() {
  return NextResponse.json(referralData);
}
