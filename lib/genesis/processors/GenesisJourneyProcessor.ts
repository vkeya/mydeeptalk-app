import { DiscoveryEngine } from "@/lib/genesis/discovery/discoveryEngine";
import { MemoryEngine } from "@/lib/genesis/memory/memoryEngine";

import { GenesisPipeline } from "../genesisPipeline";
import { GenesisService } from "../services/GenesisService";
import { GenesisJourneyResult } from "@/types/genesisJourneyResult";
import { GenesisKnowledge } from "@/types/genesisKnowledge";


export class GenesisJourneyProcessor {
  constructor(
    private discoveryEngine = new DiscoveryEngine(),
    private memoryEngine = new MemoryEngine(),
    private pipeline = new GenesisPipeline(),
    private service = new GenesisService()
  ) {}

  async processJourney(
    userId: string,
    journeyId: string,
    experienceId: string,
    knowledge: GenesisKnowledge
  ): Promise<GenesisJourneyResult> {
    const updatedKnowledge = this.pipeline.run(knowledge);

    return {
      knowledge: updatedKnowledge,
      snapshot: {
        id: crypto.randomUUID(),
        journeyId,
        experienceId,
        knowledge: updatedKnowledge,
        createdAt: new Date(),
      },
    };
  }
}