/**
 * Assessment Framework 3.0
 * Shared wellbeing dimensions used throughout MyDeepTalk.
 */

export type WellbeingDimensionCategory =
  | "identity"
  | "emotional"
  | "relationships"
  | "lifestyle"
  | "flourishing";

export interface WellbeingDimension {
  id: string;
  name: string;
  description: string;
  category: WellbeingDimensionCategory;
}

export const WELLBEING_DIMENSIONS = {
  IDENTITY: {
    id: "identity",
    name: "Identity",
    description: "Understanding who you are and how you see yourself.",
    category: "identity",
  },

  PURPOSE: {
    id: "purpose",
    name: "Purpose",
    description: "Sense of meaning, direction, and fulfillment.",
    category: "identity",
  },

  SELF_ESTEEM: {
    id: "self-esteem",
    name: "Self-Esteem",
    description: "Confidence and self-worth.",
    category: "identity",
  },

  EMOTIONAL_REGULATION: {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    description: "Ability to manage and respond to emotions.",
    category: "emotional",
  },

  RESILIENCE: {
    id: "resilience",
    name: "Resilience",
    description: "Capacity to recover from adversity.",
    category: "emotional",
  },

  STRESS: {
    id: "stress",
    name: "Stress",
    description: "Current level of psychological stress.",
    category: "emotional",
  },

  RECOVERY: {
    id: "recovery",
    name: "Recovery",
    description: "Restoration of physical and mental energy.",
    category: "lifestyle",
  },

  SLEEP: {
    id: "sleep",
    name: "Sleep",
    description: "Quality and consistency of sleep.",
    category: "lifestyle",
  },

  RELATIONSHIPS: {
    id: "relationships",
    name: "Relationships",
    description: "Quality of personal relationships.",
    category: "relationships",
  },

  CONNECTION: {
    id: "connection",
    name: "Connection",
    description: "Feeling socially connected and supported.",
    category: "relationships",
  },

  EMOTIONAL_INTELLIGENCE: {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    description: "Awareness and understanding of emotions.",
    category: "emotional",
  },

  HOPE: {
    id: "hope",
    name: "Hope",
    description: "Optimism about the future.",
    category: "flourishing",
  },

  MEANING: {
    id: "meaning",
    name: "Meaning",
    description: "Feeling that life has significance.",
    category: "flourishing",
  },

  MINDFULNESS: {
    id: "mindfulness",
    name: "Mindfulness",
    description: "Present-moment awareness and acceptance.",
    category: "flourishing",
  },

  SELF_COMPASSION: {
    id: "self-compassion",
    name: "Self-Compassion",
    description: "Treating yourself with kindness and understanding.",
    category: "identity",
  },

  PHYSICAL_WELLBEING: {
    id: "physical-wellbeing",
    name: "Physical Wellbeing",
    description: "Overall physical health and vitality.",
    category: "lifestyle",
  },

  SOCIAL_WELLBEING: {
    id: "social-wellbeing",
    name: "Social Wellbeing",
    description: "Participation in healthy social relationships.",
    category: "relationships",
  },

  SPIRITUAL_WELLBEING: {
    id: "spiritual-wellbeing",
    name: "Spiritual Wellbeing",
    description: "Connection to faith, values, or a sense of transcendence.",
    category: "flourishing",
  },

  SAFETY: {
    id: "safety",
    name: "Safety",
    description: "Feeling emotionally and physically safe.",
    category: "lifestyle",
  },

  GROWTH: {
    id: "growth",
    name: "Growth",
    description: "Personal development and continuous learning.",
    category: "flourishing",
  },
} as const;

export type WellbeingDimensionId =
  (typeof WELLBEING_DIMENSIONS)[keyof typeof WELLBEING_DIMENSIONS]["id"];

export const wellbeingDimensions = Object.values(WELLBEING_DIMENSIONS);