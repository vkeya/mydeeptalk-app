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

export const financialWellbeingAssessment: AssessmentDefinition = {
  metadata: {
    id: "financial-wellbeing",

    slug: "financial-wellbeing",

    version: 3,

    title: "Financial Wellbeing Assessment",

    description:
      "Explore your relationship with money, financial security, and how your finances affect your overall wellbeing.",

    category: AssessmentCategory.Lifestyle,

    estimatedDurationMinutes: 3,

    icon: "wallet",

    color: "#16A34A",
  },

  wellbeingDimensions: [
    WellbeingDimension.Financial,
  ],

  questions: [
    {
      id: "q1",
      text: "I feel in control of my finances.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q2",
      text: "Financial stress affects my emotional wellbeing.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q3",
      text: "I worry about having enough money to meet my needs.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q4",
      text: "I have a financial plan that gives me confidence.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q5",
      text: "Unexpected expenses create significant stress for me.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q6",
      text: "I am able to save money consistently.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q7",
      text: "Money concerns affect my relationships.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q8",
      text: "I feel optimistic about my financial future.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q9",
      text: "I avoid looking at my finances because they cause stress.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I feel financially secure.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Financial],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Healthy Financial Wellbeing",

      observation:
        "Your responses suggest that you generally feel financially secure and confident managing your finances.",

      meaning:
        "Healthy financial wellbeing supports emotional wellbeing, relationships, and long-term life satisfaction.",

      strengths: [
        "Financial confidence",
        "Healthy money habits",
        "Future planning",
        "Financial resilience",
      ],

      growthAreas: [
        "Continue strengthening long-term financial goals",
        "Maintain healthy financial habits",
      ],

      reflectionQuestion:
        "Which financial habit has contributed most to your sense of security and peace of mind?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Financial Wellbeing",

      observation:
        "Your responses suggest occasional financial stress that may be affecting your overall wellbeing.",

      meaning:
        "Improving financial planning, budgeting, or savings habits may help increase confidence and reduce stress over time.",

      strengths: [
        "Growing financial awareness",
        "Opportunity for positive change",
      ],

      growthAreas: [
        "Strengthen budgeting",
        "Build emergency savings",
        "Reduce financial stress",
      ],

      reflectionQuestion:
        "What single financial habit would create the greatest improvement in your peace of mind over the next year?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Financial Wellbeing Needs Attention",

      observation:
        "Your responses suggest that financial concerns are having a significant impact on your wellbeing.",

      meaning:
        "Financial stress can influence emotional health, relationships, and daily functioning. Creating a realistic financial plan and seeking trusted financial guidance may help restore confidence and stability.",

      strengths: [
        "Shows honest self-reflection",
        "Has taken the first step toward positive financial wellbeing",
      ],

      growthAreas: [
        "Improve financial planning",
        "Reduce financial stress",
        "Build financial resilience",
        "Strengthen long-term financial security",
      ],

      reflectionQuestion:
        "If financial stress were no longer part of your life, what opportunities or dreams would you pursue first?",
    },
  ],
};

export default financialWellbeingAssessment;