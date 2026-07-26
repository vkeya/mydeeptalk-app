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

export const angerManagementAssessment: AssessmentDefinition = {
  metadata: {
    id: "anger-management",

    slug: "anger-management",

    version: 3,

    title: "Anger Management Assessment",

    description:
      "Understand how anger affects your emotions, relationships, and daily life, and identify opportunities to develop healthier responses.",

    category: AssessmentCategory.EmotionalWellbeing,

    estimatedDurationMinutes: 3,

    icon: "flame",

    color: "#EF4444",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often do you become angry more quickly than you would like?",
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
        "How often do you find it difficult to calm yourself after becoming angry?",
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
        "How often do you say things in anger that you later regret?",
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
        "How often has anger negatively affected your relationships?",
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
        "How often do you become physically tense when you are angry?",
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
        "How often do you replay upsetting situations repeatedly in your mind?",
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
        "How often do you feel that your anger controls you instead of you controlling it?",
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
        "How often do you react impulsively when frustrated?",
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
        "How often has anger interfered with your work, family, or personal goals?",
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
        "How often are you able to pause and respond calmly before reacting?",
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

      title: "Healthy Anger Management",

      observation:
        "Your responses suggest that you generally manage anger in healthy and constructive ways.",

      meaning:
        "You appear able to recognize emotional triggers and respond thoughtfully, helping to protect your wellbeing and relationships.",

      strengths: [
        "Healthy emotional regulation",
        "Good self-control",
        "Constructive conflict management",
      ],

      growthAreas: [
        "Continue strengthening emotional awareness",
        "Practice healthy communication skills",
      ],

      reflectionQuestion:
        "Which strategies help you stay calm when you feel frustrated or challenged?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Anger Challenges",

      observation:
        "Your responses suggest that anger occasionally affects your emotions, relationships, or daily life.",

      meaning:
        "Developing additional emotional regulation and communication skills may help you respond more effectively during difficult situations.",

      strengths: [
        "Growing self-awareness",
        "Recognizes emotional triggers",
      ],

      growthAreas: [
        "Pause before reacting",
        "Improve emotional regulation",
        "Strengthen healthy communication",
      ],

      reflectionQuestion:
        "What situations tend to trigger your anger most often, and what healthier response could you practice instead?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Significant Anger Management Challenges",

      observation:
        "Your responses suggest that anger may be having a significant impact on your wellbeing and relationships.",

      meaning:
        "Learning healthier ways to process and express anger can improve relationships, emotional wellbeing, and overall quality of life. Support from a therapist or coach may also be beneficial.",

      strengths: [
        "Shows courage through honest self-reflection",
        "Has taken an important first step toward personal growth",
      ],

      growthAreas: [
        "Develop emotional regulation skills",
        "Manage anger safely",
        "Strengthen healthy relationships",
      ],

      reflectionQuestion:
        "If anger no longer controlled your reactions, what would be different about your relationships and daily life?",
    },
  ],
};

export default angerManagementAssessment;