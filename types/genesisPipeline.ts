import { GenesisKnowledge } from "@/types/genesisKnowledge";

export interface GenesisPipelineStage {
  /**
   * Stable stage identifier.
   */
  id: string;

  /**
   * Human readable name.
   */
  name: string;

  /**
   * Execution order.
   */
  order: number;

  /**
   * Execute this stage.
   */
  process(
    knowledge: GenesisKnowledge
  ): Promise<GenesisKnowledge> | GenesisKnowledge;
}

export interface GenesisPipelineDefinition {
  /**
   * Pipeline id.
   */
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Ordered stages.
   */
  stages: GenesisPipelineStage[];
}