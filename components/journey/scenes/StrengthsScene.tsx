"use client";

import { useState } from "react";

const strengths = [
  "Resilience",
  "Compassion",
  "Creativity",
  "Curiosity",
  "Leadership",
  "Adaptability",
  "Patience",
  "Optimism",
  "Integrity",
  "Courage",
  "Kindness",
  "Discipline",
  "Empathy",
  "Faith",
  "Humility",
  "Perseverance",
];

export default function StrengthsScene() {
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [proudMoment, setProudMoment] = useState("");
  const [hiddenStrength, setHiddenStrength] = useState("");

  function toggleStrength(strength: string) {
    if (selectedStrengths.includes(strength)) {
      setSelectedStrengths(
        selectedStrengths.filter((s) => s !== strength)
      );
    } else if (selectedStrengths.length < 5) {
      setSelectedStrengths([
        ...selectedStrengths,
        strength,
      ]);
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">
            💪
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Personal Strengths
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Discover Your Inner Strengths
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every challenge you've overcome has revealed something
            about your character.
          </p>

          <p className="mt-3 text-gray-600">
            Choose the strengths you believe have helped shape who
            you are today.
          </p>

        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          {strengths.map((strength) => (
            <button
              key={strength}
              type="button"
              onClick={() => toggleStrength(strength)}
              className={`rounded-full px-5 py-3 transition ${
                selectedStrengths.includes(strength)
                  ? "bg-emerald-600 text-white"
                  : "border border-gray-300 bg-white"
              }`}
            >
              {strength}
            </button>
          ))}

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            Tell us about a moment when you felt proud of yourself.
          </label>

          <textarea
            rows={5}
            value={proudMoment}
            onChange={(e) => setProudMoment(e.target.value)}
            placeholder="Describe a challenge you overcame or a moment you're proud of..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            Which strength do you think you don't recognize in yourself enough?
          </label>

          <textarea
            rows={4}
            value={hiddenStrength}
            onChange={(e) => setHiddenStrength(e.target.value)}
            placeholder="Describe a strength you want to appreciate more..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Genesis Reflection
          </p>

          <p className="mt-3 leading-7 text-gray-700">
            Your strengths aren't defined by perfection—they're revealed
            in the way you've responded to life's challenges. Together,
            we'll continue uncovering qualities that have quietly carried
            you through difficult moments.
          </p>

        </div>

      </div>

    </div>
  );
}