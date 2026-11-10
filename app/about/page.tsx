"use client";

import React from "react";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { 
  FiTarget, 
  FiEye, 
  FiCheckCircle, 
  FiUsers, 
  FiTrendingUp, 
  FiShield, 
  FiAward, 
  FiBriefcase,
  FiMapPin
} from "react-icons/fi";

// Your exact Theme Object
export const Theme = {
  primary: "#2F3E2C",
  secondary: "#D1EDD3",
};

interface ValueItem {
  icon: React.JSX.Element;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  location: string;
  bio: string;
  initials: string;
}

const CORE_VALUES: ValueItem[] = [
  {
    icon: <FiShield />,
    title: "Radical Transparency",
    description: "No inflated promises. We share exact capital costs, real operating expenses, local levies, and failure rates so you start with open eyes."
  },
  {
    icon: <FiMapPin />,
    title: "Hyper-Local Relevance",
    description: "Running a business in Lagos differs from Kano. Our guides factor in state policies, local power dynamics, and regional consumer habits."
  },
  {
    icon: <FiUsers />,
    title: "Practitioner-Led Insights",
    description: "Advice strictly comes from entrepreneurs who actively operate businesses in Nigeria, not theoretical business coaches."
  },
  {
    icon: <FiTrendingUp />,
    title: "Sustainable Growth",
    description: "We focus on real unit economics, profit margins, and risk mitigation to help founders survive the critical first 2 years."
  }
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Olanrewaju Cole",
    role: "Co-Founder & Community Lead",
    location: "Lagos, Nigeria",
    bio: "Ex-logistics operator with over 8 years of experience scaling retail and distribution channels across Southwestern Nigeria.",
    initials: "OC"
  },
  {
    name: "Amina Bello-Kano",
    role: "Head of Mentor Networks",
    location: "Abuja (FCT), Nigeria",
    bio: "Renewable energy advocate connecting veteran business operators across Northern and Central Nigeria.",
    initials: "AB"
  },
  {
    name: "Chidi Nwachukwu",
    role: "Lead Business Analyst",
    location: "Port Harcourt, Nigeria",
    bio: "Specializes in unit economics, capital expenditure modeling, and supply chain audits for local MSMEs.",
    initials: "CN"
  }
];

export default function AboutPage(): React.JSX.Element {
  return (
    <main className="min-h-dvh bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover relative">
        <div className="bg-black/75 py-24 px-6">
          <div className="text-white max-w-4xl mx-auto flex items-center justify-center flex-col gap-6 text-center">
            
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-slate-900 shadow-lg"
              style={{ backgroundColor: Theme.secondary }}
            >
               Our Story & Mission
            </span>

            <h1 className="font-extrabold text-4xl md:text-6xl uppercase tracking-tight leading-tight">
              Bridging the Gap for <span style={{ color: Theme.secondary }}>Naija Founders</span>
            </h1>

            <p className="text-lg md:text-xl font-light leading-relaxed text-slate-200 max-w-3xl">
              Naija Venture Hub was created to eliminate trial-and-error entrepreneurship in Nigeria by giving new founders direct access to practical advice, realistic startup costs, and proven operational blueprints.
            </p>

            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300 pt-2">
              <Link href="/" className="hover:underline text-slate-300">Home</Link>
              <span>/</span>
              <span style={{ color: Theme.secondary }} className="font-semibold">About Us</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY & PROBLEM SOLVED */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Why We Started</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: Theme.primary }}>
              Built to Help You Navigate the Unique Realities of Doing Business in Nigeria
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-base">
              Every year, millions of enterprising Nigerians launch small businesses with passion and savings. However, a significant number struggle within their first 12 months due to unforeseen local realities.
            </p>

            <p className="text-slate-600 leading-relaxed text-base">
              Unexpected local government levies, generator fuel budgets, fluctuating supply costs, and power challenges often catch new business owners off guard.
            </p>

            <p className="text-slate-600 leading-relaxed text-base font-medium" style={{ color: Theme.primary }}>
              Naija Venture Hub solves this by crowdsourcing real operational data and hard-earned lessons from seasoned business owners across all 36 states, helping beginners make informed decisions before spending capital.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/contact" 
                style={{ backgroundColor: Theme.primary }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md"
              >
                Get In Touch <TiArrowRight className="text-xl" />
              </Link>
              <Link 
                href="/#trending" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-slate-800 border border-slate-300 text-center hover:bg-slate-100 transition"
              >
                Explore Business Guides
              </Link>
            </div>
          </div>

          {/* Impact Metrics Grid */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
              >
                <FiUsers />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold" style={{ color: Theme.primary }}>500+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Verified Mentors</p>
              <p className="text-xs text-slate-600 leading-snug">Active entrepreneurs sharing operational secrets.</p>
            </div>

            <div className="space-y-2">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
              >
                <FiBriefcase />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold" style={{ color: Theme.primary }}>120+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Business Guides</p>
              <p className="text-xs text-slate-600 leading-snug">Detailed capital & cost breakdown blueprints.</p>
            </div>

            <div className="space-y-2">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
              >
                <FiMapPin />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold" style={{ color: Theme.primary }}>36 States</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Nationwide Scope</p>
              <p className="text-xs text-slate-600 leading-snug">Local insights from Lagos to Maiduguri.</p>
            </div>

            <div className="space-y-2">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
              >
                <FiAward />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold" style={{ color: Theme.primary }}>₦50M+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Capital Saved</p>
              <p className="text-xs text-slate-600 leading-snug">Saved through avoided business pitfalls.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
              >
                <FiTarget />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: Theme.primary }}>Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To equip aspiring Nigerian entrepreneurs with practical knowledge, realistic startup cost estimations, and direct mentorship from experienced business operators — enabling them to build sustainable, profitable ventures.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <FiCheckCircle className="text-emerald-600 text-base" /> Actionable • Practical • Transparent
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
              >
                <FiEye />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: Theme.primary }}>Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To become Nigeria’s most trusted knowledge hub and community network for micro, small, and medium-scale enterprises (MSMEs), driving economic growth and reducing startup failure rates across the nation.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <FiCheckCircle className="text-emerald-600 text-base" /> Empowering Next-Gen Founders
            </div>
          </div>

        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span 
            className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-slate-900 inline-block mb-3"
            style={{ backgroundColor: Theme.secondary }}
          >
            Guiding Principles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: Theme.primary }}>
            What Sets Naija Venture Hub Apart
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((value, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                  style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: Theme.primary }}>{value.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM / ADVISORY NETWORK */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-slate-900 inline-block mb-3"
              style={{ backgroundColor: Theme.secondary }}
            >
              The People Behind The Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: Theme.primary }}>
              Driven by Experience & Passion for Local MSMEs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-full font-bold text-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: Theme.primary, color: Theme.secondary }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
                      <p className="text-xs font-semibold" style={{ color: Theme.primary }}>{member.role}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <FiMapPin /> {member.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 px-6 text-white text-center" style={{ backgroundColor: Theme.primary }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Be Part of Nigeria’s Growing Entrepreneurship Network
          </h2>
          <p className="text-base md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you are planning your first business launch or looking to share your experience with the next generation of founders, there is a place for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signin"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:opacity-90 transition cursor-pointer"
              style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
            >
              Join As Aspiring Founder
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border border-slate-300 hover:bg-white/10 transition cursor-pointer"
            >
              Apply to be a Mentor
            </Link>
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
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/#trending" className="hover:text-white">Browse Businesses</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
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
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-900 whitespace-nowrap cursor-pointer"
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

    </main>
  );
}