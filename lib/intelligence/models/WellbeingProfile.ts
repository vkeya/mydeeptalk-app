import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";

export type ProfileConfidence = "LOW" | "MEDIUM" | "HIGH";

export interface WellbeingDimensionScore {
  dimension: WellbeingDimension;
  score: number;
  trend: number;
  confidence: ProfileConfidence;
  lastUpdated: Date;
  contributingAssessments: string[];
}

export interface WellbeingProfile {
  userId: string;

  overallScore: number;

  confidence: ProfileConfidence;

  dimensions: WellbeingDimensionScore[];

  lastAssessmentId?: string;

  lastUpdated: Date;
}