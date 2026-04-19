import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in Maple Ridge & Pitt Meadows, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Maple Ridge & Pitt Meadows, BC. Non-toxic, plant-based products. Background-checked teams. Serving all neighbourhoods.",
  alternates: { canonical: "https://cleaninstead.com/locations/maple-ridge" },
};

export default function MapleRidgePage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in Maple Ridge &amp; Pitt Meadows</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning for the Ridge Meadows area of Metro Vancouver</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Ridge Meadows&apos; Eco-Friendly Cleaning Professionals</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Maple Ridge and Pitt Meadows offer the perfect blend of rural charm and suburban convenience. With larger lot sizes, acreages, and a growing number of new developments, the Ridge Meadows community needs a cleaning service that can handle diverse property types. CleanInstead brings our hospital-grade, eco-friendly approach to every home — from Pitt Meadows acreages to Maple Ridge townhomes in the downtown core.</p>
            <p>Our teams understand the unique challenges of Ridge Meadows properties, including pet-friendly homes with yards, homes near the Fraser River that face higher humidity, and newer builds that benefit from our post-construction cleaning expertise. We arrive fully equipped with all our own plant-based supplies and leave nothing behind but a spotless, fresh-smelling home.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Maple Ridge &amp; Pitt Meadows Areas We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Downtown Maple Ridge", "Haney", "Albion", "Silver Valley", "Thornhill", "Webster's Corners", "Yennadon", "Pitt Meadows", "Pitt Polder", "Ruskin", "Whonnock", "Cottonwood", "South Bonson", "Davies Road", "Katzie"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Ridge Meadows Chooses CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udf3d"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Acreage Specialists</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Experienced with larger properties, multi-building homes, and rural properties in the Ridge Meadows area.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udc3e"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Pet-Friendly Focus</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Homes with yards, dogs, and outdoor cats need pet-safe products. Our zero-residue formula is safe for all animals.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udcb0"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Fair, Transparent Pricing</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Flat-rate pricing with no hidden fees. Use our instant quote calculator to see your price in 60 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Ridge Meadows Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across Maple Ridge and Pitt Meadows.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
            <Link href="/contact" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </>
  );
}
