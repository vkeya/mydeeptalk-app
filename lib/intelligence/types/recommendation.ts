export type RecommendationType =
  | "journey"
  | "assessment"
  | "journal"
  | "therapy"
  | "homework"
  | "reflection";

export interface Recommendation {
  id: string;

  type: RecommendationType;

  title: string;

  description: string;

  priority: number;

  reason: string;
}

