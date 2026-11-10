"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { 
  TiArrowRight 
} from "react-icons/ti";
import { 
  FiSearch, 
  FiUsers, 
  FiTrendingUp, 
  FiDollarSign, 
  FiCheckCircle, 
  FiShield, 
  FiBriefcase, 
  FiChevronDown, 
  FiMapPin, 
  FiAward, 
  FiMessageSquare,
  FiX
} from "react-icons/fi";

// Your exact Theme Object
export const Theme = {
  primary: "#2F3E2C",
  secondary: "#D1EDD3",
};

// Sample Business Ideas with Nigerian Context
const VENTURE_IDEAS = [
  {
    id: 1,
    title: "POS & Agency Banking Hub",
    category: "Fintech & Services",
    capital: "₦250,000 - ₦600,000",
    location: "Lagos / High Traffic Bus Stops",
    roi: "2 - 4 Months",
    difficulty: "Low",
    description: "Providing cash withdrawal, transfer, and bill payment services in high foot-traffic residential or commercial areas.",
    costsBreakdown: [
      { item: "POS Terminal (2 Units)", cost: "₦120,000" },
      { item: "Security Kiosk / Container setup", cost: "₦150,000" },
      { item: "Initial Cash Float", cost: "₦250,000" },
      { item: "Branding & Signage", cost: "₦30,000" },
    ],
    challenges: ["Cash flow liquidity", "Security risks", "Network downtimes"],
    mentorName: "Chidi Nnamdi",
    mentorRole: "Operator of 6 POS Outlets in Surulere",
  },
  {
    id: 2,
    title: "Mini Solar & Inverter Installation",
    category: "Clean Tech & Energy",
    capital: "₦1,200,000 - ₦3,500,000",
    location: "Abuja / Urban Suburbs",
    roi: "6 - 9 Months",
    difficulty: "Medium",
    description: "Installing affordable solar backup solutions for remote workers, small shops, and residential apartments.",
    costsBreakdown: [
      { item: "Basic Toolset & Testing Gear", cost: "₦200,000" },
      { item: "Sample Demo Inverter/Batteries", cost: "₦850,000" },
      { item: "CAC Registration & Insurance", cost: "₦80,000" },
      { item: "Local Marketing & Social Ads", cost: "₦70,000" },
    ],
    challenges: ["Import dollar rate fluctuations", "Managing client expectations", "Technician skill gaps"],
    mentorName: "Amina Yusuf",
    mentorRole: "Founder, GreenLight Solutions",
  },
  {
    id: 3,
    title: "Local Logistics & Dispatch Service",
    category: "Transport & Logistics",
    capital: "₦850,000 - ₦2,200,000",
    location: "Port Harcourt / City Center",
    roi: "5 - 8 Months",
    difficulty: "Medium",
    description: "Same-day package delivery serving e-commerce vendors, food sellers, and office documents.",
    costsBreakdown: [
      { item: "Used Delivery Motorcycle", cost: "₦650,000" },
      { item: "Rider Uniform & Insulated Box", cost: "₦65,000" },
      { item: "State Licenses & Union Stickers", cost: "₦110,000" },
      { item: "GPS Tracking & Tech Platform", cost: "₦45,000" },
    ],
    challenges: ["State transport levies & local union fees", "Rider reliability", "Bike maintenance"],
    mentorName: "Segun Adebayo",
    mentorRole: "Fleet Manager, QuickRoute Logistics",
  },
  {
    id: 4,
    title: "Commercial Poultry Farming (Broilers)",
    category: "Agriculture",
    capital: "₦1,500,000 - ₦4,000,000",
    location: "Ibadan / Outskirts",
    roi: "3 - 5 Months (Per Batch)",
    difficulty: "Hard",
    description: "Raising 500-1000 broiler birds for festive season sales and commercial meat distributors.",
    costsBreakdown: [
      { item: "Pen Construction/Lease", cost: "₦500,000" },
      { item: "500 Day-Old Chicks", cost: "₦350,000" },
      { item: "Feed Supplies (8 Weeks)", cost: "₦1,800,000" },
      { item: "Vaccines & Veterinary Services", cost: "₦120,000" },
    ],
    challenges: ["High cost of commercial feed", "Mortality risks", "Off-taker price negotiations"],
    mentorName: "Dr. Kemi Ogunleye",
    mentorRole: "Agri-preneur & Livestock Specialist",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVenture, setSelectedVenture] = useState<typeof VENTURE_IDEAS[0] | null>(null);

  // Estimator State
  const [selectedCity, setSelectedCity] = useState("Lagos");
  const [scale, setScale] = useState("Medium");

  const categories = ["All", "Fintech & Services", "Clean Tech & Energy", "Transport & Logistics", "Agriculture"];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchQuery(event.target.value);
    } catch (error) {
      console.error("Failed to update search query:", error);
    }
  };

  const filteredVentures = VENTURE_IDEAS.filter((v) => {
    const matchesCategory = selectedCategory === "All" || v.category === selectedCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-dvh bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover relative">
        <div className="bg-black/75 min-h-dvh flex items-center justify-center">
          <div className="text-white md:w-2/3 mx-auto md:py-20 p-6 flex items-center justify-center flex-col gap-8 text-center">
            
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-slate-900 shadow-lg"
              style={{ backgroundColor: Theme.secondary }}
            >
              🇳🇬 Empowering Next-Gen Nigerian Founders
            </span>

            <h1 className="font-extrabold text-4xl md:text-6xl uppercase tracking-tight leading-tight">
              Think Big. <span style={{ color: Theme.secondary }}>Grow Bigger!</span>
            </h1>

            <p className="text-lg md:text-2xl font-light leading-relaxed max-w-4xl text-slate-200">
              Naija Venture Hub is a platform that connects aspiring entrepreneurs
              with experienced business owners who share practical advice,
              real-life experiences, challenges, startup costs, and lessons
              learned to help beginners make informed decisions before starting
              their own businesses in Nigeria.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link 
                href="#explore" 
                style={{ backgroundColor: Theme.primary }} 
                className="text-white font-semibold px-8 py-3.5 text-lg rounded-full hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
              >
                Get Started <TiArrowRight className="text-xl" />
              </Link>

              <Link 
                href="#trending" 
                className="font-semibold px-8 py-3.5 text-lg rounded-full flex items-center gap-2 border border-slate-300 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Trending Ideas <TiArrowRight />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/20 w-full mt-6 text-left">
              <div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: Theme.secondary }}>500+</p>
                <p className="text-xs md:text-sm text-slate-300">Verified Mentors</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: Theme.secondary }}>120+</p>
                <p className="text-xs md:text-sm text-slate-300">Naija Business Models</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: Theme.secondary }}>₦150k - ₦10M</p>
                <p className="text-xs md:text-sm text-slate-300">Capital Guides</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: Theme.secondary }}>36 States</p>
                <p className="text-xs md:text-sm text-slate-300">Local Insights</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY NAIJA VENTURE HUB */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: Theme.primary }}>
            Avoid Costly Mistakes Before You Spend a Single Naira
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Starting a business in Nigeria comes with unique operational realities — from power issues to local levies. We bring real data from people who are already doing it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl" style={{ backgroundColor: Theme.secondary, color: Theme.primary }}>
              <FiDollarSign />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primary }}>Itemized Capital Breakdown</h3>
            <p className="text-slate-600 leading-relaxed">
              No hidden costs. Get realistic estimations on CAC registration, machinery, lease, shop branding, and initial working capital.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl" style={{ backgroundColor: Theme.secondary, color: Theme.primary }}>
              <FiShield />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primary }}>Naija Operational Risks</h3>
            <p className="text-slate-600 leading-relaxed">
              Learn how veteran business owners handle local government levies, generator fuel costs, supplier delays, and FX instability.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl" style={{ backgroundColor: Theme.secondary, color: Theme.primary }}>
              <FiUsers />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: Theme.primary }}>Direct Mentor Access</h3>
            <p className="text-slate-600 leading-relaxed">
              Connect 1-on-1 with founders who have survived the initial 2-year hurdle in your specific city and industry.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRENDING VENTURES EXPLORER */}
      <section id="trending" className="py-20 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Business Blueprints</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1" style={{ color: Theme.primary }}>
                Explore Proven Business Ideas
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[300px]">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                placeholder="Search business (e.g., POS, Solar, Poultry)..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 bg-white text-sm"
              />
            </div>
          </div>

          {/* Categories Pill Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-200"
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? Theme.primary : undefined,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Venture Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredVentures.map((venture) => (
              <div 
                key={venture.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                    >
                      {venture.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <FiMapPin /> {venture.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ color: Theme.primary }}>{venture.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{venture.description}</p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 text-sm mb-6">
                    <div>
                      <p className="text-slate-400 text-xs">Estimated Capital</p>
                      <p className="font-semibold text-slate-800">{venture.capital}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Est. Break-Even (ROI)</p>
                      <p className="font-semibold text-slate-800">{venture.roi}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-sm"
                      style={{ backgroundColor: Theme.primary, color: Theme.secondary }}
                    >
                      {venture.mentorName[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{venture.mentorName}</p>
                      <p className="text-[11px] text-slate-500">{venture.mentorRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedVenture(venture)}
                    className="text-sm font-bold flex items-center gap-1 hover:underline"
                    style={{ color: Theme.primary }}
                  >
                    View Cost Breakdown <TiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NIGERIAN STARTUP COST CALCULATOR / PREDICTOR */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span 
              className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-slate-900 inline-block mb-4"
              style={{ backgroundColor: Theme.secondary }}
            >
              Interactive Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Quick Startup Cost Estimator</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Select your city and planned operational scale to see adjusted baseline capital estimations in Nigeria.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-2">Target Location</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Lagos">Lagos (High Overhead / High Demand)</option>
                  <option value="Abuja">Abuja (High Lease / Corporate Clients)</option>
                  <option value="Port Harcourt">Port Harcourt (Medium Overhead)</option>
                  <option value="Ibadan">Ibadan / Tier 2 Cities (Lower Overhead)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-2">Planned Scale</label>
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Micro">Micro (Solo Operator / Mobile)</option>
                  <option value="Medium">Medium (Dedicated Shop / 2 Employees)</option>
                  <option value="Commercial">Commercial (Full Outlet / Multi-Staff)</option>
                </select>
              </div>
            </div>

            {/* Live Calculation Box */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">Estimated Capital Required</p>
                <p className="text-3xl font-extrabold mt-1" style={{ color: Theme.secondary }}>
                  {scale === "Micro" ? "₦350,000 - ₦750,000" : scale === "Medium" ? "₦1,500,000 - ₦3,800,000" : "₦5,500,000 - ₦15,000,000"}
                </p>
                <p className="text-xs text-slate-400 mt-1">Includes 15% emergency contingency reserve for power/fuel price shifts in {selectedCity}.</p>
              </div>

              <Link
                href="#get-started"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                className="px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap hover:opacity-90 transition"
              >
                Get Full PDF Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MENTOR CASE STUDY / TESTIMONIALS */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: Theme.primary }}>
              Real Advice From Real Nigerian Entrepreneurs
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Read how mentors navigated real business obstacles across Lagos, Kano, Port Harcourt, and Abuja.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-slate-600 italic mb-6 leading-relaxed">
                "When I started my logistics business in Ikeja, I lost ₦400k in my first 3 months because I didn't account for state-specific motorcycle permits. Naija Venture Hub gives you these exact warning signs."
              </p>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full font-bold flex items-center justify-center"
                  style={{ backgroundColor: Theme.primary, color: Theme.secondary }}
                >
                  BA
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Babatunde Adeleke</h4>
                  <p className="text-xs text-slate-500">Logistics Mentor, Lagos</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-slate-600 italic mb-6 leading-relaxed">
                "Finding reliable solar component suppliers was my biggest hurdle. Having a platform where seniors share trustworthy vendor directories saved me millions."
              </p>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full font-bold flex items-center justify-center"
                  style={{ backgroundColor: Theme.primary, color: Theme.secondary }}
                >
                  FJ
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Fatima Jibril</h4>
                  <p className="text-xs text-slate-500">Renewable Energy, Abuja</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-slate-600 italic mb-6 leading-relaxed">
                "As a poultry farmer, feed cost inflation nearly killed my business. Learning how to formulate alternative feed mixes from my hub mentor turned my farm profitable again."
              </p>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full font-bold flex items-center justify-center"
                  style={{ backgroundColor: Theme.primary, color: Theme.secondary }}
                >
                  EO
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Emeka Okonkwo</h4>
                  <p className="text-xs text-slate-500">Agri-Business Founder, Asaba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION & COMMUNITY JOIN */}
      <section id="get-started" className="py-20 px-6 text-white text-center" style={{ backgroundColor: Theme.primary }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Launch Your Nigerian Business Safely?
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of aspiring entrepreneurs getting real-time startup breakdowns, mentor office hours, and step-by-step launch guides.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:opacity-90 transition"
              style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
            >
              Become a Member (Free)
            </button>
            <button 
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border border-slate-300 hover:bg-white/10 transition"
            >
              Apply as a Mentor
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Naija Venture Hub</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Connecting aspiring Nigerian founders with veteran business operators for practical, transparent, and actionable guidance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-white">Browse Businesses</Link></li>
              <li><Link href="#" className="hover:text-white">Find a Mentor</Link></li>
              <li><Link href="#" className="hover:text-white">Cost Calculator</Link></li>
              <li><Link href="#" className="hover:text-white">Pitch Your Idea</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Popular Business Guides</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-white">POS Cash Outlet Guide</Link></li>
              <li><Link href="#" className="hover:text-white">Solar Inverter Franchise</Link></li>
              <li><Link href="#" className="hover:text-white">Logistics & Dispatch Business</Link></li>
              <li><Link href="#" className="hover:text-white">Broiler Poultry Farm</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-3">Get weekly breakdowns of profitable local Nigerian business ideas.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-slate-900 border border-slate-800 px-3 py-2 text-xs rounded-lg text-white w-full focus:outline-none"
              />
              <button 
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-900 whitespace-nowrap"
                style={{ backgroundColor: Theme.secondary }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Naija Venture Hub. Built for Nigerian Business Leaders.
        </div>
      </footer>

      {/* MODAL FOR BREAKDOWN DETAILS */}
      {selectedVenture && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative">
            <button 
              onClick={() => setSelectedVenture(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <FiX className="text-xl" />
            </button>

            <span 
              className="text-xs font-bold px-3 py-1 rounded-full uppercase"
              style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
            >
              {selectedVenture.category}
            </span>

            <h3 className="text-3xl font-bold mt-3 mb-2" style={{ color: Theme.primary }}>
              {selectedVenture.title}
            </h3>
            <p className="text-slate-600 text-sm mb-6">{selectedVenture.description}</p>

            {/* Breakdown Costs */}
            <h4 className="font-bold text-slate-800 text-lg mb-3">Itemized Capital Breakdown</h4>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 space-y-3">
              {selectedVenture.costsBreakdown.map((cost, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm py-1 border-b border-slate-200 last:border-none">
                  <span className="text-slate-600">{cost.item}</span>
                  <span className="font-bold text-slate-800">{cost.cost}</span>
                </div>
              ))}
            </div>

            {/* Key Challenges */}
            <h4 className="font-bold text-slate-800 text-lg mb-3">Common Pitfalls & Risks in Nigeria</h4>
            <ul className="space-y-2 mb-8">
              {selectedVenture.challenges.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {c}
                </li>
              ))}
            </ul>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button 
                className="w-full py-3.5 rounded-full font-bold text-white text-center"
                style={{ backgroundColor: Theme.primary }}
              >
                Connect with {selectedVenture.mentorName}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}