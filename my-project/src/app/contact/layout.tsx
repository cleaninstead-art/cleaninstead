import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CleanInstead | Eco-Friendly Cleaning in Surrey, BC",
  description: "Contact CleanInstead for a free cleaning quote in Surrey, Vancouver, and Metro Vancouver. Call, email, or fill out our form. We respond within hours!",
  alternates: { canonical: "https://cleaninstead.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
