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

export const workLifeBalanceAssessment: AssessmentDefinition = {
  metadata: {
    id: "work-life-balance",

    slug: "work-life-balance",

    version: 3,

    title: "Work-Life Balance Assessment",

    description:
      "Understand how well your work, personal life, relationships, and wellbeing are balanced.",

    category: AssessmentCategory.Lifestyle,

    estimatedDurationMinutes: 3,

    icon: "briefcase",

    color: "#2563EB",
  },

  wellbeingDimensions: [
    WellbeingDimension.WorkLifeBalance,
    WellbeingDimension.Relationships,
  ],

  questions: [
    {
      id: "q1",
      text: "I have enough time for my personal life outside of work.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q2",
      text: "My work responsibilities regularly overwhelm me.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q3",
      text: "I have enough time to spend with family and friends.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q4",
      text: "I often think about work even during my personal time.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q5",
      text: "I regularly make time for hobbies or activities I enjoy.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q6",
      text: "My workload negatively affects my physical or emotional health.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q7",
      text: "I feel guilty when taking breaks or time off.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q8",
      text: "I am able to disconnect from work when my workday ends.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q9",
      text: "My current lifestyle feels balanced and sustainable.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I am satisfied with the balance between work and my personal life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.WorkLifeBalance],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Healthy Work-Life Balance",

      observation:
        "Your responses suggest that you maintain a healthy balance between work, relationships, and personal wellbeing.",

      meaning:
        "You appear to manage your responsibilities while still making time for rest, relationships, and personal growth.",

      strengths: [
        "Healthy boundaries",
        "Balanced lifestyle",
        "Good time management",
        "Strong wellbeing habits",
      ],

      growthAreas: [
        "Continue protecting personal time",
        "Maintain healthy boundaries",
      ],

      reflectionQuestion:
        "Which personal habit has contributed most to maintaining a healthy balance in your life?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Work-Life Balance Needs Attention",

      observation:
        "Your responses suggest that work or responsibilities are beginning to reduce your overall wellbeing.",

      meaning:
        "Small adjustments to boundaries, priorities, and self-care may help restore a healthier balance before burnout develops.",

      strengths: [
        "Growing awareness",
        "Desire for healthier balance",
      ],

      growthAreas: [
        "Improve boundaries",
        "Prioritize self-care",
        "Protect personal relationships",
      ],

      reflectionQuestion:
        "Which commitment could you reduce or change to create more space for yourself this week?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Significant Work-Life Imbalance",

      observation:
        "Your responses suggest that work or daily responsibilities are having a substantial impact on your wellbeing.",

      meaning:
        "Long-term imbalance can affect emotional health, relationships, physical wellbeing, and productivity. Rebuilding healthy boundaries can improve overall quality of life.",

      strengths: [
        "Shows honest self-awareness",
        "Has taken an important first step toward positive change",
      ],

      growthAreas: [
        "Restore healthy boundaries",
        "Improve wellbeing",
        "Reduce chronic stress",
        "Reconnect with life outside work",
      ],

      reflectionQuestion:
        "If your work and personal life felt perfectly balanced six months from now, what would your typical week look like?",
    },
  ],
};

export default workLifeBalanceAssessment;