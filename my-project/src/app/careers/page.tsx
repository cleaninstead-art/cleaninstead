"use client";

import { useState } from "react";
import Link from "next/link";
import { companyInfo } from "@/lib/data";

export default function CareersPage() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your interest in joining CleanInstead! We'll review your application and get back to you within 3 business days.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Join Our Team</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Build a career in eco-friendly cleaning</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Why Work With CleanInstead?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="ci-card">
              <span className="text-3xl block mb-4">💰</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Competitive Living Wages</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We believe in fair compensation. Our cleaners earn living wages because a respected team delivers exceptional results.</p>
            </div>
            <div className="ci-card">
              <span className="text-3xl block mb-4">🌿</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Eco-Friendly Work Environment</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Work with premium, non-toxic, plant-based products. No harsh chemicals — safe for you and your clients.</p>
            </div>
            <div className="ci-card">
              <span className="text-3xl block mb-4">📅</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Flexible Scheduling</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>We work with your availability. Full-time and part-time positions available across Metro Vancouver.</p>
            </div>
            <div className="ci-card">
              <span className="text-3xl block mb-4">📚</span>
              <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>Ongoing Training</h3>
              <p className="text-sm" style={{ color: "var(--light-text)" }}>Receive continuous professional development in green cleaning techniques, safety protocols, and customer service excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="py-24" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[800px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-16" style={{ color: "var(--primary)" }}>Our 4-Step Vetting Process</h2>
          <p className="text-center text-sm mb-12" style={{ color: "var(--light-text)" }}>Every member of our team goes through the same rigorous process. It&apos;s how we maintain the highest standards.</p>
          {[
            { icon: "🛡️", title: "1. Identity & Criminal Background Check", desc: "We mandate a comprehensive criminal background check for every applicant. No exceptions." },
            { icon: "📋", title: "2. Professional Reference Checks", desc: "We contact past employers regarding attention to detail, reliability, and integrity." },
            { icon: "🧪", title: "3. Eco-Product Skills Assessment", desc: "Cleaners must pass a practical exam demonstrating proficiency with our eco-friendly products and techniques." },
            { icon: "📄", title: "4. Insurance Verification", desc: "Before entering any home, we verify they are fully covered under our comprehensive liability insurance." },
          ].map(step => (
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

      {/* Application Form */}
      <section className="py-24 bg-white">
        <div className="max-w-[600px] mx-auto px-5">
          <h2 className="text-center text-3xl mb-4" style={{ color: "var(--primary)" }}>Apply to Join CleanInstead</h2>
          <p className="text-center text-sm mb-8" style={{ color: "var(--light-text)" }}>Fill out the form below or send your resume directly to <a href={`mailto:${companyInfo.email}`} style={{ color: "var(--primary)" }}>{companyInfo.email}</a></p>
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Full Name *</label>
              <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors" placeholder="Your full name" />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Email *</label>
              <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors" placeholder="your.email@example.com" />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Phone *</label>
              <input type="tel" required value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors" placeholder="604-000-0000" />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Message</label>
              <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={4} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors resize-none" placeholder="Tell us about your experience and why you'd like to join CleanInstead..." />
            </div>
            <button type="submit" className="btn-primary w-full">SUBMIT APPLICATION</button>
          </form>
        </div>
      </section>
    </>
  );
}
