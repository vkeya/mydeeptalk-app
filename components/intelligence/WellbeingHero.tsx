"use client";

import Link from "next/link";
import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";

interface WellbeingHeroProps {
  profile: WellbeingProfile;
}

export default function WellbeingHero({
  profile,
}: WellbeingHeroProps) {
  const score = Number.isFinite(profile.overallScore)
  ? Math.round(profile.overallScore)
  : 0;

  const trend =
    profile.dimensions.find(
      (d) => d.trend === "improving"
    )
      ? "Improving"
      : profile.dimensions.find(
          (d) => d.trend === "declining"
        )
      ? "Needs Attention"
      : "Stable";

  const trendColor =
    trend === "Improving"
      ? "text-green-600"
      : trend === "Needs Attention"
      ? "text-amber-600"
      : "text-slate-600";

  const greeting =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";
	  
  const formatLastUpdated = (value: unknown) => {
  if (!value) {
    return "Recently updated";
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value as string);

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffInDays <= 0) {
    return "Today";
  }

  if (diffInDays === 1) {
    return "Yesterday";
  }

  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return date.toLocaleDateString();
};

  return (
    <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-xl">
      <p className="text-sm uppercase tracking-[0.2em] opacity-80">
        {greeting}
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        Welcome back to your journey.
      </h1>

      <p className="mt-3 max-w-2xl text-lg text-white/90">
        Every reflection, assessment and journey
        helps build a deeper understanding of your
        wellbeing.
      </p>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-white/80">
            Overall Wellbeing
          </p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-7xl font-bold">
              {score}
            </span>

            <span className="mb-2 text-2xl">
              /100
            </span>
          </div>

          <p className={`mt-4 font-semibold ${trendColor.replace("text-", "text-white ")}`}>
            {trend}
          </p>

          <p className="mt-2 text-sm text-white/80">
  Last updated {formatLastUpdated(profile.updatedAt)}
</p>
        </div>

        <div className="max-w-md rounded-2xl bg-white/10 p-6 backdrop-blur">
          <h2 className="text-xl font-bold">
            Your Journey
          </h2>

          <p className="mt-3 leading-7 text-white/90">
            You're continuing to build a healthier,
            more resilient version of yourself.
            Keep moving forward one step at a time.
          </p>

          <Link
            href="/journey"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C] transition hover:bg-slate-100"
          >
            Continue Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}