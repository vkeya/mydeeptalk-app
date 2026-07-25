import { WellbeingDimensionId } from "@/lib/assessment/types/AssessmentDimensions";
import { RecommendationBundle } from "@/lib/assessment/types/AssessmentRecommendation";

/**
 * Trend direction for a wellbeing dimension.
 */
export type TrendDirection =
  | "improving"
  | "stable"
  | "declining"
  | "unknown";

/**
 * Profile for a single wellbeing dimension.
 */
export interface DimensionProfile {
  /**
   * Wellbeing dimension.
   */
  dimension: WellbeingDimensionId;

  /**
   * Current normalized score.
   */
  score: number;

  /**
   * Trend over time.
   */
  trend: TrendDirection;

  /**
   * Confidence in the detected trend.
   *
   * 0–100
   */
  confidence: number;

  /**
   * Assessments contributing to this score.
   */
  contributingAssessments: string[];
}

/**
 * Overall wellbeing profile.
 */
export interface WellbeingProfile {
  /**
   * Overall wellbeing score.
   */
  overallScore: number;

  /**
   * Dimension-level wellbeing.
   */
  dimensions: DimensionProfile[];

  /**
   * Highest-performing dimensions.
   */
  strengths: WellbeingDimensionId[];

  /**
   * Dimensions needing attention.
   */
  growthAreas: WellbeingDimensionId[];

  /**
   * AI-generated insights.
   */
  insights: string[];

  /**
   * Platform recommendations.
   */
  recommendations: RecommendationBundle;
}