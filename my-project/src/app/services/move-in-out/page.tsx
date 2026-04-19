import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Move-In & Move-Out Cleaning in Surrey & Metro Vancouver | CleanInstead",
  description: "Comprehensive move-in and move-out cleaning for Surrey renters and realtors. Get your deposit back or impress buyers with a spotless property. Eco-friendly, non-toxic.",
  alternates: { canonical: "https://cleaninstead.com/services/move-in-out" },
};

export default function MoveInOutPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Move-In &amp; Move-Out Cleaning in Surrey &amp; Metro Vancouver</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Making transitions seamless and chemical-free</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Stress-Free Moving Starts Here</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Moving is one of life&apos;s most stressful events. Let us handle the cleaning so you can focus on everything else. Our move-in/move-out cleaning service is designed to make transitions seamless — whether you&apos;re a renter wanting your deposit back, a new homeowner wanting a fresh start, or a realtor preparing a property for sale.</p>
            <p>We go above and beyond a standard clean, tackling every surface, cabinet, appliance, and fixture. Our teams arrive with all eco-friendly supplies and follow a comprehensive checklist.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Comprehensive Move Cleaning Checklist</h2>
          <div className="ci-card">
            <ul className="check-list list-none">
              <li>Everything in our Deep Clean service</li>
              <li>Clean inside all cabinets and closets</li>
              <li>Clean inside all drawers</li>
              <li>Detailed appliance cleaning (oven, fridge, dishwasher)</li>
              <li>Window interior cleaning</li>
              <li>Detailed baseboard and trim cleaning</li>
              <li>Garage/balcony sweep (if applicable)</li>
              <li>Touch-up paint spot cleaning</li>
              <li>Final walkthrough inspection</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🔑</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Renters</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Get your full deposit back. We clean to the standards landlords and property managers expect.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🏠</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>New Homeowners</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Start fresh in your new home. We sanitize every surface so you can move in with confidence.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🏗️</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Realtors</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Properties sell faster when they&apos;re spotless. Ask about our realtor partnership program.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Quick Reference */}
      <section className="py-16" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>Move-In / Move-Out Pricing</h2>
          <p className="text-sm mb-8" style={{ color: "var(--light-text)" }}>Comprehensive turnover cleaning. Available as flat-rate or per-square-foot pricing.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { size: "1-2 Bed", price: "From $250" },
              { size: "3 Bed", price: "From $320" },
              { size: "4+ Bed", price: "From $400" },
            ].map((tier, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs font-medium mb-1" style={{ color: "var(--light-text)" }}>{tier.size}</p>
                <p className="text-xl font-bold" style={{ color: "var(--primary)" }}>{tier.price}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid var(--accent)" }}>
            <p className="text-xs font-medium" style={{ color: "var(--primary)", lineHeight: 1.7 }}>
              <strong>Also available at $0.15 &ndash; $0.25 per sq. ft.</strong> for accurate pricing on unique spaces. Contact us for a custom quote based on your exact square footage.
            </p>
          </div>
          <Link href="/pricing" className="btn-primary">VIEW FULL PRICING &amp; GET INSTANT QUOTE</Link>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Planning a Move?</h2>
          <p className="text-sm mb-8 opacity-80">Get your instant quote and book your move clean in under 60 seconds.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
