"use client";

import { useState } from "react";

const emotions = [
  {
    emoji: "😊",
    label: "Peaceful",
    color: "bg-green-100 border-green-300",
  },
  {
    emoji: "🙂",
    label: "Hopeful",
    color: "bg-blue-100 border-blue-300",
  },
  {
    emoji: "😐",
    label: "Okay",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    emoji: "😔",
    label: "Overwhelmed",
    color: "bg-orange-100 border-orange-300",
  },
  {
    emoji: "😭",
    label: "Struggling",
    color: "bg-red-100 border-red-300",
  },
];

export default function DailyCheckIn() {
  const [selectedEmotion, setSelectedEmotion] =
    useState<string | null>(null);

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8A6E4B]">
        Daily Check-In
      </p>

      <h2 className="font-serif text-4xl font-bold text-[#1C2434]">
        How are you arriving today?
      </h2>

      <p className="mt-3 text-lg text-gray-600">
        There are no right or wrong answers.
        Just choose what feels closest.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-5">

        {emotions.map((emotion) => {

          const selected =
            selectedEmotion === emotion.label;

          return (
            <button
              key={emotion.label}
              onClick={() =>
                setSelectedEmotion(emotion.label)
              }
              className={`
                rounded-3xl border p-6 transition-all
                ${
                  selected
                    ? "border-[#8A6E4B] bg-[#F7F3EC] shadow-lg scale-105"
                    : `${emotion.color} hover:scale-105`
                }
              `}
            >
              <div className="text-5xl">
                {emotion.emoji}
              </div>

              <p className="mt-4 font-semibold">
                {emotion.label}
              </p>
            </button>
          );
        })}

      </div>

      {selectedEmotion && (

        <div className="mt-10 rounded-2xl bg-[#F7F3EC] p-6">

          <p className="text-lg text-[#1C2434]">
            Today you're feeling{" "}
            <strong>{selectedEmotion}</strong>.
          </p>

          <button
            className="mt-6 rounded-full bg-[#8A6E4B] px-8 py-3 font-semibold text-white transition hover:bg-[#73593C]"
          >
            Continue →
          </button>

        </div>

      )}

    </section>
  );
}