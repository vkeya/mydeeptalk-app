import { Recommendation } from "../types/recommendation";

export interface WellbeingRecommendation {
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
}

export class RecommendationPresenter {
  present(
  recommendations?: Recommendation[]
): WellbeingRecommendation | null {

    if (!recommendations || recommendations.length === 0) {
  return null;
}

    const highestPriority = [...recommendations]
      .sort((a, b) => a.priority - b.priority)[0];

    switch (highestPriority.type) {
      case "assessment":
        return {
          title: highestPriority.title,
          message: highestPriority.description,
          actionLabel: "Start Assessment",
          actionHref: "/assessments",
        };

      case "journey":
        return {
          title: highestPriority.title,
          message: highestPriority.description,
          actionLabel: "Continue Journey",
          actionHref: "/journey",
        };

      case "therapy":
        return {
          title: highestPriority.title,
          message: highestPriority.description,
          actionLabel: "Find a Therapist",
          actionHref: "/pre-booking-intake",
        };

      case "journal":
        return {
          title: highestPriority.title,
          message: highestPriority.description,
          actionLabel: "Open Journal",
          actionHref: "/journal",
        };

      case "reflection":
        return {
          title: highestPriority.title,
          message: highestPriority.description,
          actionLabel: "Start Reflection",
          actionHref: "/reflection",
        };

      case "homework":
        return {
          title: highestPriority.title,
          message: highestPriority.description,
          actionLabel: "Continue",
          actionHref: "/dashboard",
        };

      default:
        return {
          title: "Continue Your Journey",
          message:
            "Keep investing in your emotional wellbeing.",
          actionLabel: "Open Dashboard",
          actionHref: "/dashboard",
        };
    }
  }
}