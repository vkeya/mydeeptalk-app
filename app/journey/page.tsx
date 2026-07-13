"use client";

import SceneRenderer from "@/components/journey/SceneRenderer";
import { journeyExperiences } from "@/data/journeys";
import { useJourney } from "@/context/JourneyContext";

export default function JourneyPage() {
  const { state } = useJourney();

  const experience = journeyExperiences["meeting-yourself"];

  const currentScene = experience.scenes[state.currentScene];

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <SceneRenderer scene={currentScene} />
    </main>
  );
}