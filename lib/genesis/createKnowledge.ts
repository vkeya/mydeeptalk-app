import { GenesisKnowledge } from "@/types/genesisKnowledge";

import { createEmptyMemory } from "@/types/genesisMemory";

export function createKnowledge(
  experienceId: string,
  sceneId: string
): GenesisKnowledge {
  return {
    memory: createEmptyMemory(),

    concepts: [],

    discoveries: {
      discoveries: [],
	  matchedRules: [],
    },
	
	

    insights: [],
	
	hypotheses: [],

    relationships: [],

    graph: {
      nodes: [],
      edges: [],
    },

    metadata: {
      experienceId,
      sceneId,
      responseCount: 0,
      version: 1,
      updatedAt: new Date(),
    },
  };
}