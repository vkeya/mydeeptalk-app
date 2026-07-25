import {
  WellbeingProfile,
  DimensionScore,
  WellbeingTrend,
} from "../types/wellbeing";

import { WellbeingEvidence } from "../types/evidence";
import { WellbeingDimension } from "../framework/dimensions";

export class WellbeingProfileEngine {

  generate(
  profile: WellbeingProfile,
  evidence: WellbeingEvidence[]
): WellbeingProfile {

  const dimensions = this.mergeDimensions(
  profile.dimensions,
  evidence
);

const strengths =
  this.calculateStrengths(dimensions);

const growthAreas =
  this.calculateGrowthAreas(dimensions);
	
  const overallScore =
  this.calculateOverallScore(
    dimensions
  );
  
  const therapistAttention =
  this.determineTherapistAttention(
    dimensions
  );
  
  return {
    ...profile,
	overallScore,
    dimensions,
    strengths,
    growthAreas,
	therapistAttention,
    updatedAt: new Date(),
    generatedAt: profile.generatedAt,
  };
}

private calculateOverallScore(
  dimensions: WellbeingProfile["dimensions"]
): number {
  if (dimensions.length === 0) {
    return 0;
  }

  const total = dimensions.reduce(
    (sum, dimension) => sum + dimension.score,
    0
  );

  return Math.round(total / dimensions.length);
}

private mergeDimensions(
  existingDimensions: WellbeingProfile["dimensions"],
  evidence: WellbeingEvidence[]
): WellbeingProfile["dimensions"] {

  const merged = [...existingDimensions];

  for (const item of evidence) {

    const existingIndex = merged.findIndex(
      (dimension) =>
        dimension.dimension === item.dimension
    );

    const previous =
  existingIndex >= 0
    ? merged[existingIndex]
    : null;

const updatedDimension: DimensionScore = {
  dimension: item.dimension,
  score: item.score,
  confidence: item.confidence,

  trend: previous
    ? this.calculateTrend(
        previous.score,
        item.score
      )
    : "unknown",

  lastUpdated: item.createdAt,

  contributors: previous
  ? this.mergeContributors(
      previous.contributors,
      [item.source]
    )
  : [item.source],
};

    if (existingIndex >= 0) {
      merged[existingIndex] = updatedDimension;
    } else {
      merged.push(updatedDimension);
    }

  }

  return merged;
}

private calculateStrengths(
  dimensions: WellbeingProfile["dimensions"]
): WellbeingDimension[] {

  return dimensions
    .filter((dimension) => dimension.score >= 70)
    .map((dimension) => dimension.dimension);

}

private calculateGrowthAreas(
  dimensions: WellbeingProfile["dimensions"]
): WellbeingDimension[] {

  return dimensions
    .filter((dimension) => dimension.score < 50)
    .map((dimension) => dimension.dimension);

}

private calculateTrend(
  previousScore: number,
  currentScore: number
): WellbeingTrend {

  const difference = currentScore - previousScore;

  if (difference >= 5) {
    return "improving";
  }

  if (difference <= -5) {
    return "declining";
  }

  return "stable";
}

private mergeContributors(
  existing: DimensionScore["contributors"],
  incoming: DimensionScore["contributors"]
): DimensionScore["contributors"] {

  return [...new Set([
    ...existing,
    ...incoming,
  ])];

}

private determineTherapistAttention(
  dimensions: WellbeingProfile["dimensions"]
): boolean {

  return dimensions.some(
    (dimension) => dimension.score < 35
  );

}
}

