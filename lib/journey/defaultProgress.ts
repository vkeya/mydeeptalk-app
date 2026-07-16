import type { JourneyProgress } from "@/types/journey";

export const defaultJourneyProgress: JourneyProgress = {
  userId: "",

  totalXP: 0,

  level: 1,

  currentStreak: 0,

  longestStreak: 0,

  currentExperienceId: "meeting-yourself",

  completedExperiences: [],

  unlockedExperiences: ["meeting-yourself"],

  achievements: [],

  moodHistory: [],

  recentReflections: [],

  createdAt: new Date().toISOString(),

  updatedAt: new Date().toISOString(),
};