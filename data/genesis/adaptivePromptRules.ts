import {
  AdaptivePromptReason,
  AdaptivePromptTarget,
} from "@/types/genesisAdaptivePrompt";

export interface AdaptivePromptRule {
  /**
   * Unique rule identifier.
   */
  id: string;

  /**
   * Human-readable description.
   */
  description: string;

  /**
   * Why this prompt would be selected.
   */
  reason: AdaptivePromptReason;

  /**
   * Which part of the identity model this rule supports.
   */
  target: AdaptivePromptTarget;

  /**
   * Score contributed when this rule matches.
   */
  score: number;
}

export const adaptivePromptRules: AdaptivePromptRule[] = [
  {
    id: "identity-incomplete",
    description: "Identity information is still incomplete.",
    reason: "explore",
    target: "identity",
    score: 40,
  },
  {
    id: "emotion-detected",
    description: "A strong emotion was detected and should be explored.",
    reason: "deepen",
    target: "emotion",
    score: 35,
  },
  {
    id: "value-discovered",
    description: "A newly discovered value deserves follow-up.",
    reason: "follow-up",
    target: "values",
    score: 30,
  },
  {
    id: "contradiction-found",
    description: "Conflicting discoveries should be clarified.",
    reason: "clarification",
    target: "identity",
    score: 45,
  },
  {
    id: "relationship-pattern",
    description: "Relationship patterns need further exploration.",
    reason: "explore",
    target: "relationships",
    score: 30,
  },
  {
    id: "strength-emerging",
    description: "An emerging strength should be reinforced.",
    reason: "reflection",
    target: "strengths",
    score: 25,
  },
  {
    id: "purpose-opportunity",
    description: "The user's purpose can be explored further.",
    reason: "explore",
    target: "purpose",
    score: 30,
  },
  {
    id: "chapter-transition",
    description: "Guide the user naturally into the next topic.",
    reason: "transition",
    target: "lifeStory",
    score: 20,
  },
  {
    id: "milestone-achieved",
    description: "Celebrate meaningful progress.",
    reason: "celebration",
    target: "identity",
    score: 15,
  },
];