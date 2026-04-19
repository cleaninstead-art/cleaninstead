import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in Richmond & Delta, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Richmond & Delta, BC. Serving Steveston, Brighouse, Ironwood, Ladner, Tsawwassen & all neighbourhoods. Non-toxic, plant-based.",
  alternates: { canonical: "https://cleaninstead.com/locations/richmond" },
};

export default function RichmondPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in Richmond &amp; Delta</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning for Richmond, Ladner, Tsawwassen &amp; North Delta</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Green Cleaning for Richmond &amp; Delta Families</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Richmond and Delta are vibrant, family-oriented communities where residents take pride in their homes. From the waterfront properties of Steveston to the quiet cul-de-sacs of Tsawwassen, CleanInstead provides the same hospital-grade, eco-friendly cleaning that has earned us a 4.9-star rating across Metro Vancouver. Our teams are experienced with the unique needs of Richmond&apos;s diverse housing stock, including newer builds in Ironwood and established homes in Broadmoor.</p>
            <p>Delta&apos;s Ladner and Tsawwassen communities benefit from our reliable scheduling and the peace of mind that comes with our Barefoot Guarantee. Whether you need weekly maintenance for a busy family home or a one-time deep clean, we bring everything needed and leave nothing behind but a spotless, fresh-smelling home.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Richmond &amp; Delta Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Steveston", "Brighouse", "Ironwood", "Hamilton", "Sea Island", "Broadmoor", "Riverdale", "Shellmont", "South Arm", "Thompson", "Blundell", "Ladner", "Tsawwassen", "North Delta", "Annacis Island"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Richmond &amp; Delta Choose CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udf0a"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Coastal Climate Care</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Mold prevention and moisture management using non-toxic products ideal for Richmond&apos;s coastal climate.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udc15"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Pet-Friendly</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Our zero-residue products are safe for dogs, cats, and all pets to walk on immediately after cleaning.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udd04"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Flexible Scheduling</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Weekday and Saturday availability. Recurring clients get priority booking and up to 20% off.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What Richmond Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.filter(t => t.role.toLowerCase().includes("richmond")).slice(0, 4).map((t, i) => (
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
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Richmond &amp; Delta Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across Richmond, Ladner, and Tsawwassen.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
            <Link href="/contact" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </>
  );
}
