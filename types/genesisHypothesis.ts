export type HypothesisStatus =
  | "emerging"
  | "supported"
  | "confirmed"
  | "rejected";

export interface GenesisHypothesis {
  /**
   * Stable identifier.
   */
  id: string;

  /**
   * Internal title.
   */
  title: string;

  /**
   * What Genesis currently believes.
   */
  statement: string;

  /**
   * Which part of the person this relates to.
   */
  category:
    | "identity"
    | "emotion"
    | "values"
    | "strengths"
    | "relationships"
    | "purpose";

  /**
   * Confidence.
   */
  confidence: number;

  /**
   * Current state.
   */
  status: HypothesisStatus;

  /**
   * Supporting evidence.
   */
  discoveryIds: string[];

  insightIds: string[];

  conceptIds: string[];

  createdAt: Date;

  updatedAt: Date;
}