import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides | CleanInstead Eco-Friendly Advice",
  description: "Expert cleaning tips from CleanInstead's eco-friendly team. Quick hacks, in-depth guides, kitchen, bathroom, seasonal, and pet-safe cleaning advice for Metro Vancouver homes.",
  alternates: { canonical: "https://cleaninstead.com/tips" },
};

export default function TipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
