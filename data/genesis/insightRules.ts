import {
  InsightCategory,
  InsightType,
} from "@/types/genesisInsight";

export interface InsightRule {
  /**
   * Unique rule identifier.
   */
  id: string;

  /**
   * Human-readable description.
   */
  description: string;

  /**
   * Category the insight belongs to.
   */
  category: InsightCategory;

  /**
   * Type of insight.
   */
  type: InsightType;

  /**
   * Minimum confidence required before
   * this insight should be generated.
   */
  minimumConfidence: number;

  /**
   * Base score for ranking.
   */
  priority: number;
}

export const insightRules: InsightRule[] = [
  {
    id: "identity-pattern",
    description: "A recurring identity pattern has emerged.",
    category: "identity",
    type: "pattern",
    minimumConfidence: 0.60,
    priority: 90,
  },

  {
    id: "identity-strength",
    description: "A consistent personal strength has been identified.",
    category: "identity",
    type: "strength",
    minimumConfidence: 0.70,
    priority: 100,
  },

  {
    id: "emotion-pattern",
    description: "Recurring emotional responses were detected.",
    category: "emotion",
    type: "pattern",
    minimumConfidence: 0.60,
    priority: 85,
  },

  {
    id: "values-pattern",
    description: "Core personal values have become clear.",
    category: "values",
    type: "pattern",
    minimumConfidence: 0.70,
    priority: 90,
  },

  {
    id: "relationship-growth",
    description: "Growth within relationships has been identified.",
    category: "relationships",
    type: "growth",
    minimumConfidence: 0.70,
    priority: 85,
  },

  {
    id: "purpose-growth",
    description: "Increasing clarity around purpose has emerged.",
    category: "purpose",
    type: "growth",
    minimumConfidence: 0.75,
    priority: 95,
  },

  {
    id: "life-reflection",
    description: "Reflection on life events produced meaningful insight.",
    category: "lifeStory",
    type: "reflection",
    minimumConfidence: 0.65,
    priority: 80,
  },

  {
    id: "contradiction",
    description: "Conflicting discoveries should be surfaced.",
    category: "identity",
    type: "contradiction",
    minimumConfidence: 0.50,
    priority: 120,
  },

  {
    id: "milestone",
    description: "A significant milestone has been reached.",
    category: "lifeStory",
    type: "milestone",
    minimumConfidence: 0.80,
    priority: 110,
  },
];