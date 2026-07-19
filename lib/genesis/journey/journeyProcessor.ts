import { discoveryEngine } from "../discovery/discoveryEngine";
import { memoryEngine } from "../memory/memoryEngine";

import { GenesisDiscovery } from "@/types/genesisDiscovery";
import { GenesisMemory } from "@/types/genesisMemory";
import { JourneyResponse } from "@/types/genesisJourneyResponse";

export class JourneyProcessor {
  /**
   * Process a completed journey and update Genesis memory.
   */
  processJourney(
    journey: JourneyResponse,
    memory: GenesisMemory
  ): GenesisMemory {
    const discoveries: GenesisDiscovery[] = [];

    for (const scene of journey.responses) {
      const result = discoveryEngine.extractDiscoveries({
        experienceId: journey.experienceId,
        sceneId: scene.sceneId,
        response: scene.response,
      });

      discoveries.push(...result.discoveries);
    }

    return memoryEngine.applyDiscoveries(
      memory,
      discoveries
    );
  }
}

export const journeyProcessor = new JourneyProcessor();