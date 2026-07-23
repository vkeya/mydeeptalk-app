import { KnowledgeRelationship } from "@/types/genesisRelationshipTypes";

export interface RelationshipRule {
  id: string;

  source: string;

  target: string;

  relationship: KnowledgeRelationship;

  minimumOccurrences: number;

  confidence: number;
}

export const relationshipRules: RelationshipRule[] = [
  {
    id: "family-resilience",

    source: "family",

    target: "resilience",

    relationship: "supports",

    minimumOccurrences: 2,

    confidence: 0.90,
  },

  {
    id: "resilience-purpose",

    source: "resilience",

    target: "purpose",

    relationship: "supports",

    minimumOccurrences: 2,

    confidence: 0.85,
  },

  {
    id: "identity-purpose",

    source: "identity",

    target: "purpose",

    relationship: "influences",

    minimumOccurrences: 2,

    confidence: 0.80,
  },
];