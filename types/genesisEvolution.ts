/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Evolution Types
 * ------------------------------------------------------------------
 */

export interface EvolutionTrend {
  key: string;
  label: string;

  direction: "growing" | "declining" | "stable";

  averageChange: number;

  observations: number;
}

export interface RelationshipTrend {
  source: string;

  target: string;

  relationship: string;

  direction: "growing" | "declining" | "stable";

  averageChange: number;

  observations: number;
}

export interface EvolutionSummary {
  generatedAt: Date;

  strongestGrowth: EvolutionTrend[];

  greatestDecline: EvolutionTrend[];

  stableTraits: EvolutionTrend[];

  relationshipTrends: RelationshipTrend[];
}