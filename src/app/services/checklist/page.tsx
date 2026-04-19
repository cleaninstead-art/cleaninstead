import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Checklist: What's Included in Every Clean | CleanInstead",
  description: "Compare our Standard Refresh, Deep Shine, and Move-In/Move-Out cleaning checklists. See every task included plus customizable add-ons. Eco-friendly cleaning in Surrey & Metro Vancouver.",
  alternates: { canonical: "https://cleaninstead.com/services/checklist" },
};

// ─── Checklist Data ──────────────────────────────────────────
type CheckStatus = "yes" | "no" | "optional";

interface ChecklistRow {
  category: string;
  task: string;
  standard: CheckStatus;
  deep: CheckStatus;
  moveInOut: CheckStatus;
}

const checklistData: ChecklistRow[] = [
  // All Living Areas
  { category: "All Living Areas", task: "Dust reachable surfaces & furniture", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Vacuum carpets & rugs", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Mop all hard floor surfaces", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Dust picture frames & mirrors", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Empty all trash bins", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Dust ceiling fans & light fixtures", standard: "no", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Detailed baseboard & trim wiping", standard: "no", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean inside window tracks & sills", standard: "no", deep: "yes", moveInOut: "yes" },

  // Kitchen
  { category: "Kitchen", task: "Clean exterior of all appliances", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Sanitize countertops & backsplash", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Scrub & polish kitchen sink", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean microwave (inside & out)", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Wipe exterior of cabinets", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean inside oven & range hood", standard: "optional", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean inside fridge & freezer", standard: "optional", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean inside cabinets & drawers", standard: "no", deep: "no", moveInOut: "yes" },

  // Bathrooms
  { category: "Bathrooms", task: "Scrub & disinfect toilets", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean tubs, showers & tile", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean mirrors & chrome fixtures", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Wipe vanity & countertop", standard: "yes", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Detailed grout scrubbing", standard: "no", deep: "yes", moveInOut: "yes" },
  { category: "", task: "Clean inside bathroom cabinets", standard: "no", deep: "no", moveInOut: "yes" },
];

const addons = [
  {
    title: "Inside Fridge & Oven",
    desc: "Add a thorough interior clean of your fridge, freezer, oven, and range hood. Available as an add-on for Standard or Deep Shine plans.",
    icon: "🧊",
  },
  {
    title: "Interior Windows",
    desc: "Complete interior window cleaning including glass, frames, and screens for crystal-clear results throughout your home.",
    icon: "🪟",
  },
  {
    title: "Pet Hair Focus",
    desc: "High-intensity vacuuming and pet hair removal for homes with shedding pets. We use specialized tools and HEPA filtration.",
    icon: "🐾",
  },
  {
    title: "Eco-Friendly Supply Kit",
    desc: "All our cleans use 100% biodegradable and non-toxic products. This add-on includes a deeper clean using our premium botanical product line.",
    icon: "🌿",
  },
];

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-sm font-bold" style={{ backgroundColor: "#1B4332" }}>
        ✓
      </span>
    );
  }
  if (status === "optional") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold px-1" style={{ backgroundColor: "#95D5B2", color: "#1B4332" }}>
        Add
      </span>
    );
  }
  return <span className="inline-block w-7 h-7" />;
}

export default function ChecklistPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="sub-hero"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="relative z-[2] max-w-[800px] px-5">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            CleanInstead Service Checklist
          </h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>
            See exactly what&apos;s included in every cleaning plan
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-center text-3xl md:text-4xl mb-4" style={{ color: "var(--primary)" }}>
            Compare Our Cleaning Plans
          </h2>
          <p className="text-center mb-12 max-w-[600px] mx-auto" style={{ color: "var(--light-text)", fontSize: 16 }}>
            Every CleanInstead service follows a detailed, checklist-driven approach. Choose the plan that fits your needs, or customize with our add-ons.
          </p>

          {/* Mobile-friendly table */}
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
            <table className="w-full min-w-[640px]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--primary)" }}>
                  <th className="text-left px-5 py-4 text-white text-sm font-semibold" style={{ width: "40%" }}>
                    Task
                  </th>
                  <th className="text-center px-4 py-4 text-white text-sm font-semibold">
                    <div className="flex flex-col items-center">
                      <span className="font-bold">Standard Refresh</span>
                      <span className="text-xs opacity-75 mt-0.5">Recurring</span>
                    </div>
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold" style={{ backgroundColor: "#2d6a4f" }}>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-white">Deep Shine</span>
                      <span className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>Most Popular</span>
                    </div>
                  </th>
                  <th className="text-center px-4 py-4 text-white text-sm font-semibold">
                    <div className="flex flex-col items-center">
                      <span className="font-bold">Move-In / Move-Out</span>
                      <span className="text-xs opacity-75 mt-0.5">Comprehensive</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {checklistData.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#f8faf8",
                      borderBottom: row.category ? "none" : "1px solid #f0f0f0",
                    }}
                  >
                    <td className={`px-5 py-3 ${row.category ? "pt-5" : ""}`}>
                      {row.category && (
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--accent)", letterSpacing: "0.05em" }}>
                          {row.category}
                        </div>
                      )}
                      <span className="text-sm" style={{ color: "var(--text)" }}>{row.task}</span>
                    </td>
                    <td className="text-center px-4 py-3">
                      <StatusIcon status={row.standard} />
                    </td>
                    <td className="text-center px-4 py-3" style={{ backgroundColor: row.category ? "rgba(149,213,178,0.05)" : undefined }}>
                      <StatusIcon status={row.deep} />
                    </td>
                    <td className="text-center px-4 py-3">
                      <StatusIcon status={row.moveInOut} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm" style={{ color: "var(--light-text)" }}>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "#1B4332" }}>✓</span>
              Included
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold" style={{ backgroundColor: "#95D5B2", color: "#1B4332", fontSize: "10px" }}>Add</span>
              Available as Add-On
            </div>
          </div>
        </div>
      </section>

      {/* Customizable Add-Ons */}
      <section className="py-20" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-center text-3xl md:text-4xl mb-4" style={{ color: "var(--primary)" }}>
            Customizable Add-Ons
          </h2>
          <p className="text-center mb-12 max-w-[600px] mx-auto" style={{ color: "var(--light-text)", fontSize: 16 }}>
            Boost your booking with these one-off additions available with any cleaning plan. Mix and match to create your perfect clean.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addons.map((addon, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0 mt-1">{addon.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--primary)" }}>{addon.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--light-text)" }}>{addon.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The CleanInstead Guarantee */}
      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center">
            <div className="text-5xl mb-6">&#128170;</div>
            <h2 className="text-3xl md:text-4xl mb-6" style={{ color: "var(--primary)" }}>
              The CleanInstead Guarantee
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border-2" style={{ borderColor: "var(--accent)" }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text)" }}>
                If you aren&apos;t <strong style={{ color: "var(--primary)" }}>100% satisfied</strong> with our work,
                notify us within <strong style={{ color: "var(--primary)" }}>24 hours</strong>, and we will return to
                re-clean the area at <strong style={{ color: "var(--primary)" }}>no extra cost</strong>.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm" style={{ color: "var(--light-text)" }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--primary)" }}>&#10003;</span> 24-Hour Window
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--primary)" }}>&#10003;</span> Free Re-Clean
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--primary)" }}>&#10003;</span> No Questions Asked
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--primary)" }}>&#10003;</span> Eco-Friendly Products
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links to Service Pages */}
      <section className="py-16" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-center text-2xl md:text-3xl text-white mb-10">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Standard Refresh", desc: "Recurring maintenance for consistently clean homes", href: "/services/residential", label: "Learn More" },
              { title: "Deep Shine", desc: "A top-to-bottom deep clean for a spotless home", href: "/services/deep-cleaning", label: "Most Popular" },
              { title: "Move-In / Move-Out", desc: "Comprehensive cleaning for seamless transitions", href: "/services/move-in-out", label: "Learn More" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group block rounded-xl p-6 transition-all border" style={{ backgroundColor: "rgba(255,255,255,0.92)", borderColor: "rgba(27,67,50,0.15)" }}>
                <h3 className="text-xl font-bold mb-2 transition-colors" style={{ color: "#1B4332" }}>
                  {item.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: "#374151" }}>{item.desc}</p>
                <span className="text-sm font-bold inline-flex items-center gap-1" style={{ color: "#e8740c" }}>
                  {item.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="text-3xl mb-4" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>
            Ready to Get Started?
          </h2>
          <p className="mb-8" style={{ color: "var(--light-text)", fontSize: 16 }}>
            Use our instant quote calculator to see pricing for your space and book your first clean today.
          </p>
          <Link href="/pricing" className="btn-primary inline-block">
            GET MY INSTANT QUOTE
          </Link>
          <p className="mt-4 text-sm" style={{ color: "var(--light-text)" }}>
            Or call us at <a href="tel:+16044971001" className="font-semibold" style={{ color: "var(--primary)" }}>604.497.1001</a>
          </p>
        </div>
      </section>
    </>
  );
}
