"use client";

import { notFound } from "next/navigation";

import SceneRenderer from "@/components/journey/SceneRenderer";
import { journeyExperiences } from "@/data/journeys";
import { useJourney } from "@/context/JourneyContext";

interface JourneyPageProps {
  params: {
    experienceId: string;
  };
}

export default function JourneyExperiencePage({
  params,
}: JourneyPageProps) {
  const { state } = useJourney();

  const experience =
    journeyExperiences[params.experienceId];

  if (!experience) {
    notFound();
  }

  const scene = experience.scenes[state.currentScene];

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <SceneRenderer scene={scene} />
    </main>
  );
}