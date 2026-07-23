/**
 * Represents the finalized outcome of a completed Genesis journey.
 *
 * This is the stable result exposed to persistence and downstream
 * consumers. It intentionally excludes intermediate processing
 * artifacts produced during the journey pipeline.
 */

import { GenesisKnowledge } from "./genesisKnowledge";
import { CognitiveSnapshot } from "./genesisSnapshot";
import { CognitiveDiff } from "./genesisDiff";
import { EvolutionSummary } from "./genesisEvolution";

export interface GenesisJourneyResult {
  knowledge: GenesisKnowledge;

  snapshot: CognitiveSnapshot;

  diff?: CognitiveDiff;

  evolution?: EvolutionSummary;
}