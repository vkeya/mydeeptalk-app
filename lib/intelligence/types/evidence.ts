import { WellbeingDimension } from "../framework/dimensions";

export type EvidenceSource =
  | "assessment"
  | "genesis"
  | "journal"
  | "therapy"
  | "homework"
  | "reflection"
  | "system";

export interface WellbeingEvidence {
  source: EvidenceSource;

  dimension: WellbeingDimension;

  score: number;

  confidence: number;

  evidenceId: string;

  createdAt: Date;

  metadata?: Record<string, unknown>;
}