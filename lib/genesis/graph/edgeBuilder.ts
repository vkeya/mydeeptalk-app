/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Edge Builder
 * ------------------------------------------------------------------
 *
 * Converts resolved semantic relationships into graph edges.
 *
 * Responsibilities:
 * - Create one graph edge per relationship
 * - Preserve confidence
 * - Preserve evidence references
 * - Never infer new relationships
 * ------------------------------------------------------------------
 */

import { KnowledgeEdge } from "@/types/genesisKnowledge";
import { ResolvedRelationship } from "@/types/genesisRelationship";

export class EdgeBuilder {
  build(
    relationships: ResolvedRelationship[]
  ): KnowledgeEdge[] {
    return relationships.map((relationship) => ({
      from: relationship.source,

      to: relationship.target,

      relationship: relationship.relationship,

      confidence: relationship.confidence,

      evidence: relationship.discoveryIds,
    }));
  }
}

export const edgeBuilder = new EdgeBuilder();