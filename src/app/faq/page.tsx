"use client";

import { useState } from "react";
import Link from "next/link";
import { extendedFaqs, faqCategories } from "@/lib/data";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredFaqs = activeCategory === "All"
    ? extendedFaqs
    : extendedFaqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Frequently Asked Questions</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Everything you need to know about CleanInstead</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {faqCategories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setActiveFaq(null); }}
                className={`tips-filter cursor-pointer ${activeCategory === cat ? "!bg-[var(--primary)] !text-white !border-[var(--primary)]" : ""}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div>
            {filteredFaqs.map((faq, i) => (
              <div key={i} className={activeFaq === i ? "accordion-item active" : "accordion-item"}>
                {faq.category && faq.category !== "Services" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1 block">{faq.category}</span>
                )}
                <div className="accordion-header" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="accordion-icon">+</span>
                </div>
                <div className="accordion-body" style={{ maxHeight: activeFaq === i ? 500 : 0 }}>
                  <div className="pb-6" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.8 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Still Have Questions?</h2>
          <p className="text-sm mb-8 opacity-80">Reach out to our team — we&apos;re happy to help!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-book">CONTACT US</Link>
            <Link href="/pricing" className="btn-book" style={{ background: "transparent", color: "white", border: "2px solid white" }}>GET A QUOTE</Link>
          </div>
        </div>
      </section>
    </>
  );
}
