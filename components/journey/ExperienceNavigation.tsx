"use client";

import { useJourney } from "@/context/JourneyContext";

interface ExperienceNavigationProps {
  totalScenes: number;
}

export default function ExperienceNavigation({
  totalScenes,
}: ExperienceNavigationProps) {
  const { state, setCurrentScene } = useJourney();

  const previous = () => {
    if (state.currentScene > 0) {
      setCurrentScene(state.currentScene - 1);
    }
  };

  const next = () => {
    if (state.currentScene < totalScenes - 1) {
      setCurrentScene(state.currentScene + 1);
    }
  };

  return (
    <div className="mt-10 flex justify-between">
      <button
        type="button"
        onClick={previous}
        disabled={state.currentScene === 0}
        className="rounded-lg border px-5 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <button
        type="button"
        onClick={next}
        disabled={state.currentScene === totalScenes - 1}
        className="rounded-lg bg-[#7A5AF8] px-5 py-2 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}