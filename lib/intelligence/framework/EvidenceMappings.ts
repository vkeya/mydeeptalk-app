import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";

export enum EvidenceType {
  ASSESSMENT = "assessment",
  JOURNAL = "journal",
  GENESIS = "genesis",
  AI = "ai",
  THERAPIST = "therapist",
  MOOD = "mood",
  HEALING_CIRCLE = "healing_circle",
}

export interface EvidenceDimensionMapping {
  evidenceId: string;
  evidenceType: EvidenceType;
  dimensions: {
    dimension: WellbeingDimension;
    weight: number;
  }[];
}

/**
 * Placeholder.
 *
 * This will be populated when the Intelligence Engine
 * is implemented.
 */
export const evidenceMappings: EvidenceDimensionMapping[] = [];