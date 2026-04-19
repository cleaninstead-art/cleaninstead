import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | CleanInstead Eco-Friendly Cleaning Services",
  description: "Frequently asked questions about CleanInstead's eco-friendly cleaning services in Surrey & Metro Vancouver. Products, scheduling, pricing, guarantees, and more.",
  alternates: { canonical: "https://cleaninstead.com/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
