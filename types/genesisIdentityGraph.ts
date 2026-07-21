export type IdentityNodeType =
  | "identity"
  | "emotion"
  | "value"
  | "strength"
  | "relationship"
  | "purpose"
  | "belief"
  | "experience";

export interface IdentityNode {
  /**
   * Unique node id.
   */
  id: string;

  /**
   * Node label shown to the user.
   */
  label: string;

  /**
   * Category of node.
   */
  type: IdentityNodeType;

  /**
   * Confidence (0–1).
   */
  confidence: number;

  /**
   * Number of times reinforced.
   */
  occurrences: number;

  /**
   * Creation timestamp.
   */
  createdAt: Date;

  /**
   * Last updated timestamp.
   */
  updatedAt: Date;
}

export interface IdentityEdge {
  /**
   * Unique edge id.
   */
  id: string;

  /**
   * Source node id.
   */
  source: string;

  /**
   * Target node id.
   */
  target: string;

  /**
   * Relationship between nodes.
   */
  relationship:
    | "supports"
    | "conflicts"
    | "causes"
    | "strengthens"
    | "reflects"
    | "influences";

  /**
   * Edge confidence.
   */
  confidence: number;

  /**
   * Number of observations.
   */
  occurrences: number;
}

export interface IdentityGraph {
  nodes: IdentityNode[];

  edges: IdentityEdge[];
}