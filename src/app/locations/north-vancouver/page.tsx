import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in North Vancouver & West Vancouver, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in North Van & West Vancouver, BC. Serving Lower Lonsdale, Deep Cove, Ambleside, British Properties & the North Shore. Non-toxic.",
  alternates: { canonical: "https://cleaninstead.com/locations/north-vancouver" },
};

export default function NorthVancouverPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning on the North Shore</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning for North Vancouver, West Vancouver &amp; Deep Cove</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>The North Shore&apos;s Premium Green Cleaning Service</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>The North Shore is known for its stunning natural beauty, outdoor lifestyle, and homes that reflect a deep connection to the environment. CleanInstead shares those values. Our eco-friendly cleaning service is designed for the North Shore lifestyle — non-toxic, plant-based, and tough enough to handle the mud, pollen, and moisture that come with living beside the mountains and the ocean.</p>
            <p>From heritage homes in Ambleside to modern builds in the British Properties, from the vibrant Lonsdale corridor to the peaceful trails of Deep Cove, our trained teams know the North Shore. We are experienced with the unique challenges of North Shore homes, including larger properties on sloped lots, multi-level layouts, and the dampness that promotes mold growth in basements and bathrooms.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>North Shore Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Lower Lonsdale", "Central Lonsdale", "Upper Lonsdale", "Deep Cove", "Lynn Valley", "Capilano", "Ambleside", "Horseshoe Bay", "Caulfeild", "British Properties", "Dundarave", "West Vancouver", "Edgemont", "Seymour", "Riverside"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why the North Shore Trusts CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\u26f0"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Mountain-Living Ready</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Specialized in handling the moisture, mold, and grime that come with North Shore living.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udf3f"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Shared Values</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Zero-waste, plant-based cleaning that aligns with the North Shore&apos;s environmental consciousness.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udfe7"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Large Property Experts</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Multi-level homes, sloped lots, and large properties — we have the team and the tools.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your North Shore Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across North and West Vancouver.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
            <Link href="/contact" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </>
  );
}
