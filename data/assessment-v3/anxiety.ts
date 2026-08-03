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

export const anxietyAssessment: AssessmentDefinition = {
  metadata: {
    id: "anxiety",

    slug: "anxiety",

    version: 3,

    title: "Anxiety Self-Assessment",

    description:
      "Understand your current anxiety levels and identify areas where emotional support may help.",

    category: AssessmentCategory.MentalWellbeing,

    estimatedDurationMinutes: 2,

    icon: "brain",

    color: "#4F46E5",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",

      text:
        "How often have you felt nervous, anxious, or on edge?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q2",

      text:
        "How often have you found it difficult to control worrying?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q3",

      text:
        "How often have you worried excessively about different things?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q4",

      text:
        "How often have you had difficulty relaxing?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q5",

      text:
        "How often have you felt restless or unable to stay calm?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q6",

      text:
        "How often have you become easily irritated or frustrated?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q7",

      text:
        "How often has anxiety affected your concentration?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q8",

      text:
        "How often have anxiety symptoms affected your daily activities?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q9",

      text:
        "How often have you avoided situations because of anxiety?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],

      weight: 1,
    },

    {
      id: "q10",

      text:
        "How often have you felt overwhelmed by anxious thoughts?",

      options,

      scoringDirection:
        ScoringDirection.Positive,

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

      title: "Low Anxiety Indicators",

      observation:
        "Your responses suggest fewer anxiety indicators at this time.",

      meaning:
        "Continue maintaining healthy coping habits and emotional wellbeing practices.",

      strengths: [
        "Good emotional awareness",
        "Healthy coping habits",
        "Emotional stability",
      ],

      growthAreas: [
        "Maintain healthy stress management routines",
      ],

      reflectionQuestion:
        "What routines or habits help you stay calm during challenging moments?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Anxiety Indicators",

      observation:
        "Your responses suggest some anxiety indicators.",

      meaning:
        "Talking with a mental health professional may help you understand your experiences and develop coping strategies.",

      strengths: [
        "Growing self-awareness",
        "Recognises emotional challenges",
      ],

      growthAreas: [
        "Managing anxious thoughts",
        "Building relaxation habits",
        "Reducing daily stress",
      ],

      reflectionQuestion:
        "What situations tend to increase your anxiety, and what has helped you cope in the past?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Higher Anxiety Indicators",

      observation:
        "Your responses suggest stronger anxiety indicators.",

      meaning:
        "Professional support may help you explore these experiences and identify helpful strategies.",

      strengths: [
        "Has taken an important step by completing this assessment",
        "Shows willingness to understand emotional wellbeing",
      ],

      growthAreas: [
        "Managing overwhelming thoughts",
        "Developing healthy coping strategies",
        "Seeking additional support",
      ],

      reflectionQuestion:
        "What has been the most difficult part of managing your anxiety recently, and who can support you through it?",
    },
  ],
};

export default anxietyAssessment;