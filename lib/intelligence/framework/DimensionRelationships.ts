import { WellbeingDimension } from "./DimensionDefinitions";

export enum RelationshipStrength {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface DimensionRelationship {
  source: WellbeingDimension;

  target: WellbeingDimension;

  strength: RelationshipStrength;

  description: string;
}

export const dimensionRelationships: DimensionRelationship[] = [
  {
    source: WellbeingDimension.STRESS_MANAGEMENT,
    target: WellbeingDimension.EMOTIONAL_REGULATION,
    strength: RelationshipStrength.HIGH,
    description:
      "Managing stress improves emotional regulation.",
  },

  {
    source: WellbeingDimension.EMOTIONAL_REGULATION,
    target: WellbeingDimension.RELATIONSHIPS,
    strength: RelationshipStrength.MEDIUM,
    description:
      "Better emotional regulation supports healthier relationships.",
  },

  {
    source: WellbeingDimension.RELATIONSHIPS,
    target: WellbeingDimension.LIFE_SATISFACTION,
    strength: RelationshipStrength.HIGH,
    description:
      "Healthy relationships contribute significantly to life satisfaction.",
  },

  // Continue with the remaining relationships...
];

export function getOutgoingRelationships(
  dimension: WellbeingDimension
): DimensionRelationship[] {
  return dimensionRelationships.filter(
    relationship => relationship.source === dimension
  );
}

export function getIncomingRelationships(
  dimension: WellbeingDimension
): DimensionRelationship[] {
  return dimensionRelationships.filter(
    relationship => relationship.target === dimension
  );
}