import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Home Note | CleanInstead",
  description: "Print a personalized welcome home note from CleanInstead. A thoughtful touch after every professional eco-friendly clean.",
  alternates: { canonical: "https://cleaninstead.com/welcome-home-note" },
};

export default function WelcomeHomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
