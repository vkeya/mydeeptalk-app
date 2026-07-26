import {
  RecommendationBundle,
  RecommendationType,
} from "@/lib/assessment/types/AssessmentRecommendation";

import {
  AssessmentResult,
} from "@/lib/assessment/types/AssessmentResult";

import {
  RecommendationPriority,
} from "@/lib/assessment/types/AssessmentEnums";

/**
 * Assessment Framework 3.0
 *
 * Builds personalized recommendations
 * from an interpreted assessment result.
 */
export class AssessmentRecommendationEngine {

  static build(
    result: AssessmentResult
  ): RecommendationBundle {

    const bundle: RecommendationBundle = {
      secondary: [],
      optional: [],
    };

    switch (result.id) {

      case "low":

        bundle.primary = {
          id: "continue-growth",

          type: RecommendationType.Journey,

          title: "Continue Your Growth Journey",

          description:
            "Keep building healthy habits and self-awareness.",

          priority: RecommendationPriority.Low,

          actionLabel: "Continue Journey",
        };

        bundle.reassessmentDays = 90;

        break;

      case "moderate":

        bundle.primary = {
          id: "journal-reflection",

          type: RecommendationType.Journal,

          title: "Guided Reflection",

          description:
            "Spend time reflecting on the emotions identified in this assessment.",

          priority: RecommendationPriority.Medium,

          actionLabel: "Open Journal",
        };

        bundle.secondary.push({
          id: "genesis",

          type: RecommendationType.Journey,

          title: "Begin Genesis",

          description:
            "Explore deeper patterns behind your emotional wellbeing.",

          priority: RecommendationPriority.Medium,
        });

        bundle.reassessmentDays = 30;

        break;

      case "high":

        bundle.primary = {
          id: "therapist",

          type: RecommendationType.Therapist,

          title: "Speak with a Therapist",

          description:
            "Your responses suggest that professional support may be beneficial.",

          priority: RecommendationPriority.High,

          actionLabel: "Find Therapist",
        };

        bundle.secondary.push({
          id: "ai",

          type: RecommendationType.AIConversation,

          title: "Talk with MyDeepTalk AI",

          description:
            "Begin processing your thoughts in a safe guided conversation.",

          priority: RecommendationPriority.High,
        });

        bundle.reassessmentDays = 14;

        break;
    }

    return bundle;
  }
}

export default AssessmentRecommendationEngine;