export interface XPProgress {
  level: number;
  title: string;

  currentXP: number;

  nextLevelXP: number;

  percentage: number;
}

export function calculateXP(
  totalXP: number
): XPProgress {

  if (totalXP < 500) {
    return {
      level: 1,
      title: "Explorer",

      currentXP: totalXP,

      nextLevelXP: 500,

      percentage: (totalXP / 500) * 100,
    };
  }

  if (totalXP < 1000) {
    return {
      level: 2,
      title: "Seeker",

      currentXP: totalXP,

      nextLevelXP: 1000,

      percentage:
        ((totalXP - 500) / 500) * 100,
    };
  }

  return {
    level: 3,
    title: "Pathfinder",

    currentXP: totalXP,

    nextLevelXP: 1500,

    percentage:
      ((totalXP - 1000) / 500) * 100,
  };
}