/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Cognitive Snapshot Types
 * ------------------------------------------------------------------
 */

import { GenesisKnowledge } from "./genesisKnowledge";

export interface CognitiveSnapshot {
  /**
   * Unique snapshot ID.
   */
  id: string;

  /**
   * Journey that produced this state.
   */
  journeyId: string;

  /**
   * Experience identifier.
   * Example: "meeting-yourself"
   */
  experienceId: string;

  /**
   * Immutable knowledge state.
   */
  knowledge: GenesisKnowledge;

  /**
   * Snapshot creation time.
   */
  createdAt: Date;
}