import type { JourneyProgress } from "@/types/journey";

import { saveJourneyProgress } from "./storage";

export function completeExperience(
  progress: JourneyProgress,
  experienceId: string,
  xpReward: number
): JourneyProgress {
  // Prevent duplicate completion
  if (progress.completedExperiences.includes(experienceId)) {
    return progress;
  }

  const completedExperiences = [
    ...progress.completedExperiences,
    experienceId,
  ];

  const unlockedExperiences = [...progress.unlockedExperiences];

  // Temporary unlock logic
  if (
    experienceId === "meeting-yourself" &&
    !unlockedExperiences.includes("your-story")
  ) {
    unlockedExperiences.push("your-story");
  }

  const updated: JourneyProgress = {
    ...progress,

    completedExperiences,

    unlockedExperiences,

    currentExperienceId: experienceId,

    totalXP: progress.totalXP + xpReward,

    level: progress.level,

    updatedAt: new Date().toISOString(),
  };

  saveJourneyProgress(updated);

  return updated;
}