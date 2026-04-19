"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── Refined Pricing Data (Market-Aligned for Surrey/Metro Vancouver) ──
const flatRates = [
  {
    size: "1-2 Bedrooms",
    detail: "Studio, 1 Bed, or 2 Bed / 1-2 Bath",
    standard: { min: 145, max: 180 },
    deep: { min: 245, max: 330 },
    moveInOut: { min: 250, max: 350 },
  },
  {
    size: "3 Bedrooms",
    detail: "3 Bed / 2-3 Bath",
    standard: { min: 185, max: 240 },
    deep: { min: 285, max: 390 },
    moveInOut: { min: 320, max: 450 },
  },
  {
    size: "4+ Bedrooms",
    detail: "4+ Bed / 3+ Bath",
    standard: { min: 235, max: 310 },
    deep: { min: 335, max: 460 },
    moveInOut: { min: 400, max: 550 },
  },
];

const addons = [
  { id: "fridge", label: "Inside Fridge", desc: "Complete interior clean including shelves, drawers, and freezer", price: 35, icon: "\ud83e\uddca" },
  { id: "oven", label: "Inside Oven", desc: "Racks, door, interior, and range hood degreased", price: 45, icon: "\ud83d\udd25" },
  { id: "windows", label: "Interior Windows", desc: "Glass, frames, and screens per pane", priceFrom: 7, priceMax: 10, icon: "\ud83d\udcf1" },
  { id: "pet", label: "Pet Hair Heavy Treatment", desc: "High-intensity vacuuming for homes with shedding pets", price: 40, icon: "\ud83d\udc3e" },
  { id: "ecokit", label: "Eco-Friendly Kit Upgrade", desc: "Premium green-certified, non-toxic products used throughout", percentage: 10, icon: "\ud83c\udf31" },
  { id: "basement", label: "Finished Basement", desc: "Full clean of finished basement living areas", price: 90, icon: "\ud83c\udfe0" },
  { id: "laundry", label: "Load of Laundry", desc: "Wash, dry, and fold one full load", price: 25, icon: "\ud83e\udfba" },
  { id: "cabinets", label: "Inside Cabinets", desc: "Clean and wipe interior of kitchen or bathroom cabinets", price: 45, icon: "\ud83d\uddc2" },
];

const frequencyDiscounts = [
  { label: "One-Time", value: 0, badge: "", desc: "Perfect for first-time or occasional cleans" },
  { label: "Monthly", value: 0.1, badge: "10% OFF", desc: "Consistent monthly cleanings" },
  { label: "Bi-Weekly", value: 0.15, badge: "MOST POPULAR", desc: "Most popular \u2014 great balance of value and freshness" },
  { label: "Weekly", value: 0.2, badge: "20% OFF", desc: "Maximum savings for busy households" },
];

const hourlyRates = [
  { type: "Standard Rate", rate: "$30 \u2013 $55", desc: "Per hour per cleaner. Ideal for custom tasks and first-time visits.", note: "" },
  { type: "Deep / Specialty Rate", rate: "$50 \u2013 $80", desc: "Post-construction, biohazard, or heavy-duty jobs.", note: "" },
  { type: "Minimum Booking", rate: "3 Hours", desc: "Covers travel and setup costs.", note: "Applies to all hourly bookings" },
];

type ServiceType = "standard" | "deep" | "moveInOut";

export default function PricingPage() {
  const [homeSize, setHomeSize] = useState(0);
  const [serviceType, setServiceType] = useState<ServiceType>("standard");
  const [frequency, setFrequency] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [ecoKit, setEcoKit] = useState(false);

  // ─── Area Analyzer State ─────────────────────────────────
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [analyzerImage, setAnalyzerImage] = useState<string | null>(null);
  const [analyzerResult, setAnalyzerResult] = useState<{
    roomType: string;
    estimatedSqFt: number;
    estimatedWidth: number;
    estimatedLength: number;
    estimatedBedrooms: number;
    homeSizeCategory: string;
    confidence: string;
    notes: string;
  } | null>(null);
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [analyzerError, setAnalyzerError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAreaAnalyze = async (file: File) => {
    setAnalyzerLoading(true);
    setAnalyzerError(null);
    setAnalyzerResult(null);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setAnalyzerImage(e.target?.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/analyze-area", { method: "POST", body: formData });
      const data = await res.json();

      if (data.error) {
        setAnalyzerError(data.error);
      } else if (data.analysis) {
        setAnalyzerResult(data.analysis);
        // Auto-select the home size based on AI result
        const categoryMap: Record<string, number> = { "1-2 Bedrooms": 0, "3 Bedrooms": 1, "4+ Bedrooms": 2 };
        const idx = categoryMap[data.analysis.homeSizeCategory];
        if (idx !== undefined) setHomeSize(idx);
      } else {
        setAnalyzerError("Could not analyze the image. Please try a clearer photo.");
      }
    } catch {
      setAnalyzerError("Network error. Please check your connection and try again.");
    } finally {
      setAnalyzerLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleAreaAnalyze(file);
  };

  const resetAnalyzer = () => {
    setAnalyzerImage(null);
    setAnalyzerResult(null);
    setAnalyzerError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Quote Calculation ─────────────────────────────────
  const rate = flatRates[homeSize][serviceType];
  const basePrice = (rate.min + rate.max) / 2;
  const addonTotal = addons
    .filter(a => selectedAddons.has(a.id) && a.priceFrom === undefined && a.id !== "ecokit")
    .reduce((sum, a) => sum + (a.price || 0), 0);
  const ecoSurcharge = ecoKit ? basePrice * 0.1 : 0;
  const subtotal = basePrice + addonTotal + ecoSurcharge;
  const discount = subtotal * frequency;
  const total = subtotal - discount;
  const discountLabel = frequency > 0 ? frequencyDiscounts.find(f => f.value === frequency)?.label : "";

  const toggleAddon = (id: string) => {
    if (id === "ecokit") {
      setEcoKit(prev => !prev);
      return;
    }
    setSelectedAddons(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Transparent Cleaning Prices in Surrey &amp; Metro Vancouver
          </h1>
          <p className="mb-6" style={{ color: "var(--accent)", fontSize: 18 }}>
            No hidden fees. No surprises. Just honest, flat-rate pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#95D5B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Get a quote in 60 seconds
            </span>
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#95D5B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              100% Satisfaction Guarantee
            </span>
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#95D5B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              No hidden fees ever
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* INSTANT QUOTE CALCULATOR */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--primary)" }}>
              Get Your Instant Quote
            </h2>
            <p style={{ color: "var(--light-text)", fontSize: 16 }}>
              Choose your home size, service type, and frequency to see your estimated price in seconds.
            </p>
          </div>

          {/* 60-Second Booking Promise Bar */}
          <div className="flex items-center justify-center gap-3 mb-12 px-6 py-3 rounded-full mx-auto" style={{ maxWidth: 600, backgroundColor: "#f0fdf4", border: "1px solid var(--accent)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
              The 60-Second Booking Promise: Get a quote and book your first clean in under one minute.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">

            {/* ─── Left: Config Form ─── */}
            <div>
              {/* Step 1: Home Size */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "var(--primary)" }}>1</span>
                  <h3 className="font-semibold" style={{ color: "var(--primary)" }}>Select Your Home Size</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {flatRates.map((tier, i) => (
                    <button
                      key={i}
                      onClick={() => setHomeSize(i)}
                      className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        homeSize === i
                          ? "border-[var(--primary)] bg-[#f0fdf4]"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span className="block text-base font-bold mb-1" style={{ color: homeSize === i ? "var(--primary)" : "var(--text)" }}>
                        {tier.size}
                      </span>
                      <span className="block text-xs" style={{ color: "var(--light-text)" }}>
                        {tier.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Analyzer - Photo Upload */}
              <div className="mb-8">
                <button
                  onClick={() => { setShowAnalyzer(!showAnalyzer); if (showAnalyzer) resetAnalyzer(); }}
                  className="flex items-center gap-2 mb-3 text-sm font-medium cursor-pointer group"
                  style={{ color: "var(--primary)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <span>Not sure about your home size? Take a photo to find out</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${showAnalyzer ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9"/></svg>
                </button>

                {showAnalyzer && (
                  <div className="area-analyzer-panel p-5 rounded-xl" style={{ border: "2px dashed var(--accent)", backgroundColor: "#f0fdf4" }}>
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Upload Section */}
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-3" style={{ color: "var(--primary)" }}>
                          Upload or take a photo of your space
                        </p>
                        <p className="text-xs mb-4" style={{ color: "var(--light-text)" }}>
                          Our AI will analyze the photo to estimate your room size and recommend the right pricing tier.
                        </p>

                        {!analyzerImage ? (
                          <div className="flex flex-wrap gap-3">
                            <label className="area-analyzer-btn cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "var(--primary)" }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                              Upload Photo
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                            <label className="area-analyzer-btn cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: "white", border: "2px solid var(--primary)", color: "var(--primary)" }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                              Take Photo
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="relative">
                            <img src={analyzerImage} alt="Uploaded space" className="w-full max-h-[200px] object-cover rounded-lg" />
                            <button
                              onClick={resetAnalyzer}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center text-xs hover:bg-black/70 cursor-pointer"
                            >
                              &#10005;
                            </button>
                          </div>
                        )}

                        {analyzerLoading && (
                          <div className="mt-4 flex items-center gap-2">
                            <div className="analyzer-spinner" />
                            <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>Analyzing your space...</span>
                          </div>
                        )}

                        {analyzerError && (
                          <p className="mt-3 text-xs text-red-600 font-medium">{analyzerError}</p>
                        )}
                      </div>

                      {/* Results Section */}
                      {analyzerResult && (
                        <div className="flex-1 area-result-card p-4 rounded-lg bg-white" style={{ border: "1px solid var(--accent)" }}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">{"\u2705"}</span>
                            <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>AI Estimate</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              analyzerResult.confidence === "high" ? "bg-green-100 text-green-700" :
                              analyzerResult.confidence === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-orange-100 text-orange-700"
                            }`}>
                              {analyzerResult.confidence} confidence
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span style={{ color: "var(--light-text)" }}>Room Type</span>
                              <span className="font-semibold" style={{ color: "var(--primary)" }}>{analyzerResult.roomType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: "var(--light-text)" }}>Est. Size</span>
                              <span className="font-bold" style={{ color: "var(--primary)" }}>{analyzerResult.estimatedSqFt} sq ft</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: "var(--light-text)" }}>Est. Dimensions</span>
                              <span className="font-semibold" style={{ color: "var(--primary)" }}>{analyzerResult.estimatedWidth}&apos; x {analyzerResult.estimatedLength}&apos;</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: "var(--light-text)" }}>Est. Bedrooms</span>
                              <span className="font-semibold" style={{ color: "var(--primary)" }}>{analyzerResult.estimatedBedrooms}</span>
                            </div>
                            <hr style={{ borderColor: "#e5e7eb" }} />
                            <div className="flex justify-between items-center">
                              <span style={{ color: "var(--light-text)" }}>Recommended</span>
                              <span className="font-bold px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: "var(--primary)" }}>
                                {analyzerResult.homeSizeCategory}
                              </span>
                            </div>
                          </div>
                          {analyzerResult.notes && (
                            <p className="mt-2 text-xs italic" style={{ color: "var(--light-text)" }}>{analyzerResult.notes}</p>
                          )}
                          <p className="mt-2 text-[10px]" style={{ color: "#999" }}>
                            * Estimates are approximate. Final price confirmed during booking.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Service Type */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "var(--primary)" }}>2</span>
                  <h3 className="font-semibold" style={{ color: "var(--primary)" }}>Choose Your Service</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {([
                    { key: "standard" as ServiceType, label: "Standard Refresh", sub: "The Essential Refresh", desc: "Recurring maintenance for busy families", badge: "", bestFor: "Weekly or bi-weekly reset" },
                    { key: "deep" as ServiceType, label: "Deep Shine", sub: "Top-to-Bottom Clean", desc: "First-time clients or 3+ months since last pro clean", badge: "POPULAR", bestFor: "The 80/20 reset for your home" },
                    { key: "moveInOut" as ServiceType, label: "Move-In / Move-Out", sub: "The Fresh Start", desc: "Deposit returns & sale-ready homes", badge: "", bestFor: "Renters & homeowners" },
                  ]).map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setServiceType(opt.key)}
                      className={`relative p-5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        serviceType === opt.key
                          ? "border-[var(--primary)] bg-[#f0fdf4]"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {opt.badge && (
                        <span className="absolute -top-2 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--accent)", color: "var(--primary)" }}>
                          {opt.badge}
                        </span>
                      )}
                      <span className="block text-sm font-bold mb-0.5" style={{ color: serviceType === opt.key ? "var(--primary)" : "var(--text)" }}>
                        {opt.label}
                      </span>
                      <span className="block text-[11px] font-medium mb-2" style={{ color: "var(--accent)", opacity: serviceType === opt.key ? 1 : 0.6 }}>
                        {opt.sub}
                      </span>
                      <span className="block text-xs" style={{ color: "var(--light-text)" }}>{opt.desc}</span>
                      <span className="block text-[11px] mt-2 font-medium" style={{ color: serviceType === opt.key ? "var(--primary)" : "#999" }}>
                        Best for: {opt.bestFor}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Service details based on type */}
                {serviceType === "standard" && (
                  <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ color: "var(--light-text)", backgroundColor: "#f8faf8" }}>
                    <strong style={{ color: "var(--primary)" }}>Includes:</strong> Dusting all reachable surfaces, vacuuming/mopping floors, sanitizing kitchen counters &amp; appliances (exterior), and thorough bathroom disinfection. Focuses on the 20% of your home that gets 80% of daily use.
                  </div>
                )}
                {serviceType === "deep" && (
                  <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ color: "var(--light-text)", backgroundColor: "#f8faf8" }}>
                    <strong style={{ color: "var(--primary)" }}>Includes everything in Standard, PLUS:</strong> Wiping down baseboards, cleaning inside the microwave, dusting ceiling fans &amp; light fixtures, spot-washing walls, inside oven &amp; fridge, and cleaning window sills &amp; tracks. The &ldquo;reset button&rdquo; for your home.
                  </div>
                )}
                {serviceType === "moveInOut" && (
                  <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ color: "var(--light-text)", backgroundColor: "#f8faf8" }}>
                    <strong style={{ color: "var(--primary)" }}>Includes everything in Deep Clean, PLUS:</strong> Cleaning inside all empty cabinets, drawers, and closets. Detailed appliance cleaning (oven, fridge, dishwasher). Final walkthrough inspection. Also available at <strong>$0.15 &ndash; $0.25 per sq. ft.</strong> for larger spaces.
                  </div>
                )}
              </div>

              {/* Step 3: Frequency */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "var(--primary)" }}>3</span>
                  <h3 className="font-semibold" style={{ color: "var(--primary)" }}>Cleaning Frequency</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {frequencyDiscounts.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => setFrequency(opt.value)}
                      className={`relative p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                        frequency === opt.value
                          ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {opt.badge && (
                        <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                          frequency === opt.value
                            ? "bg-[var(--accent)] text-[var(--primary)]"
                            : "bg-[#f0fdf4] text-[var(--primary)]"
                        }`}>
                          {opt.badge}
                        </span>
                      )}
                      <span className="block text-sm font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: "var(--light-text)" }}>
                  {frequencyDiscounts.find(f => f.value === frequency)?.desc}
                </p>
              </div>

              {/* Step 4: Add-Ons */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "var(--primary)" }}>4</span>
                  <h3 className="font-semibold" style={{ color: "var(--primary)" }}>Add-Ons <span className="font-normal text-xs" style={{ color: "var(--light-text)" }}>(optional)</span></h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {addons.map(addon => {
                    const isChecked = addon.id === "ecokit" ? ecoKit : selectedAddons.has(addon.id);
                    const priceLabel = addon.percentage
                      ? `+${addon.percentage}%`
                      : addon.priceFrom !== undefined
                        ? `$${addon.priceFrom}+ / pane`
                        : `+$${addon.price}`;
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isChecked
                            ? "border-[var(--primary)] bg-[#f0fdf4]"
                            : "border-gray-100 hover:border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-0.5 w-5 h-5 accent-[#1B4332] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block text-sm font-medium" style={{ color: "var(--text)" }}>
                            {addon.icon} {addon.label}
                          </span>
                          <span className="block text-xs" style={{ color: "var(--light-text)" }}>{addon.desc}</span>
                        </div>
                        <span className="text-sm font-bold flex-shrink-0" style={{ color: "var(--primary)" }}>
                          {priceLabel}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ─── Right: Quote Summary ─── */}
            <div className="quote-box rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>
                Your Estimate
              </h3>

              {/* Price Display */}
              <div className="text-center mb-6 pb-6" style={{ borderBottom: "1px solid rgba(27,67,50,0.15)" }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--primary)", opacity: 0.7 }}>
                  {serviceType === "standard" ? "Standard Refresh" : serviceType === "deep" ? "Deep Shine" : "Move-In / Move-Out"}
                  {discountLabel ? ` \u2014 ${discountLabel}` : ""}
                </div>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold" style={{ color: "var(--primary)" }}>
                    ${Math.round(total)}
                  </span>
                  <span className="text-sm" style={{ color: "var(--primary)", opacity: 0.7 }}>est.</span>
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--primary)", opacity: 0.6 }}>
                  Range: ${Math.round(rate.min)} \u2013 ${Math.round(rate.max)}
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "rgba(27,67,50,0.7)" }}>
                    {flatRates[homeSize].size}
                  </span>
                  <span style={{ color: "var(--primary)" }}>
                    ${rate.min} \u2013 ${rate.max}
                  </span>
                </div>

                {addonTotal > 0 && (
                  <div className="flex justify-between">
                    <span style={{ color: "rgba(27,67,50,0.7)" }}>
                      Add-Ons ({selectedAddons.size})
                    </span>
                    <span style={{ color: "var(--primary)" }}>+${addonTotal}</span>
                  </div>
                )}

                {ecoSurcharge > 0 && (
                  <div className="flex justify-between">
                    <span style={{ color: "rgba(27,67,50,0.7)" }}>
                      Eco-Friendly Kit (+10%)
                    </span>
                    <span style={{ color: "var(--primary)" }}>+${Math.round(ecoSurcharge)}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between font-semibold">
                    <span style={{ color: "#2d6a4f" }}>
                      {discountLabel} Discount
                    </span>
                    <span style={{ color: "#2d6a4f" }}>
                      -${Math.round(discount)}
                    </span>
                  </div>
                )}

                <hr style={{ borderColor: "rgba(27,67,50,0.1)" }} />

                <div className="flex justify-between items-baseline">
                  <span className="font-bold" style={{ color: "var(--primary)" }}>Your Estimate</span>
                  <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
                    ${Math.round(total)}
                  </span>
                </div>
              </div>

              <p className="text-xs mb-5 text-center" style={{ color: "rgba(27,67,50,0.6)", lineHeight: 1.6 }}>
                Estimates based on home size. Final price confirmed before booking. No hidden fees.
              </p>

              <Link
                href="/contact"
                className="btn-primary block text-center w-full"
                style={{ fontSize: 15, padding: "14px 24px" }}
              >
                BOOK THIS CLEAN
              </Link>

              <p className="text-center text-xs mt-3" style={{ color: "rgba(27,67,50,0.5)" }}>
                or call <a href="tel:+16044971001" className="font-semibold underline" style={{ color: "var(--primary)" }}>604.497.1001</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* THREE SERVICE TIERS */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--primary)" }}>
              Three Plans for Every Need
            </h2>
            <p style={{ color: "var(--light-text)", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
              From routine maintenance to total turnovers, we have a plan that fits your home and your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Refresh */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center relative">
              <div className="text-4xl mb-4">{"\ud83c\udfe1"}</div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>
                Standard Refresh
              </h3>
              <p className="text-xs font-semibold mb-4" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
                The Essential Refresh
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>
                Best for busy families in Surrey and surrounding areas who need a weekly or bi-weekly reset. Focuses on the 20% of your home that gets 80% of the use.
              </p>
              <div className="mb-6">
                <span className="text-xs" style={{ color: "var(--light-text)" }}>Starting at</span>
                <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>$145</div>
              </div>
              <ul className="text-left text-sm space-y-2 mb-6" style={{ color: "var(--light-text)" }}>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Dusting all reachable surfaces</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Vacuuming &amp; mopping all floors</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Kitchen sanitizing (counters, sink, stovetop)</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Bathroom disinfection (tub, toilet, vanity)</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Trash &amp; compostable liners</li>
              </ul>
              <Link href="/services/residential" className="btn-primary block text-center w-full">LEARN MORE</Link>
            </div>

            {/* Deep Shine */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 text-center relative" style={{ borderColor: "var(--primary)" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-4 py-1 rounded-full text-white" style={{ backgroundColor: "var(--primary)" }}>
                MOST POPULAR
              </div>
              <div className="text-4xl mb-4">{"\u2728"}</div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>
                Deep Shine
              </h3>
              <p className="text-xs font-semibold mb-4" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
                The Top-to-Bottom Clean
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>
                The &ldquo;reset button&rdquo; for your home. Perfect for first-time clients or homes that haven&apos;t been professionally cleaned in 3+ months.
              </p>
              <div className="mb-6">
                <span className="text-xs" style={{ color: "var(--light-text)" }}>Standard Rate + $100 &ndash; $150</span>
                <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>$245+</div>
              </div>
              <ul className="text-left text-sm space-y-2 mb-6" style={{ color: "var(--light-text)" }}>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> <strong>Everything in Standard</strong></li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Baseboards &amp; door frames</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Inside microwave &amp; oven</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Ceiling fans &amp; light fixtures</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Wall spot-washing &amp; window sills</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Inside cabinets (kitchen &amp; bath)</li>
              </ul>
              <Link href="/services/deep-cleaning" className="btn-primary block text-center w-full">LEARN MORE</Link>
            </div>

            {/* Move-In / Move-Out */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center relative">
              <div className="text-4xl mb-4">{"\ud83d\ude98"}</div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>
                Move-In / Move-Out
              </h3>
              <p className="text-xs font-semibold mb-4" style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
                The Fresh Start
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>
                Perfect for renters seeking deposit returns and homeowners preparing for a sale. A comprehensive total turnover clean.
              </p>
              <div className="mb-6">
                <span className="text-xs" style={{ color: "var(--light-text)" }}>Starting at $250 or $0.15/sq ft</span>
                <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>$250+</div>
              </div>
              <ul className="text-left text-sm space-y-2 mb-6" style={{ color: "var(--light-text)" }}>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> <strong>Everything in Deep Clean</strong></li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Inside all cabinets &amp; closets</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Inside all drawers</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Detailed appliance cleaning</li>
                <li className="flex items-start gap-2"><span style={{ color: "var(--primary)", fontWeight: "bold" }}>{"\u2713"}</span> Final walkthrough inspection</li>
              </ul>
              <Link href="/services/move-in-out" className="btn-primary block text-center w-full">LEARN MORE</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FLAT-RATE PRICE TABLE */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--primary)" }}>
              Flat-Rate Price List
            </h2>
            <p style={{ color: "var(--light-text)", fontSize: 16 }}>
              All prices in CAD. Standard maintenance pricing for homes in good condition. Includes kitchen, bathrooms, bedrooms, and common areas.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
            <table className="w-full min-w-[600px]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--primary)" }}>
                  <th className="text-left px-6 py-4 text-white text-sm font-semibold" style={{ width: "30%" }}>
                    Home Size
                  </th>
                  <th className="text-center px-4 py-4 text-white text-sm font-semibold">
                    Standard Refresh
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold" style={{ backgroundColor: "#2d6a4f" }}>
                    <span className="text-white font-bold">Deep Shine</span>
                    <span className="block text-[10px] mt-0.5" style={{ color: "var(--accent)" }}>+ RECOMMENDED FOR FIRST VISIT</span>
                  </th>
                  <th className="text-center px-4 py-4 text-white text-sm font-semibold">
                    Move-In / Move-Out
                  </th>
                </tr>
              </thead>
              <tbody>
                {flatRates.map((tier, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#f8faf8",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <td className="px-6 py-4">
                      <span className="block text-sm font-semibold" style={{ color: "var(--primary)" }}>{tier.size}</span>
                      <span className="block text-xs" style={{ color: "var(--light-text)" }}>{tier.detail}</span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
                        ${tier.standard.min} &ndash; ${tier.standard.max}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4" style={{ backgroundColor: i % 2 === 0 ? "rgba(149,213,178,0.08)" : "rgba(149,213,178,0.15)" }}>
                      <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                        ${tier.deep.min} &ndash; ${tier.deep.max}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
                        ${tier.moveInOut.min} &ndash; ${tier.moveInOut.max}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid var(--accent)" }}>
            <p className="text-xs font-medium" style={{ color: "var(--primary)", lineHeight: 1.7 }}>
              <strong>Move-In / Move-Out also available at $0.15 &ndash; $0.25 per sq. ft.</strong> for accurate pricing on unique spaces. Contact us for a custom quote based on your exact square footage.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HOURLY RATES + RECURRING DISCOUNTS */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Hourly Rates */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">{"\u23f1"}</span>
                <h2 className="text-2xl" style={{ color: "var(--primary)" }}>Hourly Rates</h2>
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
                Ideal for first-time cleans where the home condition is unknown, or for clients who only want specific tasks completed rather than a full package.
              </p>
              <div className="space-y-4">
                {hourlyRates.map((item, i) => (
                  <div key={i} className="flex justify-between items-start p-4 rounded-xl bg-white border border-gray-100">
                    <div>
                      <span className="block text-sm font-semibold" style={{ color: "var(--primary)" }}>{item.type}</span>
                      <span className="block text-xs mt-1" style={{ color: "var(--light-text)" }}>{item.desc}</span>
                      {item.note && <span className="block text-xs mt-1 font-medium" style={{ color: "#2d6a4f" }}>{item.note}</span>}
                    </div>
                    <span className="text-lg font-bold flex-shrink-0 ml-4" style={{ color: "var(--primary)" }}>{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recurring Discounts */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">{"\ud83d\ude80"}</span>
                <h2 className="text-2xl" style={{ color: "var(--primary)" }}>Recurring Discounts</h2>
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
                Lock in a reliable cleaning schedule and save. Our most loyal clients enjoy the deepest discounts, priority booking, and consistent results week after week.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Weekly Service", discount: "20% OFF", desc: "Best value for busy households. Your home stays spotless every week with maximum savings.", color: "#1B4332" },
                  { label: "Bi-Weekly Service", discount: "15% OFF", desc: "Our most popular plan. A perfect balance of freshness, value, and convenience.", color: "#2d6a4f" },
                  { label: "Monthly Service", discount: "10% OFF", desc: "Great for maintaining a clean home with monthly professional touch-ups.", color: "#40916c" },
                ].map((tier, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="flex-shrink-0 w-20 text-center">
                      <span className="inline-block text-sm font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: tier.color }}>
                        {tier.discount}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm font-semibold" style={{ color: "var(--primary)" }}>{tier.label}</span>
                      <span className="block text-xs mt-0.5" style={{ color: "var(--light-text)" }}>{tier.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid var(--accent)" }}>
                <p className="text-xs font-medium" style={{ color: "var(--primary)", lineHeight: 1.7 }}>
                  {"\ud83d\udca1"} <strong>Pro Tip:</strong> First-time cleans typically take 2x longer to reach our standard. We recommend booking a Deep Shine for your first visit, then switching to Standard Refresh for ongoing maintenance to maximize your recurring discount.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ADD-ON MENU */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--primary)" }}>
              Choose Your Extras
            </h2>
            <p style={{ color: "var(--light-text)", fontSize: 16 }}>
              Customize any cleaning plan with these high-margin add-ons. Available with Standard, Deep, or Move-In/Out bookings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon, i) => (
              <div key={i} className="rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center" style={{ backgroundColor: "#f8faf8" }}>
                <span className="text-3xl block mb-3">{addon.icon}</span>
                <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--primary)" }}>{addon.label}</h3>
                <p className="text-xs mb-3" style={{ color: "var(--light-text)", lineHeight: 1.6 }}>{addon.desc}</p>
                <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>
                  {addon.percentage
                    ? `+${addon.percentage}%`
                    : addon.priceFrom !== undefined
                      ? `$${addon.priceFrom}+ / pane`
                      : `$${addon.price}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* WHY CHOOSE US */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">
            Why Surrey Families Choose CleanInstead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "\ud83d\udee1", title: "Fully Insured & Bonded", desc: "Total peace of mind every time we enter your home. Our comprehensive liability insurance covers all team members." },
              { icon: "\u2705", title: "Background-Checked Pros", desc: "Every cleaner goes through our rigorous 4-step vetting process. We only hire people we would trust in our own homes." },
              { icon: "\ud83d\udca0", title: "100% Satisfaction Guarantee", desc: "If it is not spotless, we will make it right. Notify us within 24 hours and we will return to re-clean at no extra cost." },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--accent)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* GUARANTEE */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[700px] mx-auto px-5 text-center">
          <div className="text-5xl mb-4">{"\ud83d\udcaa"}</div>
          <h2 className="text-2xl md:text-3xl mb-4" style={{ color: "var(--primary)" }}>
            The CleanInstead Guarantee
          </h2>
          <p className="text-base mb-6" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
            If you aren&apos;t <strong style={{ color: "var(--primary)" }}>100% satisfied</strong> with our work, notify us within{" "}
            <strong style={{ color: "var(--primary)" }}>24 hours</strong>, and we&apos;ll return to re-clean the area at{" "}
            <strong style={{ color: "var(--primary)" }}>no extra cost</strong>. That&apos;s our promise &mdash; we stand behind every clean we deliver.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            GET YOUR FREE QUOTE
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS - SOCIAL PROOF */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--primary)" }}>
              Trusted by Surrey &amp; Metro Vancouver Families
            </h2>
            <p style={{ color: "var(--light-text)", fontSize: 16 }}>
              Real reviews from real clients who trust CleanInstead with their homes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl p-6 shadow-sm border border-gray-100" style={{ backgroundColor: "#f8faf8" }}>
              <div className="text-[#f1c40f] text-sm mb-2">★★★★★</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--light-text)", fontStyle: "italic" }}>
                &ldquo;CleanInstead transformed our home. I have two kids with allergies and since switching to their eco-friendly service, we&apos;ve noticed a huge difference. No chemical smells, just a genuinely clean home every time.&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>Amanda R.</p>
                <p className="text-xs" style={{ color: "var(--light-text)" }}>Surrey, BC &bull; Bi-Weekly Client</p>
              </div>
            </div>
            <div className="rounded-xl p-6 shadow-sm border border-gray-100" style={{ backgroundColor: "#f8faf8" }}>
              <div className="text-[#f1c40f] text-sm mb-2">★★★★★</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--light-text)", fontStyle: "italic" }}>
                &ldquo;Our guest ratings went up after hiring CleanInstead. Their teams are thorough, reliable, and the fact that they use non-toxic products is a huge selling point for our health-conscious guests.&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>David &amp; Lisa M.</p>
                <p className="text-xs" style={{ color: "var(--light-text)" }}>Vancouver, BC &bull; Airbnb Host</p>
              </div>
            </div>
            <div className="rounded-xl p-6 shadow-sm border border-gray-100" style={{ backgroundColor: "#f8faf8" }}>
              <div className="text-[#f1c40f] text-sm mb-2">★★★★★</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--light-text)", fontStyle: "italic" }}>
                &ldquo;As a healthcare facility, cleanliness and safety are non-negotiable. CleanInstead meets the highest standards. Their team is professional, punctual, and their products give us confidence.&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>Dr. Patel</p>
                <p className="text-xs" style={{ color: "var(--light-text)" }}>Surrey, BC &bull; Commercial Client</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews" className="btn-primary">READ ALL REVIEWS</Link>
          </div>
        </div>
      </section>
    </>
  );
}
