import { insightRules } from "@/data/genesis/insightRules";

import {
  GenesisInsight,
  InsightCategory,
} from "@/types/genesisInsight";

import { DiscoveryResult } from "@/types/genesisDiscoveryRule";
import { GenesisMemory } from "@/types/genesisMemory";

export class InsightEngine {
  /**
   * Generate insights from the current memory
   * and latest discoveries.
   */
  generate(
    memory: GenesisMemory,
    discoveries: DiscoveryResult
  ): GenesisInsight[] {
    const insights: GenesisInsight[] = [];

    for (const rule of insightRules) {
      const confidence = this.calculateConfidence(
        rule.category,
        memory,
        discoveries
      );

      if (confidence < rule.minimumConfidence) {
        continue;
      }

      insights.push({
        id: rule.id,

        title: this.buildTitle(rule.category, rule.type),

        description: this.buildDescription(
          rule.category,
          rule.type,
          confidence
        ),

        category: rule.category,

        type: rule.type,

        confidence,

        discoveryIds: discoveries.discoveries
          .filter(
            (d) => d.category === rule.category
          )
          .map((d) => d.id),

        createdAt: new Date(),
      });
    }

    return insights.sort(
      (a, b) => b.confidence - a.confidence
    );
  }

  /**
   * Estimate confidence for an insight.
   *
   * Version 1:
   * Discovery density + memory depth.
   */
  private calculateConfidence(
    category: InsightCategory,
    memory: GenesisMemory,
    discoveries: DiscoveryResult
  ): number {
    const memoryCount = this.getMemoryCoverage(
      memory,
      category
    );

    const discoveryCount =
      discoveries.discoveries.filter(
        (d) => d.category === category
      ).length;

    const score =
      memoryCount * 0.10 +
      discoveryCount * 0.20;

    return Math.min(score, 1);
  }

  /**
   * Count existing knowledge.
   */
  private getMemoryCoverage(
  memory: GenesisMemory,
  category: InsightCategory
): number {
  switch (category) {
    case "identity":
      return (
        memory.identity.descriptors.length +
        memory.identity.publicTraits.length +
        memory.identity.privateTraits.length +
        memory.identity.labels.length +
        memory.identity.affirmations.length
      );

    case "emotion":
      return (
        memory.emotions.recurring.length +
        memory.emotions.current.length
      );

    case "values":
      return memory.values.topValues.length;

    case "strengths":
      return memory.strengths.strengths.length;

    case "relationships":
      return memory.relationships.recurringPatterns.length;

    case "purpose":
      return memory.purpose.aspirations.length;

    default:
      return 0;
  }
}

  /**
   * Human-readable titles.
   */
  private buildTitle(
    category: InsightCategory,
    type: GenesisInsight["type"]
  ): string {
    switch (type) {
      case "strength":
        return "Emerging Strength";

      case "growth":
        return "Personal Growth";

      case "pattern":
        return "Recurring Pattern";

      case "reflection":
        return "Reflection";

      case "contradiction":
        return "Contradiction Detected";

      case "milestone":
        return "Journey Milestone";

      default:
        return category;
    }
  }

  /**
   * Version 1 descriptions.
   *
   * These will later become AI-generated
   * while preserving the same structure.
   */
  private buildDescription(
    category: InsightCategory,
    type: GenesisInsight["type"],
    confidence: number
  ): string {
    switch (type) {
      case "strength":
        return `Genesis has identified consistent strengths in your ${category} responses. (${Math.round(
          confidence * 100
        )}% confidence)`;

      case "growth":
        return `Your recent responses suggest meaningful growth related to ${category}.`;

      case "pattern":
        return `A recurring pattern has emerged across your ${category} responses.`;

      case "reflection":
        return `Your reflections reveal increasing understanding of your ${category}.`;

      case "contradiction":
        return `Some responses appear inconsistent and may benefit from further exploration.`;

      case "milestone":
        return `A meaningful milestone has been reached within your journey.`;

      default:
        return `Insight generated for ${category}.`;
    }
  }
}

export const insightEngine =
  new InsightEngine();