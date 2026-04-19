import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in Burnaby & New Westminster, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Burnaby & New Westminster, BC. Serving Metrotown, Brentwood, Edmonds, SFU & all Burnaby neighbourhoods. Non-toxic, plant-based.",
  alternates: { canonical: "https://cleaninstead.com/locations/burnaby" },
};

export default function BurnabyPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in Burnaby &amp; New Westminster</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning for Metro Vancouver&apos;s central hub</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Cleaning Burnaby &amp; New Westminster Homes the Green Way</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Burnaby is the heart of Metro Vancouver, and its diverse housing — from luxury high-rises at Metrotown to heritage homes in the Heights — requires a cleaning service that adapts. CleanInstead serves every corner of Burnaby and neighbouring New Westminster with the same eco-friendly, hospital-grade standards we&apos;re known for across the Lower Mainland.</p>
            <p>New Westminster, with its charming historic homes and growing condo developments along the waterfront, is a natural extension of our service area. Whether you need recurring maintenance for your Brentwood apartment or a deep clean for your Queensborough townhome, our vetted teams deliver consistent, chemical-free results every time.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Burnaby &amp; New Westminster Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Metrotown", "Brentwood", "Edmonds", "SFU / Lochdale", "Louheed", "South Slope", "Deer Lake", "BCIT Area", "Sapperton", "Uptown New West", "Queensborough", "Queens Park", "New Westminster Downtown", "Kelvin Grove", "Fraser River"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Burnaby &amp; New West Trust CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udfe2"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Condo &amp; Apartment Experts</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Experienced with Metrotown high-rises, strata rules, and building parking constraints.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udd0d"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Background-Checked Teams</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Rigorous 4-step vetting process ensures every cleaner is insured, checked, and trained.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udca0"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>100% Satisfaction</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>24-hour Barefoot Guarantee. If it is not spotless, we return to fix it at no extra cost.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What Burnaby Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.filter(t => t.role.toLowerCase().includes("vancouver") || t.role.toLowerCase().includes("office")).slice(0, 4).map((t, i) => (
              <div key={i} className="ci-card">
                <div className="text-[#f1c40f] text-lg mb-3">{"★".repeat(t.stars)}</div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--light-text)" }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--light-text)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Burnaby Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across Burnaby and New Westminster.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
            <Link href="/contact" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </>
  );
}
