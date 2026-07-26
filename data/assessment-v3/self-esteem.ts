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

export const selfEsteemAssessment: AssessmentDefinition = {
  metadata: {
    id: "self-esteem",

    slug: "self-esteem",

    version: 3,

    title: "Self-Esteem Assessment",

    description:
      "Explore how you see yourself, your confidence, and your sense of self-worth.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 2,

    icon: "sparkles",

    color: "#8B5CF6",
  },

  wellbeingDimensions: [
    WellbeingDimension.Identity,
  ],

  questions: [
    {
      id: "q1",
      text: "I feel that I am a person of value.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q2",
      text: "I am confident in my abilities.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q3",
      text: "I often doubt myself.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q4",
      text: "I believe I deserve love and respect.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q5",
      text: "I compare myself negatively with other people.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q6",
      text: "I am proud of who I am becoming.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q7",
      text: "I feel comfortable being myself around others.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q8",
      text: "I focus more on my failures than my strengths.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q9",
      text: "I believe I can overcome life's challenges.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q10",
      text: "I accept myself, even when I make mistakes.",
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

      title: "Healthy Self-Esteem",

      observation:
        "Your responses suggest a healthy sense of confidence and self-worth.",

      meaning:
        "You generally recognize your strengths, accept your imperfections, and approach life with confidence.",

      strengths: [
        "Healthy self-confidence",
        "Positive self-image",
        "Emotional resilience",
      ],

      growthAreas: [
        "Continue practicing self-compassion",
        "Support others in building confidence",
      ],

      reflectionQuestion:
        "Which personal qualities are you most grateful for, and how have they shaped your journey?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Self-Esteem",

      observation:
        "Your responses suggest occasional self-doubt and areas where confidence could continue to grow.",

      meaning:
        "Building self-esteem is a gradual process that develops through self-awareness, healthy relationships, and positive experiences.",

      strengths: [
        "Growing self-awareness",
        "Desire for personal growth",
      ],

      growthAreas: [
        "Reduce self-criticism",
        "Build confidence",
        "Practice positive self-talk",
      ],

      reflectionQuestion:
        "If you spoke to yourself the way you encourage someone you love, what would you say today?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Low Self-Esteem Indicators",

      observation:
        "Your responses suggest significant self-doubt and difficulty recognizing your own value.",

      meaning:
        "Many people experience periods of low self-esteem. Learning to challenge negative beliefs and seeking supportive relationships can strengthen confidence over time.",

      strengths: [
        "Shows courage through honest reflection",
        "Has taken an important first step toward growth",
      ],

      growthAreas: [
        "Develop self-worth",
        "Challenge negative self-beliefs",
        "Build supportive relationships",
      ],

      reflectionQuestion:
        "What belief about yourself would you most like to replace with something healthier and more compassionate?",
    },
  ],
};

export default selfEsteemAssessment;