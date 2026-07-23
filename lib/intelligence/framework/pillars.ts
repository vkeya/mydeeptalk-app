import { WellbeingDimension } from "./dimensions";

export interface WellbeingPillar {
  id: WellbeingDimension;

  title: string;

  shortDescription: string;

  longDescription: string;

  color: string;

  icon: string;
}

export const wellbeingPillars: WellbeingPillar[] = [
  {
    id: WellbeingDimension.Identity,

    title: "Identity & Self-Awareness",

    shortDescription:
      "Understanding who you are.",

    longDescription:
      "Exploring your values, beliefs, strengths, personality, authenticity and sense of self.",

    color: "#2563EB",

    icon: "fingerprint",
  },

  // remaining pillars...
];