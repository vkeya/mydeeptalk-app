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

export const selfCompassionAssessment: AssessmentDefinition = {
  metadata: {
    id: "self-compassion",

    slug: "self-compassion",

    version: 3,

    title: "Self-Compassion Assessment",

    description:
      "Explore how kindly and compassionately you respond to yourself during mistakes, setbacks, and difficult moments.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "heart",

    color: "#EC4899",
  },

  wellbeingDimensions: [
    WellbeingDimension.Identity,
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text: "I treat myself with kindness when I make mistakes.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q2",
      text: "I am very critical of myself when things go wrong.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q3",
      text: "I believe that making mistakes is part of being human.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q4",
      text: "I dwell on my failures for a long time.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q5",
      text: "I forgive myself when I fall short of my expectations.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q6",
      text: "I compare myself harshly with other people.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q7",
      text: "I encourage myself during difficult times.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q8",
      text: "I believe I do not deserve compassion when I fail.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q9",
      text: "I accept my imperfections without losing self-respect.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I respond to myself with compassion and understanding.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Self-Compassion",

      observation:
        "Your responses suggest that you treat yourself with kindness, understanding, and acceptance during difficult moments.",

      meaning:
        "Self-compassion supports emotional resilience, confidence, healthier relationships, and long-term wellbeing.",

      strengths: [
        "Self-kindness",
        "Healthy self-acceptance",
        "Emotional resilience",
        "Balanced self-awareness",
      ],

      growthAreas: [
        "Continue practicing self-kindness",
        "Support others through compassion",
      ],

      reflectionQuestion:
        "What personal quality helps you remain compassionate toward yourself during difficult times?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Self-Compassion",

      observation:
        "Your responses suggest that you are sometimes compassionate toward yourself but may still become overly self-critical during challenges.",

      meaning:
        "Practicing self-kindness, realistic expectations, and self-forgiveness can strengthen emotional wellbeing over time.",

      strengths: [
        "Growing self-awareness",
        "Desire for personal growth",
      ],

      growthAreas: [
        "Reduce self-criticism",
        "Practice self-forgiveness",
        "Strengthen emotional resilience",
      ],

      reflectionQuestion:
        "What would change if you spoke to yourself the way you would speak to a close friend?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Self-Compassion Needs Strengthening",

      observation:
        "Your responses suggest that you may be placing excessive pressure or criticism on yourself.",

      meaning:
        "Learning to respond with compassion instead of harsh judgment can improve confidence, emotional wellbeing, and resilience. Self-compassion is a skill that grows with practice.",

      strengths: [
        "Shows honest self-reflection",
        "Has taken an important first step toward healthier self-acceptance",
      ],

      growthAreas: [
        "Develop self-kindness",
        "Reduce self-judgment",
        "Practice forgiveness",
        "Build healthier self-worth",
      ],

      reflectionQuestion:
        "If you truly believed you were worthy of kindness regardless of your mistakes, how would your daily life be different?",
    },
  ],
};

export default selfCompassionAssessment;