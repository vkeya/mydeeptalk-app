/**
 * Assessment Framework 3.0
 * Recommendation Types
 */

import { RecommendationPriority } from "./AssessmentEnums";

/**
 * Types of recommendations that can be presented to the user.
 */
export enum RecommendationType {
  Journey = "journey",
  Journal = "journal",
  Habit = "habit",
  Assessment = "assessment",
  Therapist = "therapist",
  Article = "article",
  Video = "video",
  AIConversation = "ai-conversation",
  Community = "community",
  Emergency = "emergency",
}

/**
 * A single recommendation.
 */
export interface AssessmentRecommendation {
  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Recommendation category.
   */
  type: RecommendationType;

  /**
   * Display title.
   */
  title: string;

  /**
   * Description shown to the user.
   */
  description: string;

  /**
   * Importance.
   */
  priority: RecommendationPriority;

  /**
   * Optional target resource.
   *
   * Examples:
   * - Journey ID
   * - Journal Template ID
   * - Therapist ID
   * - Assessment ID
   */
  targetId?: string;

  /**
   * Optional action label.
   */
  actionLabel?: string;
}

/**
 * Grouped recommendation bundle returned by the
 * Recommendation Engine.
 */
export interface RecommendationBundle {
  /**
   * Highest priority recommendation.
   */
  primary?: AssessmentRecommendation;

  /**
   * Additional important recommendations.
   */
  secondary: AssessmentRecommendation[];

  /**
   * Nice-to-have recommendations.
   */
  optional: AssessmentRecommendation[];

  /**
   * Optional follow-up assessment.
   */
  followUpAssessmentId?: string;

  /**
   * Suggested reassessment interval.
   *
   * Example:
   * 14
   * 30
   * 90
   */
  reassessmentDays?: number;
}