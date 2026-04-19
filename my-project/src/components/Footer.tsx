import Link from "next/link";
import { footerLinks, companyInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="ci-footer" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Trust Badges Bar */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">{"\ud83d\udee1"}</span>
            <span className="font-semibold">Fully Insured &amp; Bonded</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">{"\u2705"}</span>
            <span className="font-semibold">Background-Checked Pros</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">{"\ud83d\udca0"}</span>
            <span className="font-semibold">100% Satisfaction Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">{"\ud83c\udf31"}</span>
            <span className="font-semibold">Eco-Friendly &amp; Non-Toxic</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">{"\ud83d\udd50"}</span>
            <span className="font-semibold">60-Second Booking</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>CleanInstead</h3>
            <p className="text-sm leading-relaxed opacity-80 mb-5" style={{ maxWidth: 320 }}>
              Premium eco-friendly cleaning services in Surrey &amp; Metro Vancouver, BC. 100% non-toxic, plant-based products for a safe, spotless home.
            </p>
            <div className="space-y-2 text-sm opacity-80">
              <p><a href={`tel:${companyInfo.phoneFull}`} className="hover:opacity-100 transition-opacity">{"\ud83d\udcde"} {companyInfo.phone}</a></p>
              <p><a href={`mailto:${companyInfo.email}`} className="hover:opacity-100 transition-opacity">{"\u2709\ufe0f"} {companyInfo.email}</a></p>
              <p>{"\ud83d\udccd"} {companyInfo.address}</p>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 list-none">
              {footerLinks.services.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 list-none">
              {footerLinks.company.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Hours & Legal Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Business Hours</h4>
            <div className="text-sm opacity-80 space-y-1 mb-5">
              <p>Mon – Fri: 8AM – 6PM</p>
              <p>Saturday: 9AM – 4PM</p>
              <p>Sunday: Closed</p>
            </div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 list-none">
              {footerLinks.legal.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Service Areas */}
        <div className="mb-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Our Service Areas</h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.areas.map(link => (
              <Link key={link.href} href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:underline">{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <p className="text-xs opacity-60">&copy; {new Date().getFullYear()} CleanInstead. All rights reserved.</p>
          <div className="flex gap-4">
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} className="text-xs opacity-60 hover:opacity-100 transition-opacity">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--primary)] p-3 flex gap-2 z-[999]">
        <a href={`tel:${companyInfo.phoneFull}`} className="flex-1 text-center text-white text-sm font-semibold py-2 rounded bg-white/10">
          {"\ud83d\udcde"} Call Now
        </a>
        <Link href="/pricing" className="flex-1 text-center text-[var(--primary)] text-sm font-bold py-2 rounded bg-white">
          GET A QUOTE
        </Link>
      </div>
    </footer>
  );
}
