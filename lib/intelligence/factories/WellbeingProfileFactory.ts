import { WellbeingProfile } from "../types/wellbeing";

export class WellbeingProfileFactory {
  static create(clientId: string): WellbeingProfile {
    const now = new Date();

    return {
      clientId,

      version: "1.0",

      frameworkVersion: "MWF-1.0",

      dimensions: [],

      strengths: [],

      growthAreas: [],

      recommendedJourneys: [],

      recommendedAssessments: [],

      therapistAttention: false,

      generatedAt: now,

      updatedAt: now,
    };
  }
}