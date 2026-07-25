import { RecommendationEngine } from "../engines/RecommendationEngine";
import { WellbeingProfile } from "../types/wellbeing";

export class WellbeingProfileUpgrader {
  private recommendationEngine =
    new RecommendationEngine();

  upgrade(
    profile: WellbeingProfile
  ): WellbeingProfile {
    const dimensions = profile.dimensions ?? [];

    const calculatedOverallScore =
      dimensions.length > 0
        ? Math.round(
            dimensions.reduce(
              (total, dimension) =>
                total + dimension.score,
              0
            ) / dimensions.length
          )
        : 0;

    const upgraded: WellbeingProfile = {
      ...profile,

      overallScore:
        Number.isFinite(profile.overallScore) &&
        profile.overallScore > 0
          ? profile.overallScore
          : calculatedOverallScore,

      dimensions,

      strengths: profile.strengths ?? [],

      growthAreas: profile.growthAreas ?? [],

      recommendations:
        profile.recommendations ??
        this.recommendationEngine.generate(profile),
    };

    return upgraded;
  }
}