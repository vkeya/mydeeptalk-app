/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Knowledge Graph Builder
 * ------------------------------------------------------------------
 *
 * Coordinates graph construction.
 *
 * Responsibilities:
 * - Build nodes
 * - Build edges
 * - Validate graph
 * - Return a consistent graph
 *
 * Never:
 * - Generate concepts
 * - Generate relationships
 * - Modify knowledge
 * ------------------------------------------------------------------
 */

import {
  GenesisKnowledge,
  GenesisKnowledgeGraph,
} from "@/types/genesisKnowledge";

import { nodeBuilder } from "./nodeBuilder";
import { edgeBuilder } from "./edgeBuilder";
import { graphValidator } from "./graphValidator";

export class KnowledgeGraphBuilder {
  build(
    knowledge: GenesisKnowledge
  ): GenesisKnowledgeGraph {
    const graph: GenesisKnowledgeGraph = {
      nodes: nodeBuilder.build(
        knowledge.concepts
      ),

      edges: edgeBuilder.build(
        knowledge.relationships
      ),
    };

    const validation =
      graphValidator.validate(graph);

    if (!validation.valid) {
      throw new Error(
        `Knowledge graph validation failed:\n${validation.errors.join("\n")}`
      );
    }

    return graph;
  }
}

export const knowledgeGraphBuilder =
  new KnowledgeGraphBuilder();