/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Memory Domain
 * ------------------------------------------------------------------
 *
 * Represents the long-term cognitive memory accumulated through
 * Genesis journeys.
 *
 * Memory captures enduring personal information before it is
 * transformed into higher-level knowledge and insights.
 *
 * This model is intentionally independent of UI, persistence,
 * and processing engines.
 * ------------------------------------------------------------------
 */


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