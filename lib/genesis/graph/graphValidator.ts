/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Graph Validator
 * ------------------------------------------------------------------
 *
 * Validates the structural integrity of a Genesis Knowledge Graph.
 */

import {
  GenesisKnowledgeGraph,
} from "@/types/genesisKnowledge";

export interface GraphValidationResult {
  valid: boolean;
  errors: string[];
}

export class GraphValidator {
  validate(
    graph: GenesisKnowledgeGraph
  ): GraphValidationResult {
    const errors: string[] = [];

    const nodeIds = new Set(
      graph.nodes.map((node) => node.id)
    );

    // Validate node confidence
    for (const node of graph.nodes) {
      if (node.confidence < 0 || node.confidence > 1) {
        errors.push(
          `Invalid confidence for node '${node.id}'.`
        );
      }
    }

    const seenEdges = new Set<string>();

    for (const edge of graph.edges) {
      if (!nodeIds.has(edge.from)) {
        errors.push(
          `Missing source node '${edge.from}'.`
        );
      }

      if (!nodeIds.has(edge.to)) {
        errors.push(
          `Missing target node '${edge.to}'.`
        );
      }

      if (edge.from === edge.to) {
        errors.push(
          `Self-referencing edge '${edge.from}'.`
        );
      }

      if (edge.confidence < 0 || edge.confidence > 1) {
        errors.push(
          `Invalid confidence for edge '${edge.from}' -> '${edge.to}'.`
        );
      }

      const key = `${edge.from}:${edge.relationship}:${edge.to}`;

      if (seenEdges.has(key)) {
        errors.push(
          `Duplicate edge '${key}'.`
        );
      }

      seenEdges.add(key);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const graphValidator =
  new GraphValidator();