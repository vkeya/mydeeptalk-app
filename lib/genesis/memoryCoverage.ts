import { GenesisMemory } from "@/types/genesisMemory";

export type MemoryDomain =
  | "identity"
  | "emotion"
  | "values"
  | "strengths"
  | "relationships"
  | "purpose";

export function getMemoryCoverage(
  memory: GenesisMemory,
  domain: MemoryDomain
): number {
  switch (domain) {
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
      return (
        memory.relationships.recurringPatterns.length +
        (memory.relationships.attachmentStyle ? 1 : 0)
      );

    case "purpose":
      return memory.purpose.aspirations.length;

    default:
      return 0;
  }
}