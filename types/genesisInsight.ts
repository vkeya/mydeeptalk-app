export type InsightCategory =
  | "identity"
  | "emotion"
  | "values"
  | "strengths"
  | "relationships"
  | "purpose"
  | "lifeStory";

export type InsightType =
  | "pattern"
  | "strength"
  | "growth"
  | "contradiction"
  | "reflection"
  | "milestone";

export interface GenesisInsight {
  /**
   * Unique insight identifier.
   */
  id: string;

  /**
   * Human-readable insight.
   */
  title: string;

  /**
   * Longer explanation.
   */
  description: string;

  /**
   * Which area of the user's life this insight belongs to.
   */
  category: InsightCategory;

  /**
   * Type of insight.
   */
  type: InsightType;

  /**
   * Confidence (0–1).
   */
  confidence: number;

  /**
   * Discoveries that contributed to this insight.
   */
  discoveryIds: string[];

  /**
   * Engine generated timestamp.
   */
  createdAt: Date;
}