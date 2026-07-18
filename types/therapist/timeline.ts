// types/therapist/timeline.ts

/**
 * ---------------------------------------------------------------
 * MyDeepTalk Timeline Domain
 * ---------------------------------------------------------------
 *
 * The Timeline represents the chronological clinical history
 * of a client's therapeutic journey.
 *
 * Every meaningful event across the Therapist Workspace should
 * eventually appear here.
 *
 * Examples:
 * - Clinical notes
 * - Sessions
 * - Assessments
 * - Homework
 * - Treatment plans
 * - Journey milestones
 * - AI insights
 * - Risk alerts
 * ---------------------------------------------------------------
 */

export type TimelineEventType =
  | "note_created"
  | "note_updated"
  | "note_deleted"
  | "session_booked"
  | "session_completed"
  | "session_cancelled"
  | "assessment_completed"
  | "homework_assigned"
  | "homework_completed"
  | "treatment_goal_created"
  | "treatment_goal_updated"
  | "journey_milestone_completed"
  | "ai_insight"
  | "risk_alert";

export type TimelineSeverity =
  | "info"
  | "success"
  | "warning"
  | "critical";

export interface TimelineEvent {
  /** Unique timeline event ID */
  id: string;

  /** Client the event belongs to */
  clientId: string;

  /** Therapist responsible for the event */
  therapistId: string;

  /** Category of event */
  type: TimelineEventType;

  /** Short heading shown in the UI */
  title: string;

  /** Optional supporting description */
  description?: string;

  /** When the event occurred */
  timestamp: string;

  /** UI importance */
  severity?: TimelineSeverity;

  /**
   * Reference back to the originating record.
   * Example:
   * {
   *   type: "clinical_note",
   *   id: "note_123"
   * }
   */
  relatedResource?: {
    type: string;
    id: string;
  };

  /**
   * Additional module-specific information.
   * Keeps the Timeline model extensible without
   * constantly changing the interface.
   */
  metadata?: Record<string, unknown>;
}