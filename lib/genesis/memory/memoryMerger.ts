import { GenesisDiscovery } from "@/types/genesisDiscovery";

export function mergeDiscoveries(
  existing: GenesisDiscovery[],
  incoming: GenesisDiscovery[]
): GenesisDiscovery[] {
  const merged = [...existing];

  incoming.forEach((discovery) => {
    const index = merged.findIndex(
      (item) =>
        item.category === discovery.category &&
        item.title.toLowerCase() === discovery.title.toLowerCase()
    );

    if (index === -1) {
      merged.push(discovery);
      return;
    }

    const current = merged[index];

    merged[index] = {
      ...current,
      confidence: Math.max(current.confidence, discovery.confidence),
      createdAt: discovery.createdAt,
      description: discovery.description ?? current.description,
      sourceExperience: discovery.sourceExperience,
    };
  });

  return merged;
}