"use client";

import Link from "next/link";
import { useJourney } from "@/context/JourneyContext";

export default function CelebrationScene() {
  const { state } = useJourney();

  return (
    <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-sm text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <span className="text-4xl">🎉</span>
      </div>

      <h1 className="mt-8 text-4xl font-bold text-gray-900">
        Congratulations!
      </h1>

      <p className="mt-4 text-lg leading-8 text-gray-600">
        You have completed <strong>Meeting Yourself</strong>.
      </p>

      <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
        <h2 className="text-xl font-semibold text-indigo-700">
          Rewards Earned
        </h2>

        <div className="mt-6 space-y-3">
          <p className="text-lg font-medium text-gray-800">
            ⭐ +100 XP
          </p>

          <p className="text-lg font-medium text-gray-800">
            🏅 Badge Unlocked: <strong>Meeting Yourself</strong>
          </p>
        </div>
      </div>

      {state.completed && (
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-medium text-green-700">
            ✓ Your Genesis profile has been updated successfully.
          </p>
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Remember
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Self-discovery is not about becoming someone else. It is about
          understanding who you already are and growing with honesty,
          courage, and compassion.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/dashboard"
          className="inline-flex rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue Your Journey
        </Link>
      </div>
    </section>
  );
}