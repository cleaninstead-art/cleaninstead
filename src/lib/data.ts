// ═══════════════════════════════════════════════════════════════════
// SHARED DATA — All page data constants in one place
// ═══════════════════════════════════════════════════════════════════

// ─── FAQ Data ───────────────────────────────────────────────────────
export const faqs = [
  {
    q: "Do eco-friendly products actually kill germs?",
    a: "Absolutely. Our products are EPA-registered and hospital-grade. They use natural enzymatic reactions to kill 99.9% of bacteria without toxic fumes or harsh residues that can harm your family and pets.",
  },
  {
    q: "How does your Rewards Program work?",
    a: "It's completely automated! Every time a clean is completed, your account is automatically credited toward free services. After 3 cleans you get a free fridge clean, after 6 you get free windows, and after 10 you earn an entirely free cleaning session.",
  },
  {
    q: "What if I'm not happy with the clean?",
    a: "We offer a 24-hour \"Barefoot Guarantee.\" If we missed something or you're unsatisfied for any reason, simply let us know and we'll return to fix it at absolutely no cost to you.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes! Our teams arrive fully equipped with all necessary eco-friendly products, microfiber cloths, and professional-grade tools. You never need to provide anything. All our products are plant-based and non-toxic.",
  },
  {
    q: "Are your cleaners insured and background-checked?",
    a: "Every cleaner goes through our rigorous 4-step vetting process, which includes a comprehensive criminal background check, professional reference checks, an eco-product skills assessment, and full insurance verification before they ever enter your home.",
  },
  {
    q: "What areas do you serve?",
    a: "We currently serve Surrey, Vancouver, Burnaby, Richmond, Langley, Delta, Coquitlam, and surrounding areas in Metro Vancouver, BC. Contact us to confirm availability in your specific location.",
  },
  {
    q: "How do I get a quote?",
    a: "You can use our instant quote calculator on our Pricing page for an estimate right away. For a customized quote, simply fill out the contact form or give us a call — we'll get back to you within a few hours.",
  },
];

// Extended FAQ data for dedicated FAQ page
export const extendedFaqs = [
  ...faqs,
  {
    category: "Services",
    q: "What's included in a recurring maintenance clean?",
    a: "Our recurring clean includes dusting all surfaces, HEPA vacuuming throughout, mopping with plant-based soap, kitchen sanitizing (counters, sinks, stovetop), bathroom scrubbing (tub, toilet, vanity, mirrors), and replacing compostable bin liners.",
  },
  {
    category: "Services",
    q: "What's the difference between a recurring clean and a deep clean?",
    a: "A recurring maintenance clean covers all the essentials for ongoing upkeep. A deep clean includes everything in recurring PLUS inside oven & microwave cleaning, inside fridge wipe-down, baseboard wiping, window sill cleaning, and light fixture dusting. Deep cleans are ideal for first-time clients, seasonal refreshes, or post-illness cleaning.",
  },
  {
    category: "Services",
    q: "Do you offer move-in/move-out cleaning?",
    a: "Yes! Our move-in/move-out cleaning service is comprehensive and perfect for renters wanting their deposit back or new homeowners wanting a fresh start. We clean every surface including inside cabinets, appliances, and fixtures.",
  },
  {
    category: "Services",
    q: "Can you clean after construction or renovations?",
    a: "Absolutely. Our post-construction cleaning service handles dust removal from all surfaces, debris cleanup, window and fixture polishing, and thorough vacuuming with HEPA filters to capture fine construction dust particles.",
  },
  {
    category: "Booking",
    q: "How far in advance should I book?",
    a: "We recommend booking at least 3-5 days in advance, especially for deep cleans and move-in/out services. For recurring clients, we schedule regular visits that work with your calendar.",
  },
  {
    category: "Booking",
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations or rescheduling. This helps us adjust our team's schedule. Contact us as soon as possible and we'll work with you to find an alternative time.",
  },
  {
    category: "Booking",
    q: "How long does a typical cleaning take?",
    a: "A standard recurring clean for a 1,500 sq ft home typically takes 2.5-3.5 hours. Deep cleans take 30-50% longer. Move-in/out and post-construction cleans vary based on the space condition.",
  },
  {
    category: "Products",
    q: "What cleaning products do you use?",
    a: "We use 100% plant-based, non-toxic, EPA-registered products. Our teams arrive with durable glass bottles and medical-grade microfiber cloths. Zero single-use plastics, zero harsh chemicals. All products are safe for children, pets, and people with sensitivities.",
  },
  {
    category: "Products",
    q: "Will my home smell like chemicals after cleaning?",
    a: "No! Our plant-based products leave your home smelling fresh and natural, without any harsh chemical odors. Many clients with allergies and sensitivities appreciate the clean, neutral scent.",
  },
  {
    category: "Insurance",
    q: "What happens if something gets damaged during cleaning?",
    a: "All our cleaners are fully insured under our comprehensive liability insurance. In the rare event of damage, we take full responsibility and will work with you to resolve the situation promptly and fairly.",
  },
  {
    category: "Areas",
    q: "Do you serve areas outside of Surrey?",
    a: "Yes! We serve the entire Metro Vancouver area including Vancouver, Burnaby, Richmond, Langley, Delta, Coquitlam, New Westminster, North Vancouver, West Vancouver, Maple Ridge, Pitt Meadows, and White Rock.",
  },
  {
    category: "Areas",
    q: "Is there an extra charge for service outside of Surrey?",
    a: "We keep our pricing competitive across Metro Vancouver. For locations further from our Surrey base, there may be a small travel surcharge, which will be clearly communicated before you confirm your booking.",
  },
  {
    category: "Eco-Friendly",
    q: "Is eco-friendly cleaning actually as effective as traditional chemical cleaning?",
    a: "Yes. Modern green cleaning technologies utilize powerful plant-based surfactants, enzymes, and essential oils to break down grease, grime, and bacteria just as effectively as traditional methods. Natural disinfectants like citric acid and hydrogen peroxide are proven sanitizers that kill 99.9% of germs without leaving behind the toxic residue that chemical cleaners do. Our EPA-registered, hospital-grade products have been rigorously tested to meet the same performance benchmarks as conventional cleaners.",
  },
  {
    category: "Eco-Friendly",
    q: "Why is green cleaning safer for my children and pets?",
    a: "Infants and pets spend significantly more time on the floor and frequently put their hands or paws in their mouths. Traditional cleaners often leave behind residues of ammonia, bleach, and phthalates that can cause skin rashes, respiratory distress, or even poisoning if ingested. Our non-toxic, plant-based products ensure that every surface your child crawls on or your pet sleeps near is clean and safe for them to explore.",
  },
  {
    category: "Eco-Friendly",
    q: "How does eco-friendly cleaning improve my home's air quality?",
    a: "Many conventional cleaners release Volatile Organic Compounds (VOCs) into the air, which can trigger asthma, migraines, and long-term lung damage. Studies have compared the effects of prolonged VOC exposure to smoking cigarettes indoors. CleanInstead uses low-to-no VOC products to ensure your family breathes fresh, purified air rather than lingering chemical fumes.",
  },
  {
    category: "Eco-Friendly",
    q: "Are eco-friendly cleaning services more expensive?",
    a: "While some green products carry a slightly higher upfront cost, they are often more concentrated, requiring less volume to achieve a superior clean. The long-term health benefits — such as reduced triggers for allergies and asthma, fewer sick days, and lower medical expenses — far outweigh any marginal cost difference. We also offer an Eco-Friendly Kit upgrade as an add-on to any service plan.",
  },
  {
    category: "Eco-Friendly",
    q: "Does CleanInstead use my products or bring their own?",
    a: "We provide all our own premium, eco-certified supplies to ensure every job meets our rigorous safety and performance standards. Our teams arrive with durable glass bottles, medical-grade microfiber cloths, and a complete toolkit. You never need to provide anything.",
  },
  {
    category: "Eco-Friendly",
    q: "I have a member of my household with chemical sensitivities. Is this right for us?",
    a: "Absolutely. Our services are specifically designed for households with allergies, asthma, or chemical sensitivities. We avoid synthetic fragrances and dyes entirely, which are the most common triggers for respiratory and skin irritation. Many of our clients report immediate improvements in their symptoms after switching to CleanInstead.",
  },
];

export const faqCategories = ["All", "Eco-Friendly", "Services", "Booking", "Products", "Insurance", "Areas"];

// ─── Testimonials Data ──────────────────────────────────────────────
export const testimonials = [
  {
    name: "Amanda R.",
    role: "Homeowner, Surrey",
    stars: 5,
    text: "CleanInstead transformed my home. I have two kids with allergies and since switching to their eco-friendly service, we've noticed a huge difference. No chemical smells, just a genuinely clean home every time.",
  },
  {
    name: "David & Lisa M.",
    role: "Airbnb Hosts, Vancouver",
    stars: 5,
    text: "Our guest ratings went up after hiring CleanInstead. Their teams are thorough, reliable, and the fact that they use non-toxic products is a huge selling point for our health-conscious guests.",
  },
  {
    name: "Dr. Patel",
    role: "Clinic Manager, Surrey",
    stars: 5,
    text: "As a healthcare facility, cleanliness and safety are non-negotiable. CleanInstead meets the highest standards. Their team is professional, punctual, and their products give us confidence in our patient environment.",
  },
  {
    name: "Sarah K.",
    role: "Homeowner, Guildford",
    stars: 5,
    text: "I've tried three different cleaning companies in Surrey and CleanInstead is by far the best. They show up on time, every time, and my home has never been cleaner. The eco-friendly products are a huge bonus.",
  },
  {
    name: "Mike T.",
    role: "Realtor, White Rock",
    stars: 5,
    text: "I recommend CleanInstead to all my clients for move-in/out cleans. Their attention to detail is unmatched, and my listings always look impeccable after they've been through. Properties sell faster when they're this clean.",
  },
  {
    name: "Jennifer L.",
    role: "Mom of 3, Langley",
    stars: 5,
    text: "With three kids and two dogs, my house is a constant mess. CleanInstead comes every two weeks and I can't believe how fresh and clean everything feels. The fact that the products are safe for my family gives me such peace of mind.",
  },
  {
    name: "Robert C.",
    role: "Office Manager, Vancouver",
    stars: 5,
    text: "We switched to CleanInstead for our office cleaning and the difference is remarkable. Staff allergies have decreased significantly since we eliminated the chemical cleaners. The team is always professional and discreet.",
  },
  {
    name: "Emily W.",
    role: "Condo Owner, Burnaby",
    stars: 5,
    text: "As a first-time client, I was nervous about having someone clean my home. The vetting process they told me about put me at ease, and the results speak for themselves. My condo has never looked this good!",
  },
  {
    name: "The Chen Family",
    role: "Homeowners, Richmond",
    stars: 5,
    text: "We've been using CleanInstead for over a year now and wouldn't dream of switching. Their rewards program is genuine — we've already earned a free fridge clean and are close to the next tier. Such great value!",
  },
];

// ─── Trust Badges Data ──────────────────────────────────────────────
export const trustBadges = [
  { icon: "🛡️", label: "Fully Insured & Bonded" },
  { icon: "🌿", label: "EPA-Registered Products" },
  { icon: "✅", label: "Background-Checked Staff" },
  { icon: "♻️", label: "Zero Single-Use Plastics" },
  { icon: "🩺", label: "Healthcare-Grade Standards" },
  { icon: "💯", label: "24-Hour Barefoot Guarantee" },
];

// ─── Services Data ──────────────────────────────────────────────────
export const serviceTypes = [
  { icon: "\ud83c\udfe1", title: "Residential Homes", desc: "Houses, townhomes, apartments, and condos.", href: "/services/residential" },
  { icon: "\ud83d\udce6", title: "Moving In / Out", desc: "Making transitions seamless and chemical-free.", href: "/services/move-in-out" },
  { icon: "\ud83d\udecf\ufe0f", title: "Airbnb & Short-Term", desc: "Fast turnarounds for 5-star ratings.", href: "/services/residential" },
  { icon: "\ud83c\udfe2", title: "Commercial Facilities", desc: "Offices, clinics, and retail spaces.", href: "/services/residential" },
  { icon: "\ud83c\udff7\ufe0f", title: "Real Estate Staging", desc: "Helping properties sell faster.", href: "/services/move-in-out" },
  { icon: "\ud83c\udfd7\ufe0f", title: "Post-Construction", desc: "Thorough cleanup after renovations.", href: "/services/post-construction" },
];

export const cleaningMethods = [
  {
    title: "Recurring Maintenance",
    items: ["Dusting all surfaces", "HEPA vacuuming", "Mopping with plant soap", "Kitchen sanitizing", "Bathroom scrubbing", "Compostable liners"],
  },
  {
    title: "Deep Cleans",
    items: ["Everything in Recurring, PLUS:", "Inside oven & microwave", "Inside fridge wipe-down", "Baseboard wiping", "Window sill cleaning", "Light fixture dusting"],
  },
  {
    title: "Premium Add-Ons",
    items: ["Eco-Oven Degreasing", "Full Fridge Purge", "Interior Windows", "Cabinet Degreasing", "Mattress Vacuum", "Pet-Safe Upholstery"],
  },
];

// ─── Rewards Data ───────────────────────────────────────────────────
export const rewardTiers = [
  { icon: "\ud83c\udf3f", title: "Green Starter", threshold: 3, reward: "Free Fridge Clean" },
  { icon: "\ud83c\udf31", title: "Eco Advocate", threshold: 6, reward: "Free Windows" },
  { icon: "\ud83c\udf33", title: "Planet Protector", threshold: 10, reward: "1 FREE Clean" },
];

// Loyalty milestones for Healthy Home Club
export const loyaltyMilestones = [
  { count: 5, icon: "\ud83e\uddca", title: "The 5th Clean Bonus", reward: "Choose a FREE Add-On", desc: "Inside Oven, Inside Fridge, or Interior Windows — on us!" },
  { count: 10, icon: "\u2728", title: "The 10th Clean Milestone", reward: "$50 Credit OR Free Deep Clean Upgrade", desc: "Use the credit toward any service, or upgrade your Standard Clean to a full Deep Clean at no extra charge." },
  { count: 20, icon: "\ud83c\udf1f", title: "Anniversary Reward", reward: "Complimentary Deep Clean Upgrade", desc: "Every year you stay with us, enjoy a free upgrade to our premium Deep Clean on your anniversary month — plus a small eco-friendly gift on the counter." },
];

// ─── Values Data ────────────────────────────────────────────────────
export const values = [
  { title: "Sustainability First", desc: "Every decision we make is measured against its environmental impact. We believe business success and planetary health go hand in hand." },
  { title: "Radical Transparency", desc: "We publish every ingredient we use, every process we follow, and every result we achieve. No hidden chemicals, no hidden fees." },
  { title: "Client Wellbeing", desc: "Your health is our priority. We never compromise on product safety or indoor air quality to cut corners or save time." },
  { title: "Fair Treatment", desc: "Our cleaners earn living wages, receive ongoing training, and work in safe conditions. Happy teams deliver exceptional results." },
  { title: "Continuous Innovation", desc: "We invest in researching and adopting the latest green cleaning technologies to stay at the forefront of sustainable cleaning." },
  { title: "Community Impact", desc: "We actively support local environmental initiatives and donate a portion of every booking to watershed conservation programs." },
];

// New About page core values
export const aboutCoreValues = [
  { title: "Healthcare-Grade Standards", desc: "We apply the discipline of 30 years in healthcare to every residential and commercial job." },
  { title: "Sustainability Without Compromise", desc: "Every product we use is measured against its environmental impact. We prove that a spotless home doesn't have to cost the planet." },
  { title: "Radical Transparency", desc: "No hidden fees, no hidden chemicals. We are open about our processes and our pricing." },
  { title: "Client Wellbeing", desc: "Your indoor air quality is our priority. We use non-toxic, eco-friendly products that are safe for pets, children, and those with sensitivities." },
  { title: "Fair Treatment", desc: "Our cleaners are local Surrey professionals who earn living wages. We believe that a respected team delivers exceptional results." },
  { title: "Continuous Innovation", desc: "We invest in the latest green cleaning technologies to stay at the forefront of the sustainable cleaning movement." },
];

// ─── Vetting Steps ──────────────────────────────────────────────────
export const vettingSteps = [
  { icon: "\ud83e\udeaa", title: "1. Identity & Criminal Background Check", desc: "We mandate a comprehensive criminal background check for every applicant. No exceptions." },
  { icon: "\ud83d\udcbc", title: "2. Professional Reference Checks", desc: "We contact past employers regarding attention to detail, reliability, and integrity." },
  { icon: "\ud83e\uddea", title: "3. Eco-Product Skills Assessment", desc: "Cleaners must pass a practical exam demonstrating proficiency with our eco-friendly products and techniques." },
  { icon: "\ud83d\udccb", title: "4. Insurance Verification", desc: "Before entering your home, we verify they are fully covered under our comprehensive liability insurance." },
];

// ─── Location Data ─────────────────────────────────────────────────
export const postalCodeMap: Record<string, string> = {
  "V5A": "Vancouver (Strathcona/Renfrew)", "V5B": "Vancouver (Kensington/Cedar Cottage)",
  "V5C": "Vancouver (Victoria-Fraserview)", "V5E": "Vancouver (Killarney)",
  "V5G": "Vancouver (South Vancouver)", "V5H": "Vancouver (Main/Fraser)",
  "V5J": "Vancouver (South Granville)", "V5K": "Vancouver (Marpole/Oakridge)",
  "V5L": "Vancouver (Kerrisdale/Dunbar)", "V5M": "Vancouver (Shaughnessy)",
  "V5N": "Vancouver (Kitsilano/Point Grey)", "V5P": "Vancouver (UBC/West Point Grey)",
  "V5R": "Vancouver (Arbutus Ridge)", "V5S": "Vancouver (Sunset)",
  "V5T": "Vancouver (Mount Pleasant)", "V5V": "Vancouver (Fairview)",
  "V5W": "Vancouver (False Creek/Olympic Village)", "V5X": "Vancouver (Downtown Eastside)",
  "V5Y": "Vancouver (West End)", "V5Z": "Vancouver (Downtown/Burrard)",
  "V6A": "Vancouver (Gastown/Chinatown)", "V6B": "Vancouver (Downtown Core)",
  "V6C": "Vancouver (Coal Harbour)", "V6E": "Vancouver (Burrard/Robson)",
  "V6G": "Vancouver (West End/Stanley Park)", "V6H": "Vancouver (Kitsilano/Beach)",
  "V6J": "Vancouver (Main Street/False Creek)", "V6K": "Vancouver (Kerrisdale)",
  "V6L": "Vancouver (Dunbar/Southlands)", "V6M": "Vancouver (Oakridge/Marpole)",
  "V6N": "Vancouver (Granville Island)", "V6P": "Vancouver (UBC)",
  "V6R": "West Vancouver", "V6S": "West Vancouver (Ambleside)",
  "V6T": "Vancouver (UBC Campus)", "V6V": "North Vancouver (Lower Lonsdale)",
  "V6W": "North Vancouver (Central Lonsdale)", "V6X": "North Vancouver (Upper Lonsdale)",
  "V6Y": "North Vancouver (Deep Cove)", "V6Z": "North Vancouver (Lynn Valley)",
  "V7A": "North Vancouver (Capilano)", "V7B": "North Vancouver",
  "V7C": "North Vancouver", "V7E": "West Vancouver",
  "V7G": "West Vancouver (Horseshoe Bay)", "V7H": "West Vancouver (Caulfeild)",
  "V7J": "West Vancouver (British Properties)", "V7K": "West Vancouver",
  "V7L": "West Vancouver", "V7M": "North Vancouver",
  "V7N": "North Vancouver", "V7P": "North Vancouver",
  "V7R": "Burnaby (Metrotown)", "V7S": "Burnaby (Brentwood)",
  "V7T": "Burnaby (Edmonds)", "V7V": "Burnaby (South Slope)",
  "V7W": "Burnaby (SFU/Lochdale)", "V7X": "Burnaby (Louheed)",
  "V7Y": "New Westminster", "V7Z": "New Westminster",
  "V3A": "Surrey (Whalley)", "V3B": "Surrey (Guildford)",
  "V3C": "Surrey (Fleetwood)", "V3E": "Surrey (Newton)",
  "V3F": "Surrey (Cloverdale)", "V3G": "Surrey (Bear Creek)",
  "V3H": "Surrey (Fraser Heights)", "V3J": "Surrey (South Surrey)",
  "V3K": "Surrey (Morgan Heights)", "V3L": "Surrey (Grandview Heights)",
  "V3M": "Surrey (Crescent Beach)", "V3N": "White Rock",
  "V3P": "White Rock", "V3Q": "Surrey",
  "V3R": "Surrey (City Centre)", "V3S": "Surrey (Panorama)",
  "V3T": "Surrey (Green Timbers)", "V3V": "Surrey (Bridgeview)",
  "V3W": "Surrey", "V3X": "Langley",
  "V3Y": "Langley (Willowbrook)", "V3Z": "Langley (Brookswood)",
  "V4A": "Richmond (Steveston)", "V4B": "Richmond (City Centre)",
  "V4C": "Richmond (Brighouse)", "V4E": "Richmond (East Richmond)",
  "V4G": "Richmond (Hamilton)", "V4H": "Richmond (Ironwood)",
  "V4J": "Richmond (Shellmont)", "V4K": "Richmond (Riverdale)",
  "V4L": "Richmond (Sea Island)", "V4M": "Richmond (South Arm)",
  "V4N": "Richmond (Thompson)", "V4P": "Richmond (Broadmoor)",
  "V4R": "Richmond (Blundell)", "V4S": "Delta (Ladner)",
  "V4T": "Delta (Tsawwassen)", "V4V": "Delta (North Delta)",
  "V4W": "Delta", "V4X": "Delta",
  "V4Y": "Delta", "V4Z": "Delta",
  "V2W": "Maple Ridge", "V2X": "Maple Ridge",
  "V2Y": "Pitt Meadows", "V2Z": "Maple Ridge",
  "V2V": "Mission", "V2T": "Mission",
};

export const serviceRegions = [
  {
    name: "Surrey & White Rock",
    cities: ["Surrey (Whalley, Guildford, Fleetwood, Newton, Cloverdale, South Surrey)", "White Rock"],
    icon: "🏠",
    href: "/locations/surrey",
  },
  {
    name: "Vancouver",
    cities: ["Downtown Vancouver", "Kitsilano & Point Grey", "South Granville & Marpole", "Mount Pleasant & Main Street", "East Vancouver", "UBC & West Point Grey"],
    icon: "🏙️",
    href: "/locations/vancouver",
  },
  {
    name: "Burnaby & New Westminster",
    cities: ["Burnaby (Metrotown, Brentwood, Edmonds, SFU)", "New Westminster"],
    icon: "🏢",
    href: "/locations/burnaby",
  },
  {
    name: "Richmond & Delta",
    cities: ["Richmond (Steveston, Brighouse, Ironwood)", "Delta (Ladner, Tsawwassen, North Delta)", "White Rock"],
    icon: "🌊",
    href: "/locations/richmond",
  },
  {
    name: "North Shore",
    cities: ["North Vancouver (City & District)", "West Vancouver (Ambleside, Horseshoe Bay, British Properties)", "Deep Cove"],
    icon: "⛰️",
    href: "/locations/surrey",
  },
  {
    name: "Tri-Cities",
    cities: ["Coquitlam (Town Centre, Westwood Plateau, Burke Mountain)", "Port Coquitlam", "Port Moody (Rocky Point)"],
    icon: "🌲",
    href: "/locations/surrey",
  },
  {
    name: "Langley",
    cities: ["Langley City", "Langley Township (Willowbrook, Brookswood, Aldergrove)"],
    icon: "🌾",
    href: "/locations/langley",
  },
  {
    name: "Maple Ridge & Pitt Meadows",
    cities: ["Maple Ridge", "Pitt Meadows"],
    icon: "🏕️",
    href: "/locations/surrey",
  },
];

// ─── Cleaning Tips Data ─────────────────────────────────────────────
export const cleaningTips = [
  {
    id: 1,
    category: "Kitchen",
    title: "5 Eco-Friendly Ways to Keep Your Kitchen Spotless",
    excerpt: "Discover plant-based cleaning techniques that cut through grease and grime without harmful chemicals. From DIY all-purpose sprays to natural degreasers, your kitchen will sparkle safely.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    readTime: "4 min read",
    date: "Mar 15, 2025",
    content: `<p>Your kitchen is the heart of your home, but it also happens to be the room that gathers grease, food splatters, and bacteria the fastest. The good news is that you don't need a cabinet full of toxic chemicals to keep it sparkling. Here are five eco-friendly methods our CleanInstead team uses every day in client kitchens across Metro Vancouver.</p>
<h3>1. DIY All-Purpose Kitchen Spray</h3>
<p>Mix equal parts white vinegar and water in a spray bottle, then add 10 drops of tea tree or lemon essential oil. This solution cuts through countertop grease, stovetop splatters, and even fridge spills. Spray, let sit for 60 seconds, and wipe with a microfiber cloth. The acid in vinegar breaks down grease bonds naturally.</p>
<h3>2. Baking Soda Paste for Stuck-On Messes</h3>
<p>For baked-on oven residue or stubborn stovetop stains, make a thick paste using three parts baking soda to one part water. Apply it directly to the problem area, let it sit for 15 to 20 minutes, then scrub gently with a non-abrasive sponge. Baking soda is a mild abrasive that lifts grime without scratching surfaces like ceramic or stainless steel.</p>
<h3>3. Lemon &amp; Salt for Cutting Boards</h3>
<p>Wooden cutting boards absorb odors and bacteria over time. Sprinkle coarse sea salt across the board, then rub half a lemon over the surface, squeezing slightly as you go. The salt acts as a gentle scrubber while the lemon's citric acid sanitizes and deodorizes. Rinse and let air-dry vertically.</p>
<h3>4. Steam Clean Your Microwave</h3>
<p>Fill a microwave-safe bowl with water and lemon slices, then microwave on high for 3 minutes. Let the steam sit inside for 5 minutes before opening the door. The steam loosens hardened food splatters so you can wipe them away with a single pass of a damp cloth. No scrubbing required, and your microwave will smell amazing.</p>
<h3>5. Castile Soap for Greasy Dishes</h3>
<p>Swap your conventional dish soap for a plant-based castile soap like Dr. Bronner's. A few drops on a damp sponge produces a rich lather that cuts through cooking grease just as effectively as petroleum-based soaps, but without leaving chemical residue on the surfaces where you prepare food. It's also biodegradable, so it's safer for our BC waterways.</p>`
  },
  {
    id: 2,
    category: "Bathroom",
    title: "The Ultimate Guide to Mold-Free Bathrooms",
    excerpt: "Vancouver's rainy climate makes bathrooms prone to mold. Learn our professional techniques for preventing and removing mold using only non-toxic, EPA-registered products.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    readTime: "5 min read",
    date: "Mar 10, 2025",
    content: `<p>Metro Vancouver's wet climate means bathrooms are ground zero for mold and mildew growth. With humidity levels regularly spiking after hot showers and limited ventilation in many condos and apartments, it's no wonder bathroom mold is one of the most common complaints we hear from clients. Here's how to prevent it and handle existing growth safely.</p>
<h3>Why Mold Loves BC Bathrooms</h3>
<p>Mold thrives when three conditions are met: moisture, warmth, and organic material. Your bathroom provides all three after every shower. In older Vancouver homes and many newer condo builds, bathroom exhaust fans are either underpowered or non-existent, trapping humid air inside for hours. This creates the perfect breeding ground for black mold around grout lines, silicone seals, and ceiling corners.</p>
<h3>Prevention: The Daily Habits That Matter Most</h3>
<p>The single most effective prevention tool is a squeegee. Wiping down your shower glass and tile walls after every use removes up to 90% of the surface moisture that mold needs to grow. It takes less than 30 seconds. Leave your bathroom door open and, if possible, a window cracked for at least 30 minutes after showering. If you have an exhaust fan, run it for a full 20 minutes post-shower, not just while you're in the room.</p>
<h3>Removal: Safe Products That Actually Work</h3>
<p>For existing mold, skip the bleach. Bleach only lightens mold on the surface while the roots remain intact and continue growing beneath. Instead, spray undiluted white vinegar directly onto affected grout and seals, let it sit for one hour, then scrub with an old toothbrush. The acetic acid in vinegar penetrates porous surfaces and kills mold at the root level. For tougher jobs, use a hydrogen peroxide-based cleaner with an EPA Safer Choice label. These products are non-toxic, safe around children and pets, and proven effective against mold spores.</p>
<h3>When to Call a Professional</h3>
<p>If mold covers an area larger than roughly 10 square feet, has a strong musty odor, or keeps returning despite regular cleaning, it may have spread behind walls or under flooring. At that point, professional remediation is the safest option. Our CleanInstead team is trained to identify hidden mold sources and uses hospital-grade, eco-friendly products that eliminate the problem without exposing your family to harmful chemicals.</p>`
  },
  {
    id: 3,
    category: "Seasonal",
    title: "Spring Cleaning Checklist for Metro Vancouver Homes",
    excerpt: "A room-by-room spring cleaning guide tailored for BC homes. Tackle everything from windows to baseboards with our eco-friendly approach, perfect for the Pacific Northwest lifestyle.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    readTime: "6 min read",
    date: "Mar 5, 2025",
    content: `<p>Spring in Metro Vancouver means longer days, cherry blossoms, and the perfect opportunity to give your home a deep, thorough refresh after a wet winter. Our CleanInstead team has cleaned thousands of homes across Surrey, Delta, Langley, and Vancouver, and we've refined this room-by-room checklist to cover every detail that matters.</p>
<h3>Kitchen Deep Clean</h3>
<p>Start by emptying every cabinet and wiping the interiors with a vinegar-water solution. Pull appliances away from walls and clean behind and underneath them. Descale your kettle by boiling equal parts water and vinegar. Clean the range hood filter by soaking it in hot soapy water for 30 minutes. Don't forget the top of the fridge, a notorious dust collector that most people never see.</p>
<h3>Bathrooms</h3>
<p>Remove all items from shower shelves and vanities. Scrub grout lines with a baking soda paste and a grout brush. Replace shower curtain liners if they've developed mold spots. Clean exhaust fan covers by removing them and washing in warm soapy water. Re-caulk around the tub if you notice cracking or peeling silicone.</p>
<h3>Living Areas &amp; Bedrooms</h3>
<p>Steam-clean or shampoo carpets and area rugs. Flip and rotate mattresses. Wash all bedding, including duvets and pillow covers, in hot water. Dust ceiling fans, light fixtures, and the tops of bookshelves using a microfiber duster with an extendable handle. Wipe down baseboards with a damp cloth and a drop of dish soap.</p>
<h3>Windows</h3>
<p>Wash both interior and exterior window glass using a solution of one cup vinegar per gallon of warm water and a microfiber cloth. Clean window tracks by vacuuming loose dirt, then wiping with a damp cloth. Replace or clean window screens. This single task makes a surprisingly huge difference in how bright and fresh your home feels.</p>
<h3>Entryways &amp; Outdoor Spaces</h3>
<p>Sweep and pressure-wash patios, decks, and driveways. Clean door mats and replace worn ones. Wipe down the front door and door frame. Clear gutters of winter debris. Power-wash siding if it's looking dull or stained from winter rain splash-back. These exterior touches complete the spring refresh and give your home serious curb appeal.</p>`
  },
  {
    id: 4,
    category: "Eco-Friendly",
    title: "Why We Chose Plant-Based Over Traditional Cleaners",
    excerpt: "The science behind our product choices. We break down exactly why plant-based cleaning solutions outperform chemical alternatives for both cleanliness and family health.",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&h=400&fit=crop",
    readTime: "5 min read",
    date: "Feb 28, 2025",
    content: `<p>When we founded CleanInstead, one of our earliest and most important decisions was the products we'd use in client homes. As nurses, health and safety are at the core of everything we do. After extensive research and real-world testing, we committed exclusively to plant-based, EPA-registered cleaning solutions. Here's why, and why it matters for your family.</p>
<h3>The Problem with Traditional Cleaners</h3>
<p>Most conventional cleaning products contain volatile organic compounds (VOCs) like ammonia, bleach, phthalates, and synthetic fragrances. These chemicals release fumes that linger in indoor air for hours after cleaning. Studies published by the American Lung Association link regular exposure to these VOCs with headaches, asthma flare-ups, allergic reactions, and even long-term respiratory issues. Children, elderly family members, and pets are especially vulnerable because they spend more time close to floors and surfaces where residues settle.</p>
<h3>Why Plant-Based Solutions Win</h3>
<p>Modern plant-based cleaners have come a long way. The formulations we use are derived from natural enzymes, citric acid, hydrogen peroxide, and essential oils. They're scientifically proven to kill 99.9% of bacteria and viruses, including E. coli, Salmonella, and influenza, which is the same standard that traditional chemical cleaners achieve. The key difference is what they leave behind: zero toxic residue, zero synthetic fragrances, and zero harmful off-gassing. Your surfaces are genuinely clean, not just chemically stripped.</p>
<h3>Better for the Environment</h3>
<p>Every time you rinse a conventional cleaner down the drain, those chemicals enter Metro Vancouver's water system. Plant-based products biodegrade rapidly and don't accumulate in waterways or harm aquatic life. They also come in recyclable packaging, reducing the environmental footprint of every clean. For a company based in one of the greenest cities in the world, this matters deeply to us and to our clients who value sustainability.</p>
<h3>Real Results, Not Compromises</h3>
<p>Our clients regularly tell us their homes have never felt cleaner or smelled fresher since switching to our plant-based service. The natural citrus and lavender scents are pleasant without being overpowering. Surfaces feel genuinely smooth and residue-free. And perhaps most importantly, families with asthma, allergies, or young children report significant improvements in their indoor comfort. Eco-friendly isn't a compromise; it's an upgrade in every way that matters.</p>`
  },
  {
    id: 5,
    category: "Organization",
    title: "10 Decluttering Tips Before Your Deep Clean",
    excerpt: "A clean home starts with less stuff. These proven decluttering strategies will make your deep clean faster, more effective, and surprisingly therapeutic.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    readTime: "4 min read",
    date: "Feb 20, 2025",
    content: `<p>Before our CleanInstead team arrives for a deep clean, we always recommend that clients spend 20 to 30 minutes decluttering first. It makes an enormous difference. When surfaces are clear, we can clean faster and more thoroughly, which means you get better results for your investment. Here are ten decluttering strategies we've seen work wonders in real Metro Vancouver homes.</p>
<h3>1. Start with Flat Surfaces</h3><p>Kitchen counters, dining tables, coffee tables, and bathroom vanities are the biggest culprits. Put away appliances you rarely use, file paperwork, and clear everything that doesn't belong. A clear surface instantly makes any room feel cleaner.</p><h3>2. The Four-Box Method</h3><p>Label four boxes or bags: Keep, Donate, Trash, and Relocate. Walk through each room and place every misplaced item into one of these categories. This forces quick decisions and prevents the classic "I'll deal with it later" pile.</p><h3>3. Handle Clothing First</h3><p>Pick up all clothes from floors, chairs, and bedposts. Sort into laundry, donation, and closet. A bedroom with no visible clothing on the floor looks dramatically different before a single wipe has happened.</p><h3>4. Clear the Floor</h3><p>Toys, shoes, boxes, and bags on the floor slow down vacuuming and mopping. Do a sweep of every room and move floor items to their proper places. Don't worry about organizing closets perfectly; just get things off the floor.</p><h3>5. Pre-Sort Kitchen Items</h3><p>Clear the sink of all dishes, load the dishwasher, and put away groceries. Group items on counters so our team can wipe down entire surfaces without working around your belongings.</p><h3>6. Bathroom Bottles</h3><p>Corral all shampoo, soap, and skincare products into a caddy or under the sink. This gives us full access to tub ledges, shower shelves, and vanity tops for proper scrubbing and sanitizing.</p><h3>7. The 90-Day Rule</h3><p>If you haven't used an item in the past 90 days and it's not seasonal, it's a strong candidate for donation. Apply this to kitchen gadgets, closet items, and bathroom products that have accumulated over time.</p><h3>8. Deal with Paper Piles</h3><p>Paper is the number one clutter source in most homes. Sort mail, school papers, and receipts into three piles: action needed, file, and recycle. Shred anything with personal information.</p><h3>9. Empty the Trash First</h3><p>Empty every garbage can and recycling bin before cleaning begins. Full bins take up space, create odors, and can't be properly wiped down when they're still in use.</p><h3>10. Take Before Photos</h3><p>Before you start decluttering, snap a quick photo of each room. After your CleanInstead deep clean, take another set. The transformation is incredibly satisfying, and it helps you maintain the standard going forward.</p>`
  },
  {
    id: 6,
    category: "Airbnb",
    title: "How to Get 5-Star Cleaning Reviews on Airbnb",
    excerpt: "As experienced Airbnb cleaners, we share our checklist for consistently earning 5-star ratings. From guest expectations to the details that matter most.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    readTime: "6 min read",
    date: "Feb 15, 2025",
    content: `<p>As an Airbnb host in Metro Vancouver, your cleaning quality is the single biggest factor in your guest reviews. According to Airbnb data, cleanliness is mentioned in more reviews than any other category, and it directly affects your search ranking. At CleanInstead, we clean dozens of Airbnb properties across Surrey, Vancouver, and Richmond every week, and we've learned exactly what guests look for. Here's our playbook.</p>
<h3>The First 30 Seconds Matter Most</h3><p>When a guest walks through the door, they form an impression within seconds. That means entryways, the living room, and the kitchen must be spotless immediately. Focus on these areas first: wipe down the front door handle and deadbolt, ensure the entry floor is freshly vacuumed or mopped, and make sure the kitchen counters are completely clear and gleaming.</p><h3>The Bathroom Standard</h3><p>Guests inspect bathrooms closely. Replace all towels with freshly laundered sets, folded neatly. Wipe down every surface including the back of the toilet, the base of the sink, and inside the medicine cabinet mirror. Clean the shower drain of any hair. Replace the toilet paper roll completely, and leave a spare within easy reach. These small touches signal that you care about the guest experience.</p><h3>Bedding That Feels Like a Hotel</h3><p>Use white or neutral bedding for a clean, hotel-like appearance. Iron or steam pillowcases and duvet covers for a crisp finish. Check every pillow for stains and replace any that show wear. Tuck sheets tightly using hospital corners. Guest after guest, the number one compliment hosts receive is about how comfortable and fresh the bed feels.</p><h3>Kitchen Details Guests Notice</h3><p>Empty the dishwasher and leave it open and ready. Wipe the inside of the microwave, including the turntable. Clean the stovetop grates thoroughly. Leave a fresh sponge at the sink, a roll of paper towels, and basic cooking essentials like oil, salt, and pepper. A well-stocked, sparkling kitchen makes guests feel at home instantly.</p><h3>The Final Walkthrough</h3><p>Before you mark the clean as complete, do a slow walkthrough as if you're the arriving guest. Sit on the couch. Open the fridge. Walk into the bedroom. Look under the beds. Open every drawer and cabinet door. Flush the toilets and run the taps. This final pass catches the 5% of details that separate a good clean from a five-star clean.</p><h3>Why Professional Cleaners Pay for Themselves</h3><p>A consistently clean Airbnb commands higher nightly rates, earns better reviews, and ranks higher in search results. Our CleanInstead Airbnb clients report that switching to professional eco-friendly cleaning has increased their average review score by 0.3 to 0.5 points, which translates directly into more bookings and higher revenue. For busy hosts, outsourcing cleaning is not an expense; it's an investment.</p>`
  },
  {
    id: 7,
    category: "Pet Care",
    title: "Pet-Safe Cleaning: Keeping Floors Clean with Fur Babies",
    excerpt: "Your pets walk on, sleep on, and lick your floors. Learn which cleaning methods are safe for dogs, cats, and other pets while still eliminating odors and allergens.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    readTime: "4 min read",
    date: "Feb 10, 2025",
    content: `<p>If you have pets, you already know that keeping floors clean is a never-ending battle. Between muddy paws, shedding season, pet accidents, and the occasional knocked-over water bowl, your floors take a serious beating. But here's the critical issue most pet owners overlook: your pets walk on, sleep on, and yes, lick your floors. That means every cleaning product you use ends up on their paws, in their fur, and potentially in their system.</p><h3>Products to Avoid Entirely</h3><p>Bleach, ammonia, pine oil, and phthalate-based floor cleaners are toxic to pets. Cats are especially sensitive because they groom themselves constantly, transferring floor residues directly into their mouths. Dogs are at risk too, as they tend to lick their paws after walking on freshly cleaned floors. Even products labeled "natural" can contain essential oils like tea tree, eucalyptus, and citrus that are harmful to cats and some dog breeds. Always check ingredient lists carefully.</p><h3>Safe Floor Cleaning Methods</h3><p>For hardwood and laminate floors, plain warm water with a small amount of mild castile soap is the safest option. For tile and vinyl, a solution of one cup white vinegar per gallon of warm water works well and is completely pet-safe once dry. For carpet stains and odors, enzyme-based cleaners are your best friend. These products use natural enzymes to break down organic stains and odors at the molecular level, and they're non-toxic even before drying.</p><h3>Managing Shedding Between Cleans</h3><p>Invest in a high-quality rubber broom for hard floors. The static charge attracts pet hair like a magnet and it works far better than traditional brooms. For carpets, vacuum at least twice a week using a machine with a HEPA filter to capture dander and allergens. Keep washable pet blankets on furniture to reduce hair transfer to upholstery and make spot cleaning much easier.</p><h3>The CleanInstead Approach</h3><p>Our cleaning teams are trained to use exclusively pet-safe, plant-based products in every home we service. When we know a client has pets, we take extra precautions: we use enzyme-based solutions on carpet stains, avoid all essential oils near pet areas, and ensure floors are completely dry before pets are allowed back into the room. It's one more reason families with fur babies choose our eco-friendly service.</p>`
  },
  {
    id: 8,
    category: "Laundry",
    title: "Eco-Friendly Laundry Hacks That Actually Work",
    excerpt: "Ditch the toxic fabric softeners and chemical detergents. These natural laundry tips will keep your clothes fresh, soft, and free from irritating residues.",
    image: "/tip-laundry.jpg",
    readTime: "3 min read",
    date: "Feb 5, 2025",
    content: `<p>Laundry is one of those household tasks where small product changes can make a massive difference for your health, your clothes, and the environment. Most conventional laundry detergents and fabric softeners contain synthetic fragrances, optical brighteners, and petroleum-based surfactants that leave chemical residue on your clothing. These residues sit against your skin all day and can trigger rashes, eczema flare-ups, and allergic reactions, especially in children and sensitive adults.</p><h3>Swap Your Detergent</h3><p>Switch to a plant-based, fragrance-free laundry detergent. Brands like Seventh Generation, Attitude, and Molly's Suds use natural enzymes and plant-derived surfactants that clean just as effectively without the synthetic additives. You don't need hot water either; modern eco-detergents are formulated to work in cold water, which saves energy and preserves fabric color and elasticity. Wash your towels and bedding in warm water for proper sanitization, but everything else does fine on cold.</p><h3>Ditch the Fabric Softener</h3><p>Conventional fabric softeners work by coating fibers in a thin layer of wax, which actually reduces fabric absorbency over time and can clog the lint trap in your dryer. Instead, add half a cup of white vinegar to the fabric softener compartment. It softens clothes naturally, removes residual detergent, and helps eliminate static cling. Don't worry, the vinegar smell dissipates completely during the rinse cycle.</p><h3>Wool Dryer Balls</h3><p>Replace disposable dryer sheets with reusable wool dryer balls. They bounce around in the dryer, separating clothes to reduce drying time by 15 to 25 percent. They also naturally soften fabrics and reduce static. Add three to four balls per load, and they'll last for over a thousand loads before needing replacement, saving you significant money over time.</p><h3>Dealing with Stubborn Stains</h3><p>For oil-based stains like salad dressing or makeup, dab dish soap directly onto the stain before washing. For sweat stains on white shirts, make a paste of baking soda and water, apply to the underarm area, and let sit for 30 minutes before laundering. For blood stains, soak in cold water with hydrogen peroxide. Never use hot water on protein-based stains as the heat sets them permanently into the fabric.</p>`
  },
  {
    id: 9,
    category: "Health",
    title: "Indoor Air Quality: How Cleaning Affects Your Health",
    excerpt: "Research shows indoor air can be 5x more polluted than outdoor air. Learn how switching to eco-friendly cleaning dramatically improves your home's air quality.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    readTime: "5 min read",
    date: "Jan 28, 2025",
    content: `<p>The EPA has reported that indoor air can be two to five times more polluted than outdoor air, and in some cases up to 100 times worse. Given that the average Canadian spends roughly 90 percent of their time indoors, the quality of your home's air has a direct and significant impact on your health. One of the biggest contributors to poor indoor air quality is the cleaning products you use every week.</p><h3>How Traditional Cleaners Pollute Indoor Air</h3><p>Conventional spray cleaners, disinfectants, and scented products release volatile organic compounds (VOCs) into the air every time you use them. These invisible gases include formaldehyde, benzene, and toluene, all of which are known to cause respiratory irritation, headaches, dizziness, and with long-term exposure, more serious health effects. The fragrance in scented cleaners is particularly problematic because companies aren't required to disclose fragrance ingredients, which can contain dozens of undisclosed chemicals.</p><h3>The Eco-Friendly Difference</h3><p>Plant-based, fragrance-free cleaning products emit virtually zero VOCs into your home's air. When our CleanInstead team cleans your home, the only thing you'll notice is the fresh, natural scent of clean surfaces. No chemical after-smell, no lingering fumes, no headaches. For families with asthma sufferers, this difference is life-changing. Several of our clients have reported that switching to our plant-based service has reduced asthma symptoms and allergy flare-ups for their children by a noticeable margin within just the first few weeks.</p><h3>Cleaning Routines That Improve Air Quality</h3><p>Beyond product choice, your cleaning habits affect air quality too. Vacuum frequently with a HEPA-filtered machine to capture dust, pollen, and pet dander before they become airborne. Dust with a damp microfiber cloth instead of a dry duster, which often just pushes particles into the air. Wash bedding weekly in hot water to eliminate dust mites. And always ventilate while cleaning by opening windows and running exhaust fans, even when using eco-friendly products.</p><h3>The Bottom Line</h3><p>Your home should be a place that supports your health, not undermines it. By choosing plant-based cleaning products and maintaining regular cleaning routines, you can dramatically reduce indoor pollutants and create a healthier living environment for your entire family. It's one of the simplest and most impactful changes you can make for your household's wellbeing.</p>`
  },
  {
    id: 10,
    category: "Kitchen",
    title: "How to Clean Your Oven Without Harsh Chemicals",
    excerpt: "Baking soda, vinegar, and elbow grease — that's all you need. Our step-by-step method leaves your oven spotless without the toxic fumes of commercial oven cleaners.",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600&h=400&fit=crop",
    readTime: "3 min read",
    date: "Jan 22, 2025",
    content: `<p>Commercial oven cleaners are among the most toxic products in any home. They contain sodium hydroxide (lye), butane, and ethylene glycol, chemicals that can cause severe burns, respiratory distress, and eye damage. The fumes alone are enough to drive people out of their kitchens for hours. The good news is that you can achieve a perfectly clean oven using just three safe, inexpensive ingredients: baking soda, white vinegar, and water.</p><h3>Step 1: Remove the Racks</h3><p>Take out all oven racks and set them aside. Fill your sink with hot water and add half a cup of dish soap. Let the racks soak while you clean the oven interior. For especially greasy racks, add a quarter cup of baking soda to the soak water.</p><h3>Step 2: Apply the Baking Soda Paste</h3><p>Mix half a cup of baking soda with two to three tablespoons of water to form a thick, spreadable paste. Using a sponge or your hands, coat the entire interior of the oven with the paste, paying extra attention to greasy spots and baked-on residue. Avoid the heating elements. Close the oven door and let the paste sit overnight, or for at least four hours if you're short on time. The baking soda will soften and lift the grime while you wait.</p><h3>Step 3: Wipe Clean</h3><p>Open the oven and use a damp microfiber cloth to wipe away the baking soda paste. Most of the grime should come off easily with the paste. For stubborn spots, spray a little white vinegar directly onto the area. The vinegar will react with the remaining baking soda, creating a mild fizzing action that loosens tough residue. Wipe again with a damp cloth.</p><h3>Step 4: Clean the Racks and Finish</h3><p>Scrub the soaking racks with a scouring pad, rinse thoroughly, and dry before putting them back in the oven. Give the oven door a final wipe with a vinegar-water solution. The entire process takes about 20 minutes of active work plus overnight sitting time, and the result is an oven that looks and smells brand new without any toxic exposure.</p>`
  },
  {
    id: 11,
    category: "Seasonal",
    title: "Fall Prep: Winterize Your Home Before the Rain Hits",
    excerpt: "Metro Vancouver winters mean dampness and mud. Learn how to prep entryways, clean gutters, and protect floors before the rainy season takes over.",
    image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=600&h=400&fit=crop",
    readTime: "5 min read",
    date: "Jan 15, 2025",
    content: `<p>Anyone who's lived through a Metro Vancouver winter knows the drill: relentless rain, mud-tracked floors, musty smells, and windows that seem perpetually foggy. But with some strategic preparation in early fall, you can dramatically reduce the winter cleaning burden and keep your home fresh, dry, and comfortable all season long. Here's our CleanInstead team's winterizing checklist.</p><h3>Entryway Setup</h3><p>Your entryway is your first line of defense against winter mess. Place heavy-duty absorbent mats both inside and outside every exterior door. Add a boot tray near the most-used entrance to catch wet shoes and drips. Consider adding a small bench or shoe rack so family members and guests can remove wet footwear immediately. If you have a coat closet near the entrance, stock it with extra hangers so wet jackets don't end up draped over furniture.</p><h3>Gutters and Drainage</h3><p>Clogged gutters cause water to overflow and run down your exterior walls, which can lead to dampness, mold, and water damage inside your home. Clean all gutters and downspouts in October before the heavy rains start. Check that downspouts direct water at least three feet away from your foundation. If you notice any leaks or loose sections, repair them before winter. This single task prevents a cascade of moisture-related problems.</p><h3>Window and Door Seals</h3><p>Check all window and door weatherstripping for cracks or gaps. Even small gaps let in cold air and moisture, which leads to condensation on interior surfaces and potential mold growth. Replace any worn weatherstripping and apply silicone caulk to gaps around window frames. This also improves energy efficiency, saving you on heating bills throughout the winter months.</p><h3>Deep Clean Carpets and Rugs</h3><p>Have your carpets professionally steam-cleaned in October or November before the wet season begins. Clean carpets dry faster and resist mold growth better than dirty ones because there's less trapped organic material for mold spores to feed on. Apply a carpet protectant treatment if possible, which creates an invisible barrier against water and dirt.</p><h3>Ventilation Check</h3><p>Test your bathroom exhaust fans, kitchen range hood, and dryer vent to make sure they're all functioning properly. Good ventilation is your best weapon against winter moisture buildup. If your bathroom fans are weak or noisy, consider upgrading them. The small investment pays for itself in prevented mold damage and lower humidity levels throughout your home.</p>`
  },
  {
    id: 12,
    category: "Eco-Friendly",
    title: "DIY All-Purpose Cleaner: Our Team's Go-To Recipe",
    excerpt: "Water, white vinegar, a few drops of essential oil — this is the exact recipe our cleaning pros use in client homes every day. Simple, cheap, and incredibly effective.",
    image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=600&h=400&fit=crop",
    readTime: "2 min read",
    date: "Jan 10, 2025",
    content: `<p>This is the exact all-purpose cleaner recipe our CleanInstead team recommends to clients for daily touch-ups between professional cleans. It takes less than two minutes to mix, costs pennies per bottle, and works on virtually every surface in your home. We use a similar professional-grade version in client homes every single day, and this DIY version is as close as you can get to the real thing.</p><h3>The Recipe</h3><p>In a clean spray bottle, combine one part white vinegar with one part water. Add 10 to 15 drops of your favorite essential oil for fragrance. Lavender is calming and naturally antibacterial. Lemon cuts grease and smells incredibly fresh. Tea tree oil adds powerful antimicrobial properties. Shake gently before each use. That's it. One bottle covers kitchen counters, bathroom vanities, stovetops, sinks, mirrors, and most hard surfaces.</p><h3>What Not to Use It On</h3><p>Don't use vinegar on natural stone surfaces like granite, marble, or travertine. The acid can etch the sealant over time. For stone counters, use a few drops of mild dish soap in warm water instead. Also avoid using vinegar on unsealed wood or cast iron, as it can damage the finish. For those surfaces, stick with a dedicated wood cleaner or plain water with a microfiber cloth.</p><h3>Pro Tips for Best Results</h3><p>Spray the solution onto the surface and let it sit for 30 to 60 seconds before wiping. This dwell time is what makes vinegar effective at breaking down grease and grime. Always use a clean microfiber cloth for wiping. Microfiber traps dirt and bacteria rather than just pushing them around, and it works without any additional chemical help. Wash your microfiber cloths separately from regular laundry using hot water, and never use fabric softener, which coats the fibers and reduces their effectiveness.</p><h3>Why This Beats Store-Bought</h3><p>Commercial all-purpose cleaners like Lysol and Windex contain ammonia, artificial dyes, and synthetic fragrances that contribute to indoor air pollution and cost two to three dollars per bottle. This recipe costs roughly fifteen cents per bottle, contains zero harmful chemicals, and works just as well for everyday cleaning. For homeowners who want to maintain a clean, healthy, and eco-friendly home between our professional visits, this is the single best habit you can adopt.</p>`
  },
];

export const tipCategories = ["All", "Kitchen", "Bathroom", "Seasonal", "Eco-Friendly", "Organization", "Airbnb", "Pet Care", "Laundry", "Health"];

// ─── Quick Tips Data (Short Bite-Sized Tips) ─────────────────────────
export const quickTips = [
  {
    icon: "🧹",
    title: "Top-to-Bottom Rule",
    tip: "Always clean from top to bottom. Dust settles downward, so start with ceiling fans, shelves, and light fixtures before hitting floors. This prevents re-cleaning surfaces.",
  },
  {
    icon: "🪟",
    title: "Streak-Free Windows",
    tip: "Clean windows on a cloudy day. Direct sunlight dries cleaning solution too fast, leaving streaks. Use a microfiber cloth and a vinegar-water mix for crystal-clear results.",
  },
  {
    icon: "🍋",
    title: "Lemon for Microwave Odors",
    tip: "Place a bowl of water with lemon slices in the microwave. Heat for 3 minutes, then let it sit for 5. Wipe clean — steam loosens grime and lemon neutralizes odors naturally.",
  },
  {
    icon: "🧽",
    title: "Baking Soda on Carpet Stains",
    tip: "Sprinkle baking soda on fresh carpet stains, let it sit for 15 minutes, then vacuum. It absorbs moisture, lifts stains, and eliminates odors without any chemicals.",
  },
  {
    icon: "🚪",
    title: "Shower Daily Wipe-Down",
    tip: "Keep a squeegee in the shower and wipe glass and tiles after every use. This 30-second habit prevents soap scum buildup and mold growth almost entirely.",
  },
  {
    icon: "🍃",
    title: "Ventilate While Cleaning",
    tip: "Open windows and doors when cleaning, even with eco-friendly products. Fresh airflow helps evaporate moisture faster, reducing mold risk and improving indoor air quality.",
  },
  {
    icon: "🛏️",
    title: "Flip & Rotate Mattresses",
    tip: "Rotate your mattress 180 degrees every 3 months and flip it twice a year. This ensures even wear, extends mattress life, and helps with dust mite control.",
  },
  {
    icon: "🧴",
    title: "Less Product = Better",
    tip: "More cleaning product doesn't mean more clean. Excess soap leaves residue that actually attracts dirt. Use the recommended amount and you'll get better, longer-lasting results.",
  },
];

// ─── Gallery Data ───────────────────────────────────────────────────
export const galleryItems = [
  { label: "Kitchen Deep Clean", before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", after: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop" },
  { label: "Bathroom Transformation", before: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=300&fit=crop", after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop" },
  { label: "Living Room Refresh", before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
];

// ─── Before / After Difference Cards ────────────────────────────────
export const insteadDiffCards = [
  {
    title: "Instead of Harsh Chemicals...",
    desc: "We use plant-based, pediatrician-approved solutions that sanitize without triggering allergies or leaving toxic residues on your surfaces.",
  },
  {
    title: "Instead of Endless Waste...",
    desc: "Our teams arrive with durable glass bottles and medical-grade microfiber cloths. Zero plastics, zero single-use products, zero landfill waste.",
  },
  {
    title: "Instead of Greenwashing...",
    desc: "We publish every ingredient we use on our website. Total transparency, guaranteed. What you see is exactly what we bring into your home.",
  },
];

// ─── Service Checklists ─────────────────────────────────────────────
export const serviceChecklists = {
  recurring: [
    "Dust all surfaces (tables, shelves, baseboards)",
    "HEPA vacuum all floors and carpets",
    "Mop all hard floors with plant-based soap",
    "Sanitize kitchen counters and sink",
    "Clean stovetop and wipe appliances",
    "Scrub bathtub, shower, toilet, and vanity",
    "Clean mirrors throughout",
    "Empty trash and replace compostable liners",
    "Wipe door handles and light switches",
    "Tidy and organize living spaces",
  ],
  deep: [
    "Everything in Recurring Maintenance, PLUS:",
    "Clean inside oven (racks, door, interior)",
    "Clean inside microwave",
    "Wipe down inside and outside of fridge",
    "Wipe all baseboards throughout home",
    "Clean all window sills and tracks",
    "Dust light fixtures and ceiling fans",
    "Clean inside cabinets (kitchen & bathroom)",
    "Detailed wall spot-cleaning",
    "Detailed door frame and hinge cleaning",
  ],
  moveInOut: [
    "Everything in Deep Clean, PLUS:",
    "Clean inside all cabinets and closets",
    "Clean inside all drawers",
    "Detailed appliance cleaning (oven, fridge, dishwasher)",
    "Window interior cleaning",
    "Detailed baseboard and trim cleaning",
    "Garage/balcony sweep (if applicable)",
    "Touch-up paint spot cleaning",
    "Final walkthrough inspection",
  ],
};

// ─── Navigation Data ────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: [
    { label: "Residential Cleaning", href: "/services/residential" },
    { label: "Deep Cleaning", href: "/services/deep-cleaning" },
    { label: "Move-In / Move-Out", href: "/services/move-in-out" },
    { label: "Post-Construction", href: "/services/post-construction" },
    { label: "Service Checklist", href: "/services/checklist" },
  ]},
  { label: "Pricing", href: "/pricing" },
  { label: "Service Areas", href: "/locations", children: [
    { label: "Surrey", href: "/locations/surrey" },
    { label: "Vancouver", href: "/locations/vancouver" },
    { label: "Burnaby & New West", href: "/locations/burnaby" },
    { label: "Richmond", href: "/locations/richmond" },
    { label: "Delta", href: "/locations/delta" },
    { label: "North Shore", href: "/locations/north-vancouver" },
    { label: "Tri-Cities", href: "/locations/coquitlam" },
    { label: "Langley", href: "/locations/langley" },
    { label: "White Rock", href: "/locations/white-rock" },
    { label: "Maple Ridge", href: "/locations/maple-ridge" },
  ]},
  { label: "Tips", href: "/tips" },
  { label: "Rewards", href: "/rewards" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  services: [
    { label: "Residential Cleaning", href: "/services/residential" },
    { label: "Deep Cleaning", href: "/services/deep-cleaning" },
    { label: "Move-In / Move-Out", href: "/services/move-in-out" },
    { label: "Post-Construction", href: "/services/post-construction" },
    { label: "Service Checklist", href: "/services/checklist" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Tips & Guides", href: "/tips" },
    { label: "Rewards Program", href: "/rewards" },
  ],
  areas: [
    { label: "Surrey", href: "/locations/surrey" },
    { label: "Vancouver", href: "/locations/vancouver" },
    { label: "Burnaby & New West", href: "/locations/burnaby" },
    { label: "Richmond", href: "/locations/richmond" },
    { label: "Delta", href: "/locations/delta" },
    { label: "North Shore", href: "/locations/north-vancouver" },
    { label: "Tri-Cities", href: "/locations/coquitlam" },
    { label: "Langley", href: "/locations/langley" },
    { label: "White Rock", href: "/locations/white-rock" },
    { label: "Maple Ridge", href: "/locations/maple-ridge" },
    { label: "All Service Areas", href: "/locations" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

// ─── Company Info ───────────────────────────────────────────────────
export const companyInfo = {
  name: "CleanInstead",
  phone: "604.497.1001",
  phoneFull: "+16044971001",
  email: "info@cleaninstead.com",
  address: "Unit 105A - 14914 104 Ave., Surrey BC V3R 1M7",
  hours: "Mon-Fri: 8AM-6PM | Sat: 9AM-4PM | Sun: Closed",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.5!2d-122.8490!3d49.1867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sUnit+105A+14914+104+Ave+Surrey+BC!5e0!3m2!1sen!2sca!4v1",
};
