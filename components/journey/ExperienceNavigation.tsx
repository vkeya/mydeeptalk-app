"use client";

import { useRouter } from "next/navigation";

import { useJourney } from "@/context/JourneyContext";

interface ExperienceNavigationProps {
  totalScenes: number;
}

export default function ExperienceNavigation({
  totalScenes,
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

  const handleNext = () => {
    if (!isLastScene) {
      nextScene();
      return;
    }

    completeExperience();

    resetJourney();

    router.push("/journey/dashboard");
  };

  return (
    <div className="mt-10 flex justify-between">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={state.currentScene === 0}
        className="rounded-lg border px-5 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="rounded-lg bg-[#7A5AF8] px-5 py-2 text-white"
      >
        {isLastScene ? "Finish Journey" : "Next"}
      </button>
    </div>
  );
}