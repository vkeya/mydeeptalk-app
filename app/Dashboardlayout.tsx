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
        <aside className="hidden w-72 bg-[#123C3A] p-6 text-white md:block">
          <h1 className="text-2xl font-bold">MyDeepTalk</h1>
          <p className="mt-2 text-sm text-white/70">
            Emotional Wellness Platform
          </p>

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
              <h2 className="text-xl font-bold text-[#123C3A]">
                {userName || "MyDeepTalk User"}
              </h2>
            </div>

            <button
              onClick={onLogout}
              className="rounded-full bg-[#D99A3D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#bf8431]"
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