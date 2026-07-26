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

export const mindfulnessAssessment: AssessmentDefinition = {
  metadata: {
    id: "mindfulness",

    slug: "mindfulness",

    version: 3,

    title: "Mindfulness Assessment",

    description:
      "Explore your ability to stay present, regulate your attention, and respond to life with awareness rather than reacting automatically.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "lotus",

    color: "#14B8A6",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
    WellbeingDimension.Identity,
  ],

  questions: [
    {
      id: "q1",
      text: "I am aware of my thoughts without immediately reacting to them.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q2",
      text: "My mind is constantly occupied by worries about the past or future.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q3",
      text: "I intentionally slow down and notice what is happening around me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q4",
      text: "Stress causes me to react without thinking.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q5",
      text: "I can recognize my emotions as they arise.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q6",
      text: "I find it difficult to stay focused on the present moment.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q7",
      text: "I make time to pause, reflect, or breathe during busy days.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q8",
      text: "I often operate on autopilot without noticing what I am doing.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q9",
      text: "I am able to respond thoughtfully rather than react impulsively.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.EmotionalRegulation],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I feel present and engaged in my daily life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Mindfulness",

      observation:
        "Your responses suggest that you are generally present, self-aware, and able to regulate your attention and emotions effectively.",

      meaning:
        "Mindfulness supports emotional wellbeing, healthier decision-making, and resilience during stressful situations.",

      strengths: [
        "Present-moment awareness",
        "Emotional awareness",
        "Intentional living",
        "Healthy self-regulation",
      ],

      growthAreas: [
        "Continue practicing mindful habits",
        "Maintain moments of reflection",
      ],

      reflectionQuestion:
        "Which daily practice helps you feel most grounded and present?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Mindfulness",

      observation:
        "Your responses suggest that you experience moments of mindfulness but may become distracted or reactive during periods of stress.",

      meaning:
        "Regular mindfulness practices can improve emotional regulation, focus, and overall wellbeing over time.",

      strengths: [
        "Growing self-awareness",
        "Potential for meaningful growth",
      ],

      growthAreas: [
        "Increase present-moment awareness",
        "Reduce automatic reactions",
        "Practice intentional reflection",
      ],

      reflectionQuestion:
        "What situations make it hardest for you to stay present, and what could help you pause before reacting?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Mindfulness Needs Strengthening",

      observation:
        "Your responses suggest that stress, distractions, or automatic reactions may be limiting your ability to stay present and emotionally grounded.",

      meaning:
        "Mindfulness is a learnable skill. Small, consistent practices can improve emotional balance, focus, and overall wellbeing.",

      strengths: [
        "Shows honest self-reflection",
        "Has taken an important first step toward greater self-awareness",
      ],

      growthAreas: [
        "Develop mindfulness habits",
        "Strengthen emotional regulation",
        "Improve focus",
        "Respond more intentionally",
      ],

      reflectionQuestion:
        "If you became fully present in your daily life, what positive changes would you notice first?",
    },
  ],
};

export default mindfulnessAssessment;