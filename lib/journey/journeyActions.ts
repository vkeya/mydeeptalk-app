import { JourneyProgress } from "./progressEngine";
import { saveJourneyProgress } from "./storage";

export function completeExperience(
  progress: JourneyProgress,
  experienceId: number,
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

  const unlockedExperiences = [
    ...new Set([
      ...progress.unlockedExperiences,
      experienceId + 1,
    ]),
  ];

  const updated: JourneyProgress = {
    ...progress,

    completedExperiences,

    unlockedExperiences,

    currentExperience: experienceId + 1,

    totalXP: progress.totalXP + xpReward,

    achievements: progress.achievements + 1,

    journalEntries: progress.journalEntries + 1,
  };

  saveJourneyProgress(updated);

  return updated;
}