import { WellbeingDimension } from "../framework/dimensions";

export type WellbeingTrend =
  | "improving"
  | "stable"
  | "declining"
  | "unknown";

export interface DimensionScore {
  dimension: WellbeingDimension;

  score: number;

  confidence: number;

  trend: WellbeingTrend;

  lastUpdated: Date;

  contributors: string[];
}

export interface WellbeingProfile {
  clientId: string;

  version: "1.0";

  frameworkVersion: "MWF-1.0";

  dimensions: DimensionScore[];

  strengths: WellbeingDimension[];

  growthAreas: WellbeingDimension[];

  recommendedJourneys: string[];

  recommendedAssessments: string[];

  therapistAttention: boolean;

  generatedAt: Date;

  updatedAt: Date;
}