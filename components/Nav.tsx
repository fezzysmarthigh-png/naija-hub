"use client";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
}

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);

  const { data: session } = useSession();

  console.log(session);

  const navStuff: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Make Post", href: "/post" },
    { label: "View", href: "/ideas" },
  ];
  
  return (
    <nav className="flex items-center justify-between px-3 md:px-10 py-3 shadow-sm sticky top-0 bg-white z-50">
      <Link href="/" className="flex items-center gap-1 z-50">
        <Image
          src="/logo.png"
          alt="Naija Venture Hub Logo"
          width={500}
          height={500}
          className="w-10 h-10"
        />
        <p className="text-lg font-semibold max-md:hidden">Naija Venture Hub</p>
      </Link>

      <div className="flex items-center text-lg gap-5 max-lg:hidden">
        {navStuff.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>

      <Link href={session ? "/profile" : "/signin"} className="text-lg max-lg:ml-auto">
        {session && session.user?.image ? (
          <img 
            src={session.user.image} 
            alt={session.user?.name || "Profile"} 
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          "Sign In"
        )}
      </Link>

      <button
        onClick={() => setNavOpen(!navOpen)}
        className="text-2xl lg:hidden z-50 ml-3"
      >
        {navOpen ? <IoCloseOutline /> : <RiMenu3Line />}
      </button>

      {/* mobile navbar display */}
      {navOpen ? (
        <div className="bg-white h-dvh absolute w-full top-0 left-0 flex justify-center lg:hidden">
          <div className="flex flex-col items-center text-lg gap-10 pt-20">
            {navStuff.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}