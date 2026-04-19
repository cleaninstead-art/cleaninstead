"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { navLinks, companyInfo } from "@/lib/data";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesOpen = useHoverDropdown();
  const areasOpen = useHoverDropdown();

  const isLoggedIn = !!user;
  const userRole = user?.role;
  const dashboardLink = userRole === "admin"
    ? "/admin"
    : userRole === "cleaner"
    ? "/cleaner-portal"
    : "/my-account";

  const handleSignOut = async () => {
    await logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-fixed" role="banner">
      <div className="max-w-[1200px] mx-auto px-5">
        <nav className="flex justify-between items-center h-[55px]">
          {/* LOGO */}
          <Link href="/" className="flex items-center h-full cursor-pointer">
            <Image
              src="/cleaninstead-logo.png"
              alt="CleanInstead - Premium Eco-Friendly Cleaning Services in Surrey BC"
              width={200}
              height={50}
              className="logo-img"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-5 items-center list-none">
            <li><Link href="/" className="nav-link">Home</Link></li>

            {/* Services Dropdown */}
            <li
              className="relative"
              ref={servicesOpen.containerRef}
              onMouseEnter={() => servicesOpen.setOpen(true)}
              onMouseLeave={() => servicesOpen.setOpen(false)}
            >
              <Link
                href="/services"
                className="nav-link inline-flex items-center gap-1"
              >
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={servicesOpen.isOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </Link>
              <div className="absolute top-full left-0 right-0 h-2" />
              {servicesOpen.isOpen && (
                <div className="dropdown-panel">
                  {navLinks.find(l => l.label === "Services")?.children?.map(c => (
                    <Link key={c.href} href={c.href} className="dropdown-item">
                      {c.label}
                    </Link>
                  )) || []}
                </div>
              )}
            </li>

            <li><Link href="/pricing" className="nav-link">Pricing</Link></li>

            {/* Service Areas Dropdown */}
            <li
              className="relative"
              ref={areasOpen.containerRef}
              onMouseEnter={() => areasOpen.setOpen(true)}
              onMouseLeave={() => areasOpen.setOpen(false)}
            >
              <Link
                href="/locations"
                className="nav-link inline-flex items-center gap-1"
              >
                Service Areas
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={areasOpen.isOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </Link>
              <div className="absolute top-full left-0 right-0 h-2" />
              {areasOpen.isOpen && (
                <div className="dropdown-panel">
                  {navLinks.find(l => l.label === "Service Areas")?.children?.map(c => (
                    <Link key={c.href} href={c.href} className="dropdown-item">
                      {c.label}
                    </Link>
                  )) || []}
                </div>
              )}
            </li>

            <li><Link href="/tips" className="nav-link">Tips</Link></li>
            <li><Link href="/rewards" className="nav-link">Rewards</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>

            {/* Phone */}
            <li className="ml-1">
              <a
                href={`tel:${companyInfo.phoneFull}`}
                className="text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                style={{ textDecoration: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {companyInfo.phone}
              </a>
            </li>

            {/* Auth Links - Desktop */}
            {!loading && !isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/auth/signin"
                    className="nav-link font-semibold !text-[var(--primary)] hover:!text-[var(--accent)]"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all"
                    style={{ backgroundColor: "var(--primary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : !loading && isLoggedIn ? (
              <>
                <li>
                  <Link
                    href={dashboardLink}
                    className="nav-link font-semibold !text-[var(--primary)] hover:!text-[var(--accent)] inline-flex items-center gap-1.5"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {user?.name?.split(" ")[0] || "Account"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="nav-link font-medium !text-gray-500 hover:!text-red-500 bg-transparent border-none cursor-pointer text-sm"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : null}

            {/* BOOK NOW */}
            <li className="ml-1">
              <Link
                href="/pricing"
                className="btn-book-now"
                aria-label="Book your cleaning now"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                BOOK NOW
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[var(--primary)] text-2xl bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "\u2715" : "\u2630"}
          </button>
        </nav>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Home</Link>

            <div className="mobile-nav-group">
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link font-semibold">
                Services
              </Link>
              {navLinks.find(l => l.label === "Services")?.children?.map(c => (
                <Link key={c.href} href={c.href} onClick={() => setMobileMenuOpen(false)} className="mobile-nav-sub">
                  {c.label}
                </Link>
              )) || []}
            </div>

            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Pricing</Link>

            <div className="mobile-nav-group">
              <Link href="/locations" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link font-semibold">
                Service Areas
              </Link>
              {navLinks.find(l => l.label === "Service Areas")?.children?.map(c => (
                <Link key={c.href} href={c.href} onClick={() => setMobileMenuOpen(false)} className="mobile-nav-sub">
                  {c.label}
                </Link>
              )) || []}
            </div>

            <Link href="/tips" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Tips</Link>
            <Link href="/rewards" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Rewards</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Contact</Link>
            <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Reviews</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">FAQ</Link>

            <a href={`tel:${companyInfo.phoneFull}`} className="mobile-nav-link" style={{ color: "var(--primary)" }}>
              &#128222; {companyInfo.phone}
            </a>

            {/* Mobile Auth Links */}
            {!loading && !isLoggedIn ? (
              <>
                <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link font-semibold" style={{ color: "var(--primary)" }}>
                  Login
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold text-white mt-1" style={{ backgroundColor: "var(--primary)" }}>
                  Register
                </Link>
              </>
            ) : !loading && isLoggedIn ? (
              <>
                <Link href={dashboardLink} onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link font-semibold" style={{ color: "var(--primary)" }}>
                  My Account ({user?.name?.split(" ")[0] || "Account"})
                </Link>
                <button
                  onClick={handleSignOut}
                  className="mobile-nav-link font-medium text-red-500 bg-transparent border-none cursor-pointer w-full text-left"
                >
                  Sign Out
                </button>
              </>
            ) : null}

            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="btn-book-now mt-3 w-full text-center block" style={{ justifyContent: "center" }}>
              BOOK NOW
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Custom hook for dropdown hover with invisible bridge ────────────
function useHoverDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setOpen = (open: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (open) {
      setIsOpen(true);
    } else {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    }
  };

  return { isOpen, setOpen, containerRef };
}
