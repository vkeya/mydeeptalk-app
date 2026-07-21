export type StoryArcStage =
  | "awakening"
  | "awareness"
  | "acceptance"
  | "growth"
  | "integration"
  | "transformation";

export interface StoryArcProgress {
  /**
   * Stable identifier.
   */
  id: string;

  /**
   * Arc identifier.
   */
  arcId: string;

  /**
   * Current stage.
   */
  stage: StoryArcStage;

  /**
   * Progress (0–1).
   */
  progress: number;

  /**
   * Confidence.
   */
  confidence: number;

  /**
   * Supporting chapters.
   */
  chapterIds: string[];

  /**
   * Supporting hypotheses.
   */
  hypothesisIds: string[];

  /**
   * Supporting insights.
   */
  insightIds: string[];

  createdAt: Date;

  updatedAt: Date;
}

export interface StoryArc {
  /**
   * Stable identifier.
   */
  id: string;

  /**
   * Display title.
   */
  title: string;

  /**
   * Human-readable description.
   */
  description: string;

  /**
   * Ordered stages.
   */
  stages: StoryArcStage[];

  /**
   * Current progress.
   */
  progress: StoryArcProgress;
}