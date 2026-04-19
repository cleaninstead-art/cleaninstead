"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cleaningTips, tipCategories, quickTips } from "@/lib/data";

export default function TipsPage() {
  const [selectedTipCategory, setSelectedTipCategory] = useState("All");
  const [selectedTip, setSelectedTip] = useState<(typeof cleaningTips)[0] | null>(null);

  const filteredTips = selectedTipCategory === "All" ? cleaningTips : cleaningTips.filter((t) => t.category === selectedTipCategory);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTip) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedTip]);

  return (
    <>
      {/* Hero */}
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Cleaning Tips &amp; Guides</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Expert advice from our eco-friendly cleaning team</p>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-white mb-3">Quick Tips</h2>
            <p style={{ color: "var(--accent)", fontSize: 16 }}>Fast, practical cleaning hacks from our pros — try them today!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickTips.map((qt, i) => (
              <div key={i} className="quick-tip-card">
                <div className="quick-tip-icon">{qt.icon}</div>
                <h3 className="quick-tip-title">{qt.title}</h3>
                <p className="quick-tip-text">{qt.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--primary)" }}>In-Depth Guides</h2>
            <p style={{ color: "var(--light-text)", fontSize: 16 }}>Dive deeper with our detailed cleaning articles and how-tos</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tipCategories.map(cat => (
              <button key={cat} onClick={() => setSelectedTipCategory(cat)}
                className={`tips-filter cursor-pointer ${selectedTipCategory === cat ? "!bg-[var(--primary)] !text-white !border-[var(--primary)]" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map(tip => (
              <div key={tip.id} className="tip-card" onClick={() => setSelectedTip(tip)}>
                <div className="relative">
                  <img src={tip.image} alt={tip.title} className="tip-card-image" />
                  <span className="tip-card-badge">{tip.category}</span>
                  <div className="tip-card-read-hint">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                </div>
                <div className="tip-card-content">
                  <h3 className="tip-card-title">{tip.title}</h3>
                  <p className="tip-card-excerpt">{tip.excerpt}</p>
                  <div className="tip-card-meta"><span>{tip.date}</span><span>{tip.readTime}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>Ready for a Professional Clean?</h2>
          <p className="text-sm mb-6" style={{ color: "var(--light-text)" }}>Let our expert team handle the cleaning while you enjoy a spotless, eco-friendly home.</p>
          <Link href="/pricing" className="btn-primary">GET YOUR INSTANT QUOTE</Link>
        </div>
      </section>

      {/* ─── Article Modal ─── */}
      {selectedTip && (
        <div className="tip-modal-overlay" onClick={() => setSelectedTip(null)}>
          <div className="tip-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="tip-modal-close" onClick={() => setSelectedTip(null)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {/* Modal Header Image */}
            <div className="tip-modal-hero">
              <img src={selectedTip.image} alt={selectedTip.title} />
              <div className="tip-modal-hero-overlay">
                <span className="tip-modal-badge">{selectedTip.category}</span>
                <h2 className="tip-modal-title">{selectedTip.title}</h2>
                <div className="tip-modal-meta">
                  <span>{selectedTip.date}</span>
                  <span>{selectedTip.readTime}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="tip-modal-body" dangerouslySetInnerHTML={{ __html: selectedTip.content }} />

            {/* Modal Footer */}
            <div className="tip-modal-footer">
              <Link href="/pricing" className="btn-primary" onClick={() => setSelectedTip(null)}>GET YOUR INSTANT QUOTE</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
