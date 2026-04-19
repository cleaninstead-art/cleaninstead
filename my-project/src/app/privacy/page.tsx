import { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy | CleanInstead",
  description: "CleanInstead privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://cleaninstead.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5 prose-style">
          <div className="space-y-8" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Service address and postal code</li>
                <li>Booking details and cleaning preferences</li>
                <li>Payment information (processed securely by our payment provider)</li>
                <li>Communication records (emails, chat transcripts)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Provide and schedule cleaning services</li>
                <li>Process payments and send invoices</li>
                <li>Communicate with you about your account</li>
                <li>Improve our services and customer experience</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>3. How We Protect Your Information</h2>
              <p>We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit using SSL/TLS and stored securely. We restrict access to personal information to authorized employees who need it to perform their job duties.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>4. Data Retention</h2>
              <p>We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>5. Third-Party Sharing</h2>
              <p>We do not sell your personal information. We may share information with trusted service providers who assist us in operating our business (e.g., payment processing), but only to the extent necessary for them to perform their services.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>7. Contact Us</h2>
              <p>For privacy inquiries, contact us at:</p>
              <p className="mt-2"><strong style={{ color: "var(--text)" }}>Email:</strong> <a href={`mailto:${companyInfo.email}`} style={{ color: "var(--primary)" }}>{companyInfo.email}</a></p>
              <p><strong style={{ color: "var(--text)" }}>Phone:</strong> <a href={`tel:${companyInfo.phoneFull}`} style={{ color: "var(--primary)" }}>{companyInfo.phone}</a></p>
              <p><strong style={{ color: "var(--text)" }}>Address:</strong> {companyInfo.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
