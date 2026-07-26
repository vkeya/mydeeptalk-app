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

export const emotionalRegulationAssessment: AssessmentDefinition = {
  metadata: {
    id: "emotional-regulation",

    slug: "emotional-regulation",

    version: 3,

    title: "Emotional Regulation Assessment",

    description:
      "Explore how effectively you recognize, understand, and manage your emotions during everyday life and challenging situations.",

    category: AssessmentCategory.EmotionalWellbeing,

    estimatedDurationMinutes: 3,

    icon: "brain",

    color: "#7C3AED",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
    WellbeingDimension.Identity,
  ],

  questions: [
    {
      id: "q1",
      text: "I recognize my emotions before they become overwhelming.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q2",
      text: "My emotions often control my decisions.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q3",
      text: "I am able to calm myself after becoming upset.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q4",
      text: "I react impulsively when I feel strong emotions.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q5",
      text: "I understand why I feel the way I do.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q6",
      text: "Stress makes it difficult for me to think clearly.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q7",
      text: "I express my emotions in healthy ways.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q8",
      text: "I hold onto negative emotions for a long time.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q9",
      text: "I recover emotionally after difficult experiences.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I manage my emotions in healthy and constructive ways.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Emotional Regulation",

      observation:
        "Your responses suggest that you manage emotions effectively and respond thoughtfully to life's challenges.",

      meaning:
        "Healthy emotional regulation supports resilience, relationships, decision-making, and overall wellbeing.",

      strengths: [
        "Emotional awareness",
        "Healthy coping skills",
        "Thoughtful decision-making",
        "Self-control",
      ],

      growthAreas: [
        "Continue practicing emotional awareness",
        "Maintain healthy coping strategies",
      ],

      reflectionQuestion:
        "What personal habit helps you stay emotionally balanced during stressful situations?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Emotional Regulation",

      observation:
        "Your responses suggest that you generally manage emotions well but may find certain situations particularly challenging.",

      meaning:
        "Strengthening self-awareness and practicing healthy coping skills can improve emotional balance over time.",

      strengths: [
        "Growing emotional awareness",
        "Potential for continued growth",
      ],

      growthAreas: [
        "Respond more intentionally",
        "Develop healthier coping strategies",
        "Increase emotional resilience",
      ],

      reflectionQuestion:
        "Which emotion is the most difficult for you to manage, and what usually triggers it?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Emotional Regulation Needs Attention",

      observation:
        "Your responses suggest that intense emotions may sometimes feel difficult to understand or manage.",

      meaning:
        "Emotional regulation is a skill that develops through practice, reflection, and support. Strengthening these skills can improve wellbeing, relationships, and confidence.",

      strengths: [
        "Shows honest self-reflection",
        "Has taken an important first step toward personal growth",
      ],

      growthAreas: [
        "Increase emotional awareness",
        "Strengthen coping skills",
        "Reduce impulsive reactions",
        "Build emotional resilience",
      ],

      reflectionQuestion:
        "If you could respond calmly to every emotionally difficult situation, what would change most in your life?",
    },
  ],
};

export default emotionalRegulationAssessment;