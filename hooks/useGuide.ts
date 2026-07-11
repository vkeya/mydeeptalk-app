"use client";

import { useJourney } from "@/context/JourneyContext";
import { guides, GuideId } from "@/data/guides";

export default function useGuide() {
  const { state } = useJourney();

  const guideId: GuideId =
    (state.selectedGuide as GuideId) || "sage";

  return guides[guideId];
}