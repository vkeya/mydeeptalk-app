import { DiscoveryResult } from "@/types/genesisDiscoveryRule";
import { GenesisMemory } from "@/types/genesisMemory";
import { GenesisInsight } from "@/types/genesisInsight";

import {
  RelationshipCandidate,
  ResolvedRelationship,
} from "@/types/genesisRelationship";

import { identityGraphRules } from "@/data/genesis/identityGraphRules";

export class RelationshipResolver {
  /**
   * Resolve relationships supported by the
   * available evidence.
   */
  resolve(
    memory: GenesisMemory,
    discoveries: DiscoveryResult,
    insights: GenesisInsight[]
  ): ResolvedRelationship[] {
    const candidates = this.buildCandidates(
      memory,
      discoveries,
      insights
    );

    return this.mergeCandidates(candidates);
  }

  /**
   * Build raw relationship candidates.
   */
  private buildCandidates(
    memory: GenesisMemory,
    discoveries: DiscoveryResult,
    insights: GenesisInsight[]
  ): RelationshipCandidate[] {
    const candidates: RelationshipCandidate[] = [];

    for (const discovery of discoveries.discoveries) {
      const matchingRule = identityGraphRules.find(
        (rule) => rule.source === discovery.category
      );

      if (!matchingRule) {
        continue;
      }

      const relatedInsights = insights.filter(
        (insight) => insight.category === discovery.category
      );

      for (const insight of relatedInsights) {
        candidates.push({
          source: discovery.title,
          target: insight.title,
          evidence: "discovery",
          confidence: matchingRule.confidence,
          discoveryIds: [discovery.id],
        });
      }
    }

    return candidates;
  }

  /**
   * Merge duplicate candidates and strengthen
   * confidence when multiple observations exist.
   */
  private mergeCandidates(
    candidates: RelationshipCandidate[]
  ): ResolvedRelationship[] {
    const map = new Map<string, ResolvedRelationship>();

    for (const candidate of candidates) {
      const key = `${candidate.source}|${candidate.target}`;

      const existing = map.get(key);

      if (existing) {
        existing.occurrences += 1;

        existing.confidence = Math.min(
          existing.confidence + 0.05,
          1
        );

        existing.discoveryIds = Array.from(
          new Set([
            ...existing.discoveryIds,
            ...candidate.discoveryIds,
          ])
        );

        continue;
      }

      const rule = identityGraphRules.find(
        (r) => r.confidence === candidate.confidence
      );

      map.set(key, {
        source: candidate.source,
        target: candidate.target,
        relationship: rule?.relationship ?? "supports",
        confidence: candidate.confidence,
        occurrences: 1,
        discoveryIds: candidate.discoveryIds,
      });
    }

    return Array.from(map.values()).sort(
      (a, b) => b.confidence - a.confidence
    );
  }
}

export const relationshipResolver =
  new RelationshipResolver();