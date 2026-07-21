import { GenesisKnowledge } from "@/types/genesisKnowledge";
import { GenesisMemory } from "@/types/genesisMemory";

import { GenesisDiscovery } from "@/types/genesisDiscovery";
import { GenesisInsight } from "@/types/genesisInsight";
import { GenesisHypothesis } from "@/types/genesisHypothesis";
import { ResolvedRelationship } from "@/types/genesisRelationship";
import { IdentityGraph } from "@/types/genesisIdentityGraph";
import { AdaptivePrompt } from "@/types/genesisAdaptivePrompt";
import { JourneyReflection } from "@/types/genesisReflection";

export enum JourneyProcessingStage {
  Discovery = "discovery",
  Memory = "memory",
  Knowledge = "knowledge",
  Relationships = "relationships",
  Graph = "graph",
  Insights = "insights",
  Hypotheses = "hypotheses",
  AdaptivePrompt = "adaptivePrompt",
  Reflection = "reflection",
  Completed = "completed",
}

export interface JourneyProcessRequest {
  experienceId: string;

  sceneId: string;

  response: string;

  memory: GenesisMemory;

  knowledge: GenesisKnowledge;
}

export interface JourneyProcessResult {
  stage: JourneyProcessingStage;

  memory: GenesisMemory;

  knowledge: GenesisKnowledge;

  discoveries: GenesisDiscovery[];

  insights: GenesisInsight[];

  hypotheses: GenesisHypothesis[];

  relationships: ResolvedRelationship[];

  graph: IdentityGraph;

  adaptivePrompt?: AdaptivePrompt;

  reflection?: JourneyReflection;
}