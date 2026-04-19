"use client";

import { useState } from "react";
import { companyInfo } from "@/lib/data";

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Send Us a Message</h2>
              <p className="text-sm mb-8" style={{ color: "var(--light-text)" }}>Fill out the form below and we&apos;ll respond within 24 hours. For urgent inquiries, please call us directly.</p>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Name *</label>
                  <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Email *</label>
                  <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Phone</label>
                  <input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors" placeholder="604-000-0000" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-sm" style={{ color: "var(--primary)" }}>Message *</label>
                  <textarea required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={5} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--primary)] transition-colors resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="btn-primary">SEND MESSAGE</button>
              </form>
            </div>

            {/* Contact Info + Map */}
            <div>
              <div className="contact-info-card mb-8">
                <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>Phone</p>
                      <a href={`tel:${companyInfo.phoneFull}`} className="text-sm" style={{ color: "var(--light-text)" }}>{companyInfo.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>Email</p>
                      <a href={`mailto:${companyInfo.email}`} className="text-sm" style={{ color: "var(--light-text)" }}>{companyInfo.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>Office Address</p>
                      <p className="text-sm" style={{ color: "var(--light-text)" }}>{companyInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--primary)" }}>Business Hours</p>
                      <div className="text-sm" style={{ color: "var(--light-text)" }}>
                        <p>Monday – Friday: 8AM – 6PM</p>
                        <p>Saturday: 9AM – 4PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-xl overflow-hidden shadow-lg" style={{ height: "350px", position: "relative" }}>
                <iframe
                  src={companyInfo.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CleanInstead Office Location - Surrey BC"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
