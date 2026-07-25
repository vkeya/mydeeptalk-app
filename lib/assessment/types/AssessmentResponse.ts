import { AssessmentDefinition } from "./AssessmentDefinition";

/**
 * A single answer submitted by the user.
 */
export interface AssessmentAnswer {
  /**
   * Question identifier.
   */
  questionId: string;

  /**
   * Selected option identifier.
   */
  optionId: string;

  /**
   * Numeric value associated with the option.
   * Stored so historical responses remain reproducible
   * even if option values change in future versions.
   */
  value: number;
}

/**
 * Raw assessment submission.
 *
 * This represents exactly what the user completed.
 * No scoring or interpretation belongs here.
 */
export interface AssessmentResponse {
  /**
   * Assessment definition version used.
   */
  assessmentId: string;

  assessmentVersion: number;

  /**
   * Optional until persisted.
   */
  userId?: string;

  /**
   * Answers in submission order.
   */
  answers: AssessmentAnswer[];

  /**
   * Time taken to complete.
   */
  durationSeconds?: number;

  /**
   * Submission timestamp.
   */
  completedAt: string;
}

/**
 * Convenience helper for validating
 * responses against a definition.
 */
export interface AssessmentValidationResult {
  valid: boolean;

  errors: string[];
}

/**
 * Function signature used by validators.
 */
export type AssessmentResponseValidator = (
  definition: AssessmentDefinition,
  response: AssessmentResponse
) => AssessmentValidationResult;