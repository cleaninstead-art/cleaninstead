import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "House Cleaning in Langley, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Langley, BC. Serving Langley City, Langley Township, Willowbrook, Brookswood, and Aldergrove. Non-toxic, plant-based products.",
  alternates: { canonical: "https://cleaninstead.com/locations/langley" },
};

export default function LangleyPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in Langley, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning for Langley&apos;s growing community</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Serving the Heart of the Fraser Valley</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Langley is one of the fastest-growing communities in Metro Vancouver, and CleanInstead is proud to bring our premium eco-friendly cleaning services to the area. From the charming shops of Langley City to the sprawling acreages of Langley Township, we serve residential and commercial clients throughout the community.</p>
            <p>As Langley continues to grow east, we&apos;re expanding our coverage to include newer developments in areas like Aldergrove and Brookswood. Whether you have a condo in Willbrook or a family home in the Township, CleanInstead has you covered.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Langley Areas We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Langley City", "Langley Township", "Willowbrook", "Brookswood", "Aldergrove", "Fort Langley", "Murrayville", "Nicomekl", "Willoughby", "Yorkson"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Langley Chooses CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="ci-card">
              <span className="text-3xl block mb-4">🌿</span>
              <h3 className="text-lg mb-2" style={{ color: "var(--primary)" }}>Eco-Friendly Products</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Safe for families with children, pets, and those with sensitivities. No harsh chemicals, ever.</p>
            </div>
            <div className="ci-card">
              <span className="text-3xl block mb-4">🔍</span>
              <h3 className="text-lg mb-2" style={{ color: "var(--primary)" }}>Thorough Checklists</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Every clean follows a detailed checklist to ensure consistent quality across all visits.</p>
            </div>
            <div className="ci-card">
              <span className="text-3xl block mb-4">⭐</span>
              <h3 className="text-lg mb-2" style={{ color: "var(--primary)" }}>5-Star Reputation</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>4.9/5 rating across 127+ reviews. Our clients love us and we&apos;re proud of it.</p>
            </div>
            <div className="ci-card">
              <span className="text-3xl block mb-4">🎁</span>
              <h3 className="text-lg mb-2" style={{ color: "var(--primary)" }}>Rewards Program</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Earn free services after 3, 6, and 10 cleans. Save even more with frequency discounts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Langley Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes throughout Langley.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
