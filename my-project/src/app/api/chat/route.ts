import { NextRequest, NextResponse } from "next/server";

// ─── Company Knowledge Base ─────────────────────────────────────────
const COMPANY_INFO = {
  name: "CleanInstead",
  tagline: "Premium Eco-Friendly Cleaning Services",
  address: "Unit 105A - 14914 104 Ave., Surrey BC V3R 1M7",
  phone: "+1 604.497.1001",
  email: "info@cleaninstead.com",
  website: "cleaninstead.com",
  hours: "Mon-Fri 8AM-6PM, Sat 9AM-4PM, Sun Closed",
  areas: [
    "Surrey", "Vancouver", "Burnaby", "Richmond",
    "Langley", "Delta", "Coquitlam", "New Westminster",
    "Port Coquitlam", "Maple Ridge", "White Rock",
    "and surrounding Metro Vancouver areas",
  ],
};

const SERVICES = [
  { name: "Residential Cleaning", desc: "Houses, townhomes, apartments, and condos. Regular maintenance cleaning with eco-friendly products.", icon: "🏠" },
  { name: "Moving In / Out Cleaning", desc: "Seamless chemical-free transitions for your old or new home. We make move-in day feel brand new.", icon: "📦" },
  { name: "Airbnb & Short-Term Rentals", desc: "Fast turnarounds between guests to help you earn 5-star ratings consistently.", icon: "🔑" },
  { name: "Commercial Cleaning", desc: "Offices, clinics, retail spaces, and commercial facilities cleaned to healthcare-grade standards.", icon: "🏢" },
  { name: "Real Estate Staging", desc: "Help your property sell faster with a spotless, move-in ready presentation.", icon: "🏡" },
  { name: "Post-Construction Cleaning", desc: "Thorough cleanup after renovations or construction work. We handle the dust and debris so you don't have to.", icon: "🔨" },
];

const CLEANING_TYPES = {
  recurring: {
    name: "Recurring Maintenance Clean",
    includes: "Dusting, HEPA vacuuming, mopping with plant-based soap, kitchen sanitizing, and bathroom scrubbing.",
  },
  deep: {
    name: "Deep Clean",
    includes: "Everything in a recurring clean PLUS inside oven/microwave cleaning, fridge wipe-down, baseboards, window sills, and light fixtures.",
  },
};

const ADD_ONS = [
  { name: "Eco-Oven Degreasing", price: "$45" },
  { name: "Full Fridge Purge", price: "$35" },
  { name: "Interior Windows", price: "varies" },
  { name: "Cabinet Degreasing", price: "varies" },
  { name: "Mattress Vacuum", price: "varies" },
  { name: "Pet-Safe Upholstery Clean", price: "varies" },
];

const PRICING = {
  base: "~$0.15 per sq ft",
  bedroom: "$20 per bedroom",
  bathroom: "$15 per bathroom",
  discounts: [
    { frequency: "One-Time", discount: "No discount (standard rate)" },
    { frequency: "Monthly", discount: "5% off" },
    { frequency: "Bi-Weekly", discount: "10% off" },
    { frequency: "Weekly", discount: "15% off" },
  ],
};

const REWARDS = [
  { tier: "Green Starter", cleans: 3, reward: "Free Fridge Clean" },
  { tier: "Eco Advocate", cleans: 6, reward: "Free Windows" },
  { tier: "Planet Protector", cleans: 10, reward: "1 FREE Clean" },
];

const DIFFERENTIATORS = [
  "100% plant-based, non-toxic, EPA-registered products",
  "Zero single-use plastics - we use durable glass bottles and medical-grade microfiber cloths",
  "Full ingredient transparency published on our website",
  "4-step vetting process: background check, reference checks, eco-skills assessment, and insurance verification",
  '24-hour "Barefoot Guarantee" - we\'ll come back for free if you\'re not completely satisfied',
  "Healthcare-grade cleaning standards",
];

// ─── Rate Limiting (in-memory) ───────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 8;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 300_000);

// ─── Input Sanitization ──────────────────────────────────────────
const MAX_INPUT_LENGTH = 500;

function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;\s]+;/g, "")
    .trim()
    .slice(0, MAX_INPUT_LENGTH);
}

// ─── Topic Detection for Analytics ───────────────────────────────
function detectTopic(text: string): string {
  const lower = text.toLowerCase();
  if (/pric|cost|how much|quote|rate|expensive|cheap|afford|budget/.test(lower)) return "pricing";
  if (/serv|clean|offer|what do you|what can/.test(lower)) return "services";
  if (/book|schedul|appoint|reserve|availab|when/.test(lower)) return "booking";
  if (/area|location|where|surrey|vancouver|burnaby|richmond|deliver|serve/.test(lower)) return "location";
  if (/reward|loyalt|free|point|program/.test(lower)) return "rewards";
  if (/product|chem|toxic|safe|green|eco|plant|ingredient/.test(lower)) return "products";
  if (/insur|trust|vetting|background|check|safe|guarante/.test(lower)) return "trust";
  if (/thank|bye|goodby|see you|have a great/.test(lower)) return "closing";
  return "general";
}

const analyticsLog: Array<{ timestamp: string; topic: string; messagePreview: string }> = [];
const MAX_ANALYTICS_ENTRIES = 200;

function logAnalytics(topic: string, message: string) {
  analyticsLog.push({
    timestamp: new Date().toISOString(),
    topic,
    messagePreview: message.slice(0, 60),
  });
  if (analyticsLog.length > MAX_ANALYTICS_ENTRIES) {
    analyticsLog.shift();
  }
}

// ─── Intelligent Response Engine ────────────────────────────────
function generateResponse(userMessage: string, conversationHistory: Array<{ role: string; content: string }>): string {
  const msg = userMessage.toLowerCase().trim();
  const words = msg.split(/\s+/);

  // ── Greetings ────────────────────────────────────────────────
  if (/^(hi|hello|hey|howdy|good\s?(morning|afternoon|evening)|greetings|yo|sup)/.test(msg) && msg.length < 30) {
    const greetings = [
      `Hi there! Welcome to ${COMPANY_INFO.name}! I'm CleanBot, your eco-friendly cleaning assistant. I can help you with our services, pricing, booking, or anything else. What would you like to know?`,
      `Hello! Great to hear from you! I'm CleanBot from ${COMPANY_INFO.name}. How can I help you today? Feel free to ask about our cleaning services, pricing, or how to get started!`,
      `Hey! Thanks for reaching out to ${COMPANY_INFO.name}! I'm here to help with any questions about our eco-friendly cleaning services. What's on your mind?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // ── How are you ──────────────────────────────────────────────
  if (/how\s*(are|r)\s*(you|u|ya)|how('s| is)\s*(it\s+going|everything|life)/.test(msg)) {
    return `I'm doing great, thanks for asking! I'm always excited to talk about eco-friendly cleaning. Is there anything I can help you with today? Whether it's services, pricing, or booking, I'm here for you!`;
  }

  // ── Thank you ────────────────────────────────────────────────
  if (/^(thanks?|thank\s*you|thx|ty|cheers|appreciate)/.test(msg) && msg.length < 50) {
    const thanks = [
      `You're very welcome! If you have any other questions about our services, don't hesitate to ask. You can also reach us at ${COMPANY_INFO.phone} or ${COMPANY_INFO.email}. Have a wonderful day!`,
      `Happy to help! We'd love to earn your business. Feel free to visit ${COMPANY_INFO.website} for an instant quote, or call us at ${COMPANY_INFO.phone} anytime during business hours (${COMPANY_INFO.hours}).`,
      `My pleasure! Remember, we offer a 24-hour Barefoot Guarantee - if you're not satisfied, we'll come back and make it right for free. Anything else I can help with?`,
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }

  // ── Goodbye ──────────────────────────────────────────────────
  if (/^(bye|goodby|see\s*ya|see\s*you|have\s*a\s*great|take\s*care|gotta\s*go|talk\s*later|cya)/.test(msg) && msg.length < 60) {
    return `Take care! We'd love to hear from you again. Remember, you can always reach us at ${COMPANY_INFO.phone} or ${COMPANY_INFO.email}. Have a spotless day!`;
  }

  // ── Services ─────────────────────────────────────────────────
  if (/what\s*(service|cleaning)|do\s*you\s*(offer|provide|do)|types?\s*of\s*(service|cleaning)|available\s*service/.test(msg)) {
    const serviceList = SERVICES.map(s => `${s.icon} ${s.name} - ${s.desc}`).join("\n\n");
    return `Great question! Here are all the cleaning services we offer:\n\n${serviceList}\n\nWould you like more details about any specific service, or would you like to get a quote? You can also use our instant quote calculator right on our website!`;
  }

  // ── Residential / Home cleaning ──────────────────────────────
  if (/residential|home|house|hous|townhome|apartment|condo/.test(msg) && !/commercial|office/.test(msg)) {
    return `Our residential cleaning is perfect for houses, townhomes, apartments, and condos! We offer two cleaning types:\n\n🏠 **Recurring Maintenance** - Regular cleaning including dusting, HEPA vacuuming, mopping with plant-based soap, kitchen sanitizing, and bathroom scrubbing.\n\n✨ **Deep Clean** - Everything in recurring PLUS inside oven/microwave, fridge wipe-down, baseboards, window sills, and light fixtures.\n\nWe also have premium add-ons like Eco-Oven Degreasing ($45) and Full Fridge Purge ($35). Would you like to get a quote for your space?`;
  }

  // ── Moving cleaning ──────────────────────────────────────────
  if (/mov(e|ing)\s*(in|out)|relocat/.test(msg)) {
    return `Our Moving In/Out cleaning service makes transitions seamless and chemical-free! Whether you're moving into a new place or preparing to leave, we'll make sure every surface is spotless.\n\nWe handle everything from deep-cleaning appliances to scrubbing baseboards - so your old or new home feels absolutely fresh. This is especially popular for renters wanting their deposit back, or new homeowners wanting a clean start!\n\nWant to schedule a move clean? Give us a call at ${COMPANY_INFO.phone} or use our quote calculator on the website!`;
  }

  // ── Airbnb / Short-term rental ───────────────────────────────
  if (/airbnb|short[\s-]?term|rental|vacation\s*rental|vrbo|guest\s*ready/.test(msg)) {
    return `Our Airbnb & Short-Term Rental cleaning is designed for fast turnarounds between guests! We know how important 5-star reviews are to hosts, so we deliver consistent, spotless results every time.\n\nWe can work with your schedule and coordinate between check-out and check-in times. Many of our Airbnb hosts are recurring clients because of our reliability and attention to detail.\n\nInterested? Call us at ${COMPANY_INFO.phone} to discuss a recurring schedule or one-time deep clean!`;
  }

  // ── Commercial / Office cleaning ─────────────────────────────
  if (/commercial|office|clinic|retail|business|warehouse|facilit/.test(msg)) {
    return `Yes, we clean commercial spaces! Our commercial cleaning service covers offices, clinics, retail spaces, and more - all cleaned to healthcare-grade standards using our 100% plant-based products.\n\nYour employees and customers deserve a safe, chemical-free workspace. We offer flexible scheduling that works around your business hours, including after-hours cleaning.\n\nGive us a call at ${COMPANY_INFO.phone} or email ${COMPANY_INFO.email} to discuss your commercial cleaning needs. We'd love to provide a customized quote!`;
  }

  // ── Post-construction cleaning ───────────────────────────────
  if (/post[\s-]?construction|renovation|remodel|construction\s*clean|after\s*(construction|reno)/.test(msg)) {
    return `Our Post-Construction cleaning service is exactly what you need after renovations! We handle all the dust, debris, and residue left behind so you can enjoy your newly renovated space right away.\n\nThis includes detailed dust removal from all surfaces, cleaning of windows and fixtures, and thorough vacuuming and mopping. We use HEPA filters to capture fine construction dust particles.\n\nCall us at ${COMPANY_INFO.phone} to schedule your post-construction clean!`;
  }

  // ── Pricing / Cost ───────────────────────────────────────────
  if (/pric|cost|how much|quote|rate|expensive|cheap|afford|budget|what do.*charge/.test(msg)) {
    // Check for specific pricing questions
    if (/deep\s*clean/.test(msg)) {
      return `Great choice! Our deep cleaning includes everything in a recurring clean PLUS inside oven/microwave cleaning, fridge wipe-down, baseboards, window sills, and light fixtures.\n\nPricing starts at ~$0.15 per sq ft as a base, plus $20 per bedroom and $15 per bathroom. Add-ons like Eco-Oven Degreasing ($45) or Full Fridge Purge ($35) are available too.\n\nFor an exact quote, try our instant quote calculator on our Pricing page, or call us at ${COMPANY_INFO.phone}!`;
    }

    if (/discount|recurring|frequency|weekly|bi.?weekly|monthly/.test(msg)) {
      const discountList = PRICING.discounts.map(d => `  ${d.frequency}: ${d.discount}`).join("\n");
      return `We offer fantastic frequency discounts:\n\n${discountList}\n\nThe more often you clean, the more you save! Bi-weekly and weekly customers save 10-15% on every clean. Plus, you'll earn rewards even faster toward free services!\n\nWant to see your savings? Use our instant quote calculator on the website, or call ${COMPANY_INFO.phone} for a personalized quote.`;
    }

    return `Here's our general pricing structure:\n\n  Base rate: ~$0.15 per sq ft\n  Bedrooms: $20 each\n  Bathrooms: $15 each\n\nFrequency discounts:\n  One-Time: Standard rate\n  Monthly: 5% off\n  Bi-Weekly: 10% off\n  Weekly: 15% off\n\nPremium add-ons are also available, like Eco-Oven Degreasing ($45) and Full Fridge Purge ($35).\n\nFor the most accurate quote, check out our instant quote calculator on the Pricing page! You can also call us at ${COMPANY_INFO.phone}.`;
  }

  // ── Booking / How to get started ─────────────────────────────
  if (/book|schedul|appoint|reserve|get\s*start|how\s*(to\s*)?(start|begin|book|hire|sign)|i\s*want\s*a\s*clean/.test(msg)) {
    return `Getting started with ${COMPANY_INFO.name} is easy! Here are your options:\n\n1. **Use our instant quote calculator** on the website - just enter your space details and get a price instantly!\n\n2. **Call us** at ${COMPANY_INFO.phone} - our friendly team is available ${COMPANY_INFO.hours}.\n\n3. **Email us** at ${COMPANY_INFO.email} and we'll get back to you within 1 business day.\n\nDuring your first clean, we'll assess your space and customize a cleaning plan that fits your needs perfectly. Remember, we also offer a 24-hour Barefoot Guarantee - if you're not satisfied, we'll come back for free!`;
  }

  // ── Service areas / Location ─────────────────────────────────
  if (/area|location|where|surrey|vancouver|burnaby|richmond|deliver|serve|do\s*you\s*(come|service|travel|go|cover)/.test(msg)) {
    return `We serve the entire Metro Vancouver area! Our service areas include:\n\n  Surrey, Vancouver, Burnaby, Richmond, Langley, Delta, Coquitlam, New Westminster, Port Coquitlam, Maple Ridge, White Rock, and surrounding areas.\n\nOur office is located at ${COMPANY_INFO.address}. Not sure if we cover your area? Just give us a call at ${COMPANY_INFO.phone} - we're happy to check!`;
  }

  // ── Rewards / Loyalty program ────────────────────────────────
  if (/reward|loyalt|free\s*clean|point|program|perk|vip|member/.test(msg)) {
    const rewardList = REWARDS.map(r => `  ${r.tier}: ${r.cleans} cleans = ${r.reward}`).join("\n");
    return `We love rewarding our loyal customers! Our Rewards Program has three tiers:\n\n${rewardList}\n\nThat means after just 10 cleans, you get an entire cleaning session completely free! Plus, frequency discounts stack on top of your rewards - weekly customers save 15% AND earn toward free cleans.\n\nEvery clean counts, whether it's recurring, deep, or a move-in/out. Start earning today!`;
  }

  // ── Products / Eco-friendly / Chemicals ──────────────────────
  if (/product|chem|toxic|safe|green|eco|plant|ingredient|what\s*(do\s*you\s*)?use|smell|scent|allerg/.test(msg)) {
    return `We're proud to use 100% plant-based, non-toxic, EPA-registered cleaning products! Here's what makes our approach special:\n\n  Zero single-use plastics - we use durable glass bottles\n  Medical-grade microfiber cloths for superior cleaning\n  Full ingredient transparency published on our website\n  Safe for children, pets, and people with allergies\n  No harsh chemical smells - just a fresh, clean scent\n\nWe believe you shouldn't have to choose between a clean home and a safe home. Our products are tough on dirt but gentle on your family and the planet!\n\nWant to know more about specific products we use? Just ask, or check our website for full ingredient lists!`;
  }

  // ── Insurance / Trust / Vetting / Guarantee ──────────────────
  if (/insur|trust|vetting|background|check|guarantee|bond|licensed|reliable|safe\s*(to\s*)?(hire|trust|book)|what\s*if.*not.*satisf/.test(msg)) {
    if (/guarantee|satisf|not.*happy|not.*pleas/.test(msg)) {
      return `We stand behind our work with our exclusive 24-hour "Barefoot Guarantee"! If you're not completely satisfied with your clean, just let us know within 24 hours and we'll come back to make it right - completely free of charge. No questions asked!\n\nWe want you to feel confident walking barefoot on your floors after every clean. That's our promise to you. Call us at ${COMPANY_INFO.phone} if you ever need us to make it right.`;
    }
    return `Your trust and safety are our top priorities! Every CleanInstead cleaner goes through our rigorous 4-step vetting process:\n\n  1. Criminal background check\n  2. Professional reference checks\n  3. Eco-skills assessment\n  4. Insurance verification\n\nAll our cleaners are fully insured, so you're completely protected. Plus, we offer our 24-hour Barefoot Guarantee - if you're not satisfied, we'll return and re-clean for free.\n\nYou can book with complete confidence! Call ${COMPANY_INFO.phone} to get started.`;
  }

  // ── Hours / Contact info ─────────────────────────────────────
  if (/hour|open|close|when.*available|time|schedule.*time|contact|phone|email|reach|call/.test(msg) && !/book|appoint|schedul/.test(msg)) {
    return `Here's how to reach us:\n\n  Phone: ${COMPANY_INFO.phone}\n  Email: ${COMPANY_INFO.email}\n  Website: ${COMPANY_INFO.website}\n  Address: ${COMPANY_INFO.address}\n\nBusiness Hours:\n  Mon-Fri: 8AM - 6PM\n  Saturday: 9AM - 4PM\n  Sunday: Closed\n\nWe typically respond to emails within 1 business day. For fastest service, give us a call during business hours!`;
  }

  // ── Deep clean vs regular clean ──────────────────────────────
  if (/deep\s*clean|deep\s*(clean|cleaning)|regular\s*clean|recurring|maintenance\s*clean|difference\s*between|what.*clean.*type|which.*clean/.test(msg)) {
    return `Great question! Here's the difference:\n\n**Recurring Maintenance Clean:**\n  Dusting, HEPA vacuuming, mopping with plant-based soap, kitchen sanitizing, and bathroom scrubbing. Perfect for regular upkeep.\n\n**Deep Clean:**\n  Everything in a recurring clean PLUS inside oven/microwave cleaning, fridge wipe-down, baseboards, window sills, and light fixtures. Ideal for first-time cleans, seasonal refreshes, or when your space needs extra attention.\n\nWe recommend starting with a deep clean, then maintaining with recurring cleans. Many customers do a deep clean quarterly and recurring in between!`;
  }

  // ── Add-ons ──────────────────────────────────────────────────
  if (/add[\s-]?on|upgrade|extra|oven|fridge|window|mattress|upholstery|cabinet/.test(msg)) {
    const addOnList = ADD_ONS.map(a => `  ${a.name}: ${a.price}`).join("\n");
    return `We offer premium add-on services to customize your clean:\n\n${addOnList}\n\nThese can be added to any recurring or deep cleaning service. The Eco-Oven Degreasing and Full Fridge Purge are especially popular for deep cleans!\n\nWant to add any of these to your booking? Just let our team know when you call ${COMPANY_INFO.phone} or mention it in your booking request.`;
  }

  // ── What makes you different ─────────────────────────────────
  if (/different|special|unique|why\s*(choose|pick|use|go\s*with)|what\s*makes|stand\s*out|compared|vs|versus|better\s*than/.test(msg)) {
    const diffList = DIFFERENTIATORS.map(d => `  ${d}`).join("\n");
    return `Great question! Here's what sets ${COMPANY_INFO.name} apart:\n\n${diffList}\n\nWe're not just a cleaning company - we're on a mission to prove that eco-friendly cleaning can outperform traditional chemical cleaning, while keeping your family and the planet safe.\n\nTry us once and experience the difference! Use our quote calculator on the website or call ${COMPANY_INFO.phone}.`;
  }

  // ── Pets ─────────────────────────────────────────────────────
  if (/pet|dog|cat|animal|fur|hair|dander/.test(msg)) {
    return `We're totally pet-friendly! Our cleaning products are plant-based and completely non-toxic, so they're safe for your furry family members. No need to worry about chemical residue on floors or surfaces.\n\nWe offer a Pet-Safe Upholstery Clean add-on specifically designed to remove pet hair, dander, and odors from furniture. And our HEPA vacuums are fantastic at capturing pet dander and allergens.\n\nYour pets will love a clean, chemical-free home just as much as you will!`;
  }

  // ── Reviews / Testimonials ───────────────────────────────────
  if (/review|rating|testimon|feedback|what.*people.*say|recommend|customer/.test(msg) && !/reward/.test(msg)) {
    return `Our customers love us! We're proud of our 5-star reputation across all review platforms. The Barefoot Guarantee helps ensure every clean meets our high standards.\n\nWe believe our work speaks for itself - that's why we offer our 24-hour guarantee. If something isn't right, we fix it for free. But honestly, our customers rarely need to use it because our 4-step vetting process ensures only top-quality cleaners work in your home.\n\nGive us a try and see for yourself! Call ${COMPANY_INFO.phone} to get started.`;
  }

  // ── Payment ──────────────────────────────────────────────────
  if (/pay|payment|method|credit|debit|cash|e.?transfer|invoic/.test(msg)) {
    return `We accept multiple payment methods for your convenience, including credit/debit cards, e-transfers, and cash. For commercial clients, we also offer invoicing options.\n\nPayment is collected after each cleaning is complete. For recurring clients, we can set up automatic payments to make things seamless.\n\nHave specific payment questions? Just call us at ${COMPANY_INFO.phone} and we'll be happy to help!`;
  }

  // ── Cancellation / Rescheduling ──────────────────────────────
  if (/cancel|reschedul|change.*appoint|change.*book|no\s*show|late/.test(msg)) {
    return `We understand plans change! We just ask for at least 24 hours notice for cancellations or rescheduling so we can adjust our team's schedule. Give us a call at ${COMPANY_INFO.phone} or email ${COMPANY_INFO.email} and we'll get you rescheduled at a time that works better.\n\nWe're flexible and always try to accommodate changes when possible!`;
  }

  // ── Duration / How long ──────────────────────────────────────
  if (/how\s*long|duration|time.*take|how\s*(fast|quick|soon)/.test(msg) && !/open|hour|close/.test(msg)) {
    return `Cleaning time depends on the size and condition of your space. As a general guide:\n\n  Studio/1-Bedroom: 1.5 - 2.5 hours\n  2-3 Bedrooms: 2.5 - 4 hours\n  4+ Bedrooms: 3.5 - 5+ hours\n  Deep Cleans typically take 30-50% longer than recurring cleans\n  Move In/Out cleans may take longer depending on the space\n\nThese are estimates - actual times vary based on your space's specific needs. We'll give you a better estimate when you book! Call ${COMPANY_INFO.phone} for a personalized assessment.`;
  }

  // ── First time customer ──────────────────────────────────────
  if (/first\s*time|new\s*customer|never.*book|try|trial|never\s*(use|had|tried)/.test(msg)) {
    return `Welcome! We're excited to have you try ${COMPANY_INFO.name} for the first time! Here's what to expect:\n\n1. Get a quote using our instant calculator on the website, or call ${COMPANY_INFO.phone}\n2. We'll match you with a vetted, insured cleaner\n3. Your first clean typically starts as a deep clean for the best results\n4. Afterward, we'll recommend a recurring schedule to maintain the freshness\n\nRemember, you're protected by our 24-hour Barefoot Guarantee - if you're not happy, we come back for free. You have nothing to lose!`;
  }

  // ── COVID / Health / Sanitization ────────────────────────────
  if (/covid|virus|germ|sanitiz|disinfect|health|bacteria|antibact/.test(msg)) {
    return `Health and safety are at the core of what we do! Our healthcare-grade cleaning standards go beyond typical COVID protocols:\n\n  EPA-registered, plant-based disinfectants\n  HEPA-filtered vacuums that capture 99.97% of particles\n  Medical-grade microfiber cloths (not sponges that spread germs)\n  Color-coded cleaning system to prevent cross-contamination\n\nOur products are proven effective against germs and bacteria without the harmful chemicals. A truly clean home shouldn't smell like a hospital!`;
  }

  // ── Who are you ──────────────────────────────────────────────
  if (/who\s*are\s*you|what\s*are\s*you|your\s*name|are\s*you\s*a\s*(bot|robot|person|real|human)|ai|artificial/.test(msg)) {
    return `I'm CleanBot, the friendly AI assistant for ${COMPANY_INFO.name}! I'm here to help answer your questions about our eco-friendly cleaning services anytime.\n\nWhile I'm an AI, the cleaning team behind me is 100% human and thoroughly vetted! If you'd like to speak with a real person, you can always call us at ${COMPANY_INFO.phone} or email ${COMPANY_INFO.email} during business hours (${COMPANY_INFO.hours}).\n\nHow can I help you today?`;
  }

  // ── Joke / Fun ───────────────────────────────────────────────
  if (/joke|funny|laugh|humor|tell\s*me\s*someth/.test(msg)) {
    return `Here's one: Why did the broom decide to get a second job? Because it wanted to sweep up some extra cash! 😄\n\nBut seriously, if you're looking for a cleaning service that won't sweep your budget under the rug, you're in the right place! Would you like to hear about our services or get a quote?`;
  }

  // ── Out of scope ─────────────────────────────────────────────
  if (/weather|news|politic|sport|recipe|movie|music|game|stock|crypto|bitcoin|lottery/.test(msg)) {
    return `I appreciate the curiosity, but I'm specialized in all things cleaning! I can help you with our services, pricing, booking, service areas, eco-friendly products, and more.\n\nFor anything outside of cleaning, I'd recommend a quick web search. But if you have questions about keeping your space spotless, I'm your expert! What can I help you with?`;
  }

  // ── Default / Fallback ───────────────────────────────────────
  const fallbacks = [
    `Thanks for your question! I'd love to help. Could you tell me a bit more about what you're looking for? I can assist with:\n\n  Our cleaning services and what they include\n  Pricing and getting a free quote\n  Booking a cleaning\n  Service areas in Metro Vancouver\n  Our rewards program\n  Eco-friendly products we use\n\nOr you can always call us directly at ${COMPANY_INFO.phone}!`,
    `I want to make sure I give you the best answer! Could you rephrase your question? I'm an expert on ${COMPANY_INFO.name}'s eco-friendly cleaning services - anything about our services, pricing, booking, or products, I can help with.\n\nFeel free to call our team at ${COMPANY_INFO.phone} for immediate assistance too!`,
    `Great question! Let me make sure I understand - are you asking about our cleaning services, pricing, booking, or something else? I'm here to help with anything related to ${COMPANY_INFO.name}!\n\nYou can also reach our team directly at ${COMPANY_INFO.phone} or ${COMPANY_INFO.email}.`,
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ─── POST Handler ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error: "rate_limited",
          message:
            "You're sending messages too quickly. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    // Sanitize all messages
    const sanitizedMessages = messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : m.role === "assistant" ? "assistant" : "user",
      content: m.role === "user" ? sanitizeInput(m.content || "") : m.content,
    }));

    // Analytics
    const lastUserMsg = [...sanitizedMessages]
      .reverse()
      .find((m: { role: string }) => m.role === "user");
    if (lastUserMsg) {
      logAnalytics(detectTopic(lastUserMsg.content), lastUserMsg.content);
    }

    // Generate intelligent response
    const userMessage = lastUserMsg?.content || "";
    const messageContent = generateResponse(userMessage, sanitizedMessages);

    return NextResponse.json({ message: messageContent });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { error: "Failed to generate response", details: message },
      { status: 500 }
    );
  }
}
