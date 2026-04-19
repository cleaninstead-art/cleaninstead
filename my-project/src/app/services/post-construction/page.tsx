import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Post-Construction Cleaning in Surrey & Metro Vancouver | CleanInstead",
  description: "Specialized post-construction cleanup for new builds and renovations. Dust removal, debris cleanup, surface polishing. Serving Surrey, Vancouver & Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/services/post-construction" },
};

export default function PostConstructionPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Post-Construction Cleaning in Surrey &amp; Metro Vancouver</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>From construction site to move-in ready — the eco-friendly way</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>The Final Touch After Your Build</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Construction and renovation leave behind fine dust, debris, and residue that requires specialized cleaning. Our post-construction cleaning service is designed to handle the unique challenges of newly built or renovated spaces.</p>
            <p>We use HEPA-filtered vacuums to capture fine construction dust particles and professional-grade eco-friendly products to clean every surface. Whether it&apos;s a new build, a kitchen renovation, or a full home remodel, we&apos;ll get your space move-in ready.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>What&apos;s Included</h2>
          <div className="ci-card">
            <ul className="check-list list-none">
              <li>HEPA vacuuming to capture fine construction dust</li>
              <li>Dust removal from all surfaces and fixtures</li>
              <li>Debris and material cleanup</li>
              <li>Window and glass cleaning (interior)</li>
              <li>Surface polishing (counters, tiles, fixtures)</li>
              <li>Cabinet and shelf cleaning (interior and exterior)</li>
              <li>Floor cleaning and polishing</li>
              <li>Light fixture and vent cleaning</li>
              <li>Bathroom sanitization</li>
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
              <span className="text-4xl block mb-4">🏗️</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>New Builds</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Get your new home spotless and move-in ready before you unpack a single box.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🔨</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Renovations</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Kitchen, bathroom, or whole-home renovations — we handle the cleanup so you can enjoy the results.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🤝</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Contractor Partnerships</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We partner with contractors and builders for reliable, eco-friendly post-construction cleanup.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Construction Almost Done?</h2>
          <p className="text-sm mb-8 opacity-80">Get your instant quote and schedule your post-construction clean.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
