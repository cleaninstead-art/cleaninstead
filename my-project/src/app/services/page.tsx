import { Metadata } from "next";
import Link from "next/link";
import { serviceTypes, cleaningMethods } from "@/lib/data";

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Surrey & Vancouver, BC | CleanInstead",
  description: "Explore CleanInstead's full range of eco-friendly cleaning services: residential, commercial, Airbnb, move-in/out, post-construction, and deep cleaning in Surrey & Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="sub-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Professional Cleaning Services in Surrey &amp; Vancouver, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>From cozy apartments to commercial facilities</p>
        </div>
      </section>

      {/* What We Clean */}
      <section className="py-20" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>What We Clean</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {serviceTypes.map((s, i) => (
              <Link key={i} href={s.href} className="ci-card text-center block">
                <span className="text-4xl block mb-4">{s.icon}</span>
                <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>{s.title}</h3>
                <p style={{ color: "var(--light-text)", fontSize: 15 }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Clean */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>How We Clean</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {cleaningMethods.map((method, i) => (
              <div key={i} className="ci-card">
                <h3 className="text-center text-xl mb-4" style={{ color: "var(--primary)" }}>{method.title}</h3>
                <ul className="check-list list-none">
                  {method.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/pricing" className="btn-primary">GET A CUSTOM QUOTE</Link>
          </div>
        </div>
      </section>

      {/* Service Detail Links */}
      <section className="py-20" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>Explore Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/services/residential" className="ci-card block">
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>🏡 Residential Cleaning</h3>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Recurring maintenance cleaning for homes, townhomes, apartments, and condos in Surrey & Metro Vancouver.</p>
              <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Learn More →</span>
            </Link>
            <Link href="/services/deep-cleaning" className="ci-card block">
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>✨ Deep Cleaning</h3>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Comprehensive deep cleaning including oven, fridge, baseboards, window sills, and light fixtures.</p>
              <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Learn More →</span>
            </Link>
            <Link href="/services/move-in-out" className="ci-card block">
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>📦 Move-In / Move-Out</h3>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Seamless transitions with comprehensive move cleaning. Perfect for renters and realtors.</p>
              <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Learn More →</span>
            </Link>
            <Link href="/services/post-construction" className="ci-card block">
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>🔨 Post-Construction</h3>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Thorough cleanup after renovations and new builds. Dust removal, debris cleanup, surface polishing.</p>
              <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Learn More →</span>
            </Link>
            <Link href="/services/checklist" className="ci-card block">
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>📋 Service Checklist</h3>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>See exactly what's included in each service type. Compare recurring, deep clean, and move-in/out.</p>
              <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>View Checklist →</span>
            </Link>
            <Link href="/pricing" className="ci-card block text-center flex flex-col justify-center">
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>💰 Get Your Instant Quote</h3>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Use our online calculator for an instant estimate. No hidden fees, ever.</p>
              <span className="btn-primary inline-block">GET A QUOTE</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
