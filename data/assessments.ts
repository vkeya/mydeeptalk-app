export type AssessmentQuestion = {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
};


export type AssessmentResultLevel = {
  minScore: number;
  maxScore: number;
  level: string;
  message: string;
};


export type Assessment = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  questions: AssessmentQuestion[];
  results: AssessmentResultLevel[];
};



const standardOptions = [
  { text: "Not at all", score: 0 },
  { text: "Several days", score: 1 },
  { text: "More than half the days", score: 2 },
  { text: "Nearly every day", score: 3 },
];


export const assessments: Assessment[] = [

  {
    id: "anxiety",

    title: "Anxiety Self-Assessment",

    description:
      "Understand your current anxiety levels and identify areas where emotional support may help.",

    category: "Mental Wellness",

    duration: "10 minutes",


    questions: [

      {
        id: "q1",
        question:
          "How often have you felt nervous, anxious, or on edge?",
        options: standardOptions,
      },

      {
        id: "q2",
        question:
          "How often have you found it difficult to control worrying?",
        options: standardOptions,
      },

      {
        id: "q3",
        question:
          "How often have you worried excessively about different things?",
        options: standardOptions,
      },

      {
        id: "q4",
        question:
          "How often have you had difficulty relaxing?",
        options: standardOptions,
      },

      {
        id: "q5",
        question:
          "How often have you felt restless or unable to stay calm?",
        options: standardOptions,
      },

      {
        id: "q6",
        question:
          "How often have you become easily irritated or frustrated?",
        options: standardOptions,
      },

      {
        id: "q7",
        question:
          "How often has anxiety affected your concentration?",
        options: standardOptions,
      },

      {
        id: "q8",
        question:
          "How often have anxiety symptoms affected your daily activities?",
        options: standardOptions,
      },

      {
        id: "q9",
        question:
          "How often have you avoided situations because of anxiety?",
        options: standardOptions,
      },

      {
        id: "q10",
        question:
          "How often have you felt overwhelmed by anxious thoughts?",
        options: standardOptions,
      },

    ],


    results: [

      {
        minScore: 0,
        maxScore: 9,
        level: "Low Anxiety Indicators",
        message:
          "Your responses suggest fewer anxiety indicators at this time. Continue maintaining healthy coping habits and emotional wellbeing practices.",
      },

      {
        minScore: 10,
        maxScore: 19,
        level: "Moderate Anxiety Indicators",
        message:
          "Your responses suggest some anxiety indicators. Talking with a mental health professional may help you understand your experiences and develop coping strategies.",
      },

      {
        minScore: 20,
        maxScore: 30,
        level: "Higher Anxiety Indicators",
        message:
          "Your responses suggest stronger anxiety indicators. Professional support may help you explore these experiences and identify helpful strategies.",
      },

    ],

  },



  {
    id: "burnout",

    title: "Burnout Self-Assessment",

    description:
      "Evaluate emotional exhaustion, stress levels, and work-life balance concerns.",

    category: "Work & Lifestyle",

    duration: "10 minutes",


    questions: [

      {
        id: "q1",
        question:
          "How often do you feel emotionally exhausted?",
        options: standardOptions,
      },

      {
        id: "q2",
        question:
          "How often do you feel overwhelmed by your responsibilities?",
        options: standardOptions,
      },

      {
        id: "q3",
        question:
          "How often do you feel physically or mentally drained?",
        options: standardOptions,
      },

      {
        id: "q4",
        question:
          "How often do you feel disconnected from your work or activities?",
        options: standardOptions,
      },

      {
        id: "q5",
        question:
          "How often do you struggle to recover after rest?",
        options: standardOptions,
      },

      {
        id: "q6",
        question:
          "How often do you experience reduced motivation?",
        options: standardOptions,
      },

      {
        id: "q7",
        question:
          "How often do you feel your workload is difficult to manage?",
        options: standardOptions,
      },

      {
        id: "q8",
        question:
          "How often does stress affect your relationships?",
        options: standardOptions,
      },

      {
        id: "q9",
        question:
          "How often do you feel unable to maintain work-life balance?",
        options: standardOptions,
      },

      {
        id: "q10",
        question:
          "How often do you feel you need additional support managing stress?",
        options: standardOptions,
      },

    ],


    results: [

      {
        minScore: 0,
        maxScore: 9,
        level: "Low Burnout Indicators",
        message:
          "Your responses suggest that you are currently managing stress relatively well.",
      },

      {
        minScore: 10,
        maxScore: 19,
        level: "Moderate Burnout Indicators",
        message:
          "Your responses suggest possible stress and exhaustion patterns. Reviewing workload, rest, and support systems may help.",
      },

      {
        minScore: 20,
        maxScore: 30,
        level: "Higher Burnout Indicators",
        message:
          "Your responses suggest significant burnout indicators. Professional support may help you explore recovery strategies.",
      },

    ],

  },



  {
    id: "substance-use",

    title: "Substance Use Self-Assessment",

    description:
      "Reflect on patterns that may indicate your relationship with substances and whether additional support may help.",

    category: "Recovery & Support",

    duration: "10 minutes",


    questions: [

      {
        id: "q1",
        question:
          "How often have you felt you should reduce your use of alcohol or substances?",
        options: standardOptions,
      },

      {
        id: "q2",
        question:
          "How often have you found yourself using more than you intended?",
        options: standardOptions,
      },

      {
        id: "q3",
        question:
          "How often has substance use affected your responsibilities?",
        options: standardOptions,
      },

      {
        id: "q4",
        question:
          "How often have you experienced concerns from others about your use?",
        options: standardOptions,
      },

      {
        id: "q5",
        question:
          "How often have you used substances to cope with emotions or stress?",
        options: standardOptions,
      },

      {
        id: "q6",
        question:
          "How often have you found it difficult to stop once you started?",
        options: standardOptions,
      },

      {
        id: "q7",
        question:
          "How often has your use affected relationships?",
        options: standardOptions,
      },

      {
        id: "q8",
        question:
          "How often have you regretted things after using substances?",
        options: standardOptions,
      },

      {
        id: "q9",
        question:
          "How often have you thought about seeking help or support?",
        options: standardOptions,
      },

      {
        id: "q10",
        question:
          "How often has substance use affected your wellbeing?",
        options: standardOptions,
      },

    ],


    results: [

      {
        minScore: 0,
        maxScore: 9,
        level: "Low Concern Indicators",
        message:
          "Your responses indicate fewer concerns related to substance use patterns.",
      },

      {
        minScore: 10,
        maxScore: 19,
        level: "Possible Risk Indicators",
        message:
          "Your responses suggest some patterns that may benefit from reflection and additional support.",
      },

      {
        minScore: 20,
        maxScore: 30,
        level: "Higher Concern Indicators",
        message:
          "Your responses suggest stronger concerns. Speaking with a qualified professional may provide useful support.",
      },

    ],

  },

];