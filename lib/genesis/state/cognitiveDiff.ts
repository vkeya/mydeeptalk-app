import { CognitiveSnapshot } from "@/types/genesisSnapshot";
import { CognitiveDiff } from "@/types/genesisDiff";

export class CognitiveDiffEngine {
  generate(
    previous: CognitiveSnapshot,
    current: CognitiveSnapshot
  ): CognitiveDiff {
    return {
      previousSnapshotId: previous.id,
      currentSnapshotId: current.id,

      newConcepts: [],
      removedConcepts: [],

      strengthenedConcepts: [],
      weakenedConcepts: [],

      newRelationships: [],
      strengthenedRelationships: [],
      weakenedRelationships: [],

      newHypotheses: [],
      retiredHypotheses: [],

      newInsights: [],

      generatedAt: new Date(),
    };
  }
}

export const cognitiveDiffEngine = new CognitiveDiffEngine();