import { relationshipRules } from "@/data/genesis/relationships/rules";
import { GenesisConcept } from "@/types/genesisConcept";
import { GenesisMemory } from "@/types/genesisMemory";
import { ResolvedRelationship } from "@/types/genesisRelationship";

export class RelationshipEngine {
  generate(
    memory: GenesisMemory,
    concepts: GenesisConcept[]
  ): ResolvedRelationship[] {
    const relationships: ResolvedRelationship[] = [];

    for (const rule of relationshipRules) {
      const source = concepts.find(
        (concept) => concept.key === rule.source
      );

      const target = concepts.find(
        (concept) => concept.key === rule.target
      );

      if (!source || !target) {
        continue;
      }

      relationships.push({
        source: source.key,
        target: target.key,
        relationship: rule.relationship,
        confidence: rule.confidence,
        occurrences: Math.min(
          source.occurrences,
          target.occurrences
        ),
        discoveryIds: [],
      });
    }

    return relationships;
  }
}

export const relationshipEngine =
  new RelationshipEngine();