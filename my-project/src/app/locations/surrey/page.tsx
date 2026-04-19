import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in Surrey, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Surrey, BC. Serving Whalley, Guildford, Fleetwood, Newton, Cloverdale, South Surrey & all Surrey neighbourhoods. Non-toxic, plant-based.",
  alternates: { canonical: "https://cleaninstead.com/locations/surrey" },
};

export default function SurreyPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in Surrey, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>CleanInstead — Surrey&apos;s trusted eco-friendly cleaning service</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Proudly Serving Our Home City</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>CleanInstead was born and raised in Surrey, BC. As a locally owned and operated business, we&apos;re deeply committed to providing the best eco-friendly cleaning services to our fellow Surrey residents. From the bustling Guildford corridor to the peaceful neighbourhoods of South Surrey, we know this city inside and out.</p>
            <p>We support local environmental initiatives and watershed conservation programs right here in BC. When you choose CleanInstead, you&apos;re choosing a company that cares about our community and our planet.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Surrey Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Whalley", "Guildford", "Fleetwood", "Newton", "Cloverdale", "South Surrey", "Fraser Heights", "Bear Creek", "Panorama", "Green Timbers", "Bridgeview", "Morgan Heights", "Grandview Heights", "Crescent Beach", "City Centre"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Surrey Trusts CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🌿</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>100% Eco-Friendly</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Plant-based, non-toxic products safe for your family, pets, and the environment.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">⏱️</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Always On Time</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Professional teams arriving in uniform, on schedule, with a detailed checklist.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">💯</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Barefoot Guarantee</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Not satisfied? We&apos;ll return within 24 hours to fix it — completely free.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What Surrey Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.filter(t => t.role.toLowerCase().includes("surrey") || t.role.toLowerCase().includes("guildford")).slice(0, 4).map((t, i) => (
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
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Surrey Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across all Surrey neighbourhoods.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
