"use client";

import { useState } from "react";

const values = [
  "Family",
  "Faith",
  "Integrity",
  "Love",
  "Growth",
  "Compassion",
  "Honesty",
  "Freedom",
  "Creativity",
  "Service",
  "Health",
  "Learning",
  "Justice",
  "Adventure",
  "Respect",
  "Purpose",
];

export default function ValuesScene() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [importantValue, setImportantValue] = useState("");
  const [livingValue, setLivingValue] = useState("");

  function toggleValue(value: string) {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else if (selectedValues.length < 5) {
      setSelectedValues([...selectedValues, value]);
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">
      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">🧭</div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Core Values
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            What Guides Your Life?
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Values are the principles that influence your decisions,
            relationships and purpose.
          </p>

          <p className="mt-3 text-gray-600">
            Choose the values that matter most to you today.
          </p>

        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          {values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleValue(value)}
              className={`rounded-full px-5 py-3 transition ${
                selectedValues.includes(value)
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white"
              }`}
            >
              {value}
            </button>
          ))}

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            Which value is most important to you, and why?
          </label>

          <textarea
            rows={5}
            value={importantValue}
            onChange={(e) => setImportantValue(e.target.value)}
            placeholder="Tell us why this value matters..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            Which value would you like to live more intentionally?
          </label>

          <textarea
            rows={4}
            value={livingValue}
            onChange={(e) => setLivingValue(e.target.value)}
            placeholder="Describe how you'd like to grow..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            Genesis Reflection
          </p>

          <p className="mt-3 leading-7 text-gray-700">
            Your values are your inner compass. When your daily choices
            align with them, life often feels more meaningful, authentic
            and fulfilling.
          </p>

        </div>

      </div>
    </div>
  );
}