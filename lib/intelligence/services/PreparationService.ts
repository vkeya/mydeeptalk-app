import { PreparationEngine } from "../engines/PreparationEngine";
import {
  PreparationInput,
  PreparationSummary,
} from "../types/preparation";

/**
 * ------------------------------------------------------------------
 * Preparation Service
 * ------------------------------------------------------------------
 *
 * Coordinates data collection for therapist session preparation.
 *
 * Responsibilities:
 * - Collect data from platform services
 * - Normalize the data
 * - Pass structured input to the engine
 *
 * It does not contain business logic.
 */
export class PreparationService {
  private engine = new PreparationEngine();

  async generatePreparation(
    input: PreparationInput
  ): Promise<PreparationSummary> {
    // Future integrations:
    // - Assessments
    // - Journal
    // - Homework
    // - Session history
    // - Client profile

    return this.engine.generate(input);
  }
}

// Future data sources:
//
// ✓ Client Profile
// ✓ Previous Sessions
// ✓ Assessments
// ✓ Journal
// ✓ Homework
// ✓ Therapist Notes
// ✓ Healing Timeline
// ✓ Outcome Intelligence