import { WellbeingDimension } from "../framework/dimensions";

export interface DimensionScore {
  dimension: WellbeingDimension;

  score: number;          // 0 - 100

  confidence: number;     // 0 - 100

  trend: "improving" | "stable" | "declining" | "unknown";

  lastUpdated: Date;

  contributors: string[];
}

export interface WellbeingProfile {
  clientId: string;

  dimensions: DimensionScore[];

  strengths: WellbeingDimension[];

  growthAreas: WellbeingDimension[];

  recommendedJourneys: string[];

  recommendedAssessments: string[];

  therapistAttention: boolean;

  generatedAt: Date;
}