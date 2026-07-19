import { discoveryRules } from "@/data/genesis/discovery/rules";

import {
  DiscoveryContext,
  DiscoveryResult,
  DiscoveryRule,
} from "@/types/genesisDiscoveryRule";

import { GenesisDiscovery } from "@/types/genesisDiscovery";

export class DiscoveryEngine {
  /**
   * Extract structured discoveries from a user's response.
   */
  extractDiscoveries(
    context: DiscoveryContext
  ): DiscoveryResult {
    const normalized = context.response
  .trim()
  .toLowerCase();

    const discoveries: GenesisDiscovery[] = [];
    const matchedRules: DiscoveryRule[] = [];

    discoveryRules.forEach((rule) => {
      if (!normalized.includes(rule.trigger.toLowerCase())) {
        return;
      }

      discoveries.push({
        id: crypto.randomUUID(),

        category: rule.category,

        title: rule.title,

        description: rule.description,

        confidence: rule.confidence,

        sourceExperience: context.experienceId,

        createdAt: new Date().toISOString(),
      });

      matchedRules.push(rule);
    });

    return {
      discoveries: this.deduplicate(discoveries),
      matchedRules,
    };
  }

  /**
   * Remove duplicate discoveries.
   */
  private deduplicate(
    discoveries: GenesisDiscovery[]
  ): GenesisDiscovery[] {
    const seen = new Set<string>();

    return discoveries.filter((discovery) => {
      const key =
        `${discovery.category}:${discovery.title}`.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });
  }
}

export const discoveryEngine = new DiscoveryEngine();