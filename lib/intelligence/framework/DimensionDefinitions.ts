/**
 * The core wellbeing dimensions tracked by MyDeepTalk.
 *
 * Every assessment, journal entry, AI conversation,
 * Genesis experience and therapist interaction
 * ultimately contributes evidence toward one or more
 * of these dimensions.
 */

export enum WellbeingDimension {
  EMOTIONAL_REGULATION = "emotional_regulation",

  RESILIENCE = "resilience",

  SELF_WORTH = "self_worth",

  PURPOSE = "purpose",

  RELATIONSHIPS = "relationships",

  STRESS_MANAGEMENT = "stress_management",

  ANXIETY_REGULATION = "anxiety_regulation",

  MOOD_STABILITY = "mood_stability",

  PERSONAL_GROWTH = "personal_growth",

  LIFE_SATISFACTION = "life_satisfaction",
}

export interface DimensionDefinition {
  id: WellbeingDimension;

  title: string;

  description: string;

  question: string;
}

export const dimensionDefinitions: Record<
  WellbeingDimension,
  DimensionDefinition
> = {
  [WellbeingDimension.EMOTIONAL_REGULATION]: {
    id: WellbeingDimension.EMOTIONAL_REGULATION,
    title: "Emotional Regulation",
    description:
      "Your ability to understand, process and regulate emotions.",
    question:
      "How well do I understand and manage my emotions?",
  },

  [WellbeingDimension.RESILIENCE]: {
    id: WellbeingDimension.RESILIENCE,
    title: "Resilience",
    description:
      "Your capacity to recover and adapt after setbacks.",
    question:
      "How well do I recover from difficult experiences?",
  },

  [WellbeingDimension.SELF_WORTH]: {
    id: WellbeingDimension.SELF_WORTH,
    title: "Self-Worth",
    description:
      "Your confidence, identity and sense of personal value.",
    question:
      "How do I see and value myself?",
  },

  [WellbeingDimension.PURPOSE]: {
    id: WellbeingDimension.PURPOSE,
    title: "Purpose",
    description:
      "Your sense of meaning, direction and hope.",
    question:
      "Do I have meaning and direction in my life?",
  },

  [WellbeingDimension.RELATIONSHIPS]: {
    id: WellbeingDimension.RELATIONSHIPS,
    title: "Relationships",
    description:
      "The health and quality of your relationships with others.",
    question:
      "How healthy are my relationships?",
  },

  [WellbeingDimension.STRESS_MANAGEMENT]: {
    id: WellbeingDimension.STRESS_MANAGEMENT,
    title: "Stress Management",
    description:
      "Your ability to manage pressure and recover from stress.",
    question:
      "How effectively do I cope with stress?",
  },

  [WellbeingDimension.ANXIETY_REGULATION]: {
    id: WellbeingDimension.ANXIETY_REGULATION,
    title: "Anxiety Regulation",
    description:
      "Your ability to manage worry, fear and uncertainty.",
    question:
      "How well do I manage anxiety?",
  },

  [WellbeingDimension.MOOD_STABILITY]: {
    id: WellbeingDimension.MOOD_STABILITY,
    title: "Mood Stability",
    description:
      "The consistency and balance of your emotional wellbeing over time.",
    question:
      "How stable is my mood over time?",
  },

  [WellbeingDimension.PERSONAL_GROWTH]: {
    id: WellbeingDimension.PERSONAL_GROWTH,
    title: "Personal Growth",
    description:
      "Your ongoing learning, reflection and personal development.",
    question:
      "Am I becoming a healthier version of myself?",
  },

  [WellbeingDimension.LIFE_SATISFACTION]: {
    id: WellbeingDimension.LIFE_SATISFACTION,
    title: "Life Satisfaction",
    description:
      "Your overall sense of fulfilment and wellbeing.",
    question:
      "How satisfied am I with my life overall?",
  },
};