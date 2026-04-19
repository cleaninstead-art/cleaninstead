import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Team | Careers at CleanInstead",
  description: "Join CleanInstead's eco-friendly cleaning team in Surrey & Metro Vancouver. Competitive pay, flexible schedules, and a mission-driven work environment. Apply today!",
  alternates: { canonical: "https://cleaninstead.com/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
