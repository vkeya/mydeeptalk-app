// ======================================================
// Healing Journey Progress
// ======================================================

export interface JourneyProgress {
  overallProgress: number;

  consistencyScore: number;

  engagementScore: number;

  wellbeingScore: number;

  momentum: JourneyMomentum;

  nextMilestone: string;

  completedMilestones: number;
}

export type JourneyMomentum =
  | "accelerating"
  | "steady"
  | "slowing"
  | "stalled";