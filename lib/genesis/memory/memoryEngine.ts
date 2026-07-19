// lib/genesis/memory/memoryEngine.ts


import {
  GenesisMemory,
  createEmptyMemory,
} from "@/types/genesisMemory";

import {
  GenesisDiscovery,
} from "@/types/genesisDiscovery";

import { buildMemory } from "./memoryBuilder";

export class MemoryEngine {
  /**
   * Creates a fresh Genesis memory profile.
   */
  createMemory(): GenesisMemory {
    return createEmptyMemory();
  }

  /**
   * Applies discoveries from a journey and
   * returns an updated immutable memory object.
   */
  applyDiscoveries(
    memory: GenesisMemory,
    discoveries: GenesisDiscovery[]
  ): GenesisMemory {
    return buildMemory(memory, discoveries);
  }

  /**
   * Returns every discovery in one category.
   */
  getCategory(
    memory: GenesisMemory,
    category: keyof GenesisMemory
  ) {
    return memory[category];
  }

  /**
   * Checks if a discovery already exists.
   */
  hasDiscovery(
    memory: GenesisMemory,
    category: keyof GenesisMemory,
    title: string
  ): boolean {
    const items = memory[category];

    if (!Array.isArray(items)) {
      return false;
    }

    return items.some(
      (item: any) =>
        item.title.toLowerCase() === title.toLowerCase()
    );
  }

  /**
   * Returns a snapshot for UI rendering.
   */
  getSnapshot(memory: GenesisMemory) {
    return structuredClone(memory);
  }

  /**
   * Clears all stored memory.
   */
  resetMemory(): GenesisMemory {
    return createEmptyMemory();
  }
}

export const memoryEngine = new MemoryEngine();