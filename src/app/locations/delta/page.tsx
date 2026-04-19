import { Metadata } from "next";
import Link from "next/link";
import { testimonials, companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Eco-Friendly House Cleaning in Delta BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Delta, BC. Serving Ladner, Tsawwassen, North Delta & all Delta communities. Non-toxic, plant-based products. Free quotes available.",
  alternates: { canonical: "https://cleaninstead.com/locations/delta" },
};

export default function DeltaPage() {
  return (
    <>
      {/* Hero */}
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Eco-Friendly House Cleaning in Delta, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Serving Ladner, Tsawwassen, North Delta &amp; all Delta communities — CleanInstead&apos;s trusted green cleaning</p>
        </div>
      </section>

      {/* About Our Delta Service */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>About Our Delta Service</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Delta is one of Metro Vancouver&apos;s most diverse communities — from the rich farmland of Ladner to the sunny shores of Tsawwassen and the growing neighbourhoods of North Delta. CleanInstead is proud to bring our eco-friendly cleaning services to every corner of this vibrant municipality.</p>
            <p>As a Surrey-based company, Delta is right next door, which means our teams arrive quickly and on time. We understand the unique needs of Delta homes, from heritage properties in Ladner Village to modern waterfront condos in Tsawwassen. Every clean is backed by our 24-hour Barefoot Guarantee.</p>
            <p>We use only plant-based, EPA-registered products that are safe for your family, pets, and the beautiful natural environment that surrounds Delta — including the Fraser River estuary and Boundary Bay.</p>
          </div>
        </div>
      </section>

      {/* Delta Neighbourhoods */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Delta Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Ladner", "Tsawwassen", "North Delta", "Tsawwassen Mills", "Boundary Bay", "Sunshine Hills", "Nordel", "Scottsdale", "Panorama Ridge", "Annieville", "River Road", "Westham Island", "Ladner Village", "Tsawwassen Beach", "Burns Bog"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What&apos;s Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Dusting all surfaces & baseboards",
              "HEPA vacuuming throughout",
              "Mopping with plant-based soap",
              "Kitchen sanitizing (counters, sink, stovetop)",
              "Bathroom scrubbing (tub, toilet, vanity, mirrors)",
              "Compostable bin liner replacement",
              "Door handles & light switch wiping",
              "Tidy & organize living spaces",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-600 text-lg mt-0.5">✓</span>
                <p className="text-sm" style={{ color: "var(--light-text)" }}>{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: "var(--light-text)" }}>
            Deep cleans and move-in/out services include additional tasks like inside oven, fridge, baseboard wiping, and window sill cleaning.
          </p>
        </div>
      </section>

      {/* Pricing Quick Reference */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-4" style={{ color: "var(--primary)" }}>Pricing Quick Reference</h2>
          <p className="text-center text-sm mb-16" style={{ color: "var(--light-text)" }}>Transparent pricing for Delta homes. Final quotes depend on home size and condition.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🏠</span>
              <h3 className="text-xl mb-2" style={{ color: "var(--primary)" }}>Standard Clean</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: "var(--primary)" }}>From $145</p>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Recurring maintenance cleaning. Dusting, vacuuming, mopping, kitchen &amp; bathroom sanitizing.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">✨</span>
              <h3 className="text-xl mb-2" style={{ color: "var(--primary)" }}>Deep Clean</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: "var(--primary)" }}>From $245</p>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Everything in Standard PLUS inside oven, fridge, baseboard wiping, window sills, and light fixtures.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">📦</span>
              <h3 className="text-xl mb-2" style={{ color: "var(--primary)" }}>Move-In / Move-Out</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: "var(--primary)" }}>From $250</p>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Comprehensive clean for transitions. Inside cabinets, closets, drawers, and detailed appliance cleaning.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/pricing" className="btn-primary">GET YOUR INSTANT QUOTE</Link>
          </div>
        </div>
      </section>

      {/* Why Delta Residents Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Delta Residents Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🗺️</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Local Knowledge</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We know Delta inside and out — from Ladner&apos;s heritage homes to Tsawwassen&apos;s modern builds. Our proximity means fast, reliable service with no long travel waits.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🌿</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Eco-Friendly Products</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>100% plant-based, non-toxic, EPA-registered products. Safe for your family, pets, and Delta&apos;s sensitive ecosystems like Burns Bog and Boundary Bay.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">📅</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Flexible Scheduling</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Book online or call us directly. We offer weekly, bi-weekly, monthly, and one-time cleans that fit your schedule — including weekends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What Delta Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.filter(t => t.role.toLowerCase().includes("delta") || t.role.toLowerCase().includes("ladner") || t.role.toLowerCase().includes("tsawwassen")).slice(0, 4).length > 0
              ? testimonials.filter(t => t.role.toLowerCase().includes("delta") || t.role.toLowerCase().includes("ladner") || t.role.toLowerCase().includes("tsawwassen")).slice(0, 4).map((t, i) => (
                <div key={i} className="ci-card">
                  <div className="text-[#f1c40f] text-lg mb-3">{"★".repeat(t.stars)}</div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--light-text)" }}>&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--light-text)" }}>{t.role}</p>
                  </div>
                </div>
              ))
              : testimonials.slice(0, 4).map((t, i) => (
                <div key={i} className="ci-card">
                  <div className="text-[#f1c40f] text-lg mb-3">{"★".repeat(t.stars)}</div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--light-text)" }}>&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--light-text)" }}>{t.role}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Delta Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across Ladner, Tsawwassen, North Delta &amp; all Delta communities. Call {companyInfo.phone} or book online.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
