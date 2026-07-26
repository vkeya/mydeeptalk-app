import {
  AssessmentRecommendation,
  RecommendationBundle,
  RecommendationType,
} from "../types/AssessmentRecommendation";

import { AssessmentResult } from "../types/AssessmentResult";

import { RecommendationPriority } from "../types/AssessmentEnums";


const HIGH_CONCERN_THRESHOLD = 40;

const MODERATE_CONCERN_THRESHOLD = 70;

const DEFAULT_REASSESSMENT_DAYS = 30;
/**
 * Build recommendations from an interpreted assessment.
 */
export function buildRecommendations(
  result: AssessmentResult
): RecommendationBundle {

  const recommendations: AssessmentRecommendation[] = [];

  const score = result.score.normalizedScore;
  
  const growthAreas =
  result.interpretation.growthAreas;
  // High concern
  if (score <= HIGH_CONCERN_THRESHOLD) {

    recommendations.push({
      id: "professional-support",
      type: RecommendationType.Therapist,
      title: "Talk to a Therapist",
      description:
        "Consider speaking with a licensed therapist for additional support.",
      priority: RecommendationPriority.High,
      actionLabel: "Find a Therapist",
    });

    recommendations.push({
      id: "guided-journey",
      type: RecommendationType.Journey,
      title: "Begin a Guided Journey",
      description:
        "Start a structured wellbeing journey tailored to your needs.",
      priority: RecommendationPriority.High,
      actionLabel: "Start Journey",
    });

  }

  // Moderate concern
  else if (score <= MODERATE_CONCERN_THRESHOLD) {

    recommendations.push({
      id: "journal",
      type: RecommendationType.Journal,
      title: "Reflect in Your Journal",
      description:
        "Capture your thoughts and emotions while they're fresh.",
      priority: RecommendationPriority.Medium,
      actionLabel: "Open Journal",
    });

    recommendations.push({
      id: "ai-coach",
      type: RecommendationType.AIConversation,
      title: "Talk with MyDeepTalk AI",
      description:
        "Explore today's assessment in a guided conversation.",
      priority: RecommendationPriority.Medium,
      actionLabel: "Start Conversation",
    });

  }

  // Strong wellbeing
  else {

    recommendations.push({
      id: "continue-growth",
      type: RecommendationType.Journey,
      title: "Continue Your Growth Journey",
      description:
        "Maintain your progress by exploring your next wellbeing journey.",
      priority: RecommendationPriority.Low,
      actionLabel: "Continue",
    });

  }

  return {
	  
	  // Future:
// Generate recommendations based on
// wellbeing dimensions and growth areas.

    primary: recommendations[0],

    secondary: recommendations.slice(1),

    optional: [],

    reassessmentDays: DEFAULT_REASSESSMENT_DAYS,
  };

}