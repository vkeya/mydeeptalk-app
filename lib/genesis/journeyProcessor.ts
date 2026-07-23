import { discoveryEngine } from "@/lib/genesis/discovery/discoveryEngine";
import { memoryEngine } from "@/lib/genesis/memory/memoryEngine";
import { insightEngine } from "@/lib/genesis/insightEngine";
import { relationshipEngine } from "@/lib/genesis/relationships/relationshipEngine";
import { identityGraphEngine } from "@/lib/genesis/identityGraphEngine";
import { hypothesisEngine } from "@/lib/genesis/hypothesisEngine";
import { adaptivePromptGenerator } from "@/lib/genesis/adaptivePromptGenerator";
import { JourneyResponse } from "@/types/genesisJourneyResponse";
import { GenesisMemory } from "@/types/genesisMemory";
import { GenesisJourneyResult } from "@/types/genesisJourneyResult";
import {
  JourneyProcessRequest,
  JourneyProcessResult,
  JourneyProcessingStage,
} from "@/types/genesisJourney";
import { conceptEngine } from "@/lib/genesis/concepts/conceptEngine";
import { knowledgeGraphBuilder } from "@/lib/genesis/graph/knowledgeGraphBuilder";
import { snapshotBuilder } from "@/lib/genesis/state/snapshotBuilder";
import { cognitiveDiffEngine } from "@/lib/genesis/state/cognitiveDiff";
import { GenesisKnowledge } from "@/types/genesisKnowledge";



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
 * Generate canonical concepts.
 */
const concepts = conceptEngine.generate(
  discoveryResult
);
 
const updatedKnowledge = {
  ...knowledge,
  memory: updatedMemory,
  discoveries: discoveryResult,
  concepts,
};




    /**
     * STEP 4
     * Resolve semantic relationships.
     */
    const relationships =
  relationshipEngine.generate(
      updatedMemory,
      concepts
  );

    updatedKnowledge.relationships =
      relationships;

    /**
     * STEP 5
     * Build identity graph.
     */
	 
	updatedKnowledge.insights =
  insightEngine.generate(
    updatedMemory,
    discoveryResult
  );
  
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
 * Build knowledge graph.
 */
knowledgeWithHypotheses.graph =
  knowledgeGraphBuilder.build(
    knowledgeWithHypotheses
  );

/**
 * STEP 9
 * Capture cognitive snapshot.
 */
const snapshot =
  snapshotBuilder.build(
    experienceId,
    knowledgeWithHypotheses
  );
  
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
  
  snapshot,

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