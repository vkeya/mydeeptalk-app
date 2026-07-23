import { FirestoreGenesisRepository } from "../repositories/FirestoreGenesisRepository";


import { GenesisJourneyResult } from "@/types/genesisJourneyResult";
import { GenesisKnowledge } from "@/types/genesisKnowledge";
import { GenesisMemory } from "@/types/genesisMemory";

export class GenesisService {
  constructor(
    private repository = new FirestoreGenesisRepository(),
   
  ) {}

  async getMemory(
    userId: string
  ): Promise<GenesisMemory | null> {
    return this.repository.loadMemory(userId);
  }

  async saveMemory(
    userId: string,
    memory: GenesisMemory
  ): Promise<void> {
    await this.repository.saveMemory(userId, memory);
  }

  async getKnowledge(
    userId: string
  ): Promise<GenesisKnowledge | null> {
    return this.repository.loadKnowledge(userId);
  }

  async saveKnowledge(
    userId: string,
    knowledge: GenesisKnowledge
  ): Promise<void> {
    await this.repository.saveKnowledge(userId, knowledge);
  }


  async saveJourneyResult(
  userId: string,
  result: GenesisJourneyResult
  ): Promise<void> {
  await this.repository.saveKnowledge(
    userId,
    result.knowledge
  );

  // Later:
  // save snapshot
  // save evolution
  // save diff
}

  // Next milestone:
  // Load knowledge
  // Run discovery engine
  // Update memory
  // Persist changes
}
