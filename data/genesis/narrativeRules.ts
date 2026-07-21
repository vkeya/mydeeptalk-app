import {
  NarrativeStage,
  NarrativeTheme,
} from "@/types/genesisNarrative";

export interface NarrativeRule {
  /**
   * Unique identifier.
   */
  id: string;

  /**
   * Human-readable title.
   */
  title: string;

  /**
   * Narrative theme.
   */
  theme: NarrativeTheme;

  /**
   * Journey stage.
   */
  stage: NarrativeStage;

  /**
   * Category evaluated.
   */
  category:
    | "identity"
    | "emotion"
    | "values"
    | "strengths"
    | "relationships"
    | "purpose";

  /**
   * Minimum confidence.
   */
  minimumConfidence: number;

  /**
   * Relative importance.
   */
  priority: number;

  /**
   * Chapter template.
   */
  summary: string;
}

export const narrativeRules: NarrativeRule[] = [
  {
    id: "identity-search",
    title: "Searching for Identity",
    theme: "identity",
    stage: "beginning",
    category: "identity",
    minimumConfidence: 0.60,
    priority: 100,
    summary:
      "The user is actively exploring who they are and how they see themselves.",
  },

  {
    id: "identity-growth",
    title: "Growing Into Yourself",
    theme: "identity",
    stage: "growth",
    category: "identity",
    minimumConfidence: 0.85,
    priority: 120,
    summary:
      "Identity is becoming clearer and more stable.",
  },

  {
    id: "relationship-challenge",
    title: "Relationship Challenges",
    theme: "relationships",
    stage: "challenge",
    category: "relationships",
    minimumConfidence: 0.70,
    priority: 110,
    summary:
      "Recurring relationship experiences are shaping personal growth.",
  },

  {
    id: "healing",
    title: "Healing Begins",
    theme: "healing",
    stage: "transition",
    category: "emotion",
    minimumConfidence: 0.75,
    priority: 125,
    summary:
      "The user is beginning to process emotional experiences in healthier ways.",
  },

  {
    id: "resilience",
    title: "Growing Resilience",
    theme: "resilience",
    stage: "growth",
    category: "strengths",
    minimumConfidence: 0.80,
    priority: 130,
    summary:
      "Personal strengths are becoming increasingly consistent.",
  },

  {
    id: "purpose",
    title: "Finding Purpose",
    theme: "purpose",
    stage: "integration",
    category: "purpose",
    minimumConfidence: 0.85,
    priority: 140,
    summary:
      "The user's purpose is becoming an organizing force in life.",
  },

  {
    id: "belonging",
    title: "Finding Belonging",
    theme: "belonging",
    stage: "growth",
    category: "relationships",
    minimumConfidence: 0.80,
    priority: 115,
    summary:
      "Relationships increasingly provide safety, connection and belonging.",
  },

  {
    id: "self-worth",
    title: "Rediscovering Self-Worth",
    theme: "self-worth",
    stage: "growth",
    category: "values",
    minimumConfidence: 0.75,
    priority: 120,
    summary:
      "The user is rebuilding a healthier sense of personal worth.",
  },

  {
    id: "hope",
    title: "Renewed Hope",
    theme: "hope",
    stage: "integration",
    category: "purpose",
    minimumConfidence: 0.90,
    priority: 150,
    summary:
      "Hope is emerging as a defining part of the user's journey.",
  },
];