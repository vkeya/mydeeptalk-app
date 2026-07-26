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

export const lonelinessAssessment: AssessmentDefinition = {
  metadata: {
    id: "loneliness",

    slug: "loneliness",

    version: 3,

    title: "Loneliness Assessment",

    description:
      "Explore how connected you feel to others and identify areas where stronger relationships and support may improve your wellbeing.",

    category: AssessmentCategory.Relationships,

    estimatedDurationMinutes: 2,

    icon: "users",

    color: "#3B82F6",
  },

  wellbeingDimensions: [
    WellbeingDimension.Relationships,
  ],

  questions: [
    {
      id: "q1",
      text: "How often do you feel lonely?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q2",
      text: "How often do you feel isolated from people around you?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q3",
      text: "How often do you feel that nobody truly understands you?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q4",
      text: "How often do you wish you had someone to talk to?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q5",
      text: "How often do you avoid social situations?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q6",
      text: "How often do you feel emotionally disconnected from family or friends?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q7",
      text: "How often do you feel left out by others?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q8",
      text: "How often do you struggle to build meaningful relationships?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q9",
      text: "How often do you feel unsupported during difficult times?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
    {
      id: "q10",
      text: "How often do you feel disconnected even when surrounded by people?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Social Connection",

      observation:
        "Your responses suggest that you generally feel connected and supported by the people around you.",

      meaning:
        "Healthy relationships appear to provide emotional support and a sense of belonging.",

      strengths: [
        "Healthy relationships",
        "Sense of belonging",
        "Strong social support",
      ],

      growthAreas: [
        "Continue investing in meaningful relationships",
        "Support others who may feel isolated",
      ],

      reflectionQuestion:
        "Which relationships bring the greatest sense of belonging into your life?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Occasional Loneliness",

      observation:
        "Your responses suggest that you experience loneliness from time to time.",

      meaning:
        "Building deeper relationships and increasing meaningful social interactions may strengthen your emotional wellbeing.",

      strengths: [
        "Growing self-awareness",
        "Open to connection",
      ],

      growthAreas: [
        "Strengthen friendships",
        "Increase meaningful conversations",
        "Expand social support",
      ],

      reflectionQuestion:
        "What small step could you take this week to strengthen one important relationship?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Significant Loneliness",

      observation:
        "Your responses suggest persistent feelings of loneliness and social disconnection.",

      meaning:
        "Loneliness can affect emotional and physical wellbeing. Reaching out to trusted people or speaking with a mental health professional may help rebuild meaningful connection.",

      strengths: [
        "Shows courage through honest reflection",
        "Has taken an important first step toward understanding personal wellbeing",
      ],

      growthAreas: [
        "Build meaningful relationships",
        "Increase emotional connection",
        "Seek supportive communities",
      ],

      reflectionQuestion:
        "If you felt truly connected to others, what would be different about your daily life?",
    },
  ],
};

export default lonelinessAssessment;