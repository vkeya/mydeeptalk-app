export type ConceptType =
  | "identity"
  | "emotion"
  | "value"
  | "strength"
  | "relationship"
  | "purpose"
  | "belief"
  | "experience";

export interface GenesisConcept {
  /**
   * Stable unique identifier.
   */
  id: string;

  /**
   * Canonical value.
   *
   * Example:
   * "resilience"
   */
  key: string;

  /**
   * Display value.
   *
   * Example:
   * "Resilience"
   */
  label: string;

  /**
   * Category.
   */
  type: ConceptType;

  /**
   * Alternate spellings,
   * synonyms and historical labels.
   */
  aliases: string[];

  /**
   * Confidence that this concept
   * represents the user's identity.
   */
  confidence: number;

  /**
   * Number of observations.
   */
  occurrences: number;

  createdAt: Date;

  updatedAt: Date;
}