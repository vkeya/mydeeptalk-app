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
    text: "Not at all",
    value: 0,
  },
  {
    id: "1",
    text: "Several days",
    value: 1,
  },
  {
    id: "2",
    text: "More than half the days",
    value: 2,
  },
  {
    id: "3",
    text: "Nearly every day",
    value: 3,
  },
];

export const stressAssessment: AssessmentDefinition = {
  metadata: {
    id: "stress",

    slug: "stress",

    version: 3,

    title: "Stress Self-Assessment",

    description:
      "Understand how stress is currently affecting your emotional wellbeing, daily functioning, and resilience.",

    category: AssessmentCategory.MentalWellbeing,

    estimatedDurationMinutes: 2,

    icon: "activity",

    color: "#14B8A6",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often have you felt overwhelmed by your responsibilities?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q2",
      text:
        "How often have you found it difficult to relax after a busy day?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q3",
      text:
        "How often have you felt that you had too many demands placed on you?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q4",
      text:
        "How often have you felt emotionally exhausted?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q5",
      text:
        "How often have you had trouble sleeping because of stress?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q6",
      text:
        "How often have you become impatient or irritable because of stress?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q7",
      text:
        "How often has stress affected your concentration or productivity?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q8",
      text:
        "How often have you felt physically tense because of stress?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q9",
      text:
        "How often have you felt unable to cope with everything happening in your life?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q10",
      text:
        "How often have you felt that stress was reducing your overall quality of life?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Low Stress",

      observation:
        "Your responses suggest that your current stress levels are generally well managed.",

      meaning:
        "You appear to have healthy coping strategies and resilience that help you manage everyday challenges.",

      strengths: [
        "Healthy resilience",
        "Good emotional regulation",
        "Effective coping habits",
      ],

      growthAreas: [
        "Maintain healthy routines",
        "Continue practicing self-care",
      ],

      reflectionQuestion:
        "Which daily habits help you remain calm and balanced during demanding periods?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Stress",

      observation:
        "Your responses suggest that stress is beginning to affect parts of your daily life.",

      meaning:
        "This may be a good opportunity to strengthen coping strategies before stress becomes overwhelming.",

      strengths: [
        "Self-awareness",
        "Recognizes personal wellbeing",
      ],

      growthAreas: [
        "Improve work-life balance",
        "Practice relaxation techniques",
        "Strengthen emotional resilience",
      ],

      reflectionQuestion:
        "What situations contribute most to your stress, and what changes could reduce their impact?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "High Stress",

      observation:
        "Your responses suggest that stress is significantly affecting your emotional wellbeing and daily functioning.",

      meaning:
        "Developing healthier coping strategies and seeking additional support may help reduce the impact of stress and improve overall wellbeing.",

      strengths: [
        "Shows courage by reflecting honestly",
        "Has taken the first step toward understanding personal wellbeing",
      ],

      growthAreas: [
        "Managing chronic stress",
        "Restoring emotional balance",
        "Seeking additional support when needed",
      ],

      reflectionQuestion:
        "If one major source of stress disappeared tomorrow, what positive changes would you notice first in your life?",
    },
  ],
};

export default stressAssessment;