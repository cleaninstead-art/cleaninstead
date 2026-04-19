"use client";

import { useState } from "react";

const kitchenItems = [
  "Countertops & backsplash sanitized",
  "Sink scrubbed & polished",
  "Stovetop degreased & wiped",
  "Exterior of appliances wiped",
  "Floors swept & mopped",
];

const bathroomItems = [
  "Tub / shower scrubbed & rinsed",
  "Toilet sanitized inside & out",
  "Vanity & mirror cleaned",
  "Floors swept & mopped",
];

const livingAreaItems = [
  "All surfaces dusted (tables, shelves)",
  "HEPA vacuumed carpets & rugs",
  "Hard floors swept & mopped",
  "Baseboards & light switches wiped",
];

const highTouchItems = [
  "Door handles & knobs",
  "Light switches & plates",
  "Thermostat & alarm panels",
  "Remote controls & electronics",
  "Railings & stair banisters",
  "Faucet handles",
];

const serviceTypes = ["Standard", "Deep Clean", "Move-In / Move-Out"] as const;

export default function CleaningChecklistPage() {
  const [customerName, setCustomerName] = useState("");
  const [serviceDate, setServiceDate] = useState(
    new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [selectedService, setSelectedService] = useState<string>("Standard");
  const [kitchenChecks, setKitchenChecks] = useState<boolean[]>(new Array(kitchenItems.length).fill(false));
  const [bathroomChecks, setBathroomChecks] = useState<boolean[]>(new Array(bathroomItems.length).fill(false));
  const [livingChecks, setLivingChecks] = useState<boolean[]>(new Array(livingAreaItems.length).fill(false));
  const [highTouchChecks, setHighTouchChecks] = useState<boolean[]>(new Array(highTouchItems.length).fill(false));
  const [teamNotes, setTeamNotes] = useState("");

  const toggleCheck = (index: number, section: "kitchen" | "bathroom" | "living" | "hightouch") => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<boolean[]>>> = {
      kitchen: setKitchenChecks,
      bathroom: setBathroomChecks,
      living: setLivingChecks,
      hightouch: setHighTouchChecks,
    };
    setters[section]((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handlePrint = () => window.print();

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
            margin: 0.4in;
            size: portrait;
          }
        }
      `}</style>

      {/* Controls */}
      <div className="no-print" style={{ marginTop: 75, padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif", fontSize: 28, marginBottom: 8 }}>
          Professional Cleaning Checklist
        </h1>
        <p style={{ color: "var(--light-text)", fontSize: 14, marginBottom: 32 }}>
          Fill in the details, check off completed items, then print for your records or to leave with the client.
        </p>
        <button onClick={handlePrint} className="btn-primary" style={{ fontSize: 16, padding: "14px 40px" }}>
          Print Checklist
        </button>
      </div>

      {/* ─── PRINTABLE CHECKLIST ─────────────────────────────── */}
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
          {/* Header */}
          <div
            style={{
              background: "var(--primary)",
              padding: "28px 36px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                padding: "4px 16px",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "var(--font-inter), sans-serif",
                marginBottom: 12,
              }}
            >
              CleanInstead
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 24,
                color: "white",
                margin: 0,
              }}
            >
              Service Report
            </h2>
          </div>

          {/* Customer Info */}
          <div style={{ padding: "24px 36px 16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: 6,
                  }}
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 14,
                    fontFamily: "var(--font-inter), sans-serif",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: 6,
                  }}
                >
                  Date
                </label>
                <input
                  type="text"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 6,
                    fontSize: 14,
                    fontFamily: "var(--font-inter), sans-serif",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 8,
                }}
              >
                Service Type
              </label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {serviceTypes.map((type) => (
                  <label
                    key={type}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 14px",
                      border: "2px solid",
                      borderColor: selectedService === type ? "var(--accent)" : "#e5e7eb",
                      borderRadius: 6,
                      cursor: "pointer",
                      background: selectedService === type ? "#f0fdf4" : "white",
                      fontSize: 13,
                      fontWeight: selectedService === type ? 600 : 400,
                      color: "var(--primary)",
                      fontFamily: "var(--font-inter), sans-serif",
                      transition: "all 0.15s",
                    }}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={type}
                      checked={selectedService === type}
                      onChange={() => setSelectedService(type)}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: selectedService === type ? "var(--primary)" : "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selectedService === type && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--primary)",
                          }}
                        />
                      )}
                    </span>
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#f0f0f0", margin: "0 36px" }} />

          {/* Kitchen Section */}
          <ChecklistSection
            title="Kitchen"
            icon="🍳"
            items={kitchenItems}
            checks={kitchenChecks}
            onToggle={(i) => toggleCheck(i, "kitchen")}
            accent="#f0fdf4"
          />

          <div style={{ height: 1, background: "#f0f0f0", margin: "0 36px" }} />

          {/* Bathrooms Section */}
          <ChecklistSection
            title="Bathrooms"
            icon="🛁"
            items={bathroomItems}
            checks={bathroomChecks}
            onToggle={(i) => toggleCheck(i, "bathroom")}
            accent="#f0f9ff"
          />

          <div style={{ height: 1, background: "#f0f0f0", margin: "0 36px" }} />

          {/* Living Areas Section */}
          <ChecklistSection
            title="Living Areas"
            icon="🛋️"
            items={livingAreaItems}
            checks={livingChecks}
            onToggle={(i) => toggleCheck(i, "living")}
            accent="#fefce8"
          />

          <div style={{ height: 1, background: "#f0f0f0", margin: "0 36px" }} />

          {/* Healthcare Touch */}
          <div style={{ padding: "20px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>🩺</span>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: 17,
                  color: "var(--primary)",
                  margin: 0,
                }}
              >
                The Healthcare Touch
              </h3>
            </div>
            <p
              style={{
                fontSize: 11,
                color: "var(--light-text)",
                marginBottom: 12,
                fontStyle: "italic",
              }}
            >
              Sanitizing high-touch items with EPA-registered, hospital-grade disinfectant
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
              {highTouchItems.map((item, i) => (
                <CheckItem
                  key={item}
                  label={item}
                  checked={highTouchChecks[i]}
                  onToggle={() => toggleCheck(i, "hightouch")}
                />
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: "#f0f0f0", margin: "0 36px" }} />

          {/* Team Notes */}
          <div style={{ padding: "20px 36px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>📝</span>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: 17,
                  color: "var(--primary)",
                  margin: 0,
                }}
              >
                Team Notes
              </h3>
            </div>
            <textarea
              value={teamNotes}
              onChange={(e) => setTeamNotes(e.target.value)}
              placeholder="Areas of concern, special requests, items needing follow-up..."
              rows={3}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1.5px solid #e5e7eb",
                borderRadius: 6,
                fontSize: 13,
                fontFamily: "var(--font-inter), sans-serif",
                outline: "none",
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Footer */}
          <div
            style={{
              background: "#f8faf8",
              borderTop: "1px solid #e5e7eb",
              padding: "16px 36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 10, color: "var(--light-text)" }}>
              CleanInstead &mdash; Healthcare-Grade Eco-Friendly Cleaning
            </span>
            <span style={{ fontSize: 10, color: "var(--light-text)" }}>
              📞 604.497.1001 &nbsp;|&nbsp; info@cleaninstead.com
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Sub-Components ────────────────────────────────────────── */

function ChecklistSection({
  title,
  icon,
  items,
  checks,
  onToggle,
  accent,
}: {
  title: string;
  icon: string;
  items: string[];
  checks: boolean[];
  onToggle: (index: number) => void;
  accent: string;
}) {
  return (
    <div style={{ padding: "20px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: 17,
            color: "var(--primary)",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            background: accent,
            color: "var(--primary)",
            padding: "2px 10px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          {checks.filter(Boolean).length}/{checks.length}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <CheckItem key={item} label={item} checked={checks[i]} onToggle={() => onToggle(i)} />
        ))}
      </div>
    </div>
  );
}

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        borderRadius: 6,
        cursor: "pointer",
        background: checked ? "#f0fdf4" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          border: "2px solid",
          borderColor: checked ? "var(--primary)" : "#ccc",
          background: checked ? "var(--primary)" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span
        style={{
          fontSize: 13,
          color: checked ? "var(--primary)" : "var(--text)",
          fontWeight: checked ? 600 : 400,
          textDecoration: checked ? "none" : "none",
          transition: "color 0.15s",
        }}
      >
        {label}
      </span>
    </label>
  );
}
