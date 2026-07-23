import {
  PreparationInput,
  PreparationSummary,
} from "../types/preparation";

/**
 * ------------------------------------------------------------------
 * Preparation Engine
 * ------------------------------------------------------------------
 *
 * Produces a therapist preparation summary from structured inputs.
 *
 * This engine contains deterministic business logic only.
 * It never talks to Firestore.
 * It never calls AI.
 * It never renders UI.
 */
export class PreparationEngine {
  generate(input: PreparationInput): PreparationSummary {
    return {
      clientId: input.clientId,
      therapistId: input.therapistId,

      clientOverview: "",

      recentMood: undefined,

      assessmentSummary: undefined,

      journalHighlights: [],

      activeGoals: [],

      homeworkStatus: undefined,

      suggestedTopics: [],

      riskFlags: [],

      recommendations: [],

      generatedAt: new Date(),
    };
  }
}