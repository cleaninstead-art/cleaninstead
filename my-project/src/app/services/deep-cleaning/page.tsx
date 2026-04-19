import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deep Cleaning Services in Surrey & Metro Vancouver | CleanInstead",
  description: "Comprehensive deep cleaning including oven, fridge, baseboards, window sills, and light fixtures. Perfect for spring cleaning, first-time clients, and post-illness sanitization.",
  alternates: { canonical: "https://cleaninstead.com/services/deep-cleaning" },
};

export default function DeepCleaningPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Deep Cleaning Services in Surrey &amp; Metro Vancouver</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Everything in recurring cleaning PLUS detailed deep cleaning</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>A Deeper Clean for a Healthier Home</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>Our deep cleaning service goes beyond the standard recurring clean. We tackle the areas that accumulate grime over time — inside appliances, baseboards, window sills, light fixtures, and more.</p>
            <p>Deep cleaning is ideal for first-time clients, seasonal refreshes, post-illness sanitization, or when your home just needs extra attention. We recommend a deep clean to start, then maintain with recurring visits.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Everything Included</h2>
          <div className="ci-card">
            <ul className="check-list list-none">
              <li>Everything in Recurring Maintenance cleaning</li>
              <li>Clean inside oven (racks, door, interior)</li>
              <li>Clean inside microwave</li>
              <li>Wipe down inside and outside of fridge</li>
              <li>Wipe all baseboards throughout home</li>
              <li>Clean all window sills and tracks</li>
              <li>Dust light fixtures and ceiling fans</li>
              <li>Clean inside cabinets (kitchen & bathroom)</li>
              <li>Detailed wall spot-cleaning</li>
              <li>Detailed door frame and hinge cleaning</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>When to Get a Deep Clean</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🌸</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Spring Cleaning</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Start the season fresh with a comprehensive deep clean of your entire home.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🆕</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>First-Time Clients</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We recommend starting with a deep clean so we can establish a baseline for your home.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🤒</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Post-Illness</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>After a household illness, a deep clean sanitizes every surface to prevent reinfection.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-2xl mb-8" style={{ color: "var(--primary)" }}>See the Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: "Kitchen Deep Clean", before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", after: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop" },
              { label: "Bathroom Transformation", before: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=300&fit=crop", after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop" },
              { label: "Living Room Refresh", before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
            ].map((item, i) => (
              <div key={i} className="gallery-card">
                <div className="gallery-compare">
                  <div className="gallery-side"><span className="gallery-badge">Before</span><img src={item.before} alt={`${item.label} before`} className="gallery-img" /></div>
                  <div className="gallery-side"><span className="gallery-badge gallery-badge-after">After</span><img src={item.after} alt={`${item.label} after`} className="gallery-img" /></div>
                </div>
                <p className="text-center mt-4 font-semibold text-sm" style={{ color: "var(--primary)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Quick Reference */}
      <section className="py-16" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>Deep Shine Pricing</h2>
          <p className="text-sm mb-8" style={{ color: "var(--light-text)" }}>Standard Refresh rate + $100 &ndash; $150 flat fee. Ideal for first-time clients and seasonal refreshes.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { size: "1-2 Bed", price: "From $245" },
              { size: "3 Bed", price: "From $285" },
              { size: "4+ Bed", price: "From $335" },
            ].map((tier, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs font-medium mb-1" style={{ color: "var(--light-text)" }}>{tier.size}</p>
                <p className="text-xl font-bold" style={{ color: "var(--primary)" }}>{tier.price}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid var(--accent)" }}>
            <p className="text-xs font-medium" style={{ color: "var(--primary)", lineHeight: 1.7 }}>
              {"\ud83d\udca1"} <strong>Pro Tip:</strong> We recommend booking a Deep Shine for your first visit, then switching to Standard Refresh with a recurring discount for ongoing maintenance. First-time cleans typically take 2x longer to reach our baseline standard.
            </p>
          </div>
          <Link href="/pricing" className="btn-primary">VIEW FULL PRICING &amp; GET INSTANT QUOTE</Link>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Ready for a Deep Clean?</h2>
          <p className="text-sm mb-8 opacity-80">Get your instant quote and book your deep clean in under 60 seconds.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
