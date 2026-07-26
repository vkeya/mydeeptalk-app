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

export const substanceUseAssessment: AssessmentDefinition = {
  metadata: {
    id: "substance-use",

    slug: "substance-use",

    version: 3,

    title: "Substance Use Assessment",

    description:
      "Reflect on how alcohol or other substances may be affecting your wellbeing, relationships, and daily functioning.",

    category: AssessmentCategory.PhysicalWellbeing,

    estimatedDurationMinutes: 3,

    icon: "shield",

    color: "#D97706",
  },

  wellbeingDimensions: [
    WellbeingDimension.PhysicalHealth,
    WellbeingDimension.EmotionalRegulation,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often do you use alcohol or other substances to cope with stress or difficult emotions?",
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
        "How often do you consume more alcohol or substances than you originally intended?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.PhysicalHealth,
      ],
      weight: 1,
    },

    {
      id: "q3",
      text:
        "How often has substance use affected your work, school, or responsibilities?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.PhysicalHealth,
      ],
      weight: 1,
    },

    {
      id: "q4",
      text:
        "How often has substance use caused tension in your relationships?",
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
        "How often have you tried to reduce or stop using a substance but found it difficult?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.PhysicalHealth,
      ],
      weight: 1,
    },

    {
      id: "q6",
      text:
        "How often do you think about using alcohol or other substances?",
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
        "How often do you continue using a substance despite negative consequences?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.PhysicalHealth,
      ],
      weight: 1,
    },

    {
      id: "q8",
      text:
        "How often do you feel guilty or concerned about your substance use?",
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
        "How often do you feel able to enjoy life without relying on alcohol or other substances?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q10",
      text:
        "Overall, how confident are you in your ability to make healthy choices regarding substance use?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.PhysicalHealth,
      ],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Low Risk of Problematic Substance Use",

      observation:
        "Your responses suggest that substance use is unlikely to be significantly affecting your wellbeing at this time.",

      meaning:
        "You appear to make healthy choices and maintain good control over alcohol or other substance use.",

      strengths: [
        "Healthy coping strategies",
        "Good self-control",
        "Positive lifestyle habits",
      ],

      growthAreas: [
        "Continue using healthy coping strategies",
        "Maintain awareness of your wellbeing",
      ],

      reflectionQuestion:
        "What healthy habits help you cope with stress without relying on alcohol or other substances?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Risk of Problematic Substance Use",

      observation:
        "Your responses suggest that alcohol or substance use may occasionally be affecting your wellbeing or daily life.",

      meaning:
        "Reflecting on your coping strategies and considering healthier alternatives may help reduce future risks.",

      strengths: [
        "Growing self-awareness",
        "Willingness to reflect honestly",
      ],

      growthAreas: [
        "Develop healthier coping skills",
        "Reduce reliance on substances",
        "Strengthen emotional wellbeing",
      ],

      reflectionQuestion:
        "What situations are most likely to lead you toward alcohol or substance use, and what healthier alternative could you try instead?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "High Risk of Problematic Substance Use",

      observation:
        "Your responses suggest that alcohol or substance use may be having a significant impact on your wellbeing and daily life.",

      meaning:
        "Seeking support from trusted people or a qualified healthcare or mental health professional can be an important step toward improving your wellbeing. Recovery is possible, and support is available.",

      strengths: [
        "Shows courage through honest self-reflection",
        "Has taken an important first step toward positive change",
      ],

      growthAreas: [
        "Reduce harmful substance use",
        "Build healthier coping strategies",
        "Strengthen support networks",
        "Improve physical and emotional wellbeing",
      ],

      reflectionQuestion:
        "If substance use no longer influenced your life, what positive changes would you hope to experience first?",
    },
  ],
};

export default substanceUseAssessment;