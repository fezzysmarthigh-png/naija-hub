import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import { 
  FiArrowLeft, 
  FiShield, 
  FiMail, 
  FiLock, 
  FiUser, 
  FiArrowRight,
  FiCheckCircle
} from "react-icons/fi";

// Your exact Theme Object
export const Theme = {
  primary: "#2F3E2C",
  secondary: "#D1EDD3",
};

export default async function SignUpPage(): Promise<React.JSX.Element> {
  // Read session on the server
  const session = await auth();

  // If already logged in, redirect user to home page
  if (session?.user) {
    redirect("/post");
  }

  return (
    <main className="min-h-dvh bg-slate-50 flex items-center justify-center p-4 relative font-sans">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover z-0">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-2xl space-y-6">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <FiArrowLeft /> Back to Home
        </Link>

        {/* Header Section */}
        <div className="text-center space-y-2">
          <span 
            className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-slate-900 inline-block"
            style={{ backgroundColor: Theme.secondary }}
          >
            Naija Venture Hub
          </span>
          <h1 className="text-3xl font-extrabold" style={{ color: Theme.primary }}>
            Create Account
          </h1>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            Join thousands of aspiring Nigerian founders building profitable local businesses with verified guides.
          </p>
        </div>

        {/* Perks Checklist */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-emerald-600 shrink-0" />
            <span>Free access to 120+ Nigerian business models</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-emerald-600 shrink-0" />
            <span>Direct connections with local mentors</span>
          </div>
        </div>

        {/* Google Authentication Server Action Form */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button 
            type="submit"
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Sign Up with Google
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] uppercase font-semibold text-slate-400 absolute">
            Or with email
          </span>
        </div>

        {/* Email & Password Registration Form */}
        <form
          action={async (formData: FormData) => {
            "use server";
            // Place your custom server-side registration/database logic here
            redirect("/signin");
          }}
          className="space-y-4"
        >
          {/* Full Name Input */}
          <div>
            <label className="block text-xs uppercase text-slate-500 font-semibold mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Babatunde Adebayo"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-xs uppercase text-slate-500 font-semibold mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs uppercase text-slate-500 font-semibold mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{ backgroundColor: Theme.primary }}
            className="w-full py-3.5 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer shadow-md mt-2"
          >
            Create Free Account <FiArrowRight />
          </button>
        </form>

        {/* Existing Account Redirect Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-bold underline hover:text-slate-900"
              style={{ color: Theme.primary }}
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Security Info */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <FiShield className="text-emerald-700" />
          <span>Encrypted 256-bit SSL authentication</span>
        </div>

        {/* Footer Terms */}
        <p className="text-[11px] text-center text-slate-400 leading-tight">
          By registering, you accept Naija Venture Hub's{" "}
          <Link href="#" className="underline hover:text-slate-600">Terms of Service</Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-slate-600">Privacy Policy</Link>.
        </p>

      </div>
    </main>
  );
}