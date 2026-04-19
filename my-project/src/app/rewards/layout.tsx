import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewards & Referral Program | CleanInstead",
  description: "Earn free cleaning with CleanInstead's rewards program! Share the Sparkle referral ($25/$25), Healthy Home Club loyalty tiers, and Feedback for Flowers perks.",
  alternates: { canonical: "https://cleaninstead.com/rewards" },
};

export default function RewardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
