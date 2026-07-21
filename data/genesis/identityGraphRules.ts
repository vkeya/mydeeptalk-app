import { IdentityNodeType } from "@/types/genesisIdentityGraph";

export interface IdentityGraphRule {
  /**
   * Unique rule identifier.
   */
  id: string;

  /**
   * Source node type.
   */
  source: IdentityNodeType;

  /**
   * Target node type.
   */
  target: IdentityNodeType;

  /**
   * Relationship created between nodes.
   */
  relationship:
    | "supports"
    | "conflicts"
    | "causes"
    | "strengthens"
    | "reflects"
    | "influences";

  /**
   * Base confidence assigned to the relationship.
   */
  confidence: number;

  /**
   * Human-readable description.
   */
  description: string;
}

export const identityGraphRules: IdentityGraphRule[] = [
  {
    id: "identity-values",
    source: "identity",
    target: "value",
    relationship: "reflects",
    confidence: 0.80,
    description:
      "Identity traits often reflect underlying personal values.",
  },

  {
    id: "identity-strength",
    source: "identity",
    target: "strength",
    relationship: "strengthens",
    confidence: 0.85,
    description:
      "Identity traits reinforce personal strengths.",
  },

  {
    id: "emotion-value",
    source: "emotion",
    target: "value",
    relationship: "reflects",
    confidence: 0.70,
    description:
      "Emotions often reveal what someone values.",
  },

  {
    id: "experience-emotion",
    source: "experience",
    target: "emotion",
    relationship: "causes",
    confidence: 0.90,
    description:
      "Experiences influence emotional responses.",
  },

  {
    id: "experience-belief",
    source: "experience",
    target: "belief",
    relationship: "causes",
    confidence: 0.85,
    description:
      "Experiences shape beliefs.",
  },

  {
    id: "belief-identity",
    source: "belief",
    target: "identity",
    relationship: "supports",
    confidence: 0.75,
    description:
      "Beliefs contribute to identity formation.",
  },

  {
    id: "relationship-emotion",
    source: "relationship",
    target: "emotion",
    relationship: "influences",
    confidence: 0.80,
    description:
      "Relationships influence emotional patterns.",
  },

  {
    id: "purpose-value",
    source: "purpose",
    target: "value",
    relationship: "supports",
    confidence: 0.90,
    description:
      "Purpose is rooted in personal values.",
  },

  {
    id: "purpose-strength",
    source: "purpose",
    target: "strength",
    relationship: "strengthens",
    confidence: 0.80,
    description:
      "Purpose reinforces strengths over time.",
  },

  {
    id: "belief-value",
    source: "belief",
    target: "value",
    relationship: "supports",
    confidence: 0.75,
    description:
      "Beliefs and values reinforce one another.",
  },

  {
    id: "emotion-identity",
    source: "emotion",
    target: "identity",
    relationship: "influences",
    confidence: 0.65,
    description:
      "Repeated emotional patterns influence identity.",
  },

  {
    id: "relationship-purpose",
    source: "relationship",
    target: "purpose",
    relationship: "influences",
    confidence: 0.70,
    description:
      "Relationships often shape life purpose.",
  },
];