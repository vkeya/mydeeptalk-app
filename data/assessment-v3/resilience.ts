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

export const resilienceAssessment: AssessmentDefinition = {
  metadata: {
    id: "resilience",

    slug: "resilience",

    version: 3,

    title: "Resilience Assessment",

    description:
      "Explore your ability to adapt, recover, and grow through life's challenges.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "mountain",

    color: "#0EA5E9",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
    WellbeingDimension.Purpose,
  ],

  questions: [
    {
      id: "q1",
      text: "I recover quickly after difficult experiences.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q2",
      text: "Challenges leave me feeling stuck for a long time.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q3",
      text: "I believe I can overcome most obstacles.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q4",
      text: "Unexpected setbacks make me lose hope.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q5",
      text: "I learn valuable lessons from difficult situations.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q6",
      text: "I struggle to adapt when life changes suddenly.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q7",
      text: "I have people I can turn to during difficult times.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q8",
      text: "Stress makes it difficult for me to keep moving forward.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q9",
      text: "I remain hopeful even when life feels uncertain.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I consider myself a resilient person.",
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

      title: "Strong Resilience",

      observation:
        "Your responses suggest that you adapt well to challenges and recover effectively from setbacks.",

      meaning:
        "You appear to have developed healthy coping strategies, optimism, and emotional flexibility that support long-term wellbeing.",

      strengths: [
        "Adaptability",
        "Emotional strength",
        "Healthy coping skills",
        "Optimism",
      ],

      growthAreas: [
        "Continue building supportive relationships",
        "Maintain healthy coping habits",
      ],

      reflectionQuestion:
        "What personal strength has helped you overcome life's greatest challenges?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Resilience",

      observation:
        "Your responses suggest that you are resilient in many situations but may struggle during periods of prolonged stress or uncertainty.",

      meaning:
        "Building emotional awareness, strengthening support networks, and practicing healthy coping strategies can increase resilience over time.",

      strengths: [
        "Growing self-awareness",
        "Potential for continued growth",
      ],

      growthAreas: [
        "Strengthen coping strategies",
        "Increase emotional flexibility",
        "Build stronger support systems",
      ],

      reflectionQuestion:
        "What challenge has taught you the most about your own strength?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Resilience Needs Strengthening",

      observation:
        "Your responses suggest that recent challenges may be affecting your ability to recover, adapt, or remain hopeful.",

      meaning:
        "Resilience is a skill that can be strengthened through support, self-compassion, and healthy coping practices. Developing these skills can improve confidence and wellbeing over time.",

      strengths: [
        "Shows honesty through self-reflection",
        "Has taken an important first step toward personal growth",
      ],

      growthAreas: [
        "Develop healthier coping skills",
        "Increase emotional resilience",
        "Strengthen support networks",
        "Rebuild confidence",
      ],

      reflectionQuestion:
        "If you felt more resilient a year from now, what would you be doing differently when facing life's challenges?",
    },
  ],
};

export default resilienceAssessment;