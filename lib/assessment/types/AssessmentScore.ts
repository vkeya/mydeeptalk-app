import { WellbeingDimensionId } from "./AssessmentDimensions";

/**
 * Score for an individual wellbeing dimension.
 */
export interface DimensionScore {
  /**
   * Wellbeing dimension being scored.
   */
  dimension: WellbeingDimensionId;

  /**
   * Raw accumulated score.
   */
  rawScore: number;

  /**
   * Normalized score (0–100).
   */
  normalizedScore: number;
}

/**
 * Output from the Assessment Scoring Engine.
 *
 * Contains only calculated values.
 * No UI text or recommendations belong here.
 */
export interface AssessmentScore {
  /**
   * Assessment identifier.
   */
  assessmentId: string;

  /**
   * Assessment version used.
   */
  assessmentVersion: number;

  /**
   * Sum of all weighted question scores.
   */
  rawScore: number;

  /**
   * Normalized overall score (0–100).
   */
  normalizedScore: number;

  /**
   * Result definition selected by the scoring engine.
   * Example:
   *   "minimal"
   *   "moderate"
   *   "high"
   */
  resultId: string;

  /**
   * Individual wellbeing dimension scores.
   */
  dimensionScores: DimensionScore[];

  /**
   * Timestamp when scoring occurred.
   */
  calculatedAt: string;
}