export type RelationshipEvidence =
  | "discovery"
  | "memory"
  | "insight"
  | "response";

export interface RelationshipCandidate {
  /**
   * Source concept.
   */
  source: string;

  /**
   * Target concept.
   */
  target: string;

  /**
   * Why Genesis believes these belong together.
   */
  evidence: RelationshipEvidence;

  /**
   * Confidence before graph insertion.
   */
  confidence: number;

  /**
   * Supporting discovery ids.
   */
  discoveryIds: string[];
}

export interface ResolvedRelationship {
  /**
   * Final graph relationship.
   */
  source: string;

  target: string;

  relationship:
    | "supports"
    | "conflicts"
    | "causes"
    | "strengthens"
    | "reflects"
    | "influences";

  confidence: number;

  occurrences: number;

  discoveryIds: string[];
}