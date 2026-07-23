import { JourneyProcessRequest } from "@/types/genesisJourney";
import { JourneyProcessResult } from "@/types/genesisJourney";

export interface GenesisPipelineStage {
  name: string;

  process(
    result: JourneyProcessResult
  ): JourneyProcessResult;
}

export class GenesisPipeline {
  constructor(
    private stages: GenesisPipelineStage[]
  ) {}

  run(
    result: JourneyProcessResult
  ): JourneyProcessResult {
    let current = result;

    for (const stage of this.stages) {
      current = stage.process(current);
    }

    return current;
  }
}