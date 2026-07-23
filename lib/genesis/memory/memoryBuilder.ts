import {
  GenesisMemory,
} from "@/types/genesisMemory";

import {
  DiscoveryCategory,
  GenesisDiscovery,
} from "@/types/genesisDiscovery";

/**
 * Adds a value only if it doesn't already exist
 * (case-insensitive).
 */
function pushUnique(
  target: string[],
  value: string
) {
  if (
    !target.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    )
  ) {
    target.push(value);
  }
}

export function buildMemory(
  memory: GenesisMemory,
  discoveries: GenesisDiscovery[]
): GenesisMemory {
  const updated: GenesisMemory = structuredClone(memory);

  discoveries.forEach((discovery) => {
    switch (discovery.category) {
      case DiscoveryCategory.Identity: {
        switch (discovery.sceneId) {
          case "identity":
            pushUnique(
              updated.identity.descriptors,
              discovery.title
            );
            break;

          case "public-self":
            pushUnique(
              updated.identity.publicTraits,
              discovery.title
            );
            break;

          case "private-self":
            pushUnique(
              updated.identity.privateTraits,
              discovery.title
            );
            break;

          case "labels":
            pushUnique(
              updated.identity.labels,
              discovery.title
            );
            break;

          default:
            pushUnique(
              updated.identity.descriptors,
              discovery.title
            );
        }

        break;
      }

      case DiscoveryCategory.Emotion:
        pushUnique(
          updated.emotions.recurring,
          discovery.title
        );
        break;

      case DiscoveryCategory.Value:
        pushUnique(
          updated.values.topValues,
          discovery.title
        );
        break;

      case DiscoveryCategory.Strength:
        pushUnique(
          updated.strengths.strengths,
          discovery.title
        );
        break;

      case DiscoveryCategory.Relationship:
        pushUnique(
          updated.relationships.recurringPatterns,
          discovery.title
        );
        break;

      case DiscoveryCategory.Purpose:
        pushUnique(
          updated.purpose.aspirations,
          discovery.title
        );
        break;
    }
  });

  return updated;
}