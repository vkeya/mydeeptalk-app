export interface JourneyProgress {
  currentExperience: number;

  completedExperiences: number[];

  unlockedExperiences: number[];

  totalXP: number;

  currentLevel: number;
}

export function getJourneyProgress(): JourneyProgress {
  // Placeholder values.
  // Later this will come from Firestore.
  return {
    currentExperience: 2,

    completedExperiences: [1],

    unlockedExperiences: [1, 2],

    totalXP: 250,

    currentLevel: 1,
  };
}

export function isExperienceUnlocked(
  experienceId: number,
  progress: JourneyProgress
) {
  return progress.unlockedExperiences.includes(experienceId);
}

export function isExperienceCompleted(
  experienceId: number,
  progress: JourneyProgress
) {
  return progress.completedExperiences.includes(experienceId);
}