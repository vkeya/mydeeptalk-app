import { GenesisKnowledge } from "@/types/genesisKnowledge";

export interface GenesisEngine {
  /**
   * Unique engine identifier.
   */
  id: string;

  /**
   * Human-readable engine name.
   */
  name: string;

  /**
   * Execution order.
   */
  order: number;

  /**
   * Process the shared knowledge object.
   *
   * Each engine should enrich the knowledge
   * and return the updated version.
   */
  process(
    knowledge: GenesisKnowledge
  ): GenesisKnowledge;
}