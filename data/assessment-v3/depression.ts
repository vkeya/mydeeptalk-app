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

export const depressionAssessment: AssessmentDefinition = {
  metadata: {
    id: "depression",

    slug: "depression",

    version: 3,

    title: "Depression Self-Assessment",

    description:
      "Reflect on your mood, motivation, and emotional wellbeing to better understand whether symptoms associated with depression may be affecting your daily life.",

    category: AssessmentCategory.MentalWellbeing,

    estimatedDurationMinutes: 2,

    icon: "heart",

    color: "#6366F1",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often have you felt little interest or pleasure in doing things?",
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
        "How often have you felt down, sad, or hopeless?",
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
        "How often have you found it difficult to enjoy activities you usually like?",
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
        "How often have you struggled to find motivation for everyday tasks?",
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
        "How often have you felt tired or lacked energy, even after resting?",
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
        "How often have you felt negatively about yourself or your abilities?",
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
        "How often have you found it difficult to concentrate on tasks or conversations?",
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
        "How often have your emotions made it difficult to carry out your daily responsibilities?",
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
        "How often have you withdrawn from family, friends, or activities because of how you were feeling?",
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
        "How often have you felt that it was difficult to imagine things getting better?",
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

      title: "Low Depression Indicators",

      observation:
        "Your responses suggest relatively few indicators of depression at this time.",

      meaning:
        "While everyone experiences periods of sadness or low motivation, you appear to have emotional resources that are supporting your wellbeing.",

      strengths: [
        "Maintains emotional balance",
        "Healthy coping strategies",
        "Positive emotional awareness",
      ],

      growthAreas: [
        "Continue nurturing emotional wellbeing",
        "Maintain meaningful relationships and healthy routines",
      ],

      reflectionQuestion:
        "What habits, relationships, or daily practices help you maintain emotional wellbeing even during difficult seasons?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Depression Indicators",

      observation:
        "Your responses suggest signs of emotional distress that may be affecting your mood, motivation, or daily life.",

      meaning:
        "Taking time to understand these experiences and seeking support can be an important step toward healing.",

      strengths: [
        "Shows self-awareness by completing this assessment",
        "Open to understanding emotional wellbeing",
      ],

      growthAreas: [
        "Managing persistent low mood",
        "Rebuilding motivation and daily routines",
        "Strengthening emotional support systems",
      ],

      reflectionQuestion:
        "When did you first notice these changes in your mood, and what life experiences may have contributed to them?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Higher Depression Indicators",

      observation:
        "Your responses suggest significant indicators of depression that may be affecting multiple areas of your life.",

      meaning:
        "You deserve support, and speaking with a qualified mental health professional can help you better understand your experiences and develop a path toward recovery. Healing is possible, and you do not have to face this alone.",

      strengths: [
        "Has taken an important first step by completing this assessment",
        "Demonstrates courage and willingness to understand personal wellbeing",
      ],

      growthAreas: [
        "Managing persistent emotional distress",
        "Rebuilding hope and daily functioning",
        "Seeking professional and personal support",
      ],

      reflectionQuestion:
        "If your emotional burden became lighter over the next few months, what is the first positive change you would hope to see in your life?",
    },
  ],
};

export default depressionAssessment;