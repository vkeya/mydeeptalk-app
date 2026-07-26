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
    text: "Never",
    value: 0,
  },
  {
    id: "1",
    text: "Rarely",
    value: 1,
  },
  {
    id: "2",
    text: "Sometimes",
    value: 2,
  },
  {
    id: "3",
    text: "Often",
    value: 3,
  },
];

export const relationshipSatisfactionAssessment: AssessmentDefinition = {
  metadata: {
    id: "relationship-satisfaction",

    slug: "relationship-satisfaction",

    version: 3,

    title: "Relationship Satisfaction Assessment",

    description:
      "Explore the quality of your close relationships, communication, trust, and emotional connection.",

    category: AssessmentCategory.Relationships,

    estimatedDurationMinutes: 3,

    icon: "heart-handshake",

    color: "#F43F5E",
  },

  wellbeingDimensions: [
    WellbeingDimension.Relationships,
  ],

  questions: [
    {
      id: "q1",
      text: "I feel emotionally connected to the people closest to me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q2",
      text: "I feel heard and understood in my important relationships.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q3",
      text: "Conflict in my relationships remains unresolved.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q4",
      text: "I trust the people who are closest to me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q5",
      text: "I avoid expressing my true feelings in my relationships.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q6",
      text: "I feel appreciated by the important people in my life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q7",
      text: "I often feel lonely even when I am with people I care about.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q8",
      text: "We communicate openly and respectfully during disagreements.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q9",
      text: "My relationships contribute positively to my wellbeing.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I am satisfied with my close relationships.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Healthy Relationship Satisfaction",

      observation:
        "Your responses suggest that your close relationships are generally supportive, trusting, and emotionally fulfilling.",

      meaning:
        "Healthy relationships contribute to emotional wellbeing, resilience, and a stronger sense of belonging.",

      strengths: [
        "Healthy communication",
        "Trust",
        "Emotional connection",
        "Supportive relationships",
      ],

      growthAreas: [
        "Continue nurturing meaningful relationships",
        "Maintain open communication",
      ],

      reflectionQuestion:
        "What relationship in your life brings you the greatest sense of connection, and why?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Relationship Satisfaction Needs Strengthening",

      observation:
        "Your responses suggest that some aspects of your relationships could benefit from greater communication, trust, or emotional connection.",

      meaning:
        "Healthy relationships grow through honest conversations, empathy, forgiveness, and shared effort.",

      strengths: [
        "Growing self-awareness",
        "Desire for stronger relationships",
      ],

      growthAreas: [
        "Improve communication",
        "Strengthen trust",
        "Resolve conflict constructively",
      ],

      reflectionQuestion:
        "What one conversation could strengthen an important relationship in your life?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Relationship Satisfaction Requires Attention",

      observation:
        "Your responses suggest that relationship challenges may be significantly affecting your wellbeing.",

      meaning:
        "Relationship difficulties can influence emotional health, confidence, and life satisfaction. Building healthier communication patterns and seeking support where appropriate can help restore connection.",

      strengths: [
        "Shows courage through honest reflection",
        "Has taken an important first step toward healthier relationships",
      ],

      growthAreas: [
        "Rebuild trust",
        "Improve communication",
        "Develop healthier relationship patterns",
        "Strengthen emotional connection",
      ],

      reflectionQuestion:
        "If your most important relationship became healthier over the next year, what would be the first noticeable change?",
    },
  ],
};

export default relationshipSatisfactionAssessment;