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

export const sleepWellbeingAssessment: AssessmentDefinition = {
  metadata: {
    id: "sleep-wellbeing",

    slug: "sleep-wellbeing",

    version: 3,

    title: "Sleep Wellbeing Assessment",

    description:
      "Explore the quality of your sleep and how it may be affecting your emotional, mental, and physical wellbeing.",

    category: AssessmentCategory.PhysicalWellbeing,

    estimatedDurationMinutes: 3,

    icon: "moon",

    color: "#1E40AF",
  },

  wellbeingDimensions: [
    WellbeingDimension.PhysicalHealth,
  ],

  questions: [
    {
      id: "q1",
      text: "How often do you struggle to fall asleep?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q2",
      text: "How often do you wake up during the night?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q3",
      text: "How often do you wake up feeling rested?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q4",
      text: "How often does poor sleep affect your mood?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q5",
      text: "How often does fatigue reduce your productivity?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q6",
      text: "How often do racing thoughts make it difficult to sleep?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q7",
      text: "How often do you rely on caffeine or stimulants because you feel tired?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q8",
      text: "How often do you sleep fewer hours than you would like?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q9",
      text: "How often does poor sleep affect your relationships or daily life?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },

    {
      id: "q10",
      text: "How often do you maintain a consistent bedtime routine?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.PhysicalHealth],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Healthy Sleep Wellbeing",

      observation:
        "Your responses suggest that your sleep habits are generally supporting your overall wellbeing.",

      meaning:
        "Quality sleep helps improve emotional regulation, concentration, physical health, and resilience.",

      strengths: [
        "Healthy sleep routine",
        "Good physical recovery",
        "Balanced daily energy",
      ],

      growthAreas: [
        "Continue protecting healthy sleep habits",
        "Maintain consistent routines",
      ],

      reflectionQuestion:
        "Which evening habits help you experience your best night's sleep?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Sleep Challenges",

      observation:
        "Your responses suggest that your sleep quality is occasionally affecting your wellbeing.",

      meaning:
        "Small improvements to sleep hygiene and daily routines may significantly improve your energy, mood, and overall health.",

      strengths: [
        "Growing awareness of sleep health",
        "Opportunity for positive habit change",
      ],

      growthAreas: [
        "Improve sleep consistency",
        "Reduce evening stress",
        "Strengthen bedtime routines",
      ],

      reflectionQuestion:
        "What change to your evening routine could improve your sleep over the next week?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Significant Sleep Difficulties",

      observation:
        "Your responses suggest that poor sleep is having a substantial impact on your wellbeing.",

      meaning:
        "Persistent sleep difficulties can affect emotional health, physical wellbeing, relationships, and daily performance. Exploring healthier sleep habits or speaking with a healthcare professional may be beneficial.",

      strengths: [
        "Recognizes the importance of wellbeing",
        "Has taken an important first step through self-reflection",
      ],

      growthAreas: [
        "Improve sleep quality",
        "Reduce fatigue",
        "Develop healthier bedtime routines",
      ],

      reflectionQuestion:
        "If you consistently woke up feeling rested each morning, what area of your life would improve the most?",
    },
  ],
};

export default sleepWellbeingAssessment;