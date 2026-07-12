"use client";

import { useState } from "react";

interface CheckInReflectionProps {
  emotion: string;
  onContinue: (reflection: string) => void;
}

export default function CheckInReflection({
  emotion,
  onContinue,
}: CheckInReflectionProps) {
  const [reflection, setReflection] = useState("");

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8A6E4B]">
        Reflection
      </p>

      <h2 className="font-serif text-4xl font-bold text-[#1C2434]">
        Tell us a little more.
      </h2>

      <p className="mt-4 text-lg leading-8 text-gray-600">
        You said you're feeling{" "}
        <strong>{emotion}</strong>.
      </p>

      <p className="mt-6 text-lg leading-8 text-gray-700">
        What's contributing most to that feeling today?
      </p>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Write whatever comes naturally..."
        className="mt-8 min-h-[220px] w-full rounded-3xl border border-gray-300 p-6 text-lg outline-none focus:border-[#8A6E4B]"
      />

      <div className="mt-8 flex justify-end">

        <button
          disabled={reflection.trim().length < 10}
          onClick={() => onContinue(reflection)}
          className={`rounded-full px-8 py-4 font-semibold transition ${
            reflection.trim().length >= 10
              ? "bg-[#8A6E4B] text-white hover:bg-[#73593C]"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Continue →
        </button>

      </div>

    </section>
  );
}