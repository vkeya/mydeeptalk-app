import { AssessmentSession } from "@/lib/assessment/types/AssessmentSession";
import {
  RecommendationBundle,
} from "@/lib/assessment/types/AssessmentRecommendation";
import {
  WellbeingProfile,
  DimensionProfile,
} from "./types/WellbeingProfile";

/**
 * Builds an overall wellbeing profile from completed assessment sessions.
 */
export function buildWellbeingProfile(
  sessions: AssessmentSession[]
): WellbeingProfile {
  if (sessions.length === 0) {
    return {
      overallScore: 0,
      dimensions: [],
      strengths: [],
      growthAreas: [],
      insights: [
        "Complete your first assessment to begin building your wellbeing profile.",
      ],
      recommendations: emptyRecommendations(),
    };
  }

  const latestSession = sessions.reduce((latest, current) =>
  current.completedAt > latest.completedAt
    ? current
    : latest
);

  const dimensions: DimensionProfile[] = latestSession.score.dimensionScores.map(
    (dimensionScore) => ({
      dimension: dimensionScore.dimension,
      score: dimensionScore.normalizedScore,
      trend: "unknown",
      confidence: 0,
      contributingAssessments: [
  latestSession.assessment.metadata.id,
],
    })
  );

  const strengths = dimensions
    .filter((d) => d.score >= 75)
    .map((d) => d.dimension);

  const growthAreas = dimensions
    .filter((d) => d.score <= 40)
    .map((d) => d.dimension);

  const insights = buildInsights(strengths, growthAreas);

  return {
    overallScore: latestSession.score.normalizedScore,
    dimensions,
    strengths,
    growthAreas,
    insights,
    recommendations: latestSession.recommendations,
  };
}

/**
 * Creates simple insight messages.
 * This will later become AI-powered.
 */
function buildInsights(
  strengths: string[],
  growthAreas: string[]
): string[] {
  const insights: string[] = [];

  if (strengths.length > 0) {
    insights.push(
      `You currently demonstrate strength in ${strengths.length} wellbeing dimension(s).`
    );
  }

  if (growthAreas.length > 0) {
    insights.push(
      `${growthAreas.length} wellbeing dimension(s) may benefit from additional attention.`
    );
  }

  if (insights.length === 0) {
    insights.push(
      "Complete additional assessments to generate personalized wellbeing insights."
    );
  }

  return insights;
}

/**
 * Empty recommendation bundle.
 */
function emptyRecommendations(): RecommendationBundle {
  return {
    secondary: [],
    optional: [],
  };
}