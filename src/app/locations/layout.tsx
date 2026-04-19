import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Areas | CleanInstead Cleaning in Metro Vancouver, BC",
  description: "CleanInstead serves Surrey, Vancouver, Burnaby, Richmond, Langley, Delta, White Rock, Coquitlam, Maple Ridge, and North Vancouver. Find eco-friendly cleaning near you!",
  alternates: { canonical: "https://cleaninstead.com/locations" },
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
