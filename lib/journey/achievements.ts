import type { JourneyProgress } from "@/types/journey";

export function checkAchievements(progress: JourneyProgress) {
  const achievements = [...progress.achievements];

  if (
    progress.completedExperiences.length >= 1 &&
    !achievements.some(a => a.id === "first-journey")
  ) {
    achievements.push({
      id: "first-journey",
      title: "First Step",
      description: "Completed your first healing journey.",
      unlockedAt: new Date().toISOString(),
    });
  }

  return achievements;
}