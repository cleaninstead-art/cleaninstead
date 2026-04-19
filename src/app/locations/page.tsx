"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceRegions, postalCodeMap } from "@/lib/data";

export default function LocationsPage() {
  const [postalCode, setPostalCode] = useState("");
  const [locationResult, setLocationResult] = useState<{ found: boolean; city: string } | null>(null);

  const handlePostalSearch = () => {
    const cleaned = postalCode.replace(/\s/g, "").toUpperCase();
    if (cleaned.length >= 3) {
      const fsa = cleaned.substring(0, 3);
      const city = postalCodeMap[fsa];
      if (city) {
        setLocationResult({ found: true, city });
      } else {
        setLocationResult({ found: false, city: "" });
      }
    } else {
      setLocationResult(null);
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="sub-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">Service Areas in Metro Vancouver, BC</h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>Surrey, Vancouver, Burnaby, Richmond, Langley &amp; beyond</p>
        </div>
      </section>

      {/* Postal Code Search */}
      <section className="py-16 bg-white">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="text-3xl mb-6" style={{ color: "var(--primary)" }}>Check Your Area</h2>
          <p className="text-sm mb-8" style={{ color: "var(--light-text)" }}>Enter your postal code to see if we serve your neighbourhood.</p>
          <div className="location-search">
            <input
              type="text"
              placeholder="Enter postal code..."
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handlePostalSearch()}
              maxLength={7}
            />
            <button onClick={handlePostalSearch}>Search</button>
          </div>
          {locationResult && (
            <div className={`location-result ${locationResult.found ? "success" : "error"}`}>
              {locationResult.found
                ? `✅ Great news! We serve ${locationResult.city}`
                : "❌ Sorry, we don't currently serve that area. Contact us to check availability."}
            </div>
          )}
        </div>
      </section>

      {/* Service Regions */}
      <section className="py-20" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>Where We Clean</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceRegions.map((region, i) => (
              <div key={i} className="location-region-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{region.icon}</span>
                  <h3 className="text-xl font-semibold" style={{ color: "var(--primary)" }}>{region.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.cities.map((city, j) => (
                    <span key={j} className="location-city-btn">{city}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-specific pages */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-4xl mb-16" style={{ color: "var(--primary)" }}>Local Cleaning Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { href: "/locations/surrey", icon: "🏠", title: "House Cleaning Surrey", desc: "Our home base. Serving Whalley, Guildford, Fleetwood, Newton, Cloverdale, and South Surrey." },
              { href: "/locations/vancouver", icon: "🏙️", title: "House Cleaning Vancouver", desc: "Downtown, Kitsilano, East Van, Mount Pleasant, UBC, and all Vancouver neighbourhoods." },
              { href: "/locations/burnaby", icon: "🏢", title: "House Cleaning Burnaby & New West", desc: "Metrotown, Brentwood, Edmonds, SFU, Sapperton, Queensborough, and more." },
              { href: "/locations/richmond", icon: "🌊", title: "House Cleaning Richmond", desc: "Steveston, Brighouse, Ironwood, and all Richmond neighbourhoods." },
              { href: "/locations/delta", icon: "🏡", title: "House Cleaning Delta", desc: "Ladner, Tsawwassen, North Delta, and all Delta communities." },
              { href: "/locations/north-vancouver", icon: "⛰️", title: "House Cleaning North Shore", desc: "Lower Lonsdale, Deep Cove, Ambleside, West Vancouver, British Properties, and the North Shore." },
              { href: "/locations/coquitlam", icon: "🌲", title: "House Cleaning Tri-Cities", desc: "Coquitlam Town Centre, Port Moody, Port Coquitlam, Burke Mountain, and the Tri-Cities." },
              { href: "/locations/langley", icon: "🌾", title: "House Cleaning Langley", desc: "Langley City, Langley Township, Willowbrook, Brookswood, and Aldergrove." },
              { href: "/locations/white-rock", icon: "🏖️", title: "House Cleaning White Rock", desc: "Premium residential cleaning for the beautiful beachside community of White Rock, BC." },
              { href: "/locations/maple-ridge", icon: "🏕️", title: "House Cleaning Maple Ridge", desc: "Maple Ridge, Pitt Meadows, Haney, Albion, Silver Valley, and the Ridge Meadows area." },
            ].map((loc, i) => (
              <Link key={i} href={loc.href} className="ci-card text-center block">
                <span className="text-4xl block mb-4">{loc.icon}</span>
                <h3 className="text-xl mb-3" style={{ color: "var(--primary)" }}>{loc.title}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--light-text)" }}>{loc.desc}</p>
                <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>Learn More →</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/pricing" className="btn-primary">GET YOUR INSTANT QUOTE</Link>
          </div>
        </div>
      </section>
    </>
  );
}
