import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "House Cleaning in Coquitlam, Port Coquitlam & Port Moody, BC | CleanInstead",
  description: "Professional eco-friendly house cleaning in Coquitlam, Port Coquitlam & Port Moody (Tri-Cities), BC. Serving Town Centre, Westwood Plateau, Burke Mountain & more. Non-toxic.",
  alternates: { canonical: "https://cleaninstead.com/locations/coquitlam" },
};

export default function CoquitlamPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">House Cleaning in the Tri-Cities</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Eco-friendly cleaning for Coquitlam, Port Coquitlam &amp; Port Moody</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Tri-Cities&apos; Trusted Eco-Friendly Cleaners</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p>The Tri-Cities — Coquitlam, Port Coquitlam, and Port Moody — form one of the fastest-growing regions in Metro Vancouver. With new developments on Burke Mountain, the revitalized Port Moody waterfront, and the established neighbourhoods of Port Coquitlam, the demand for reliable, professional cleaning services has never been higher. CleanInstead answers that call with hospital-grade, eco-friendly cleaning that families can trust.</p>
            <p>Our teams are familiar with the Tri-Cities&apos; diverse housing landscape, from modern townhomes in Burke Mountain to character homes in Port Coquitlam and luxury condos at Rocky Point. We bring all our own supplies, follow a detailed checklist, and guarantee your satisfaction with our 24-hour Barefoot Guarantee.</p>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Tri-Cities Neighbourhoods We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Coquitlam Town Centre", "Westwood Plateau", "Burke Mountain", "Port Moody", "Rocky Point", "Port Coquitlam", "Maillardville", "Frederickson", "River Springs", "Coquitlam River", "Eagle Ridge", "Heritage Woods", "Anmore", "Belcarra", "Ioco"].map(n => (
              <span key={n} className="location-city-btn">{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why the Tri-Cities Trust CleanInstead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83c\udf32"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Burke Mountain Ready</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>New construction dust and debris are no match for our HEPA-equipped teams and post-build expertise.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\ud83d\udee1"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Insured &amp; Vetted</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Every cleaner passes our 4-step vetting: background check, references, skills test, and insurance verification.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">{"\u2b50"}</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>4.9 Star Rated</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Rated 4.9/5 from 127+ reviews. Our Tri-Cities clients love our reliability and attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Get Your Tri-Cities Cleaning Quote</h2>
          <p className="text-sm mb-8 opacity-80">Instant pricing for homes across Coquitlam, Port Coquitlam, and Port Moody.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
            <Link href="/contact" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>CONTACT US</Link>
          </div>
        </div>
      </section>
    </>
  );
}
