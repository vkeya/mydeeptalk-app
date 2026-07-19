import {
  GenesisMemory,
} from "@/types/genesisMemory";

import {
  DiscoveryCategory,
  GenesisDiscovery,
} from "@/types/genesisDiscovery";

export function buildMemory(
  memory: GenesisMemory,
  discoveries: GenesisDiscovery[]
): GenesisMemory {
  const updated: GenesisMemory = structuredClone(memory);

  discoveries.forEach((discovery) => {
    switch (discovery.category) {
      case DiscoveryCategory.Identity:
        if (
          !updated.identity.descriptors.includes(discovery.title)
        ) {
          updated.identity.descriptors.push(discovery.title);
        }
        break;

      case DiscoveryCategory.Emotion:
        if (
          !updated.emotions.recurring.includes(discovery.title)
        ) {
          updated.emotions.recurring.push(discovery.title);
        }
        break;

      case DiscoveryCategory.Value:
        if (
          !updated.values.topValues.includes(discovery.title)
        ) {
          updated.values.topValues.push(discovery.title);
        }
        break;

      case DiscoveryCategory.Strength:
        if (
          !updated.strengths.strengths.includes(discovery.title)
        ) {
          updated.strengths.strengths.push(discovery.title);
        }
        break;

      case DiscoveryCategory.Relationship:
        if (
          !updated.relationships.recurringPatterns.includes(
            discovery.title
          )
        ) {
          updated.relationships.recurringPatterns.push(
            discovery.title
          );
        }
        break;

      case DiscoveryCategory.Purpose:
        if (
          !updated.purpose.aspirations.includes(discovery.title)
        ) {
          updated.purpose.aspirations.push(discovery.title);
        }
        break;
    }
  });

  return updated;
}