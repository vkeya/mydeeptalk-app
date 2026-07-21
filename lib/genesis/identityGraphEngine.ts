import { identityGraphRules } from "@/data/genesis/identityGraphRules";

import {
  IdentityEdge,
  IdentityGraph,
  IdentityNode,
  IdentityNodeType,
} from "@/types/genesisIdentityGraph";

import { GenesisInsight } from "@/types/genesisInsight";
import { GenesisMemory } from "@/types/genesisMemory";

export class IdentityGraphEngine {
  /**
   * Build or update the user's identity graph.
   */
  build(
    memory: GenesisMemory,
    insights: GenesisInsight[]
  ): IdentityGraph {
    const nodes: IdentityNode[] = [];
    const edges: IdentityEdge[] = [];

    this.addNodes(nodes, memory.identity.descriptors, "identity");
this.addNodes(nodes, memory.identity.publicTraits, "identity");
this.addNodes(nodes, memory.identity.privateTraits, "identity");
this.addNodes(nodes, memory.identity.labels, "identity");

this.addNodes(nodes, memory.values.topValues, "value");

this.addNodes(nodes, memory.emotions.recurring, "emotion");
this.addNodes(nodes, memory.emotions.current, "emotion");

this.addNodes(nodes, memory.strengths.strengths, "strength");

this.addNodes(nodes, memory.relationships.recurringPatterns, "relationship");

this.addNodes(nodes, memory.purpose.aspirations, "purpose");

    this.reinforceNodes(nodes, insights);

    this.buildEdges(nodes, edges);

    return {
      nodes,
      edges,
    };
  }

  /**
   * Create graph nodes.
   */
  private addNodes(
  nodes: IdentityNode[],
  items: string[],
  type: IdentityNodeType
) {
  for (const item of items) {
    const value = item.trim();

    if (!value) {
      continue;
    }

    const existing = nodes.find(
      (node) =>
        node.type === type &&
        node.label.toLowerCase() === value.toLowerCase()
    );

    if (existing) {
      existing.occurrences++;
      existing.updatedAt = new Date();
      continue;
    }

    nodes.push({
      id: `${type}-${nodes.length + 1}`,
      label: value,
      type,
      confidence: 0.5,
      occurrences: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
  /**
   * Increase confidence based on generated insights.
   */
  private reinforceNodes(
    nodes: IdentityNode[],
    insights: GenesisInsight[]
  ) {
    for (const node of nodes) {
      const relatedInsights = insights.filter(
        (insight) => insight.category === this.toInsightCategory(node.type)
      );

      if (relatedInsights.length === 0) {
        continue;
      }

      const averageConfidence =
        relatedInsights.reduce(
          (sum, insight) => sum + insight.confidence,
          0
        ) / relatedInsights.length;

      node.confidence = Math.min(
        (node.confidence + averageConfidence) / 2,
        1
      );
    }
  }

  /**
   * Connect nodes using the configured graph rules.
   */
  private buildEdges(
    nodes: IdentityNode[],
    edges: IdentityEdge[]
  ) {
    for (const rule of identityGraphRules) {
      const sources = nodes.filter(
        (node) => node.type === rule.source
      );

      const targets = nodes.filter(
        (node) => node.type === rule.target
      );

      for (const source of sources) {
        for (const target of targets) {
          if (source.id === target.id) {
            continue;
          }

          edges.push({
            id: `${source.id}-${target.id}`,
            source: source.id,
            target: target.id,
            relationship: rule.relationship,
            confidence: rule.confidence,
            occurrences: 1,
          });
        }
      }
    }
  }

  /**
   * Convert graph node types into insight categories.
   */
  private toInsightCategory(
    type: IdentityNodeType
  ): GenesisInsight["category"] {
    switch (type) {
      case "value":
        return "values";

      case "strength":
        return "strengths";

      case "relationship":
        return "relationships";

      case "emotion":
        return "emotion";

      case "purpose":
        return "purpose";

      default:
        return "identity";
    }
  }
}

export const identityGraphEngine =
  new IdentityGraphEngine();