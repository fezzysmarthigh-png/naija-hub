"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Session } from "next-auth"; // 1. Imported Session type correctly
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiFileText, 
  FiLink, 
  FiMessageSquare,
  FiUser,
  FiClock
} from "react-icons/fi";

// Zod Validation Schema
const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessInfo: z.string().min(10, "Please provide at least 10 characters describing the venture"),
  sector: z.string().min(1, "Please select a business sector"),
  initialCapital: z.string().min(1, "Initial capital estimate is required"),
  address: z.string().min(5, "Valid location/address in Nigeria is required"),
  resources: z.string().min(1, "Please list required tools, apps, or links"),
  initialReview: z.string().min(5, "Please share a brief review, tip, or lesson learned"),
});

type FormValues = z.infer<typeof formSchema>;

const SECTOR_OPTIONS = [
  "Fintech & Services",
  "Clean Tech & Energy",
  "Transport & Logistics",
  "Agriculture",
  "E-Commerce & Retail",
  "Food & Hospitality",
  "Real Estate & Construction",
  "Health & Wellness",
];

interface PostProps {
  session: Session;
}

// Define explicit empty default values for resetting the form
const defaultValues: FormValues = {
  businessName: "",
  businessInfo: "",
  sector: "",
  initialCapital: "",
  address: "",
  resources: "",
  initialReview: "",
};

export default function Post({ session }: PostProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Capture user details & current ISO timestamp
      const payload = {
        ...data,
        authorName: session.user?.name || session.user?.email || "Anonymous Creator",
        authorEmail: session.user?.email || "",
        authorImage: session.user?.image || null,
        createdAt: new Date().toISOString(),
      };

      console.log("Captured Venture Blueprint Payload:", payload);

      // Save document to Firestore collection
      await addDoc(collection(db, "business_ideas"), payload);  
      
      alert(`Venture blueprint successfully posted by ${payload.authorName}!`);

      // Clear all input text fields immediately upon successful submission
      reset(defaultValues);
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
      alert("Failed to publish post. Please check your connection.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-lg border border-slate-200 my-12">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-100 pb-6">
        <span 
          className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-slate-900 inline-block mb-3"
          style={{ backgroundColor: "#D1EDD3" }}
        >
          Community Contribution
        </span>
        <h1 className="text-3xl font-extrabold text-[#2F3E2C]">Share a Business Blueprint</h1>
        <p className="text-slate-500 text-xs md:text-sm mt-1">
          Help aspiring founders across Nigeria by sharing real operational costs, requirements, and reviews.
        </p>

        {/* User Badge - Fixed lowercase session check */}
        <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Author Avatar"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border border-slate-300"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#2F3E2C] text-[#D1EDD3] flex items-center justify-center font-bold text-sm">
              <FiUser />
            </div>
          )}
          <div className="text-xs">
            <p className="font-bold text-slate-800">Posting as: {session.user?.name || session.user?.email}</p>
            <p className="text-slate-500 flex items-center gap-1 mt-0.5">
              <FiClock className="text-emerald-700" /> Auto-stamping with submission time
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiBriefcase className="text-[#2F3E2C]" /> Business Name
          </label>
          <input
            type="text"
            id="businessName"
            {...register("businessName")}
            placeholder="e.g., FastRoute Logistics Hub"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C]"
          />
          {errors.businessName && (
            <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>
          )}
        </div>

        {/* Sector Dropdown */}
        <div>
          <label htmlFor="sector" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiBriefcase className="text-[#2F3E2C]" /> Sector / Industry
          </label>
          <select
            id="sector"
            {...register("sector")}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C] cursor-pointer"
          >
            <option value="">-- Select Business Sector --</option>
            {SECTOR_OPTIONS.map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          {errors.sector && (
            <p className="text-red-500 text-xs mt-1">{errors.sector.message}</p>
          )}
        </div>

        {/* Initial Capital Range */}
        <div>
          <label htmlFor="initialCapital" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiDollarSign className="text-[#2F3E2C]" /> Estimated Initial Capital (₦)
          </label>
          <input
            type="text"
            id="initialCapital"
            {...register("initialCapital")}
            placeholder="e.g., ₦500,000 - ₦1,200,000"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C]"
          />
          {errors.initialCapital && (
            <p className="text-red-500 text-xs mt-1">{errors.initialCapital.message}</p>
          )}
        </div>

        {/* Location / Address */}
        <div>
          <label htmlFor="address" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiMapPin className="text-[#2F3E2C]" /> Location / State / Hub
          </label>
          <input
            type="text"
            id="address"
            {...register("address")}
            placeholder="e.g., Ikeja, Lagos State"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C]"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Business Overview */}
        <div>
          <label htmlFor="businessInfo" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiFileText className="text-[#2F3E2C]" /> Business Overview & Operations
          </label>
          <textarea
            id="businessInfo"
            rows={4}
            {...register("businessInfo")}
            placeholder="Describe how the business operates, target customers, and daily routines..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C] resize-none"
          />
          {errors.businessInfo && (
            <p className="text-red-500 text-xs mt-1">{errors.businessInfo.message}</p>
          )}
        </div>

        {/* Resources & Tools */}
        <div>
          <label htmlFor="resources" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiLink className="text-[#2F3E2C]" /> Required Tools & Resources
          </label>
          <input
            type="text"
            id="resources"
            {...register("resources")}
            placeholder="e.g., POS terminal, delivery bike, generator, software links"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C]"
          />
          {errors.resources && (
            <p className="text-red-500 text-xs mt-1">{errors.resources.message}</p>
          )}
        </div>

        {/* Founder Review */}
        <div>
          <label htmlFor="initialReview" className="block text-xs uppercase text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5">
            <FiMessageSquare className="text-[#2F3E2C]" /> Founder Review / Lesson Learned
          </label>
          <textarea
            id="initialReview"
            rows={3}
            {...register("initialReview")}
            placeholder="Share your personal review or key advice for beginners starting this venture..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F3E2C] resize-none"
          />
          {errors.initialReview && (
            <p className="text-red-500 text-xs mt-1">{errors.initialReview.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "#2F3E2C", color: "#D1EDD3" }}
          className="w-full py-4 rounded-full font-bold text-sm hover:opacity-90 transition disabled:opacity-50 cursor-pointer shadow-md"
        >
          {isSubmitting ? "Publishing Blueprint..." : "Publish Business Post"}
        </button>

      </form>
    </main>
  );
}