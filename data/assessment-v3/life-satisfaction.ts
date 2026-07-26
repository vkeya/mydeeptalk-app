import {
  AssessmentDefinition,
  AssessmentQuestionOption,
} from "@/lib/assessment/types/AssessmentDefinition";

import {
  AssessmentCategory,
  ScoringDirection,
} from "@/lib/assessment/types/AssessmentEnums";

import { WellbeingDimension } from "@/lib/assessment/types/AssessmentDimensions";

const options: AssessmentQuestionOption[] = [
  {
    id: "0",
    text: "Strongly Disagree",
    value: 0,
  },
  {
    id: "1",
    text: "Disagree",
    value: 1,
  },
  {
    id: "2",
    text: "Agree",
    value: 2,
  },
  {
    id: "3",
    text: "Strongly Agree",
    value: 3,
  },
];

export const lifeSatisfactionAssessment: AssessmentDefinition = {
  metadata: {
    id: "life-satisfaction",

    slug: "life-satisfaction",

    version: 3,

    title: "Life Satisfaction Assessment",

    description:
      "Explore how satisfied you are with different aspects of your life, including purpose, relationships, personal growth, and overall wellbeing.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "smile",

    color: "#10B981",
  },

  wellbeingDimensions: [
    WellbeingDimension.LifeSatisfaction,
    WellbeingDimension.Purpose,
  ],

  questions: [
    {
      id: "q1",
      text: "I am satisfied with the direction my life is taking.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },

    {
      id: "q2",
      text: "I feel my life has meaning and purpose.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q3",
      text: "I often feel disappointed with how my life has turned out.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },

    {
      id: "q4",
      text: "I appreciate the positive things in my life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },

    {
      id: "q5",
      text: "I feel hopeful about my future.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q6",
      text: "I compare my life negatively with other people's lives.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },

    {
      id: "q7",
      text: "I feel proud of what I have accomplished so far.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },

    {
      id: "q8",
      text: "I feel that my daily life reflects my personal values.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q9",
      text: "I frequently wish my life were completely different.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I am satisfied with my life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.LifeSatisfaction],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "High Life Satisfaction",

      observation:
        "Your responses suggest that you are generally satisfied with your life and optimistic about your future.",

      meaning:
        "You appear to experience a healthy sense of purpose, gratitude, and fulfillment across multiple areas of life.",

      strengths: [
        "Positive outlook",
        "Strong sense of purpose",
        "Gratitude",
        "Healthy resilience",
      ],

      growthAreas: [
        "Continue investing in meaningful goals",
        "Support others in their personal growth",
      ],

      reflectionQuestion:
        "Which part of your life brings you the deepest sense of fulfillment, and how can you continue to nurture it?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Life Satisfaction",

      observation:
        "Your responses suggest that while there are areas of contentment, some parts of your life may not yet feel fully satisfying.",

      meaning:
        "Exploring your values, goals, and relationships may help you create greater fulfillment and alignment.",

      strengths: [
        "Self-awareness",
        "Desire for growth",
      ],

      growthAreas: [
        "Clarify personal goals",
        "Increase gratitude",
        "Strengthen purpose",
      ],

      reflectionQuestion:
        "If you could improve one area of your life over the next year, which change would create the greatest sense of fulfillment?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Low Life Satisfaction",

      observation:
        "Your responses suggest that you may currently feel dissatisfied with important areas of your life.",

      meaning:
        "Life satisfaction can improve through meaningful change, supportive relationships, healthy habits, and intentional personal growth. Small consistent steps often lead to lasting transformation.",

      strengths: [
        "Has taken an important step through self-reflection",
        "Shows openness to personal growth",
      ],

      growthAreas: [
        "Reconnect with purpose",
        "Set meaningful goals",
        "Strengthen emotional wellbeing",
        "Build a more fulfilling life",
      ],

      reflectionQuestion:
        "Imagine your life one year from now feeling deeply meaningful and fulfilling. What would be different?",
    },
  ],
};

export default lifeSatisfactionAssessment;