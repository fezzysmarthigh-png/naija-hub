"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiSend, 
  FiCheckCircle, 
  FiMessageSquare,
  FiHelpCircle
} from "react-icons/fi";

// Your exact Theme Object
export const Theme = {
  primary: "#2F3E2C",
  secondary: "#D1EDD3",
};

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  userType: "aspiring" | "mentor" | "partner" | "other";
  state: string;
  subject: string;
  message: string;
}

const FAQ_ITEMS = [
  {
    q: "How fast will a mentor or support staff respond?",
    a: "Our core support team responds within 24 hours. If you are reaching out to connect with a specific mentor, introduction requests are processed within 1 to 2 business days."
  },
  {
    q: "Can I request business advice for states outside Lagos and Abuja?",
    a: "Yes! We have verified business mentors across all 36 Nigerian states who understand local government levies, state trade licenses, and regional demand dynamics."
  },
  {
    q: "I want to share my business experience/lessons learned. How do I join?",
    a: "We welcome experienced Nigerian business owners! Select 'Experienced Business Owner / Mentor' in the contact form, or email us directly at mentors@naijaventurehub.ng."
  }
];

export default function ContactPage(): React.JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    userType: "aspiring",
    state: "Lagos",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        userType: "aspiring",
        state: "Lagos",
        subject: "",
        message: ""
      });
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover relative">
        <div className="bg-black/75 py-20 px-6">
          <div className="text-white max-w-4xl mx-auto flex items-center justify-center flex-col gap-6 text-center">
            
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-slate-900 shadow-lg"
              style={{ backgroundColor: Theme.secondary }}
            >
              📞 We're Here to Help You Build
            </span>

            <h1 className="font-extrabold text-4xl md:text-6xl uppercase tracking-tight leading-tight">
              Get In Touch With <span style={{ color: Theme.secondary }}>Naija Venture Hub</span>
            </h1>

            <p className="text-lg md:text-xl font-light leading-relaxed text-slate-200 max-w-2xl">
              Have questions about starting your business, finding a mentor, or sharing your entrepreneurial journey in Nigeria? Send us a message and our team will get back to you promptly.
            </p>

            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300 pt-2">
              <Link href="/" className="hover:underline text-slate-300">Home</Link>
              <span>/</span>
              <span style={{ color: Theme.secondary }} className="font-semibold">Contact Us</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO CARDS & FORM SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Contact Details & Office Info */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Reach Out Directly</span>
              <h2 className="text-3xl font-bold mt-1" style={{ color: Theme.primary }}>
                Let's Talk Business
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Whether you need assistance picking a business plan, validating costs, or joining our mentor directory, our local team is ready to support you.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                >
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Hub Headquarters</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Plot 14, Commercial Avenue, Sabo Yaba, Lagos State, Nigeria
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                >
                  <FiMail />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Email Inquiries</h4>
                  <p className="text-xs text-slate-600 mt-1">General: hello@naijaventurehub.ng</p>
                  <p className="text-xs text-slate-600">Mentors: mentors@naijaventurehub.ng</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                >
                  <FiPhone />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Phone & WhatsApp</h4>
                  <p className="text-xs text-slate-600 mt-1">+234 (0) 812 345 6789</p>
                  <p className="text-xs text-slate-600">+234 (0) 901 234 5678</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                >
                  <FiClock />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Working Hours</h4>
                  <p className="text-xs text-slate-600 mt-1">Mon - Fri: 8:00 AM - 6:00 PM (WAT)</p>
                  <p className="text-xs text-slate-600">Saturday: 10:00 AM - 2:00 PM (WAT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div 
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl"
                  style={{ backgroundColor: Theme.secondary, color: Theme.primary }}
                >
                  <FiCheckCircle />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: Theme.primary }}>
                  Message Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Naija Venture Hub. A member of our local advisory team will reach out to your provided phone number or email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full font-bold text-sm text-white cursor-pointer hover:opacity-90 transition"
                  style={{ backgroundColor: Theme.primary }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: Theme.primary }}>Send Us a Message</h3>
                  <p className="text-slate-500 text-sm mt-1">Fill out the details below and we will get back to you shortly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Babatunde Adebayo"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 08012345678"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  {/* User Type */}
                  <div>
                    <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                      I Am A...
                    </label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
                    >
                      <option value="aspiring">Aspiring Entrepreneur</option>
                      <option value="mentor">Experienced Business Owner / Mentor</option>
                      <option value="partner">Investor / Corporate Partner</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                      Your State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Rivers">Rivers (Port Harcourt)</option>
                      <option value="Oyo">Oyo (Ibadan)</option>
                      <option value="Kano">Kano</option>
                      <option value="Enugu">Enugu</option>
                      <option value="Other">Other State</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Inquiry about POS business cost guide"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-semibold mb-2">
                    How can we help you? *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the business you want to start, your startup location, or specific questions about equipment costs..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: Theme.primary }}
                  className="w-full py-4 rounded-full text-white font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Submit Inquiry <FiSend />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span 
              className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-slate-900 inline-block mb-3"
              style={{ backgroundColor: Theme.secondary }}
            >
              Quick Help
            </span>
            <h2 className="text-3xl font-bold" style={{ color: Theme.primary }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-3">
                  <FiHelpCircle className="shrink-0" style={{ color: Theme.primary }} />
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-sm mt-3 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
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
              <li><Link href="/#trending" className="hover:text-white">Browse Businesses</Link></li>
              <li><Link href="/#explore" className="hover:text-white">Find a Mentor</Link></li>
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