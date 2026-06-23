"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";

const navLinks = [
  { href: "/", label: "Welcome" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/therapists", label: "Find a Therapist" },
  { href: "/for-therapists", label: "For Therapists" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
}, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 bg-[#F7F3EC]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-new.png"
            alt="MyDeepTalk"
            width={350}
            height={200}
            priority
            className="h-9 w-auto object-contain md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition ${
                  active
                    ? "font-semibold text-[#0F4C5C] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-[70%] after:rounded-full after:bg-[#0F4C5C]"
                    : "text-gray-600 hover:text-[#0F4C5C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Buttons */}
       {/* Buttons */}
<div className="flex items-center gap-3 md:gap-4">
  {isLoggedIn ? (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3945] md:px-6 md:text-base"
    >
      <LayoutDashboard className="h-4 w-4" />
      Dashboard
    </Link>
  ) : (
    <>
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C5C] md:text-base"
      >
        <LogIn className="h-4 w-4" />
        Login
      </Link>

      <Link
        href="/signup"
        className="group inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3945] md:px-6 md:text-base"
      >
        Get Started
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </>
  )}
</div>
      </div>
    </nav>
  );
}