import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "House Cleaning in White Rock, BC | CleanInstead",
  description: "Premium eco-friendly house cleaning in White Rock, BC. Serving the beachside community with non-toxic, plant-based cleaning products. Residential, deep cleaning, and move-in/out.",
  alternates: { canonical: "https://cleaninstead.com/locations/white-rock" },
};

export default function WhiteRockPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in White Rock, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Premium eco-friendly cleaning for White Rock&apos;s beautiful community</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Where Ocean Meets Clean</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>White Rock is one of Metro Vancouver&apos;s most desirable communities — and we think your home should match the stunning ocean views. CleanInstead provides premium eco-friendly cleaning services tailored to the unique needs of White Rock&apos;s residents.</p>
            <p>From oceanfront properties to charming family homes, our professional teams arrive fully equipped with plant-based, non-toxic products that are safe for your family, your pets, and the beautiful coastal environment we all love.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>White Rock &amp; Surrounding Areas</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["White Rock", "Crescent Beach", "Morgan Heights", "Grandview Heights", "South Surrey", "Semiahmoo", "Ocean Park", "Sunnyside"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why White Rock Loves CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🌊</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Coastal-Friendly</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Our eco-friendly products are tough on salt air residue while being gentle on the environment.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🏡</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Premium Homes</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We understand the high standards of White Rock homeowners and deliver healthcare-grade results.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🤝</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Community Focused</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We&apos;re locally owned and support environmental initiatives right here in BC.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your White Rock Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes throughout White Rock and South Surrey.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
