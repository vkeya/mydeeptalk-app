import { GenesisConcept, ConceptType } from "@/types/genesisConcept";
import { DiscoveryResult } from "@/types/genesisDiscoveryRule";
import { DiscoveryCategory } from "@/types/genesisDiscovery";

export class ConceptEngine {
  generate(discoveries: DiscoveryResult): GenesisConcept[] {
    const concepts = new Map<string, GenesisConcept>();

    discoveries.discoveries.forEach((discovery) => {
      const key = discovery.title.trim().toLowerCase();

      const existing = concepts.get(key);

      if (existing) {
        existing.occurrences += 1;
        existing.confidence = Math.min(
          existing.confidence + discovery.confidence * 0.1,
          1
        );
        existing.updatedAt = new Date();
        return;
      }

      concepts.set(key, {
        id: crypto.randomUUID(),
        key,
        label: discovery.title,
        type: this.mapCategory(discovery.category),
        aliases: [],
        confidence: discovery.confidence,
        occurrences: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return [...concepts.values()];
  }

  private mapCategory(
    category: DiscoveryCategory
  ): ConceptType {
    switch (category) {
      case DiscoveryCategory.Identity:
        return "identity";

      case DiscoveryCategory.Emotion:
        return "emotion";

      case DiscoveryCategory.Value:
        return "value";

      case DiscoveryCategory.Strength:
        return "strength";

      case DiscoveryCategory.Relationship:
        return "relationship";

      case DiscoveryCategory.Purpose:
        return "purpose";

      default:
        return "experience";
    }
  }
}

export const conceptEngine = new ConceptEngine();