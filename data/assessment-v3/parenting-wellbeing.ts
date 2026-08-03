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

export const parentingWellbeingAssessment: AssessmentDefinition = {
  metadata: {
    id: "parenting-wellbeing",

    slug: "parenting-wellbeing",

    version: 3,

    title: "Parenting Wellbeing Assessment",

    description:
      "Reflect on your confidence, emotional wellbeing, and relationships as a parent or caregiver.",

    category: AssessmentCategory.Relationships,

    estimatedDurationMinutes: 3,

    icon: "baby",

    color: "#EC4899",
  },

  wellbeingDimensions: [
    WellbeingDimension.Relationships,
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text: "I feel confident in my parenting decisions.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q2",
      text: "Parenting responsibilities often leave me emotionally exhausted.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q3",
      text: "I feel emotionally connected with my child or children.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q4",
      text: "I frequently feel guilty that I am not doing enough as a parent.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q5",
      text: "I remain calm during challenging parenting situations.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q6",
      text: "I have people I can rely on for parenting support.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q7",
      text: "Parenting stress affects my own wellbeing.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q8",
      text: "I make time to care for my own wellbeing as a parent.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q9",
      text: "I feel overwhelmed trying to balance parenting with other responsibilities.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I feel positive about my parenting journey.",
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

      title: "Healthy Parenting Wellbeing",

      observation:
        "Your responses suggest that you generally feel confident, supported, and emotionally balanced in your parenting role.",

      meaning:
        "You appear to have developed healthy parenting habits while maintaining your own emotional wellbeing.",

      strengths: [
        "Positive parent-child relationships",
        "Healthy emotional regulation",
        "Confidence in parenting",
        "Good support network",
      ],

      growthAreas: [
        "Continue prioritizing self-care",
        "Maintain strong family connections",
      ],

      reflectionQuestion:
        "What parenting moments make you feel most proud and connected to your child?",

    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Parenting Wellbeing Needs Support",

      observation:
        "Your responses suggest that parenting responsibilities sometimes affect your emotional wellbeing.",

      meaning:
        "Parenting can be demanding. Building stronger support systems and making space for your own wellbeing can improve both your wellbeing and your family relationships.",

      strengths: [
        "Commitment to your family",
        "Growing self-awareness",
      ],

      growthAreas: [
        "Reduce parenting stress",
        "Strengthen support systems",
        "Practice self-care",
      ],

      reflectionQuestion:
        "What kind of support would make the biggest difference in your parenting journey right now?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Parenting Wellbeing Requires Attention",

      observation:
        "Your responses suggest that parenting stress is having a significant impact on your emotional wellbeing.",

      meaning:
        "Looking after yourself is an important part of looking after your children. Reaching out for practical or emotional support can help restore balance and confidence.",

      strengths: [
        "Shows honesty through self-reflection",
        "Has taken an important first step toward healthier parenting",
      ],

      growthAreas: [
        "Manage parenting stress",
        "Strengthen emotional wellbeing",
        "Develop healthy support systems",
        "Improve work-family balance",
      ],

      reflectionQuestion:
        "If parenting felt less overwhelming six months from now, what would be different for both you and your family?",
    },
  ],
};

export default parentingWellbeingAssessment;