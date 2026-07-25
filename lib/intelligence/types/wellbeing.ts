import { WellbeingDimension } from "../framework/dimensions";
import { Recommendation } from "./recommendation";

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

  overallScore: number;

  dimensions: DimensionScore[];

  strengths: WellbeingDimension[];

  growthAreas: WellbeingDimension[];
  
  recommendations: Recommendation[];

  therapistAttention: boolean;

  generatedAt: Date;

  updatedAt: Date;
}