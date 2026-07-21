import { discoveryEngine } from "@/lib/genesis/discovery/discoveryEngine";
import { memoryEngine } from "@/lib/genesis/memory/memoryEngine";
import { insightEngine } from "@/lib/genesis/insightEngine";
import { relationshipResolver } from "@/lib/genesis/relationshipResolver";
import { identityGraphEngine } from "@/lib/genesis/identityGraphEngine";
import { hypothesisEngine } from "@/lib/genesis/hypothesisEngine";
import { adaptivePromptGenerator } from "@/lib/genesis/adaptivePromptGenerator";
import { JourneyResponse } from "@/types/genesisJourneyResponse";
import { GenesisMemory } from "@/types/genesisMemory";
import { GenesisKnowledge } from "@/types/genesisKnowledge";

import {
  JourneyProcessRequest,
  JourneyProcessResult,
  JourneyProcessingStage,
} from "@/types/genesisJourney";

export class JourneyProcessor {
  processResponse(
    request: JourneyProcessRequest
  ): JourneyProcessResult {
    const {
      experienceId,
      sceneId,
      response,
      memory,
      knowledge,
    } = request;

    /**
     * STEP 1
     * Extract structured discoveries.
     */
    const discoveryResult =
      discoveryEngine.extractDiscoveries({
        experienceId,
        sceneId,
        response,
       
      });

    /**
     * STEP 2
     * Update long-term memory.
     */
    const updatedMemory =
      memoryEngine.applyDiscoveries(
        memory,
        discoveryResult.discoveries
      );

    /**
  
     */
    /**
 * STEP 3
 * Update knowledge state.
 */
const updatedKnowledge = {
  ...knowledge,
  memory: updatedMemory,
  discoveries: discoveryResult,
};

updatedKnowledge.insights =
  insightEngine.generate(
    updatedMemory,
    discoveryResult
  );

    /**
     * STEP 4
     * Resolve semantic relationships.
     */
    const relationships =
  relationshipResolver.resolve(
    updatedMemory,
    discoveryResult,
    updatedKnowledge.insights
  );

    updatedKnowledge.relationships =
      relationships;

    /**
     * STEP 5
     * Build identity graph.
     */
    const identityGraph =
  identityGraphEngine.build(
    updatedMemory,
    updatedKnowledge.insights
  );

    /**
     * STEP 7
     * Update hypotheses.
     */
    const knowledgeWithHypotheses =
  hypothesisEngine.process(
    updatedKnowledge
  );

    /**
     * STEP 8
     * Choose adaptive prompt.
     */
    const adaptivePrompt =
  adaptivePromptGenerator.generate(
    updatedMemory,
    discoveryResult
  );

    /**
     * STEP 9
     * Build reflection.
     */
    

    return {
  stage: JourneyProcessingStage.Completed,

  memory: updatedMemory,

  knowledge: knowledgeWithHypotheses,

  discoveries: discoveryResult.discoveries,

  insights: knowledgeWithHypotheses.insights,

  hypotheses: knowledgeWithHypotheses.hypotheses,

  relationships,

  graph: identityGraph,

  adaptivePrompt,
};
  }
processJourney(
  journey: JourneyResponse,
  memory: GenesisMemory,
  knowledge: GenesisKnowledge
): JourneyProcessResult {
  let currentMemory = memory;
  let currentKnowledge = knowledge;

  let lastResult: JourneyProcessResult | null = null;

  for (const item of journey.responses) {
    lastResult = this.processResponse({
      experienceId: journey.experienceId,
      sceneId: item.sceneId,
      response: item.response,
      memory: currentMemory,
      knowledge: currentKnowledge,
    });

    currentMemory = lastResult.memory;
    currentKnowledge = lastResult.knowledge;
  }

  if (!lastResult) {
    throw new Error(
      "Journey contains no responses."
    );
  }

  return lastResult;
}  
}

export const journeyProcessor =
  new JourneyProcessor();