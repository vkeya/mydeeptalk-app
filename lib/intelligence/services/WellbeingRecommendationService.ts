import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";
import {
  dimensionRecommendations,
} from "@/data/intelligence/recommendations";

export interface WellbeingRecommendation {
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
}

export class WellbeingRecommendationService {
  getRecommendation(
    profile: WellbeingProfile
  ): WellbeingRecommendation {
    const dimensions = profile.dimensions;

    if (!dimensions || dimensions.length === 0) {
      return {
        title: "Begin Your Journey",
        message:
          "Complete an assessment to start building your wellbeing profile.",
        actionLabel: "Start Assessment",
        actionHref: "/assessments",
      };
    }

    const sorted = [...dimensions].sort(
      (a, b) => a.score - b.score
    );

    const weakest = sorted[0];
    

    const recommendation =
  dimensionRecommendations[weakest.dimension];

if (recommendation) {
  return recommendation;
}

return {
  title: "Continue Your Journey",
  message:
    "Keep investing in your wellbeing through regular reflection.",
  actionLabel: "Open Dashboard",
  actionHref: "/dashboard",
};
  }
}