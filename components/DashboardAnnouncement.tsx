"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Announcement = {
  title: string;
  headline: string;
  description: string;
  closingText?: string;
  ctaText: string;
  ctaLink: string;
  active?: boolean;
  order?: number;
};

const fallbackAnnouncement: Announcement = {
  title: "💙 Men's Mental Health Month",
  headline: "Strong men talk too.",
  description:
    "Men often carry stress, grief, pressure, and loneliness silently. Taking care of your emotional wellbeing is a sign of strength, not weakness.",
  closingText: "You do not have to carry everything alone.",
  ctaText: "Reflect Today",
  ctaLink: "/journal",
};

export default function DashboardAnnouncement() {
  const [announcement, setAnnouncement] =
    useState<Announcement>(fallbackAnnouncement);

  useEffect(() => {
    async function loadAnnouncement() {
      try {
        const q = query(
          collection(db, "dashboardAnnouncements"),
          where("active", "==", true)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const items = snap.docs.map((doc) => doc.data() as Announcement);

          const sorted = items.sort((a, b) => (a.order || 999) - (b.order || 999));

          setAnnouncement({
            ...fallbackAnnouncement,
            ...sorted[0],
          });
        }
      } catch (error) {
        console.error("Dashboard announcement error:", error);
      }
    }

    loadAnnouncement();
  }, []);

  return (
    <section className="mb-10 rounded-3xl border border-[#2C7A7B]/20 bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 font-script text-2xl capitalize text-[#E2954E]">
            {announcement.title}
          </p>

          <h2 className="text-2xl font-bold text-[#0F4C5C] md:text-3xl">
            {announcement.headline}
          </h2>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-gray-900">
            {announcement.description}
          </p>

          {announcement.closingText && (
            <p className="mt-3 text-base font-bold text-[#0F4C5C]">
              {announcement.closingText}
            </p>
          )}
        </div>

        <Link
          href={announcement.ctaLink}
          className="w-fit rounded-full bg-[#0F4C5C] px-6 py-3 text-sm font-bold text-white hover:bg-[#0b3945]"
        >
          {announcement.ctaText}
        </Link>
      </div>
    </section>
  );
}