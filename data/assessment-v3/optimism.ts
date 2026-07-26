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

export const optimismAssessment: AssessmentDefinition = {
  metadata: {
    id: "optimism",

    slug: "optimism",

    version: 3,

    title: "Optimism Assessment",

    description:
      "Explore how hopeful and optimistic you feel about yourself, your future, and your ability to overcome life's challenges.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "sun",

    color: "#F59E0B",
  },

  wellbeingDimensions: [
    WellbeingDimension.Purpose,
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text: "I generally expect positive things to happen in my life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q2",
      text: "I often assume that things will go wrong.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q3",
      text: "I believe I can find opportunities even during difficult times.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q4",
      text: "When I face setbacks, I lose hope quickly.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q5",
      text: "I believe my future can be better than my present.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q6",
      text: "I find it difficult to see positive outcomes in uncertain situations.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q7",
      text: "I remain hopeful even when life is challenging.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q8",
      text: "Negative thoughts often outweigh positive ones.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q9",
      text: "I believe I have the ability to shape my future.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I feel hopeful and optimistic about my life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Optimism",

      observation:
        "Your responses suggest that you generally approach life with hope, confidence, and a positive outlook.",

      meaning:
        "Optimism helps people recover from setbacks, build resilience, and pursue meaningful goals despite challenges.",

      strengths: [
        "Hopefulness",
        "Positive outlook",
        "Confidence in the future",
        "Emotional resilience",
      ],

      growthAreas: [
        "Continue nurturing gratitude",
        "Support others with your positive outlook",
      ],

      reflectionQuestion:
        "What belief helps you remain hopeful even during difficult seasons of life?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Optimism",

      observation:
        "Your responses suggest that you are hopeful in some situations but may struggle to stay optimistic during uncertainty or setbacks.",

      meaning:
        "Optimism grows through self-awareness, realistic thinking, gratitude, and recognizing progress over perfection.",

      strengths: [
        "Growing self-awareness",
        "Capacity for positive change",
      ],

      growthAreas: [
        "Challenge negative thinking",
        "Practice gratitude",
        "Strengthen hope for the future",
      ],

      reflectionQuestion:
        "What recent success reminds you that positive change is possible?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Optimism Needs Strengthening",

      observation:
        "Your responses suggest that pessimism or discouragement may be affecting how you view yourself or your future.",

      meaning:
        "Hope is not about ignoring difficulties—it is about believing that growth and positive change remain possible. Developing optimism can improve wellbeing, resilience, and motivation.",

      strengths: [
        "Shows honesty through self-reflection",
        "Has taken an important first step toward building hope",
      ],

      growthAreas: [
        "Strengthen hope",
        "Reduce negative thinking",
        "Develop future confidence",
        "Build emotional resilience",
      ],

      reflectionQuestion:
        "If you truly believed your future could become better than today, what would you begin doing differently?",
    },
  ],
};

export default optimismAssessment;