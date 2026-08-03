import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";

export enum EvidenceSource {
  ASSESSMENT = "assessment",
  JOURNAL = "journal",
  GENESIS = "genesis",
  THERAPIST = "therapist",
  AI = "ai",
  MOOD = "mood",
}

export interface WellbeingEvidence {
  id: string;

  source: EvidenceSource;

  createdAt: Date;

  confidence: number;

  dimensions: {
    dimension: WellbeingDimension;
    value: number;
    weight: number;
  }[];

  metadata?: Record<string, unknown>;
}