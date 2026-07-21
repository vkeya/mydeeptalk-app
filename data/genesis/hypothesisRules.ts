import { HypothesisStatus } from "@/types/genesisHypothesis";

export interface HypothesisRule {
  /**
   * Unique rule identifier.
   */
  id: string;

  /**
   * Human-readable title.
   */
  title: string;

  /**
   * Internal hypothesis statement.
   */
  statement: string;

  /**
   * Category.
   */
  category:
    | "identity"
    | "emotion"
    | "values"
    | "strengths"
    | "relationships"
    | "purpose";

  /**
   * Minimum confidence before this
   * hypothesis is considered.
   */
  minimumConfidence: number;

  /**
   * Initial status.
   */
  initialStatus: HypothesisStatus;

  /**
   * Base weight.
   */
  priority: number;
}

export const hypothesisRules: HypothesisRule[] = [
  {
    id: "identity-growth",
    title: "Emerging Identity",
    statement:
      "The user's understanding of their identity is becoming more defined.",
    category: "identity",
    minimumConfidence: 0.60,
    initialStatus: "emerging",
    priority: 90,
  },

  {
    id: "emotional-pattern",
    title: "Recurring Emotional Pattern",
    statement:
      "Certain emotional responses appear repeatedly across experiences.",
    category: "emotion",
    minimumConfidence: 0.65,
    initialStatus: "emerging",
    priority: 95,
  },

  {
    id: "core-values",
    title: "Core Values",
    statement:
      "A stable set of personal values is beginning to emerge.",
    category: "values",
    minimumConfidence: 0.70,
    initialStatus: "supported",
    priority: 100,
  },

  {
    id: "personal-strength",
    title: "Personal Strength",
    statement:
      "The user consistently demonstrates a recurring strength.",
    category: "strengths",
    minimumConfidence: 0.75,
    initialStatus: "supported",
    priority: 105,
  },

  {
    id: "relationship-pattern",
    title: "Relationship Pattern",
    statement:
      "Relationship experiences indicate a recurring behavioural pattern.",
    category: "relationships",
    minimumConfidence: 0.70,
    initialStatus: "emerging",
    priority: 95,
  },

  {
    id: "purpose-clarity",
    title: "Purpose Development",
    statement:
      "The user's sense of purpose is becoming clearer over time.",
    category: "purpose",
    minimumConfidence: 0.80,
    initialStatus: "supported",
    priority: 110,
  },
];