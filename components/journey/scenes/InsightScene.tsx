"use client";

import { useJourney } from "@/context/JourneyContext";

export default function InsightScene() {
  const { state } = useJourney();

  const reflection = state.reflection;

  if (!reflection) {
    return (
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Insight
        </h1>

        <p className="mt-4 text-gray-600">
          Complete your journey to receive your personalized reflection.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Genesis Reflection
        </span>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {reflection.title}
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-700">
          {reflection.summary}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-900">
            Identity
          </h2>

          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {reflection.identity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Values
          </h2>

          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {reflection.values.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Strengths
          </h2>

          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {reflection.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Emotions
          </h2>

          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {reflection.emotions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <h2 className="font-semibold text-indigo-700">
            Your Next Step
          </h2>

          <p className="mt-2 text-gray-700">
            {reflection.nextStep}
          </p>
        </div>
      </div>
    </section>
  );
}