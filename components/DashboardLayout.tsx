"use client";

import Link from "next/link";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  userName?: string;
  role?: string;
  onLogout?: () => void;
};

export default function DashboardLayout({
  children,
  userName,
  role,
  onLogout,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 bg-[#0F4C5C] p-6 text-white md:block">
            <div className="mb-10">
             <h1 className="text-3xl font-bold text-white">
                 MyDeepTalk
             </h1>

             <p className="mt-3 text-sm leading-6 text-white/70">
                AI-powered emotional wellness and therapist support.
             </p>
            </div>

          <nav className="mt-10 space-y-3">
            <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/dashboard">
              Dashboard
            </Link>

            {role === "client" && (
              <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/therapists">
                Find Therapist
              </Link>
            )}

            <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/my-bookings">
              My Bookings
            </Link>

            {role === "therapist" && (
              <>
                <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/therapist-profile">
                  Therapist Profile
                </Link>

                <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/therapist-credentials">
                  Credentials
                </Link>

                <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/therapist-availability">
                  Availability
                </Link>
              </>
            )}

            {role === "admin" && (
              <Link className="block rounded-lg px-4 py-3 hover:bg-white/10" href="/admin-therapists">
                Review Therapists
              </Link>
            )}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="flex items-center justify-between border-b bg-white px-8 py-5">
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h2 className="text-xl font-bold text-[#0F4C5C]">
                {userName || "MyDeepTalk User"}
              </h2>
            </div>

            <button
              onClick={onLogout}
              className="rounded-full bg-[#E2954E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#c97b2f]"
            >
              Logout
            </button>
          </header>

          <section className="p-8">{children}</section>
        </main>
      </div>
    </div>
  );
}