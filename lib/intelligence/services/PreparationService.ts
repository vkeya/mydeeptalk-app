import { PreparationEngine } from "../engines/PreparationEngine";
import { AssessmentAdapter } from "../adapters/AssessmentAdapter";
import {
  PreparationInput,
  PreparationSummary,
} from "../types/preparation";

export class PreparationService {
  private engine = new PreparationEngine();

  private assessmentAdapter = new AssessmentAdapter();

  async generatePreparation(
    input: PreparationInput
  ): Promise<PreparationSummary> {

    const assessment =
      await this.assessmentAdapter.getSnapshot(
        input.clientId
      );

    // We'll use this in the next sprint.
    void assessment;

    return this.engine.generate(input);
  }
}