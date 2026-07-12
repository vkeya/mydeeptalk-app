export interface JourneyProgress {
  currentExperience: number;

  completedExperiences: number[];

  unlockedExperiences: number[];

  totalXP: number;

  currentLevel: number;

  currentStreak: number;

  journalEntries: number;

  achievements: number;
}

export function getJourneyProgress(): JourneyProgress {
  return {
    currentExperience: 2,

    completedExperiences: [1],

    unlockedExperiences: [1, 2],

    totalXP: 250,

    currentLevel: 1,

    currentStreak: 3,

    journalEntries: 5,

    achievements: 2,
  };
}

export function isExperienceUnlocked(
  experienceId: number,
  progress: JourneyProgress
): boolean {
  return progress.unlockedExperiences.includes(experienceId);
}

export function isExperienceCompleted(
  experienceId: number,
  progress: JourneyProgress
): boolean {
  return progress.completedExperiences.includes(experienceId);
}