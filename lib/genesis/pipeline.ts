import {
  GenesisPipelineDefinition,
  GenesisPipelineStage,
} from "@/types/genesisPipeline";

import { GenesisKnowledge } from "@/types/genesisKnowledge";

export class GenesisPipeline {
  constructor(
    private readonly definition: GenesisPipelineDefinition
  ) {}

  async run(
    knowledge: GenesisKnowledge
  ): Promise<GenesisKnowledge> {
    let current = knowledge;

    const stages = [...this.definition.stages].sort(
      (a, b) => a.order - b.order
    );

    for (const stage of stages) {
      current = await stage.process(current);

      current.metadata.version++;

      current.metadata.updatedAt = new Date();
    }

    return current;
  }

  register(
    stage: GenesisPipelineStage
  ) {
    this.definition.stages.push(stage);
  }

  getStages() {
    return [...this.definition.stages];
  }
}