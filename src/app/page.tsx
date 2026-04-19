"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faqs, trustBadges, testimonials, galleryItems, insteadDiffCards } from "@/lib/data";

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeEcoFaq, setActiveEcoFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section
        className="hero"
        style={{
          backgroundImage:
            "url('/hero-bg.jpg')",
        }}
      >
        <div className="relative z-[2] max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-[60px]">
            <div className="text-left">
              <h1 className="text-5xl md:text-[64px] leading-[1.1] mb-5" style={{ color: "var(--primary)" }}>
                Eco-Friendly Cleaning
                <br />
                in Surrey &amp; Metro Vancouver
              </h1>
              <p className="text-lg md:text-xl mb-6 max-w-[600px]" style={{ color: "var(--light-text)" }}>
                Premium, eco-friendly cleaning services in Surrey, Vancouver, Burnaby, Richmond, and Metro Vancouver, BC. 100% non-toxic, plant-based products for a safe, spotless home.
              </p>
              <div className="flex flex-wrap gap-5 text-sm" style={{ color: "var(--primary)" }}>
                <span className="flex items-center gap-1"><span>&#10003;</span> 100% Non-Toxic</span>
                <span className="flex items-center gap-1"><span>&#10003;</span> Zero Single-Use Plastics</span>
                <span className="flex items-center gap-1"><span>&#10003;</span> Vetted &amp; Insured</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/pricing" className="btn-book-now" style={{ padding: "14px 32px", fontSize: 16 }}>
                  BOOK IN 60 SECONDS
                </Link>
                <Link href="/pricing" className="btn-white hidden sm:inline-block">CHECK PRICING</Link>
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#f0fdf4", color: "var(--primary)", border: "1px solid var(--accent)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Bonded & Insured
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image
                src="/banner-v2.png"
                alt="CleanInstead professional eco-friendly cleaning team serving homes in Surrey BC Canada"
                width={420}
                height={420}
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 60-Second Booking Promise */}
      <section className="py-8 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f0fdf4" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "var(--primary)" }}>The 60-Second Booking Promise</h3>
                <p className="text-sm" style={{ color: "var(--light-text)" }}>Get an instant quote and book your first clean in under one minute. No waiting, no hassle.</p>
              </div>
            </div>
            <Link href="/pricing" className="btn-primary flex-shrink-0" style={{ padding: "12px 28px" }}>GET MY INSTANT QUOTE</Link>
          </div>
        </div>
      </section>

      {/* Service Plans Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4" style={{ color: "var(--primary)" }}>Three Plans for Every Home</h2>
            <p style={{ color: "var(--light-text)", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>From routine maintenance to total turnovers, we have a cleaning plan that fits your home and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ci-card text-center">
              <div className="text-3xl mb-3">{"\ud83c\udfe1"}</div>
              <h3 className="text-xl mb-1" style={{ color: "var(--primary)" }}>Standard Refresh</h3>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>The Essential Refresh</p>
              <div className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>From $145</div>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Weekly or bi-weekly maintenance. Kitchen, bathrooms, floors, dusting.</p>
              <Link href="/services/residential" className="btn-primary text-sm" style={{ padding: "10px 24px" }}>Learn More</Link>
            </div>
            <div className="ci-card text-center" style={{ border: "2px solid var(--primary)" }}>
              <div className="text-3xl mb-3">{"\u2728"}</div>
              <h3 className="text-xl mb-1" style={{ color: "var(--primary)" }}>Deep Shine</h3>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>The Top-to-Bottom Clean</p>
              <div className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>From $245</div>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>First-time or seasonal. Baseboards, appliances, walls, fixtures.</p>
              <Link href="/services/deep-cleaning" className="btn-primary text-sm" style={{ padding: "10px 24px" }}>Learn More</Link>
            </div>
            <div className="ci-card text-center">
              <div className="text-3xl mb-3">{"\ud83d\ude98"}</div>
              <h3 className="text-xl mb-1" style={{ color: "var(--primary)" }}>Move-In / Move-Out</h3>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>The Fresh Start</p>
              <div className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>From $250</div>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>Deposit returns &amp; sale-ready. Cabinets, closets, full turnover.</p>
              <Link href="/services/move-in-out" className="btn-primary text-sm" style={{ padding: "10px 24px" }}>Learn More</Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="btn-primary">VIEW FULL PRICING</Link>
          </div>
        </div>
      </section>

      {/* The Instead Difference */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }} aria-labelledby="instead-difference-heading">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>
            The &quot;Instead&quot; Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {insteadDiffCards.map((card, i) => (
              <div key={i} className="ci-card">
                <h3 className="text-center text-xl mb-4" style={{ color: "var(--primary)" }}>{card.title}</h3>
                <p style={{ color: "var(--light-text)", fontSize: 15 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Eco-Friendly? FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[3px] mb-3" style={{ color: "var(--accent)" }}>Health-Driven Cleaning</p>
            <h2 className="text-4xl mb-4" style={{ color: "var(--primary)" }}>Why Eco-Friendly?</h2>
            <p style={{ color: "var(--light-text)", fontSize: 16, maxWidth: 550, margin: "0 auto", lineHeight: 1.8 }}>Drawing on 30 years of healthcare experience, we know that the products used in your home directly affect your family&apos;s wellbeing. Here are the answers to the questions we hear most often about our green cleaning approach.</p>
          </div>
          <div>
            {[
              {
                q: "Is eco-friendly cleaning actually as effective as traditional chemical cleaning?",
                a: "Yes. Modern green cleaning technologies utilize powerful plant-based surfactants, enzymes, and essential oils to break down grease, grime, and bacteria just as effectively as traditional methods. Natural disinfectants like citric acid and hydrogen peroxide are proven sanitizers that kill 99.9% of germs without leaving behind the toxic residue that chemical cleaners do. Our EPA-registered, hospital-grade products have been rigorously tested to meet the same performance benchmarks as conventional cleaners, so you never have to choose between safety and cleanliness.",
              },
              {
                q: "Why is \"green\" cleaning safer for my children and pets?",
                a: "Infants and pets spend significantly more time on the floor and frequently put their hands or paws in their mouths. Traditional cleaners often leave behind residues of ammonia, bleach, and phthalates that can cause skin rashes, respiratory distress, or even poisoning if ingested. Our non-toxic, plant-based products ensure that every surface your child crawls on or your pet sleeps near is clean and safe for them to explore. We think of it this way: if you wouldn\u2019t want your toddler tasting it, it shouldn\u2019t be on your floors.",
              },
              {
                q: "How does eco-friendly cleaning improve my home\u2019s air quality?",
                a: "Many conventional cleaners release Volatile Organic Compounds (VOCs) into the air, which can trigger asthma, migraines, and long-term lung damage. Studies have compared the effects of prolonged VOC exposure to smoking cigarettes indoors. CleanInstead uses low-to-no VOC products to ensure your family breathes fresh, purified air rather than lingering chemical fumes. After every clean, your home should smell like nothing at all — and that\u2019s exactly the point.",
              },
              {
                q: "Are eco-friendly cleaning services more expensive?",
                a: "While some green products carry a slightly higher upfront cost, they are often more concentrated, requiring less volume to achieve a superior clean. Furthermore, the long-term health benefits — such as reduced triggers for allergies and asthma, fewer sick days, and lower medical expenses — far outweigh any marginal cost difference. We also offer an Eco-Friendly Kit upgrade for clients who want our most premium green-certified products, available as an add-on to any service plan.",
              },
              {
                q: "Does CleanInstead use my products or bring their own?",
                a: "We provide all our own premium, eco-certified supplies to ensure every job meets our rigorous safety and performance standards. Our teams arrive with durable glass bottles, medical-grade microfiber cloths, and a complete toolkit. You never need to provide anything — and you\u2019ll never find single-use plastics or harsh chemicals in our kit.",
              },
              {
                q: "I have a member of my household with chemical sensitivities. Is this right for us?",
                a: "Absolutely. Our services are specifically designed for households with allergies, asthma, or chemical sensitivities. We avoid synthetic fragrances and dyes entirely, which are the most common triggers for respiratory and skin irritation. Many of our clients came to us after struggling with reactions to other cleaning companies\u2019 products, and they report immediate improvements in their symptoms after switching to CleanInstead.",
              },
            ].map((faq, i) => (
              <div key={i} className={activeEcoFaq === i ? "accordion-item active" : "accordion-item"}>
                <div className="accordion-header" onClick={() => setActiveEcoFaq(activeEcoFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="accordion-icon">+</span>
                </div>
                <div className="accordion-body" style={{ maxHeight: activeEcoFaq === i ? 400 : 0 }}>
                  <div className="pb-6" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.8 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/faq" className="btn-primary">MORE FAQS</Link>
            <Link href="/pricing" className="btn-white">GET A QUOTE</Link>
          </div>
        </div>
      </section>

      {/* General FAQ */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading" style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>Common Questions</h2>
          <div className="max-w-[800px] mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className={activeFaq === i ? "accordion-item active" : "accordion-item"}>
                <div className="accordion-header" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="accordion-icon">+</span>
                </div>
                <div className="accordion-body" style={{ maxHeight: activeFaq === i ? 300 : 0 }}>
                  <div className="pb-6" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.8 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/pricing" className="btn-primary">GET A CUSTOM QUOTE</Link>
            <Link href="/faq" className="btn-white">MORE FAQS</Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustBadges.map((badge, i) => (
              <div key={i} className="text-center">
                <span className="text-3xl block mb-2">{badge.icon}</span>
                <p className="text-xs font-semibold" style={{ color: "var(--primary)" }}>{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-6" style={{ color: "var(--primary)" }}>See the Difference</h2>
          <p className="text-center mb-16 max-w-[600px] mx-auto" style={{ color: "var(--light-text)", fontSize: 16 }}>
            Real results from real homes. Our eco-friendly approach delivers visible, lasting cleanliness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {galleryItems.map((item, i) => (
              <div key={i} className="gallery-card">
                <div className="gallery-compare">
                  <div className="gallery-side">
                    <span className="gallery-badge">Before</span>
                    <img src={item.before} alt={`${item.label} before`} className="gallery-img" />
                  </div>
                  <div className="gallery-side">
                    <span className="gallery-badge gallery-badge-after">After</span>
                    <img src={item.after} alt={`${item.label} after`} className="gallery-img" />
                  </div>
                </div>
                <p className="text-center mt-4 font-semibold text-sm" style={{ color: "var(--primary)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-6" style={{ color: "var(--primary)" }}>What Our Clients Say</h2>
          <p className="text-center mb-16 max-w-[600px] mx-auto" style={{ color: "var(--light-text)", fontSize: 16 }}>
            Real feedback from real customers who trust CleanInstead with their homes, offices, and businesses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.slice(0, 3).map((t, i) => (
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
          <div className="text-center mt-12">
            <Link href="/reviews" className="btn-primary">READ ALL REVIEWS</Link>
          </div>
        </div>
      </section>
    </>
  );
}
