import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant Quote Calculator | CleanInstead",
  description: "Get an instant cleaning quote for your home or office in Surrey & Metro Vancouver. No hidden fees.",
  alternates: { canonical: "https://cleaninstead.com/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
