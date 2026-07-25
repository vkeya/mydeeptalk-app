import { AssessmentResponse } from "./AssessmentResponse";
import { AssessmentScore } from "./AssessmentScore";
import { AssessmentResult } from "./AssessmentResult";
import { RecommendationBundle } from "./AssessmentRecommendation";

/**
 * Lifecycle status of an assessment session.
 */
export type AssessmentSessionStatus =
  | "in-progress"
  | "completed"
  | "cancelled";

/**
 * A completed (or in-progress) assessment session.
 *
 * This is the persisted record stored in the database.
 */
export interface AssessmentSession {
  /**
   * Unique session identifier.
   */
  id: string;

  /**
   * User who completed the assessment.
   */
  userId: string;

  /**
   * Assessment metadata.
   */
  assessmentId: string;

  assessmentVersion: number;

  /**
   * Current session state.
   */
  status: AssessmentSessionStatus;

  /**
   * Raw user submission.
   */
  response: AssessmentResponse;

  /**
   * Computed score.
   */
  score: AssessmentScore;

  /**
   * Human-readable interpretation.
   */
  result: AssessmentResult;

  /**
   * Recommended next actions.
   */
  recommendations: RecommendationBundle;

  /**
   * Audit information.
   */
  startedAt: string;

  completedAt?: string;

  createdAt: string;

  updatedAt: string;
}