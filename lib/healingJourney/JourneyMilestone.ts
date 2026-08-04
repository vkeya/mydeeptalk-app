// ======================================================
// Healing Journey Milestones
// ======================================================

export interface JourneyMilestone {
  id: string;

  title: string;

  description: string;

  icon: string;

  achieved: boolean;

  achievedAt?: Date;

  category: JourneyMilestoneCategory;
}

export type JourneyMilestoneCategory =
  | "checkin"
  | "assessment"
  | "journal"
  | "genesis"
  | "therapy"
  | "consistency"
  | "wellbeing";