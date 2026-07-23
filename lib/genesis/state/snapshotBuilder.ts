/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Snapshot Builder
 * ------------------------------------------------------------------
 *
 * Creates an immutable cognitive snapshot from the current
 * Genesis knowledge state.
 */

import { CognitiveSnapshot } from "@/types/genesisSnapshot";
import { GenesisKnowledge } from "@/types/genesisKnowledge";

export class SnapshotBuilder {
  build(
    experienceId: string,
    knowledge: GenesisKnowledge
  ): CognitiveSnapshot {
    return {
      id: crypto.randomUUID(),

      journeyId: crypto.randomUUID(),

      experienceId,

      knowledge,

      createdAt: new Date(),
    };
  }
}

export const snapshotBuilder =
  new SnapshotBuilder();