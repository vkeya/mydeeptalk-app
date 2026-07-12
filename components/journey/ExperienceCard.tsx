"use client";

import Link from "next/link";

interface ExperienceCardProps {
  title: string;
  chapter: string;
  description: string;

  xp: number;
  duration: string;

  href: string;

  completed?: boolean;
  unlocked?: boolean;
}

export default function ExperienceCard({
  title,
  chapter,
  description,
  xp,
  duration,
  href,
  completed = false,
  unlocked = false,
}: ExperienceCardProps) {
  return (
    <div
      className={`rounded-3xl border p-8 transition-all ${
        unlocked
          ? "border-[#D9C8AE] bg-white shadow-sm hover:shadow-lg"
          : "border-gray-200 bg-gray-100 opacity-70"
      }`}
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-[#8A6E4B]">
            {chapter}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#1C2434]">
            {title}
          </h2>

        </div>

        <div className="text-4xl">
          {completed ? "🏆" : unlocked ? "🌿" : "🔒"}
        </div>

      </div>

      <p className="mt-6 leading-8 text-gray-600">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">

        <span>⭐ {xp} XP</span>

        <span>⏱ {duration}</span>

      </div>

      <div className="mt-10">

        {completed ? (
          <Link
            href={href}
            className="inline-flex rounded-full bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700 transition"
          >
            Review Experience
          </Link>
        ) : unlocked ? (
          <Link
            href={href}
            className="inline-flex rounded-full bg-[#8A6E4B] px-8 py-3 font-semibold text-white hover:bg-[#73593C] transition"
          >
            Continue Journey →
          </Link>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-full bg-gray-300 px-8 py-3 font-semibold text-gray-500"
          >
            Locked
          </button>
        )}

      </div>
    </div>
  );
}