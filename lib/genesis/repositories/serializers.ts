import { GenesisMemory } from "@/types/genesisMemory";
import { GenesisKnowledge } from "@/types/genesisKnowledge";

/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Repository Serializers
 * ------------------------------------------------------------------
 *
 * Responsible for converting Genesis domain models to and from
 * Firestore-compatible objects.
 *
 * This centralizes serialization logic so repositories remain
 * focused on persistence rather than data transformation.
 * ------------------------------------------------------------------
 */

export function serializeMemory(memory: GenesisMemory): Record<string, unknown> {
  return {
    ...memory,
  };
}

export function deserializeMemory(data: Record<string, unknown>): GenesisMemory {
  return data as unknown as GenesisMemory;
}

export function serializeKnowledge(
  knowledge: GenesisKnowledge
): Record<string, unknown> {
  return {
    ...knowledge,
  };
}

export function deserializeKnowledge(
  data: Record<string, unknown>
): GenesisKnowledge {
  return data as unknown as GenesisKnowledge;
}