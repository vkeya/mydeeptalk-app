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

export const socialConnectionAssessment: AssessmentDefinition = {
  metadata: {
    id: "social-connection",

    slug: "social-connection",

    version: 3,

    title: "Social Connection Assessment",

    description:
      "Reflect on your sense of belonging, social support, and connection with others.",

    category: AssessmentCategory.Relationships,

    estimatedDurationMinutes: 3,

    icon: "users",

    color: "#8B5CF6",
  },

  wellbeingDimensions: [
    WellbeingDimension.Relationships,
    WellbeingDimension.Identity,
  ],

  questions: [
    {
      id: "q1",
      text: "I feel that I belong in the communities that matter to me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q2",
      text: "I often feel isolated from other people.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q3",
      text: "I have people I can talk to when life becomes difficult.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q4",
      text: "I avoid social situations because I feel disconnected.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q5",
      text: "I feel accepted for who I am.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q6",
      text: "I struggle to build meaningful friendships.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q7",
      text: "I regularly spend quality time with people who matter to me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q8",
      text: "I feel lonely even when I am around other people.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q9",
      text: "My relationships give me strength and encouragement.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I feel socially connected and supported.",
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

      title: "Strong Social Connection",

      observation:
        "Your responses suggest that you experience meaningful relationships and a healthy sense of belonging.",

      meaning:
        "Supportive social connections contribute to resilience, emotional wellbeing, and overall life satisfaction.",

      strengths: [
        "Strong support network",
        "Healthy relationships",
        "Sense of belonging",
        "Positive social engagement",
      ],

      growthAreas: [
        "Continue investing in meaningful relationships",
        "Support others within your community",
      ],

      reflectionQuestion:
        "Which relationship makes you feel most accepted and valued, and why?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Social Connection",

      observation:
        "Your responses suggest that you have some meaningful relationships but may occasionally experience loneliness or disconnection.",

      meaning:
        "Strengthening communication, seeking supportive communities, and nurturing friendships can improve your sense of belonging.",

      strengths: [
        "Growing self-awareness",
        "Potential for stronger relationships",
      ],

      growthAreas: [
        "Deepen existing relationships",
        "Increase social engagement",
        "Strengthen support networks",
      ],

      reflectionQuestion:
        "What small step could help you feel more connected to someone this week?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Social Connection Needs Attention",

      observation:
        "Your responses suggest that loneliness or social disconnection may be affecting your wellbeing.",

      meaning:
        "Building meaningful relationships takes time, but even small steps toward connection can improve emotional wellbeing and resilience.",

      strengths: [
        "Shows honest self-reflection",
        "Has taken the first step toward stronger connection",
      ],

      growthAreas: [
        "Reduce social isolation",
        "Build supportive relationships",
        "Increase sense of belonging",
        "Strengthen communication",
      ],

      reflectionQuestion:
        "If you felt truly connected to others one year from now, what would be different in your daily life?",
    },
  ],
};

export default socialConnectionAssessment;