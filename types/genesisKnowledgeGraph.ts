/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Knowledge Graph Types
 * ------------------------------------------------------------------
 *
 * Represents the user's evolving cognitive map.
 *
 * The graph is generated from concepts and relationships.
 * It is a pure domain model with no UI or persistence logic.
 */

export interface KnowledgeNode {
  id: string;

  label: string;

  type: string;

  confidence: number;
}

export interface KnowledgeEdge {
  id: string;

  source: string;

  target: string;

  relationship: string;

  confidence: number;
}

export interface GenesisKnowledgeGraph {
  nodes: KnowledgeNode[];

  edges: KnowledgeEdge[];

  generatedAt: number;
}