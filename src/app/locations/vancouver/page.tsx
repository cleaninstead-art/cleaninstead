import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in Vancouver, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Vancouver, BC. Serving Downtown, Kitsilano, Mount Pleasant, East Van, South Granville, UBC & all Vancouver neighbourhoods. Non-toxic, plant-based.",
  alternates: { canonical: "https://cleaninstead.com/locations/vancouver" },
};

export default function VancouverPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in Vancouver, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning services across all Vancouver neighbourhoods</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Vancouver&apos;s Trusted Green Cleaning Service</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Vancouver is one of the greenest cities in the world, and your cleaning service should match those values. CleanInstead brings hospital-grade, eco-friendly cleaning to condos, townhomes, and houses across every Vancouver neighbourhood. Whether you live in a high-rise in Yaletown or a character home in East Van, our trained teams arrive with everything needed to deliver a spotless, chemical-free clean.</p>
            <p>Our plant-based products are specifically chosen for their effectiveness in urban environments where air quality matters. With Vancouver&apos;s rainy climate promoting mold and mildew growth, our non-toxic approach ensures your home stays fresh without introducing harmful VOCs into your living space. We serve the entire city from UBC to the PNE grounds and everywhere in between.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Vancouver Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Downtown Vancouver", "Kitsilano", "Point Grey", "Yaletown", "South Granville", "Marpole", "Mount Pleasant", "Main Street", "East Vancouver", "Strathcona", "Kensington", "Cedar Cottage", "Killarney", "Renfrew", "UBC", "West Point Grey", "Fairview", "Gastown", "Chinatown", "Coal Harbour"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Vancouver Residents Choose CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udf31"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Vancouver-Green Values</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Zero single-use plastics, plant-based products, and a commitment to sustainability that matches this city&apos;s values.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udfe0"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Condo Specialists</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Experienced with Vancouver condos and strata rules. We work within building guidelines and parking constraints.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udf0d"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Mold &amp; Mildew Defense</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Vancouver&apos;s wet climate needs specialized care. Our products prevent mold without toxic chemicals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What Vancouver Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.filter(t => t.role.toLowerCase().includes("vancouver")).slice(0, 4).map((t, i) => (
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
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Vancouver Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across all Vancouver neighbourhoods.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
            <Link href="/contact" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </>
  );
}
