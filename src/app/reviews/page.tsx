import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | CleanInstead",
  description: "See what CleanInstead clients say about our eco-friendly cleaning services. 4.9/5 stars from 127+ reviews. Real testimonials from Surrey, Vancouver, and Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">What Our Clients Say</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Real reviews from real customers across Metro Vancouver</p>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <div className="text-6xl font-bold mb-2" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>4.9</div>
          <div className="text-[#f1c40f] text-3xl mb-2">★★★★★</div>
          <p className="text-sm" style={{ color: "var(--light-text)" }}>Based on 127 verified reviews</p>
        </div>
      </section>

      {/* Reviews Wall */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
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
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Join Our Happy Clients</h2>
          <p className="text-sm mb-8 opacity-80">Experience the CleanInstead difference with our 24-hour Barefoot Guarantee.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>
    </>
  );
}
