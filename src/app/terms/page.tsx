import { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service & Cancellation Policy | CleanInstead",
  description: "CleanInstead terms of service, cancellation policy, payment terms, and liability information for cleaning services in Surrey & Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Terms of Service</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Service terms, cancellation policy, and payment information</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="space-y-8" style={{ color: "var(--light-text)", fontSize: 16, lineHeight: 1.9 }}>
            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>1. Service Terms</h2>
              <p>CleanInstead provides eco-friendly residential and commercial cleaning services in Metro Vancouver, BC. By booking a cleaning service, you agree to these terms and conditions. All services are subject to availability and confirmation by CleanInstead.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>2. Cancellation Policy</h2>
              <p>We understand that plans change. We ask for at least <strong style={{ color: "var(--text)" }}>24 hours notice</strong> for any cancellations or rescheduling. Cancellations made with less than 24 hours notice may be subject to a cancellation fee equal to 50% of the scheduled service cost.</p>
              <p className="mt-2">To cancel or reschedule, please contact us by phone or email as early as possible.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>3. Pricing</h2>
              <p>All prices are quoted in Canadian Dollars (CAD). Our instant quote calculator provides estimates based on the information you provide. Final pricing may vary based on the actual condition and specific requirements of the space. We will always confirm the final price before beginning any work.</p>
              <p className="mt-2">Frequency discounts (5-15%) are applied automatically to recurring bookings. These discounts cannot be combined with other promotional offers unless stated otherwise.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>4. Payment Terms</h2>
              <p>Payment is due at the time of service completion unless otherwise agreed upon. We accept credit/debit cards, e-transfers, and cash. For commercial clients, invoicing options are available with net-30 terms.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>5. Satisfaction Guarantee</h2>
              <p>We offer a 24-hour &ldquo;Barefoot Guarantee.&rdquo; If you are not completely satisfied with our service, contact us within 24 hours and we will return to address your concerns at no additional cost.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>6. Liability</h2>
              <p>CleanInstead is fully insured for liability and worker&apos;s compensation. While we take the utmost care with your property, we are not responsible for pre-existing damage, items of extraordinary value (jewelry, cash, collectibles), or damage caused by structural deficiencies or pre-existing conditions.</p>
              <p className="mt-2">We recommend securing valuables before each cleaning visit.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>7. Access to Property</h2>
              <p>By booking our service, you authorize CleanInstead staff to access your property at the scheduled time. If access cannot be gained, a call-out fee may apply. Please ensure someone is available to provide access or arrange alternative access in advance.</p>
            </div>

            <div>
              <h2 className="text-2xl mb-4" style={{ color: "var(--primary)" }}>8. Contact</h2>
              <p>For questions about these terms, contact us at:</p>
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
