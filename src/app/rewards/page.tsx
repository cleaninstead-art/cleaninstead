"use client";

import { useState } from "react";
import Link from "next/link";
import { companyInfo } from "@/lib/data";

// ─── Rewards Data ─────────────────────────────────────────────────
const loyaltyMilestones = [
  { count: 5, icon: "\ud83e\uddca", title: "The 5th Clean Bonus", reward: "Choose a FREE Add-On", desc: "Inside Oven, Inside Fridge, or Interior Windows — on us!", color: "#1B4332" },
  { count: 10, icon: "\u2728", title: "The 10th Clean Milestone", reward: "$50 Credit OR Free Deep Clean Upgrade", desc: "Use the credit toward any service, or upgrade your Standard Clean to a full Deep Clean at no extra charge.", color: "#2d6a4f" },
  { count: 20, icon: "\ud83c\udf1f", title: "Anniversary Reward", reward: "Complimentary Deep Clean Upgrade", desc: "Every year you stay with us, enjoy a free upgrade to our premium Deep Clean on your anniversary month — plus a small eco-friendly gift on the counter.", color: "#40916c" },
];

const frequencyDiscounts = [
  { label: "Weekly Service", discount: "20%", desc: "Maximum savings for busy households. Your home stays spotless every week.", color: "#1B4332" },
  { label: "Bi-Weekly Service", discount: "15%", desc: "Our most popular plan. A perfect balance of freshness, value, and convenience.", color: "#2d6a4f" },
  { label: "Monthly Service", discount: "10%", desc: "Great for maintaining a clean home with monthly professional touch-ups.", color: "#40916c" },
];

export default function RewardsPage() {
  const [cleanCount, setCleanCount] = useState(0);
  const [friendEmail, setFriendEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [referralSent, setReferralSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddClean = () => setCleanCount((c) => Math.min(c + 1, 20));
  const handleRemoveClean = () => setCleanCount((c) => Math.max(0, c - 1));
  const nextMilestone = loyaltyMilestones.find((m) => m.count > cleanCount);

  const handleRefer = () => {
    if (friendName && friendEmail) {
      setReferralSent(true);
      setFriendName("");
      setFriendEmail("");
      setTimeout(() => setReferralSent(false), 5000);
    }
  };

  const referralLink = `https://cleaninstead.com/?ref=CLEANFRIEND&code=REFER25`;
  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="sub-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607631568010-a87245c0daf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="relative z-[2] max-w-[800px] px-5">
          <p className="text-xs font-bold uppercase tracking-[3px] mb-3" style={{ color: "var(--accent)" }}>Rewards &amp; Referrals</p>
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Share the Sparkle &amp; Get Rewarded
          </h1>
          <p style={{ color: "var(--accent)", fontSize: 18 }}>
            Better for you, better for the planet — and better for your wallet.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1: GIVE $25, GET $25 REFERRAL PROGRAM               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

            {/* Left: Referral Program Details */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fff7ed", border: "2px solid #fed7aa" }}>
                  <span className="text-3xl">{"\ud83d\udce2"}</span>
                </div>
                <div>
                  <h2 className="text-2xl" style={{ color: "var(--primary)" }}>Give $25, Get $25</h2>
                  <p className="text-sm font-medium" style={{ color: "#e8740c" }}>The &quot;Share the Sparkle&quot; Referral Program</p>
                </div>
              </div>

              <p className="text-sm mb-8" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
                Our business grows when our clients share their &quot;Clean Instead&quot; experience with neighbors, friends, and family. Word-of-mouth is powerful in communities like Surrey, Langley, and across the Lower Mainland. To say thank you, we&apos;ve created the simplest referral program in Metro Vancouver.
              </p>

              {/* How it Works - 3 Steps */}
              <div className="space-y-6 mb-10">
                {[
                  { step: "1", title: "Tell a Friend", desc: "Share your experience with a neighbor, friend, or family member who could benefit from a healthcare-grade clean. Send them your referral link or simply tell them to mention your name when booking." },
                  { step: "2", title: "They Book & Save", desc: "When your friend books their first service and mentions your name or uses your referral code REFER25, they automatically get $25 OFF their first booking." },
                  { step: "3", title: "You Get Rewarded", desc: "A $25 credit is added to your account for your next visit. No limit on how many friends you can refer — your next few cleans could be free!" },
                ].map(item => (
                  <div key={item.step} className="flex gap-5 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#e8740c" }}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: "var(--primary)" }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlight Box */}
              <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: "#fff7ed", border: "2px solid #fed7aa" }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{"\ud83c\udf81"}</span>
                  <div>
                    <h3 className="font-bold mb-2" style={{ color: "var(--primary)" }}>No Limit on Referrals</h3>
                    <p className="text-sm" style={{ color: "var(--light-text)", lineHeight: 1.7 }}>
                      Refer 4 friends and your next Standard Refresh could be completely free. Refer 10 and you&apos;ve earned $250 in credits. Your best customers become your best sales team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Referral Link Generator */}
            <div className="sticky top-24">
              <div className="rounded-2xl p-8 shadow-xl border border-gray-100" style={{ backgroundColor: "#f0fdf4" }}>
                <h3 className="text-lg font-bold mb-2 text-center" style={{ color: "var(--primary)" }}>
                  Refer a Friend
                </h3>
                <p className="text-xs text-center mb-6" style={{ color: "var(--light-text)" }}>
                  Share the sparkle — they get $25, you get $25.
                </p>

                {/* Referral Link */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--primary)" }}>Your Referral Link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="flex-1 text-xs px-3 py-2.5 rounded-lg border border-gray-200 bg-white font-mono"
                      style={{ color: "var(--text)", outline: "none" }}
                    />
                    <button
                      onClick={handleCopyLink}
                      className="btn-book-now flex-shrink-0"
                      style={{ padding: "8px 16px", fontSize: 12 }}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-5 p-4 rounded-lg text-center" style={{ backgroundColor: "white", border: "2px dashed var(--accent)" }}>
                  <p className="text-xs mb-1" style={{ color: "var(--light-text)" }}>Share this code with your friend</p>
                  <p className="text-2xl font-bold tracking-[4px]" style={{ color: "var(--primary)" }}>REFER25</p>
                </div>

                <div className="text-center" style={{ borderTop: "1px solid var(--accent)", paddingTop: 16 }}>
                  <p className="text-xs font-semibold mb-3" style={{ color: "var(--primary)" }}>Or send an invitation directly</p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      placeholder="Friend's name"
                      className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
                      style={{ color: "var(--text)", outline: "none" }}
                    />
                    <input
                      type="email"
                      value={friendEmail}
                      onChange={(e) => setFriendEmail(e.target.value)}
                      placeholder="Friend's email"
                      className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
                      style={{ color: "var(--text)", outline: "none" }}
                    />
                    <button
                      onClick={handleRefer}
                      className="btn-primary w-full"
                      style={{ padding: "12px 20px", fontSize: 14 }}
                    >
                      Send $25 Referral
                    </button>
                    {referralSent && (
                      <p className="text-xs font-semibold" style={{ color: "#2d6a4f" }}>
                        Referral sent! Your friend will receive an email shortly.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 2: THE HEALTHY HOME CLUB (LOYALTY PROGRAM)         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: "#f8faf8" }}>
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[3px] mb-3" style={{ color: "var(--accent)" }}>Consistency Pays Off</p>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "var(--primary)" }}>The Healthy Home Club</h2>
            <p className="text-sm" style={{ color: "var(--light-text)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
              Consistency is the key to a truly healthy environment. We reward our recurring clients with built-in savings and milestone gifts that get better the longer you stay.
            </p>
          </div>

          {/* Frequency Discounts */}
          <div className="mb-16">
            <h3 className="text-xl mb-6 text-center" style={{ color: "var(--primary)" }}>Club Benefit: Frequency Discounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {frequencyDiscounts.map((tier) => (
                <div key={tier.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="inline-block text-2xl font-bold px-4 py-2 rounded-full text-white mb-3" style={{ backgroundColor: tier.color }}>
                    {tier.discount}
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--primary)" }}>{tier.label}</p>
                  <p className="text-xs" style={{ color: "var(--light-text)", lineHeight: 1.6 }}>{tier.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-4" style={{ color: "var(--light-text)" }}>
              Frequency discounts stack with milestone rewards. Save on every visit AND earn free services.
            </p>
          </div>

          {/* Milestone Rewards */}
          <div className="mb-12">
            <h3 className="text-xl mb-8 text-center" style={{ color: "var(--primary)" }}>Milestone Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loyaltyMilestones.map((milestone) => {
                const unlocked = cleanCount >= milestone.count;
                return (
                  <div
                    key={milestone.count}
                    className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 text-center transition-all ${
                      unlocked ? "border-[var(--primary)]" : "border-gray-100"
                    }`}
                    style={unlocked ? { boxShadow: "0 4px 20px rgba(27,67,50,0.12)" } : {}}
                  >
                    {unlocked && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-4 py-1 rounded-full text-white" style={{ backgroundColor: "var(--primary)" }}>
                        UNLOCKED
                      </div>
                    )}
                    <span className="text-4xl block mb-3">{milestone.icon}</span>
                    <p className="text-xs font-bold mb-1" style={{ color: milestone.color }}>After {milestone.count} Cleans</p>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: "var(--primary)" }}>{milestone.title}</h4>
                    <p className="text-lg font-bold mb-2" style={{ color: "var(--primary)" }}>{milestone.reward}</p>
                    <p className="text-xs" style={{ color: "var(--light-text)", lineHeight: 1.6 }}>{milestone.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Tracker */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100" style={{ maxWidth: 600, margin: "0 auto" }}>
            <h3 className="text-lg font-bold mb-2 text-center" style={{ color: "var(--primary)" }}>Your Clean Tracker</h3>
            <p className="text-xs text-center mb-6" style={{ color: "var(--light-text)" }}>
              {nextMilestone
                ? `${nextMilestone.count - cleanCount} more clean(s) until your next reward!`
                : "You've unlocked all current milestones! Keep going for more."}
            </p>

            {/* Stamp Circles */}
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {Array.from({ length: Math.max(nextMilestone?.count || 10, 10) }, (_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                  style={{
                    borderColor: i < cleanCount ? "var(--primary)" : "#e5e7eb",
                    backgroundColor: i < cleanCount ? "var(--primary)" : "white",
                    color: i < cleanCount ? "white" : "#ccc",
                  }}
                >
                  {i < cleanCount ? "\u2713" : i + 1}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${Math.min((cleanCount / (nextMilestone?.count || 10)) * 100, 100)}%` }} />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleRemoveClean}
                className="w-12 h-12 rounded-full bg-gray-100 text-[var(--primary)] text-xl font-bold border-none cursor-pointer hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-playfair), serif" }}>
                  {cleanCount}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--light-text)" }}>Cleans</div>
              </div>
              <button
                onClick={handleAddClean}
                className="w-12 h-12 rounded-full bg-[var(--primary)] text-white text-xl font-bold border-none cursor-pointer hover:bg-[#2d6a4f] transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3: FEEDBACK FOR FLOWERS (REVIEW INCENTIVE)         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">{"\u2b50"}</span>
            <div className="text-left">
              <h2 className="text-3xl" style={{ color: "var(--primary)" }}>Feedback for Flowers</h2>
              <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>Review Incentive Program</p>
            </div>
          </div>

          <p className="text-sm mb-8" style={{ color: "var(--light-text)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
            Love your results? Help us grow and get a treat on us. Your Google review is the most powerful way to help other families discover healthcare-grade cleaning. As a thank you, we&apos;ll add a free service to your next appointment.
          </p>

          <div className="ci-card p-8 mb-8" style={{ maxWidth: 500, margin: "0 auto" }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              {"\u2b50".repeat(5)}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>Leave a Google Review, Get a Free Add-On</h3>
            <p className="text-sm mb-6" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
              Leave a 5-star review on our Google Business Profile and we&apos;ll add a <strong style={{ color: "var(--primary)" }}>Free Inside Microwave or Inside Fridge Clean</strong> to your next appointment — your choice!
            </p>
            <Link
              href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "14px 32px" }}
            >
              Leave a Google Review
            </Link>
            <p className="text-xs mt-4" style={{ color: "var(--light-text)" }}>
              Screenshot your review and send it to us at info@cleaninstead.com to claim your free add-on.
            </p>
          </div>

          <div className="p-5 rounded-xl text-center" style={{ backgroundColor: "#f0fdf4", border: "1px solid var(--accent)" }}>
            <p className="text-sm" style={{ color: "var(--primary)", lineHeight: 1.7 }}>
              <strong>Pro Tip:</strong> Fresh reviews boost our Google ranking, which means more families in Surrey, Langley, and across Metro Vancouver can find us. Every review you leave genuinely helps us grow — and we reward you for it!
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 4: LOYALTY CARD PREVIEW                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Your Loyalty Card</h2>
          <p className="text-sm opacity-80 mb-10">
            Ask your cleaning team for your CleanInstead Rewards card at your next visit. Every completed clean earns a stamp!
          </p>

          {/* Card Preview */}
          <div className="bg-white rounded-2xl p-8 text-left shadow-2xl" style={{ color: "var(--text)" }}>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px]" style={{ color: "var(--primary)" }}>CleanInstead Rewards</p>
                <p className="text-[10px]" style={{ color: "var(--light-text)" }}>Better for you, better for the planet.</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#e8740c" }}>Refer a Neighbor</p>
                <p className="text-lg font-bold" style={{ color: "#e8740c" }}>$25 for Them, $25 for You</p>
              </div>
            </div>

            {/* Stamp Tracker */}
            <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: "#f0fdf4" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--primary)" }}>Get 5 cleans, get a FREE Oven Deep-Clean!</p>
              <div className="flex justify-between gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="flex-1 h-12 rounded-lg flex items-center justify-center text-xs font-bold border-2 border-dashed"
                    style={{ borderColor: "var(--accent)", color: "var(--primary)" }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="flex gap-3 text-center text-[10px] mb-6" style={{ color: "var(--light-text)" }}>
              <div className="flex-1 p-2 rounded-lg" style={{ backgroundColor: "#f8faf8" }}>
                <p className="font-bold" style={{ color: "var(--primary)" }}>5th Clean</p>
                <p>Free Add-On</p>
              </div>
              <div className="flex-1 p-2 rounded-lg" style={{ backgroundColor: "#f8faf8" }}>
                <p className="font-bold" style={{ color: "var(--primary)" }}>10th Clean</p>
                <p>$50 Credit</p>
              </div>
              <div className="flex-1 p-2 rounded-lg" style={{ backgroundColor: "#f8faf8" }}>
                <p className="font-bold" style={{ color: "var(--primary)" }}>Anniversary</p>
                <p>Free Upgrade</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--light-text)" }}>
              <span>{companyInfo.phone}</span>
              <span className="font-bold" style={{ color: "var(--primary)" }}>cleaninstead.com</span>
              <span>Code: REFER25</span>
            </div>
          </div>

          <Link href="/welcome-home-note" className="btn-book mt-8 inline-block" style={{ padding: "12px 28px" }}>
            Print Welcome Home Note
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5: FINE PRINT / TERMS                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-5">
          <h3 className="text-center text-lg mb-8" style={{ color: "var(--primary)" }}>The Fine Print</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm" style={{ color: "var(--light-text)", lineHeight: 1.8 }}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span style={{ color: "var(--primary)", fontWeight: "bold", flexShrink: 0 }}>*</span>
                <p>Referral credits are applied once the referred client&apos;s first service is completed and paid for in full.</p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: "var(--primary)", fontWeight: "bold", flexShrink: 0 }}>*</span>
                <p>No limit on how many friends you can refer. Your next few cleans could be free!</p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: "var(--primary)", fontWeight: "bold", flexShrink: 0 }}>*</span>
                <p>Credits cannot be exchanged for cash and are non-transferable between accounts.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span style={{ color: "var(--primary)", fontWeight: "bold", flexShrink: 0 }}>*</span>
                <p>Milestone rewards reset annually for the 5th clean bonus. The anniversary reward is based on your sign-up date.</p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: "var(--primary)", fontWeight: "bold", flexShrink: 0 }}>*</span>
                <p>Frequency discounts apply to recurring bookings only. One-time cleans are at standard rates.</p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: "var(--primary)", fontWeight: "bold", flexShrink: 0 }}>*</span>
                <p>The review incentive applies to new Google reviews only. One free add-on per review, per household.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6: CTA                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ backgroundColor: "#f1f1f1" }}>
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <h2 className="text-3xl mb-4" style={{ color: "var(--primary)" }}>Ready to Start Earning?</h2>
          <p className="text-sm mb-8" style={{ color: "var(--light-text)" }}>
            Book your first clean today and start earning rewards immediately. Every clean counts toward free services, milestone bonuses, and referral credits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing" className="btn-book-now" style={{ padding: "14px 32px", fontSize: 16 }}>
              Book Your First Clean
            </Link>
            <Link href="/contact" className="btn-primary" style={{ padding: "14px 32px" }}>
              Contact Us
            </Link>
          </div>
          <p className="text-xs mt-6" style={{ color: "var(--light-text)" }}>
            or call <a href={`tel:${companyInfo.phoneFull}`} className="font-semibold underline" style={{ color: "var(--primary)" }}>{companyInfo.phone}</a>
          </p>
        </div>
      </section>
    </>
  );
}
