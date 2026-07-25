import { WellbeingProfile } from "../types/wellbeing";
import { Recommendation } from "../types/recommendation";
import { WellbeingDimension } from "../framework/dimensions";
import { journeyRecommendations } from "../config/journeyRecommendations";

export class RecommendationEngine {

  generate(
    profile: WellbeingProfile
  ): Recommendation[] {

    const recommendations: Recommendation[] = [];

    recommendations.push(
      ...this.recommendAssessments(profile)
    );

    recommendations.push(
      ...this.recommendJourneys(profile)
    );

    recommendations.push(
      ...this.recommendTherapistSupport(profile)
    );

    return recommendations;
  }

  private recommendAssessments(
  profile: WellbeingProfile
): Recommendation[] {

  return profile.growthAreas.map((dimension) => ({
    id: `assessment-${dimension}`,

    type: "assessment",

    title: `Take the ${dimension} Assessment`,

    description:
      `Complete the ${dimension} assessment to better understand this area of your wellbeing.`,

    priority: 1,

    reason:
      `${dimension} is currently one of your growth areas.`,
  }));

}

  private recommendJourneys(
  profile: WellbeingProfile
): Recommendation[] {

  return profile.growthAreas
    .map((dimension) => {

      const journeyId =
        journeyRecommendations[dimension];

      if (!journeyId) {
        return null;
      }

      return {
        id: `journey-${journeyId}`,

        type: "journey",

        title: "Continue Your Healing Journey",

        description:
          "This guided journey has been recommended based on your wellbeing profile.",

        priority: 2,

        reason:
          `${dimension} is currently one of your growth areas.`,
      };

    })
    .filter(
      (
        recommendation
      ): recommendation is Recommendation =>
        recommendation !== null
    );

}

  private recommendTherapistSupport(
    profile: WellbeingProfile
  ): Recommendation[] {
    return [];
  }

}