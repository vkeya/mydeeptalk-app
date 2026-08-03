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

export const burnoutAssessment: AssessmentDefinition = {
  metadata: {
    id: "burnout",

    slug: "burnout",

    version: 3,

    title: "Burnout Self-Assessment",

    description:
      "Explore whether prolonged stress and emotional exhaustion may be affecting your wellbeing, work, or daily life.",

    category: AssessmentCategory.MentalWellbeing,

    estimatedDurationMinutes: 2,

    icon: "flame",

    color: "#F97316",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often have you felt emotionally drained by your daily responsibilities?",
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
        "How often have you felt exhausted before your day even begins?",
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
        "How often have you struggled to stay motivated with work or daily activities?",
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
        "How often have you felt detached from your work, family, or responsibilities?",
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
        "How often have you felt that no matter how hard you work, it is never enough?",
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
        "How often have you become more irritable or impatient because of exhaustion?",
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
        "How often have you found it difficult to concentrate because you feel mentally drained?",
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
        "How often have you neglected your own wellbeing because of your responsibilities?",
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
        "How often have you felt emotionally numb or disconnected from things that once mattered to you?",
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
        "How often have you felt that you simply have nothing left to give emotionally?",
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

      title: "Low Burnout Risk",

      observation:
        "Your responses suggest that you are managing your responsibilities without significant signs of burnout.",

      meaning:
        "You appear to maintain a healthy balance between responsibility, rest, and emotional wellbeing.",

      strengths: [
        "Healthy work-life balance",
        "Good emotional resilience",
        "Maintains healthy energy levels",
      ],

      growthAreas: [
        "Continue prioritizing self-care",
        "Protect healthy boundaries",
      ],

      reflectionQuestion:
        "What routines help you recharge and maintain your emotional energy?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Burnout Risk",

      observation:
        "Your responses suggest that prolonged stress may be beginning to affect your emotional wellbeing and energy.",

      meaning:
        "Taking intentional steps to rest, recover, and rebalance your commitments may prevent burnout from becoming more severe.",

      strengths: [
        "Recognizes personal wellbeing",
        "Shows growing self-awareness",
      ],

      growthAreas: [
        "Improve work-life balance",
        "Develop healthier recovery habits",
        "Reduce prolonged stress exposure",
      ],

      reflectionQuestion:
        "Which responsibilities leave you feeling most emotionally exhausted, and what support could help lighten that load?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "High Burnout Risk",

      observation:
        "Your responses suggest significant signs of emotional exhaustion and burnout.",

      meaning:
        "Burnout can affect your emotional health, relationships, physical wellbeing, and performance. Giving yourself permission to rest and seeking appropriate support can be an important step toward recovery.",

      strengths: [
        "Has taken an important step by recognizing personal wellbeing",
        "Shows willingness to reflect honestly",
      ],

      growthAreas: [
        "Restoring emotional energy",
        "Rebuilding healthy boundaries",
        "Seeking additional personal or professional support",
      ],

      reflectionQuestion:
        "If you had permission to let go of one responsibility for the next month, which would make the greatest difference to your wellbeing?",
    },
  ],
};

export default burnoutAssessment;