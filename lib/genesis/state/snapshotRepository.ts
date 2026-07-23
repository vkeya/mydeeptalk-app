import { CognitiveSnapshot } from "@/types/genesisSnapshot";

export class SnapshotRepository {
  async save(
    snapshot: CognitiveSnapshot
  ): Promise<void> {
    // TODO: Persist to Firestore
  }

  async getLatest(
    userId: string
  ): Promise<CognitiveSnapshot | null> {
    // TODO: Load latest snapshot
    return null;
  }

  async getHistory(
    userId: string
  ): Promise<CognitiveSnapshot[]> {
    // TODO: Load snapshot history
    return [];
  }

  async getById(
    id: string
  ): Promise<CognitiveSnapshot | null> {
    // TODO: Load snapshot by ID
    return null;
  }
}

export const snapshotRepository = new SnapshotRepository();