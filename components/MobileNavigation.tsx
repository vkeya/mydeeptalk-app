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
  { href: "/areas/relationships", label: "❤️ Relationships" },
  { href: "/areas/parenting", label: "👨‍👩‍👧 Parenting" },
  { href: "/areas/trauma-healing", label: "🌿 Trauma & Healing" },
  { href: "/areas/mental-emotional-wellness", label: "🧠 Mental Wellness" },
  { href: "/areas/addiction-recovery", label: "🔄 Addiction & Recovery" },
  { href: "/areas/self-discovery-purpose", label: "✨ Self Discovery" },
  { href: "/areas/mens-wellness", label: "👨 Men's Wellness" },
  { href: "/areas/womens-wellness", label: "👩 Women's Wellness" },
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

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-[#0F4C5C]"
        aria-label="Open menu"
      >
        <Menu className="h-7 w-7" />
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-[100] flex h-screen w-[85vw] max-w-sm flex-col bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-[#0F4C5C]">
                  MyDeepTalk
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your wellness journey starts here.
                </p>
              </div>

              <button
                onClick={closeMenu}
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-6 py-6">

              <div className="space-y-2">

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 text-gray-700 transition hover:bg-[#F7F3EC] hover:text-[#0F4C5C]"
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  onClick={() => setShowAreas(!showAreas)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-gray-700 transition hover:bg-[#F7F3EC]"
                >
                  <span>❤️ Wellness Areas</span>

                  {showAreas ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>

                {showAreas && (
                  <div className="ml-4 border-l border-slate-200 pl-4">

                    <div className="space-y-1">

                      {healingAreas.map((area) => (
                        <Link
                          key={area.href}
                          href={area.href}
                          onClick={closeMenu}
                          className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-[#F7F3EC] hover:text-[#0F4C5C]"
                        >
                          {area.label}
                        </Link>
                      ))}

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-6">

              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white transition hover:bg-[#0B3945]"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              ) : (
                <div className="space-y-3">

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0F4C5C] px-5 py-3 font-semibold text-[#0F4C5C] transition hover:bg-[#F7F3EC]"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white transition hover:bg-[#0B3945]"
                  >
                    Get Started
                  </Link>

                </div>
              )}

            </div>

          </aside>

        </>
      )}
    </>
  );
}