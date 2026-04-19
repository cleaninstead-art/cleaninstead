import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Residential House Cleaning in Surrey & Metro Vancouver | CleanInstead",
  description: "Standard recurring residential cleaning for homes, townhomes, apartments, and condos. Eco-friendly, non-toxic, plant-based products. Serving Surrey, Vancouver, Burnaby, Richmond & Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/services/residential" },
};

export default function ResidentialPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Residential House Cleaning in Surrey &amp; Metro Vancouver</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Recurring maintenance cleaning for a consistently clean home</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Your Home, Consistently Clean</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Our residential cleaning service is designed for homeowners, renters, and families who want a reliably clean space without the hassle. Whether you live in a house, townhome, apartment, or condo, our recurring maintenance plan keeps your home spotless week after week.</p>
            <p>We use 100% plant-based, non-toxic, EPA-registered products and arrive fully equipped with everything needed — you never need to provide a thing. Our teams follow a detailed checklist to ensure consistent quality every visit.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What&apos;s Included</h2>
          <div className="ci-card">
            <ul className="check-list list-none">
              <li>Dust all surfaces (tables, shelves, baseboards)</li>
              <li>HEPA vacuum all floors and carpets</li>
              <li>Mop all hard floors with plant-based soap</li>
              <li>Sanitize kitchen counters and sink</li>
              <li>Clean stovetop and wipe appliance exteriors</li>
              <li>Scrub bathtub, shower, toilet, and vanity</li>
              <li>Clean mirrors throughout</li>
              <li>Empty trash and replace compostable liners</li>
              <li>Wipe door handles and light switches</li>
              <li>Tidy and organize living spaces</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Who Is This For?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">👨‍👩‍👧‍👦</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Busy Families</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Focus on what matters. We keep your home clean and safe for kids and pets.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">💼</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Working Professionals</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Come home to a spotless space after a long day. Our flexible scheduling works around your life.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🔄</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Recurring Clients</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Save with frequency discounts (up to 15%) and earn free services through our rewards program.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Quick Reference */}
      <section className="py-16" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>Standard Refresh Pricing</h2>
          <p className="text-sm mb-8" style={{ color: "var(--light-text)" }}>Transparent, flat-rate pricing with no hidden fees. Save up to 20% with recurring bookings.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { size: "1-2 Bed", price: "From $145" },
              { size: "3 Bed", price: "From $185" },
              { size: "4+ Bed", price: "From $235" },
            ].map((tier, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs font-medium mb-1" style={{ color: "var(--light-text)" }}>{tier.size}</p>
                <p className="text-xl font-bold" style={{ color: "var(--primary)" }}>{tier.price}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mb-6" style={{ color: "var(--light-text)" }}>Recurring discounts: <strong>Weekly 20% off</strong> | Bi-Weekly 15% off | Monthly 10% off</p>
          <Link href="/pricing" className="btn-primary">VIEW FULL PRICING &amp; GET INSTANT QUOTE</Link>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Ready for a Clean Home?</h2>
          <p className="text-sm mb-8 opacity-80">Get your instant quote and book your first clean in under 60 seconds.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
