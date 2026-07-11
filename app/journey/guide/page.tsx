"use client";

import { useState } from "react";
import Link from "next/link";

import GuideGrid from "@/components/journey/GuideGrid";
import { useJourney } from "@/context/JourneyContext";

const guides = [
  {
    id: "sage",
    name: "Sage",
    icon: "🌿",
    personality: "Reflective",
    description:
      "Helps you slow down, reflect deeply and discover meaning through thoughtful questions.",
  },
  {
    id: "lumina",
    name: "Lumina",
    icon: "☀️",
    personality: "Encouraging",
    description:
      "Celebrates your progress and reminds you of your strengths even when you forget them.",
  },
  {
    id: "atlas",
    name: "Atlas",
    icon: "🧭",
    personality: "Practical",
    description:
      "Turns insights into action with structure, encouragement and accountability.",
  },
  {
    id: "echo",
    name: "Echo",
    icon: "🌊",
    personality: "Gentle",
    description:
      "Creates a calm space for honest conversations and emotional understanding.",
  },
];

export default function GuidePage() {
  const { setSelectedGuide } = useJourney();

  const [selectedGuide, setSelectedGuideLocal] = useState<string | null>(null);

  const handleSelect = (guideId: string) => {
    setSelectedGuideLocal(guideId);
    setSelectedGuide(guideId);
  };

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-20">
      <div className="mx-auto max-w-6xl">

        <div className="mb-16 text-center">

          <p className="mb-4 uppercase tracking-[0.4em] text-[#8A6E4B]">
            Step 1 of 10
          </p>

          <h1 className="mb-6 font-serif text-5xl font-bold text-[#1C2434]">
            Choose Your Guide
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            Every guide leads to the same destination.
            They simply walk beside you in different ways.
            Choose the one that feels right today.
          </p>

        </div>

        <GuideGrid
          guides={guides}
          selectedGuide={selectedGuide}
          onSelect={handleSelect}
        />

        <div className="mt-16 text-center">

          <Link
            href="/journey/meeting-yourself"
            className={`inline-flex rounded-full px-12 py-4 text-lg font-semibold transition ${
              selectedGuide
                ? "bg-[#8A6E4B] text-white hover:bg-[#73593C]"
                : "pointer-events-none bg-gray-300 text-gray-500"
            }`}
          >
            Continue
          </Link>

        </div>

      </div>
    </main>
  );
}