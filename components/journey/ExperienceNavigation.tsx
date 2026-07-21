"use client";

import { useRouter } from "next/navigation";

import { useJourney } from "@/context/JourneyContext";
import GenesisFooter from "@/components/journey/layout/GenesisFooter";
import type { JourneyScene } from "@/types/journey";

interface ExperienceNavigationProps {
  totalScenes: number;
  nextSceneType?: JourneyScene["type"];
}

export default function ExperienceNavigation({
  totalScenes,
  nextSceneType,
}: ExperienceNavigationProps) {
  const {
    state,
    nextScene,
    previousScene,
    completeExperience,
    resetJourney,
  } = useJourney();

  const router = useRouter();

  const isLastScene =
    state.currentScene === totalScenes - 1;

  const handlePrevious = () => {
    previousScene();
  };

  const handleNext = async () => {
 if (!isLastScene) {
  nextScene(nextSceneType);
  return;
}

  await completeExperience();

  resetJourney();

  router.push("/journey/dashboard");
};

    return (
  <GenesisFooter
    canContinue
    onPrevious={state.currentScene === 0 ? undefined : handlePrevious}
    onContinue={handleNext}
    continueLabel={isLastScene ? "Finish Journey" : "Continue"}
  />
);
 
}