"use client";

import { notFound } from "next/navigation";
import { use, useEffect } from "react";

import SceneRenderer from "@/components/journey/SceneRenderer";
import { journeyExperiences } from "@/data/journeys";
import { useJourney } from "@/context/JourneyContext";
import ExperienceNavigation from "@/components/journey/ExperienceNavigation";

interface JourneyPageProps {
  params: Promise<{
    experienceId: string;
  }>;
}

export default function JourneyExperiencePage({
  params,
}: JourneyPageProps) {
	
  const resolvedParams = use(params);
  
  const { state, startExperience } = useJourney();
  
  useEffect(() => {
  startExperience(resolvedParams.experienceId);
}, [resolvedParams.experienceId, startExperience]);

  const experience = journeyExperiences[resolvedParams.experienceId];

  if (!experience) {
    notFound();
  }

  const scene =
  experience.scenes[state.currentScene] ??
  experience.scenes[0];

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <SceneRenderer scene={scene} />
	  
	   <ExperienceNavigation
      totalScenes={experience.scenes.length}
    />
    </main>
  );
}