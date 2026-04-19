import { Metadata } from "next";
import Link from "next/link";
import { vettingSteps, companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "About CleanInstead: The Standard of Care Your Home Deserves",
  description: "Founded by a healthcare professional with 30+ years of experience, CleanInstead brings clinical-level detail with eco-friendly heart to homes and businesses in Surrey & Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">About CleanInstead</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>The Standard of Care Your Home Deserves</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-8" style={{ color: "var(--primary)" }}>Our Story</h2>
          <div className="space-y-5" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <p><strong style={{ color: "var(--text)" }}>CLEANINSTEAD</strong> was born from a simple realization: a clean space has the power to restore calm, protect health, and support the people within it.</p>
            <p>Founded by a healthcare professional with over 30 years of experience, we saw a gap in the market for a cleaning service that prioritized clinical-level detail with eco-friendly heart. We understand that for busy families and professionals, cleanliness isn&apos;t just about appearance — it&apos;s about safety, comfort, and the peace of mind that comes from knowing your space is truly sanitized.</p>
            <p>At CleanInstead, we don&apos;t just tidy up. <strong style={{ color: "var(--text)" }}>We clean with purpose. We clean with care. We clean instead.</strong></p>
          </div>
        </div>
      </section>

      {/* Founder's Perspective */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-3xl mb-8" style={{ color: "var(--primary)" }}>The Founder&apos;s Perspective</h2>
          <blockquote className="text-lg italic mb-6 pl-6 border-l-4 border-[var(--accent)]" style={{ color: "var(--text)", lineHeight: 1.8 }}>
            &ldquo;Throughout my 30-year career in nursing and healthcare administration, I&apos;ve seen firsthand how essential a clean environment is to human wellness. I founded CleanInstead because I couldn&apos;t find a service that met my professional standards for sanitization without using harsh, toxic chemicals. I realized that to provide the quality, trust, and health-conscious care my community deserved, I had to build it myself.&rdquo;
          </blockquote>
          <p style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.8 }}>
            By blending a nursing background with non-toxic practices, our founder has built a team trained to see what others miss, ensuring your home is a sanctuary, not just a &ldquo;cleaned&rdquo; space.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Our Core Values</h2>
          {[
            { num: "1", title: "Healthcare-Grade Standards", desc: "We apply the discipline of 30 years in healthcare to every residential and commercial job." },
            { num: "2", title: "Sustainability Without Compromise", desc: "Every product we use is measured against its environmental impact. We prove that a spotless home doesn't have to cost the planet." },
            { num: "3", title: "Radical Transparency", desc: "No hidden fees, no hidden chemicals. We are open about our processes and our pricing." },
            { num: "4", title: "Client Wellbeing", desc: "Your indoor air quality is our priority. We use non-toxic, eco-friendly products that are safe for pets, children, and those with sensitivities." },
            { num: "5", title: "Fair Treatment", desc: "Our cleaners are local Surrey professionals who earn living wages. We believe that a respected team delivers exceptional results." },
            { num: "6", title: "Continuous Innovation", desc: "We invest in the latest green cleaning technologies to stay at the forefront of the sustainable cleaning movement." },
          ].map(val => (
            <div key={val.num} className="value-item">
              <div className="value-number">{val.num}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: "var(--primary)" }}>{val.title}</h3>
                <p className="text-sm" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose CleanInstead */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Choose CleanInstead?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">⏱️</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Professional Discipline</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Arriving on time, in uniform, with a checklist-driven approach. No shortcuts, no surprises.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">🌿</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Eco-Friendly Excellence</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We bring all our own premium, non-toxic supplies. Zero single-use plastics. Safe for your family and the planet.</p>
            </div>
            <div className="ci-card text-center">
              <span className="text-4xl block mb-4">📍</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Surrey Roots</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We are locally owned and operated, supporting watershed conservation and local environmental initiatives right here in BC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-4" style={{ color: "var(--primary)" }}>Meet the Team</h2>
          <p className="text-center text-sm mb-16 max-w-[600px] mx-auto" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
            Behind every spotless home is a dedicated professional who takes pride in their work. Our team members are the heart and soul of CleanInstead, and we believe you deserve to see the faces that care for your home.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Our Founder",
                role: "Owner & Operations Lead",
                bio: "With over 30 years in healthcare, our founder brings clinical discipline and a passion for wellness to every aspect of CleanInstead. She personally trains every team member and oversees quality standards across all service areas.",
              },
              {
                name: "Maria S.",
                role: "Senior Cleaning Specialist",
                bio: "Maria has been with CleanInstead since day one. She leads our residential deep clean team and is known for her meticulous attention to baseboards, light fixtures, and the small details that other companies miss.",
              },
              {
                name: "James T.",
                role: "Move-In/Out Specialist",
                bio: "James specializes in turnover cleans for renters and homeowners. His systematic approach ensures every cabinet, drawer, and appliance is spotless, helping clients get their full deposit back every time.",
              },
            ].map((member) => (
              <div key={member.name} className="ci-card text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: "#f0fdf4", border: "3px solid var(--accent)" }}>
                  <span className="text-4xl">{"\ud83e\uddd1\u200d\ud83e\uddf5"}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--primary)" }}>{member.name}</h3>
                <p className="text-xs font-semibold mb-3" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>{member.role}</p>
                <p className="text-sm" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-xl text-center" style={{ backgroundColor: "#f0fdf4", border: "1px solid var(--accent)" }}>
            <p className="text-sm" style={{ color: "var(--primary)", lineHeight: 1.7 }}>
              <strong>Want to join our team?</strong> We are always looking for reliable, detail-oriented professionals who share our commitment to health and sustainability. Every team member goes through our rigorous 4-step vetting process and receives ongoing training in eco-friendly cleaning techniques.
            </p>
            <Link href="/careers" className="btn-primary inline-block mt-4" style={{ fontSize: 14, padding: "10px 24px" }}>VIEW OPEN POSITIONS</Link>
          </div>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Our 4-Step Vetting Process</h2>
          {vettingSteps.map((step) => (
            <div key={step.title} className="vetting-step">
              <div className="vetting-icon">{step.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: "var(--primary)" }}>{step.title}</h3>
                <p className="text-sm" style={{ color: "var(--light-text)" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Ready to Experience the Difference?</h2>
          <p className="text-sm mb-8 opacity-80">Get your free instant quote and discover why hundreds of Surrey families trust CleanInstead.</p>
          <Link href="/pricing" className="btn-book">GET MY INSTANT QUOTE</Link>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="text-2xl mb-6" style={{ color: "var(--primary)" }}>Get in Touch</h2>
          <div className="space-y-3 text-sm" style={{ color: "var(--light-text)" }}>
            <p>📞 <a href={`tel:${companyInfo.phoneFull}`} className="font-semibold" style={{ color: "var(--primary)" }}>{companyInfo.phone}</a></p>
            <p>✉️ <a href={`mailto:${companyInfo.email}`} className="font-semibold" style={{ color: "var(--primary)" }}>{companyInfo.email}</a></p>
            <p>📍 {companyInfo.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
