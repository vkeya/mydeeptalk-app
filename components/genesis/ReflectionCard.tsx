"use client";

import { JourneyReflection } from "@/types/genesisReflection";

interface ReflectionCardProps {
  reflection: JourneyReflection;
  onContinue?: () => void;
}

export default function ReflectionCard({
  reflection,
  onContinue,
}: ReflectionCardProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900">
        {reflection.title}
      </h1>

      <p className="mt-2 text-gray-600">
        Congratulations! You've completed your first Genesis experience.
      </p>

      <div className="mt-8 space-y-8">
        <Section title="Identity" items={reflection.identity} />

        <Section title="Values" items={reflection.values} />

        <Section title="Strengths" items={reflection.strengths} />

        <Section title="Emotional Themes" items={reflection.emotions} />
      </div>

      <div className="mt-10 rounded-2xl bg-blue-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Reflection
        </h2>

        <p className="mt-3 leading-7 text-gray-700">
          {reflection.summary}
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-green-50 p-6">
        <h2 className="font-semibold text-gray-900">
          Next Step
        </h2>

        <p className="mt-2 text-gray-700">
          {reflection.nextStep}
        </p>
      </div>

      {onContinue && (
        <button
          onClick={onContinue}
          className="mt-10 rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Continue
        </button>
      )}
    </div>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-gray-50 px-4 py-2 text-gray-700"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}