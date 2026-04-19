"use client";

import { useState } from "react";

export default function WelcomeHomeNotePage() {
  const [cleanerName, setCleanerName] = useState("");
  const [serviceFocus, setServiceFocus] = useState("");

  const handlePrint = () => window.print();

  const today = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          @page {
            margin: 0.5in;
            size: portrait;
          }
        }
      `}</style>

      <div className="no-print" style={{ marginTop: 75, padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif", fontSize: 28, marginBottom: 8 }}>
          Welcome Home Note
        </h1>
        <p style={{ color: "var(--light-text)", fontSize: 14, marginBottom: 32 }}>
          Fill in the details below, then print this card to leave for your client.
        </p>

        <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--primary)", marginBottom: 6 }}>
              Cleaned With Purpose By:
            </label>
            <input
              type="text"
              value={cleanerName}
              onChange={(e) => setCleanerName(e.target.value)}
              placeholder="e.g., Maria S."
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "2px solid var(--accent)",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "var(--font-inter), sans-serif",
                outline: "none",
              }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--primary)", marginBottom: 6 }}>
              Today&apos;s Focus:
            </label>
            <input
              type="text"
              value={serviceFocus}
              onChange={(e) => setServiceFocus(e.target.value)}
              placeholder="e.g., Deep Kitchen Refresh / Pet-Hair Free Living Area"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "2px solid var(--accent)",
                borderRadius: 6,
                fontSize: 14,
                fontFamily: "var(--font-inter), sans-serif",
                outline: "none",
              }}
            />
          </div>
        </div>

        <button onClick={handlePrint} className="btn-primary" style={{ fontSize: 16, padding: "14px 40px" }}>
          Print Welcome Note
        </button>
      </div>

      {/* ─── PRINTABLE FRONT SIDE ─────────────────────────────── */}
      <div className="print-area" style={{ padding: "20px 16px", maxWidth: 700, margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Front Side */}
          <div style={{ padding: "48px 40px", textAlign: "center" }}>
            {/* Branding */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "var(--primary)",
                  color: "white",
                  padding: "6px 20px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                CleanInstead
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--light-text)",
                  marginTop: 6,
                  letterSpacing: "1px",
                }}
              >
                Healthcare-Grade Eco-Friendly Cleaning
              </p>
            </div>

            {/* Decorative Leaf */}
            <div style={{ fontSize: 40, marginBottom: 16 }}>🌿</div>

            {/* Main Heading */}
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 28,
                color: "var(--primary)",
                marginBottom: 12,
                lineHeight: 1.3,
              }}
            >
              Welcome Home to a
              <br />
              Spotless Sanctuary!
            </h2>

            <p
              style={{
                fontSize: 15,
                color: "var(--light-text)",
                lineHeight: 1.7,
                maxWidth: 420,
                margin: "0 auto 32px",
              }}
            >
              We&apos;ve handled the dirty work so you can simply relax.
            </p>

            {/* Divider */}
            <div
              style={{
                width: 60,
                height: 3,
                background: "var(--accent)",
                margin: "0 auto 32px",
                borderRadius: 2,
              }}
            />

            {/* Details */}
            <div style={{ textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Cleaned With Purpose By
                </span>
                <span style={{ fontSize: 15, color: "var(--text)", fontWeight: 600 }}>
                  {cleanerName || "________________"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Today&apos;s Focus
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--text)",
                    fontWeight: 500,
                    maxWidth: 220,
                    textAlign: "right",
                  }}
                >
                  {serviceFocus || "________________"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Date
                </span>
                <span style={{ fontSize: 14, color: "var(--text)" }}>{today}</span>
              </div>
            </div>

            {/* Footer message */}
            <p
              style={{
                fontSize: 11,
                color: "#999",
                marginTop: 32,
                fontStyle: "italic",
              }}
            >
              Cleaned with 100% plant-based, non-toxic products.
              <br />
              Safe for your family, pets, and the planet. 🌱
            </p>
          </div>

          {/* Back Side */}
          <div
            style={{
              background: "#f0fdf4",
              borderTop: "2px solid var(--accent)",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 20,
                color: "var(--primary)",
                marginBottom: 8,
              }}
            >
              Did we hit our 5-star
              <br />
              healthcare standard today?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--light-text)",
                marginBottom: 20,
              }}
            >
              Your feedback helps us grow. Scan or visit to share your experience.
            </p>

            {/* QR Code Placeholder - Review */}
            <div
              style={{
                width: 80,
                height: 80,
                background: "white",
                border: "2px solid var(--accent)",
                borderRadius: 10,
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" rx="0.5" />
                <rect x="18" y="14" width="3" height="3" rx="0.5" />
                <rect x="14" y="18" width="3" height="3" rx="0.5" />
                <rect x="18" y="18" width="3" height="3" rx="0.5" />
                <rect x="5" y="5" width="3" height="3" rx="0.5" />
                <rect x="16" y="5" width="3" height="3" rx="0.5" />
                <rect x="5" y="16" width="3" height="3" rx="0.5" />
              </svg>
              <span style={{ fontSize: 7, color: "var(--light-text)" }}>Scan to Review</span>
            </div>

            {/* QR Code Placeholder - Referral */}
            <div
              style={{
                width: 80,
                height: 80,
                background: "white",
                border: "2px solid #fed7aa",
                borderRadius: 10,
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e8740c" strokeWidth="1.5">
                <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14v3M20 14v3M17 20h3M20 17h-3" />
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="16" y="5" width="3" height="3" rx="0.5" />
                <rect x="5" y="16" width="3" height="3" rx="0.5" />
              </svg>
              <span style={{ fontSize: 7, color: "#e8740c", fontWeight: 600 }}>Scan: Give $25 Off!</span>
            </div>

            {/* Promo Codes */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "0 auto 20px", flexWrap: "wrap" }}>
              <div
                style={{
                  background: "white",
                  border: "2px dashed var(--accent)",
                  borderRadius: 10,
                  padding: "10px 16px",
                  flex: "1 1 140px",
                  maxWidth: 180,
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 10, color: "var(--light-text)", marginBottom: 2 }}>
                  <strong style={{ color: "var(--primary)" }}>10% off</strong> next clean
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--primary)",
                    letterSpacing: "2px",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  LOYALTY10
                </p>
              </div>
              <div
                style={{
                  background: "white",
                  border: "2px dashed #fed7aa",
                  borderRadius: 10,
                  padding: "10px 16px",
                  flex: "1 1 140px",
                  maxWidth: 180,
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 10, color: "var(--light-text)", marginBottom: 2 }}>
                  <strong style={{ color: "#e8740c" }}>$25 off</strong> for friends
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#e8740c",
                    letterSpacing: "2px",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  REFER25
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ fontSize: 11, color: "var(--light-text)", lineHeight: 1.8 }}>
              <p>
                📞 <a href="tel:+16044971001" style={{ color: "var(--primary)", fontWeight: 600 }}>604.497.1001</a>
                {" "}&nbsp;|&nbsp;{" "}
                ✉️ <a href="mailto:info@cleaninstead.com" style={{ color: "var(--primary)", fontWeight: 600 }}>info@cleaninstead.com</a>
              </p>
              <p>📍 Unit 105A - 14914 104 Ave., Surrey BC V3R 1M7</p>
              <p style={{ marginTop: 8, fontWeight: 600, color: "var(--primary)" }}>
                cleaninstead.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
