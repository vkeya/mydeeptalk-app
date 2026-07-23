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
	const { response, experienceId } = context;

const normalized = response.trim().toLowerCase();

    const discoveries: GenesisDiscovery[] = [];
    const matchedRules: DiscoveryRule[] = [];

    const sceneRules = discoveryRules.filter(
  (rule) => rule.sceneId === context.sceneId
);

sceneRules.forEach((rule) => {
  if (!normalized.includes(rule.trigger.toLowerCase())) {
    return;
  }

  discoveries.push({
    id: crypto.randomUUID(),

    category: rule.category,

    sceneId: rule.sceneId,

    title: rule.title,

    description: rule.description,

    response,

    confidence: rule.confidence,

    sourceExperience: experienceId,

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