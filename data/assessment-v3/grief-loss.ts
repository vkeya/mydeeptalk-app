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

export const griefLossAssessment: AssessmentDefinition = {
  metadata: {
    id: "grief-loss",

    slug: "grief-loss",

    version: 3,

    title: "Grief & Loss Assessment",

    description:
      "Explore how grief or loss may be affecting your emotional wellbeing, relationships, and daily life.",

    category: AssessmentCategory.Relationships,

    estimatedDurationMinutes: 2,

    icon: "heart-crack",

    color: "#6366F1",
  },

  wellbeingDimensions: [
    WellbeingDimension.Relationships,
  ],

  questions: [
    {
      id: "q1",
      text:
        "How often do you find yourself thinking about someone or something you have lost?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q2",
      text:
        "How often do feelings of grief make it difficult to enjoy your day?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q3",
      text:
        "How often do you feel emotionally overwhelmed when reminded of your loss?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q4",
      text:
        "How often do you avoid places, people, or memories connected to your loss?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q5",
      text:
        "How often do you feel lonely because of your loss?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q6",
      text:
        "How often do you struggle to accept that the loss has happened?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q7",
      text:
        "How often do you feel that your grief has changed who you are?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q8",
      text:
        "How often does grief affect your relationships with others?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q9",
      text:
        "How often do you feel emotionally stuck after your loss?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Relationships],
      weight: 1,
    },

    {
      id: "q10",
      text:
        "How often do you feel hopeful about healing from your loss?",
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

      title: "Healthy Grief Adjustment",

      observation:
        "Your responses suggest that while loss may still be present, you are adapting in healthy ways.",

      meaning:
        "Grief does not disappear completely, but you appear to be integrating your loss while continuing to move forward.",

      strengths: [
        "Healthy emotional resilience",
        "Growing acceptance",
        "Ability to continue daily life",
      ],

      growthAreas: [
        "Continue honoring your healing journey",
        "Maintain supportive relationships",
      ],

      reflectionQuestion:
        "What positive memories or lessons continue to give you strength as you move forward?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Moderate Grief Impact",

      observation:
        "Your responses suggest that grief continues to affect parts of your emotional wellbeing and daily life.",

      meaning:
        "Healing from loss takes time. Giving yourself permission to grieve while seeking support may help you move toward acceptance.",

      strengths: [
        "Self-awareness",
        "Willingness to acknowledge emotions",
      ],

      growthAreas: [
        "Express emotions safely",
        "Strengthen support systems",
        "Develop healthy coping strategies",
      ],

      reflectionQuestion:
        "What part of your grief feels most difficult to carry today, and who could safely help you carry it?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Significant Grief Impact",

      observation:
        "Your responses suggest that grief is having a substantial impact on your emotional wellbeing and daily functioning.",

      meaning:
        "You do not have to carry grief alone. Support from trusted people or a mental health professional may help you process your loss and gradually rebuild hope.",

      strengths: [
        "Shows courage by acknowledging personal pain",
        "Has taken an important first step toward healing",
      ],

      growthAreas: [
        "Processing unresolved grief",
        "Rebuilding hope",
        "Seeking compassionate support",
      ],

      reflectionQuestion:
        "If healing became possible, what part of your life would you most hope to reclaim?",
    },
  ],
};

export default griefLossAssessment;