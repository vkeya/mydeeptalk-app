// ======================================================
// Healing Journey Risk
// ======================================================

export interface JourneyRisk {
  level: RiskLevel;

  score: number;

  indicators: RiskIndicator[];

  recommendedAction: RiskAction;
}

export type RiskLevel =
  | "low"
  | "moderate"
  | "high";

export interface RiskIndicator {
  id: string;

  title: string;

  description: string;

  weight: number;
}

export type RiskAction =
  | "continue"
  | "checkin"
  | "journal"
  | "assessment"
  | "therapist";