import { AssessmentScore } from "./AssessmentScore";
import { RecommendationBundle } from "./AssessmentRecommendation";

/**
 * Summary displayed to the user.
 */
export interface AssessmentSummary {
  /**
   * Result title.
   * Example:
   * "Moderate Anxiety"
   */
  title: string;

  /**
   * Short observation.
   */
  observation: string;
}

/**
 * Clinical interpretation of the assessment.
 */
export interface AssessmentInterpretation {
  /**
   * What the result means.
   */
  meaning: string;

  /**
   * Positive protective factors.
   */
  strengths: string[];

  /**
   * Areas that could benefit from attention.
   */
  growthAreas: string[];
}

/**
 * Reflection presented to the user.
 */
export interface AssessmentReflection {
  /**
   * Reflection question shown after completion.
   */
  question: string;
}

/**
 * Future AI-generated insights.
 *
 * Initially empty, but reserved for
 * Assessment Intelligence 4.0.
 */
export interface AssessmentIntelligence {
  insights: string[];

  confidence?: number;
}

/**
 * Recommended next actions.
 */
export interface AssessmentNextSteps {
  recommendations: RecommendationBundle;
}

/**
 * Complete interpreted assessment result.
 */
export interface AssessmentResult {
  /**
   * Identifier matching the ResultDefinition.
   */
  id: string;

  /**
   * Computed assessment score.
   */
  score: AssessmentScore;

  /**
   * User-facing summary.
   */
  summary: AssessmentSummary;

  /**
   * Interpretation.
   */
  interpretation: AssessmentInterpretation;

  /**
   * Reflection prompt.
   */
  reflection: AssessmentReflection;

  /**
   * AI / Intelligence section.
   */
  intelligence: AssessmentIntelligence;

  /**
   * Recommended actions.
   */
  nextSteps: AssessmentNextSteps;
}