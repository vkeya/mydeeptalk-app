"use client";

import { notFound } from "next/navigation";
import { use, useEffect } from "react";
import GenesisHeader from "@/components/journey/layout/GenesisHeader";
import GenesisProgress from "@/components/journey/layout/GenesisProgress";
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
  
  const nextScene =
  experience.scenes[state.currentScene + 1];

  return (
  <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">

      <GenesisHeader
        chapter={{
          number: 1,
          title: experience.title,
          subtitle: experience.description,
         
          estimatedMinutes: 15,
          xpReward: experience.xpReward,
        }}
      />

      <GenesisProgress
        currentScene={state.currentScene + 1}
        totalScenes={experience.scenes.length}
        sceneTitle={nextScene?.title}
      />

      <div className="flex-1 rounded-[32px] border border-violet-100 bg-white p-8 shadow-sm">
        <SceneRenderer scene={scene} />
      </div>

      <ExperienceNavigation
        totalScenes={experience.scenes.length}
        nextSceneType={nextScene?.type}
      />

    </div>
  </main>
);
}