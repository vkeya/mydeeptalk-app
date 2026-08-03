"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogIn,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  isLoggedIn: boolean;
  navLinks: NavLink[];
}

const healingAreas = [
  {
    href: "/areas/relationships",
    label: "❤️ Relationships",
  },
  {
    href: "/areas/parenting",
    label: "👨‍👩‍👧 Parenting",
  },
  {
    href: "/areas/trauma-healing",
    label: "🌿 Trauma & Healing",
  },
  {
    href: "/areas/mental-emotional-wellness",
    label: "🧠 Mental Wellness",
  },
  {
    href: "/areas/addiction-recovery",
    label: "🔄 Addiction & Recovery",
  },
  {
    href: "/areas/self-discovery-purpose",
    label: "✨ Self Discovery",
  },
  {
    href: "/areas/mens-wellness",
    label: "👨 Men's Wellness",
  },
  {
    href: "/areas/womens-wellness",
    label: "👩 Women's Wellness",
  },
  {
    href: "/areas/faith-spiritual-wellness",
    label: "🙏 Faith & Spiritual Wellness",
  },
  {
    href: "/areas/life-challenges-transitions",
    label: "🌍 Life Challenges",
  },
];

export default function MobileNavigation({
  isLoggedIn,
  navLinks,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [showAreas, setShowAreas] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl p-2 text-[#0F4C5C]"
      >
        <Menu className="h-7 w-7" />
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 left-0 z-[100] flex h-screen w-[85vw] max-w-sm flex-col bg-white shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-6">

              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                MyDeepTalk
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2"
              >
                <X className="h-6 w-6" />
              </button>

            </div>

            {/* Navigation */}

            <div className="flex-1 overflow-y-auto p-6 space-y-2">

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 transition hover:bg-[#F7F3EC]"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setShowAreas(!showAreas)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-[#F7F3EC]"
              >
                <span>❤️ Healing Areas</span>

                {showAreas ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>

              {showAreas && (
                <div className="ml-4 space-y-1">

                  {healingAreas.map((area) => (
                    <Link
                      key={area.href}
                      href={area.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-[#F7F3EC]"
                    >
                      {area.label}
                    </Link>
                  ))}

                </div>
              )}

            </div>

            {/* Footer */}

            <div className="border-t p-6">

              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              ) : (
                <div className="space-y-3">

                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#0F4C5C] px-5 py-3 font-semibold text-[#0F4C5C]"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white"
                  >
                    Get Started
                  </Link>

                </div>
              )}

            </div>

          </div>
        </>
      )}
    </>
  );
}