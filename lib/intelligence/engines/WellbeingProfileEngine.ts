import { WellbeingProfile } from "../types/wellbeing";
import { Recommendation } from "../types/recommendation";
import { WellbeingEvidence } from "../types/evidence";
import { WellbeingDimension } from "../framework/dimensions";

export class WellbeingProfileEngine {

  generate(
  profile: WellbeingProfile,
  evidence: WellbeingEvidence[]
): WellbeingProfile {

  const dimensions = evidence.map((item) => ({
    dimension: item.dimension,
    score: item.score,
    confidence: item.confidence,
    trend: "unknown" as const,
    lastUpdated: item.createdAt,
    contributors: [item.source],
  }));

  const strengths = dimensions
    .filter((d) => d.score >= 70)
    .map((d) => d.dimension);

  const growthAreas = dimensions
    .filter((d) => d.score < 50)
    .map((d) => d.dimension);

  return {
    ...profile,
    dimensions,
    strengths,
    growthAreas,
    updatedAt: new Date(),
    generatedAt: new Date(),
  };
}

}

export class RecommendationEngine {

    generate(
        profile: WellbeingProfile
    ): Recommendation[] {

        return [];

    }

}