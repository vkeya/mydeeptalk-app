import { GenesisKnowledge } from "@/types/genesisKnowledge";

import { knowledgePipeline } from "./pipelines/knowledgePipeline";
import { reasoningPipeline } from "./pipelines/reasoningPipeline";
import { experiencePipeline } from "./pipelines/experiencePipeline";

export class GenesisEngine {
  async process(
    knowledge: GenesisKnowledge
  ) {
    knowledge =
      await knowledgePipeline.run(
        knowledge
      );

    knowledge =
      await reasoningPipeline.run(
        knowledge
      );

    knowledge =
      await experiencePipeline.run(
        knowledge
      );

    return knowledge;
  }
}

export const genesisEngine =
    new GenesisEngine();