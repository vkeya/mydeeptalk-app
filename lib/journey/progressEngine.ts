import { loadJourneyProgress, saveJourneyProgress } from "./storage";
import { defaultJourneyProgress } from "./defaultProgress";
import type { JourneyProgress } from "@/types/journey";
import { journeyExperiences } from "@/data/journeyExperiences";




export function getJourneyProgress(): JourneyProgress {
  return loadJourneyProgress() ?? defaultJourneyProgress;
}

function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 500) + 1;
}

export function completeExperience(
  experienceId: string
): JourneyProgress {
  const progress = getJourneyProgress();

  if (!progress.completedExperiences.includes(experienceId)) {
    progress.completedExperiences.push(experienceId);
  }

  // Update the active experience
  progress.currentExperienceId = experienceId;
  
  const experience = journeyExperiences.find(
  (exp) => exp.slug === experienceId
);

if (experience) {
  progress.totalXP += experience.xp;
}

progress.level = calculateLevel(progress.totalXP);

  // Unlock the next experience (temporary until the full unlock engine)
  const currentIndex = journeyExperiences.findIndex(
  (exp) => exp.slug === experienceId
);

const nextExperience = journeyExperiences[currentIndex + 1];

if (
  nextExperience &&
  !progress.unlockedExperiences.includes(nextExperience.slug)
) {
  progress.unlockedExperiences.push(nextExperience.slug);
}

  progress.updatedAt = new Date().toISOString();

  saveJourneyProgress(progress);

  return progress;
}

export function isExperienceUnlocked(
  experienceId: string,
  progress: JourneyProgress
): boolean {
  return progress.unlockedExperiences.includes(experienceId);
}

export function isExperienceCompleted(
  experienceId: string,
  progress: JourneyProgress
): boolean {
  return progress.completedExperiences.includes(experienceId);
}