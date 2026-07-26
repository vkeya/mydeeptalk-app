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

export const traumaAssessment: AssessmentDefinition = {
  metadata: {
    id: "trauma",

    slug: "trauma",

    version: 3,

    title: "Trauma Assessment",

    description:
      "Reflect on how difficult or distressing experiences may still be affecting your emotions, thoughts, relationships, and daily life.",

    category: AssessmentCategory.MentalWellbeing,

    estimatedDurationMinutes: 3,

    icon: "shield-alert",

    color: "#7C3AED",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often do distressing memories of a difficult experience return unexpectedly?",
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
        "How often do you avoid people, places, or situations that remind you of a painful experience?",
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
        "How often do you feel constantly alert or on guard, even when you are safe?",
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
        "How often do you experience strong emotional reactions that seem difficult to control?",
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
        "How often do you have difficulty trusting other people because of past experiences?",
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
        "How often do you struggle to feel emotionally safe?",
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
        "How often do upsetting memories interfere with your daily life?",
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
        "How often do you feel emotionally numb or disconnected from yourself or others?",
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
        "How often do you feel that your past experiences continue to control your present life?",
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
        "How often do you feel hopeful that healing is possible?",
      options,
      scoringDirection: ScoringDirection.Reverse,
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

      title: "Low Trauma Impact",

      observation:
        "Your responses suggest that past difficult experiences are having relatively little impact on your current wellbeing.",

      meaning:
        "Although painful experiences may still be part of your story, they do not appear to be significantly disrupting your daily functioning.",

      strengths: [
        "Emotional resilience",
        "Healthy coping strategies",
        "Growing sense of safety",
      ],

      growthAreas: [
        "Continue nurturing emotional wellbeing",
        "Maintain supportive relationships",
      ],

      reflectionQuestion:
        "What personal strengths have helped you recover from difficult experiences in your life?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Trauma Impact",

      observation:
        "Your responses suggest that past experiences continue to affect parts of your emotional wellbeing.",

      meaning:
        "Healing is often a gradual process. Developing healthy coping strategies and seeking trusted support may help reduce the ongoing impact of past experiences.",

      strengths: [
        "Growing self-awareness",
        "Willingness to reflect honestly",
      ],

      growthAreas: [
        "Process unresolved emotions",
        "Strengthen emotional safety",
        "Build healthy coping skills",
      ],

      reflectionQuestion:
        "What would feeling emotionally safe look like for you today?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Significant Trauma Impact",

      observation:
        "Your responses suggest that past traumatic experiences continue to have a significant impact on your emotional wellbeing and daily life.",

      meaning:
        "Trauma can affect emotions, relationships, thoughts, and physical wellbeing. With compassionate support and evidence-based care, healing is possible, even if it takes time.",

      strengths: [
        "Shows courage through honest reflection",
        "Has taken an important first step toward healing",
      ],

      growthAreas: [
        "Trauma recovery",
        "Emotional regulation",
        "Rebuilding trust and safety",
      ],

      reflectionQuestion:
        "If your past no longer defined your future, what would be the first change you would hope to see in your life?",
    },
  ],
};

export default traumaAssessment;