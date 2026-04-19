import Link from "next/link"
import {
  Leaf,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Droplets,
  Recycle,
  Award,
  Users,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Sparkles,
    title: "Regular Clean",
    desc: "Consistent weekly or bi-weekly cleaning to keep your home spotless. Our most popular service with flexible scheduling that works around your life.",
    features: ["Dusting & wiping all surfaces", "Vacuuming & mopping floors", "Kitchen & bathroom sanitization", "Trash removal & tidying"],
  },
  {
    icon: Droplets,
    title: "Deep Clean",
    desc: "A thorough top-to-bottom cleaning that reaches every corner. Perfect for seasonal refreshes, post-renovation cleanup, or first-time bookings.",
    features: ["Inside appliances & cabinets", "Baseboard & window sill detailing", "Light fixture cleaning", "Grout & tile scrubbing"],
  },
  {
    icon: Recycle,
    title: "Eco Clean",
    desc: "Our signature 100% plant-based, zero-waste cleaning experience. Hospital-grade disinfection using only natural enzymatic products.",
    features: ["Plant-based products only", "Refillable containers", "Zero single-use plastics", "Carbon-neutral service"],
  },
  {
    icon: Shield,
    title: "Move In/Out",
    desc: "Comprehensive cleaning for moving day. We ensure the space is move-in ready or get your deposit back guaranteed.",
    features: ["Full interior deep clean", "Appliance interior cleaning", "Window cleaning included", "Carpet spot treatment"],
  },
]

const areas = [
  "Surrey", "Vancouver", "Burnaby", "Richmond",
  "Langley", "Delta", "Coquitlam", "New Westminster",
]

const testimonials = [
  {
    name: "Sarah M.",
    area: "Surrey, BC",
    rating: 5,
    text: "CleanInstead transformed my home! The eco-friendly products give me peace of mind with my toddler around. The team is always professional and thorough. I've been using them for 6 months and wouldn't switch for anything.",
  },
  {
    name: "David K.",
    area: "Vancouver, BC",
    rating: 5,
    text: "After trying 4 different cleaning services, CleanInstead is by far the best. They actually show up on time, every time. The barefoot guarantee is real - they came back within hours when I pointed out a missed spot.",
  },
  {
    name: "Priya R.",
    area: "Burnaby, BC",
    rating: 5,
    text: "I love that everything is plant-based. As someone with allergies, I can finally have a clean home without the harsh chemical smell. The rewards program is a great bonus too - already earned a free session!",
  },
  {
    name: "Mike T.",
    area: "Richmond, BC",
    rating: 4,
    text: "Used them for our move-out clean and got our full deposit back. The landlord was impressed! Fair pricing for the quality of work. Booking online was super easy.",
  },
]

const faqs = [
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
    a: "We offer a 24-hour Barefoot Guarantee. If we missed something or you're unsatisfied for any reason, simply let us know and we'll return to fix it at absolutely no cost to you.",
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
    a: "We currently serve Surrey, Vancouver, Burnaby, Richmond, Langley, Delta, Coquitlam, and surrounding areas in Metro Vancouver, BC.",
  },
  {
    q: "How do I get a quote?",
    a: "You can use our instant quote calculator on our Pricing page for an estimate right away. For a customized quote, simply fill out the contact form or give us a call - we'll get back to you within a few hours.",
  },
]

const stats = [
  { value: "2,500+", label: "Happy Homes Cleaned" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "50+", label: "Eco-Certified Cleaners" },
  { value: "15,000kg", label: "Plastic Saved" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">CleanInstead</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">Services</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">Pricing</a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">About</a>
              <a href="#reviews" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">Reviews</a>
              <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/signin?role=customer">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Book a Clean
                </Button>
              </Link>
            </div>

            <Link href="/auth/signin" className="md:hidden">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              100% Eco-Friendly Cleaning
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Clean Spaces,{" "}
              <span className="text-emerald-600">Green Planet</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Premium eco-friendly cleaning services for homes and businesses across Metro Vancouver. 
              Hospital-grade clean without the toxic chemicals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signin?role=customer">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto px-8 text-base">
                  Get a Free Quote
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="tel:+16044971001">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 text-base">
                  <Phone className="w-4 h-4 mr-2" />
                  (604) 497-1001
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Barefoot Guarantee</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Insured & Vetted</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold">{s.value}</div>
                <div className="text-emerald-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Cleaning Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From regular maintenance to deep cleaning, we offer a range of eco-friendly services 
              tailored to your needs. All services include our Barefoot Guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="group p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              No hidden fees. No surprises. Flat-rate pricing based on your home size and service type.
              All packages include eco-friendly products and our Barefoot Guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Regular Clean",
                price: "From $120",
                period: "per session",
                desc: "Perfect for ongoing maintenance. Book weekly or bi-weekly.",
                features: ["All rooms cleaned", "Kitchen & bathrooms", "Vacuum & mop", "Eco-friendly products", "Flexible scheduling"],
                highlight: false,
              },
              {
                name: "Deep Clean",
                price: "From $220",
                period: "per session",
                desc: "Thorough top-to-bottom cleaning. Ideal for seasonal refreshes.",
                features: ["Everything in Regular", "Inside appliances", "Baseboard detailing", "Window sills", "Grout scrubbing", "Cabinet interiors"],
                highlight: true,
              },
              {
                name: "Eco Clean",
                price: "From $140",
                period: "per session",
                desc: "Our signature zero-waste, 100% plant-based experience.",
                features: ["Everything in Regular", "Zero single-use plastic", "Refillable containers", "Plant-based only", "Carbon-neutral"],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 md:p-8 ${
                  plan.highlight
                    ? "bg-emerald-600 text-white shadow-xl scale-105 relative"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-lg font-semibold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mt-4 mb-2">
                  <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-emerald-100" : "text-gray-500"}`}>
                    {" "}{plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-emerald-100" : "text-gray-500"}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-emerald-200" : "text-emerald-500"}`} />
                      <span className={plan.highlight ? "text-emerald-50" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signin?role=customer">
                  <Button
                    className={`w-full ${
                      plan.highlight
                        ? "bg-white text-emerald-700 hover:bg-emerald-50"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Prices based on average 1-2 bedroom home. Exact pricing provided during booking.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why CleanInstead?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We are not just a cleaning company. We are on a mission to make professional cleaning 
              sustainable, safe, and accessible for every home in Metro Vancouver.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Barefoot Guarantee",
                desc: "Not happy? We come back within 24 hours and re-clean for free. Walk barefoot with confidence after every clean. No questions asked, no hassle.",
              },
              {
                icon: Users,
                title: "4-Step Vetting Process",
                desc: "Every cleaner passes criminal background checks, reference verification, eco-product skills assessment, and insurance confirmation before entering any home.",
              },
              {
                icon: Recycle,
                title: "Zero-Waste Approach",
                desc: "We use refillable product containers, microfiber cloths instead of disposables, and have saved over 15,000kg of plastic from landfills since launching.",
              },
              {
                icon: Award,
                title: "Rewards Program",
                desc: "Earn free services automatically. 3 cleans = free fridge clean, 6 = free windows, 10 = entire session free. Loyalty that actually pays off.",
              },
              {
                icon: Droplets,
                title: "Hospital-Grade Clean",
                desc: "Our EPA-registered products kill 99.9% of bacteria using natural enzymatic reactions. Safe for children, pets, and the environment.",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                desc: "Book online 24/7, choose your preferred time, and reschedule for free up to 24 hours before. We work around your life, not the other way around.",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-200" />
            <h2 className="text-2xl font-bold text-white">Serving Metro Vancouver</h2>
          </div>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Professional eco-friendly cleaning across the Lower Mainland. Same-day booking available for most areas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((a) => (
              <span key={a} className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Over 2,500 happy homes cleaned with an average rating of 4.9 out of 5 stars.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-200" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about CleanInstead.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border border-gray-200 rounded-xl p-5 hover:border-emerald-200 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Leaf className="w-12 h-12 mx-auto mb-6 text-emerald-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Cleaner, Greener Home?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Join over 2,500 happy customers who trust CleanInstead for their eco-friendly cleaning needs.
            Book your first clean today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin?role=customer">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto px-8 text-base font-semibold">
                Book a Cleaning
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="tel:+16044971001">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto px-8 text-base"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call (604) 497-1001
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-white">CleanInstead</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Premium eco-friendly cleaning services for homes and businesses in Metro Vancouver, BC.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Unit 105A - 14914 104 Ave, Surrey, BC V3R 1M7</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Regular Clean</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Deep Clean</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Eco Clean</a></li>
                <li><a href="#services" className="hover:text-emerald-400 transition-colors">Move In/Out</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#reviews" className="hover:text-emerald-400 transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <a href="tel:+16044971001" className="hover:text-emerald-400 transition-colors">(604) 497-1001</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <a href="mailto:info@cleaninstead.com" className="hover:text-emerald-400 transition-colors">info@cleaninstead.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Mon-Sat: 8AM - 6PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} CleanInstead. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <Link href="/auth/signin" className="hover:text-emerald-400 transition-colors">
                Customer Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
