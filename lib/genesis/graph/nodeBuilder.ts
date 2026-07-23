/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Node Builder
 * ------------------------------------------------------------------
 *
 * Converts canonical Genesis concepts into graph nodes.
 *
 * Responsibilities:
 * - Create one graph node per concept
 * - Preserve confidence
 * - Preserve timestamps
 * - Never infer relationships
 * - Never modify concepts
 * ------------------------------------------------------------------
 */

import { GenesisConcept } from "@/types/genesisConcept";
import {
  KnowledgeNode,
  KnowledgeNodeType,
} from "@/types/genesisKnowledge";

export class NodeBuilder {
  build(
    concepts: GenesisConcept[]
  ): KnowledgeNode[] {
    return concepts.map((concept) => ({
      id: concept.key,

      label: concept.label,

      type: this.mapType(concept.type),

      confidence: concept.confidence,

      evidence: [],

      firstDiscovered: concept.createdAt.toISOString(),

      lastUpdated: concept.updatedAt.toISOString(),
    }));
  }

  /**
   * Maps concept categories to graph node categories.
   */
  private mapType(
    type: GenesisConcept["type"]
  ): KnowledgeNodeType {
    switch (type) {
      case "identity":
      case "emotion":
      case "value":
      case "strength":
      case "relationship":
      case "purpose":
      case "belief":
        return type;

      case "experience":
        return "life-event";

      default:
        return "pattern";
    }
  }
}

export const nodeBuilder =
  new NodeBuilder();