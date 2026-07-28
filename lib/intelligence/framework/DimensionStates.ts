import { WellbeingDimension } from "./DimensionDefinitions";

export enum DimensionState {
  CRITICAL = "critical",
  VULNERABLE = "vulnerable",
  DEVELOPING = "developing",
  HEALTHY = "healthy",
  THRIVING = "thriving",
}

export interface DimensionStateDefinition {
  id: DimensionState;

  title: string;

  minScore: number;

  maxScore: number;

  color: string;

  description: string;

  recommendation: string;
}

export const dimensionStates: DimensionStateDefinition[] = [
  {
    id: DimensionState.CRITICAL,
    title: "Critical",
    minScore: 0,
    maxScore: 20,
    color: "#DC2626",
    description:
      "This area requires immediate attention and support.",
    recommendation:
      "Prioritize support and consider speaking with a mental health professional.",
  },
  {
    id: DimensionState.VULNERABLE,
    title: "Vulnerable",
    minScore: 21,
    maxScore: 40,
    color: "#EA580C",
    description:
      "You're experiencing significant challenges in this area.",
    recommendation:
      "Focus on consistent healing activities and monitor progress.",
  },
  {
    id: DimensionState.DEVELOPING,
    title: "Developing",
    minScore: 41,
    maxScore: 60,
    color: "#D97706",
    description:
      "You're making progress, but there is still room for growth.",
    recommendation:
      "Continue building healthy habits and complete recommended activities.",
  },
  {
    id: DimensionState.HEALTHY,
    title: "Healthy",
    minScore: 61,
    maxScore: 80,
    color: "#16A34A",
    description:
      "This area is generally stable and functioning well.",
    recommendation:
      "Maintain your current practices and continue monitoring your wellbeing.",
  },
  {
    id: DimensionState.THRIVING,
    title: "Thriving",
    minScore: 81,
    maxScore: 100,
    color: "#0F766E",
    description:
      "This area reflects sustained wellbeing and personal growth.",
    recommendation:
      "Celebrate your progress and continue strengthening this area.",
  },
];

export function getDimensionState(
  score: number
): DimensionStateDefinition {
  return (
    dimensionStates.find(
      state =>
        score >= state.minScore &&
        score <= state.maxScore
    ) ?? dimensionStates[0]
  );
}