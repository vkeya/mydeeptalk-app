export type NarrativeStage =
  | "beginning"
  | "transition"
  | "challenge"
  | "growth"
  | "integration";

export type NarrativeTheme =
  | "identity"
  | "belonging"
  | "purpose"
  | "resilience"
  | "relationships"
  | "healing"
  | "self-worth"
  | "hope";

export interface NarrativeChapter {
  /**
   * Stable identifier.
   */
  id: string;

  /**
   * Human-readable title.
   */
  title: string;

  /**
   * Narrative summary.
   */
  summary: string;

  /**
   * Main life theme.
   */
  theme: NarrativeTheme;

  /**
   * Current stage.
   */
  stage: NarrativeStage;

  /**
   * Confidence.
   */
  confidence: number;

  /**
   * Supporting evidence.
   */
  discoveryIds: string[];

  insightIds: string[];

  hypothesisIds: string[];

  createdAt: Date;

  updatedAt: Date;
}

export interface GenesisNarrative {
  chapters: NarrativeChapter[];

  currentStage: NarrativeStage;

  dominantThemes: NarrativeTheme[];

  generatedAt: Date;
}