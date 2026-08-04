// ======================================================
// Journey Recommendation
// ======================================================

export interface JourneyRecommendation {
  priority: RecommendationPriority;

  title: string;

  description: string;

  actionLabel: string;

  actionHref: string;

  reason: string;

  category: RecommendationCategory;
}

export type RecommendationPriority =
  | "critical"
  | "high"
  | "medium"
  | "low";

export type RecommendationCategory =
  | "checkin"
  | "assessment"
  | "genesis"
  | "journal"
  | "therapy"
  | "celebration";