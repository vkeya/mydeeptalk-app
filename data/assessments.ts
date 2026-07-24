import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";


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

  // Existing fields
  level: string;
  message: string;

  // Assessment 2.0
  wellbeingDimension?: WellbeingDimension;

  strengths?: string[];

  growthAreas?: string[];

  reflectionPrompt?: string;

  recommendedJourney?: string;

  nextAction?:
    | "journal"
    | "journey"
    | "therapist"
    | "assessment";
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

    duration: "2 minutes",


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

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Good emotional awareness",
    "Healthy coping habits",
    "Emotional stability",
  ],

  growthAreas: [
    "Maintain healthy stress management routines",
  ],

  reflectionPrompt:
    "What routines or habits help you stay calm during challenging moments?",

  recommendedJourney: "meeting-yourself",

  nextAction: "journey",
},

      {
  minScore: 10,
  maxScore: 19,

  level: "Moderate Anxiety Indicators",

  message:
    "Your responses suggest some anxiety indicators. Talking with a mental health professional may help you understand your experiences and develop coping strategies.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Growing self-awareness",
    "Recognises emotional challenges",
  ],

  growthAreas: [
    "Managing anxious thoughts",
    "Building relaxation habits",
    "Reducing daily stress",
  ],

  reflectionPrompt:
    "What situations tend to increase your anxiety, and what has helped you cope in the past?",

  recommendedJourney: "meeting-yourself",

  nextAction: "journal",
},

      {
  minScore: 20,
  maxScore: 30,

  level: "Higher Anxiety Indicators",

  message:
    "Your responses suggest stronger anxiety indicators. Professional support may help you explore these experiences and identify helpful strategies.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Has taken an important step by completing this assessment",
    "Shows willingness to understand emotional wellbeing",
  ],

  growthAreas: [
    "Managing overwhelming thoughts",
    "Developing healthy coping strategies",
    "Seeking additional support",
  ],

  reflectionPrompt:
    "What has been the most difficult part of managing your anxiety recently, and who can support you through it?",

  recommendedJourney: "meeting-yourself",

  nextAction: "therapist",
},

    ],

  },



  {
    id: "burnout",

    title: "Burnout Self-Assessment",

    description:
      "Evaluate emotional exhaustion, stress levels, and work-life balance concerns.",

    category: "Work & Lifestyle",

    duration: "2 minutes",


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
    "Your responses suggest that you are managing stress reasonably well and maintaining a healthy balance between responsibilities and recovery.",

  wellbeingDimension: WellbeingDimension.Resilience,

  strengths: [
    "Healthy work-life balance",
    "Good recovery habits",
    "Positive resilience",
  ],

  growthAreas: [
    "Maintain healthy boundaries",
    "Continue prioritising rest and recovery",
  ],

  reflectionPrompt:
    "What routines help you stay energised and prevent stress from building up?",

  recommendedJourney: "resilience-strength",

  nextAction: "journey",
},

      {
  minScore: 10,
  maxScore: 19,

  level: "Moderate Burnout Indicators",

  message:
    "Your responses suggest increasing levels of stress and emotional exhaustion. Small changes to your workload, boundaries, and self-care may help prevent further burnout.",

  wellbeingDimension: WellbeingDimension.Resilience,

  strengths: [
    "Recognises signs of stress",
    "Open to improving wellbeing",
  ],

  growthAreas: [
    "Managing workload",
    "Setting healthy boundaries",
    "Improving recovery time",
  ],

  reflectionPrompt:
    "Which responsibilities leave you feeling most emotionally drained, and what support could help lighten that load?",

  recommendedJourney: "resilience-strength",

  nextAction: "journal",
},

      {
  minScore: 20,
  maxScore: 30,

  level: "Higher Burnout Indicators",

  message:
    "Your responses suggest significant burnout indicators. Emotional exhaustion may be affecting several areas of your life. Professional support, together with intentional rest and recovery, may help you regain balance.",

  wellbeingDimension: WellbeingDimension.Resilience,

  strengths: [
    "Has taken an important step by completing this assessment",
    "Shows willingness to understand personal wellbeing",
  ],

  growthAreas: [
    "Recovering from emotional exhaustion",
    "Reducing chronic stress",
    "Building sustainable self-care habits",
  ],

  reflectionPrompt:
    "If you could remove one major source of stress from your life today, what would it be and why?",

  recommendedJourney: "resilience-strength",

  nextAction: "therapist",
},

    ],

  },



  {
    id: "substance-use",

    title: "Substance Use Self-Assessment",

    description:
      "Reflect on patterns that may indicate your relationship with substances and whether additional support may help.",

    category: "Recovery & Support",

    duration: "2 minutes",


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
    "Your responses suggest that substance use is not currently causing significant concerns in your life. Continuing healthy coping strategies and self-awareness can help maintain your wellbeing.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Healthy decision-making",
    "Good self-awareness",
    "Positive coping habits",
  ],

  growthAreas: [
    "Continue building healthy stress-management habits",
    "Maintain supportive relationships",
  ],

  reflectionPrompt:
    "What healthy habits or relationships help you cope with stress without relying on substances?",

  recommendedJourney: "healing-from-the-past",

  nextAction: "journey",
},

      {
  minScore: 10,
  maxScore: 19,

  level: "Possible Risk Indicators",

  message:
    "Your responses suggest some patterns that may benefit from reflection. Understanding the situations or emotions connected to substance use can help you make healthier choices and seek support if needed.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Shows willingness to reflect",
    "Recognises areas for personal growth",
  ],

  growthAreas: [
    "Developing healthier coping strategies",
    "Managing emotional triggers",
    "Strengthening support networks",
  ],

  reflectionPrompt:
    "What emotions, situations, or life experiences most often influence your desire to use alcohol or other substances?",

  recommendedJourney: "healing-from-the-past",

  nextAction: "journal",
},

      {
  minScore: 20,
  maxScore: 30,

  level: "Higher Concern Indicators",

  message:
    "Your responses suggest that substance use may be having a significant impact on your wellbeing. You do not have to face these challenges alone. Speaking with a qualified mental health professional or recovery specialist can provide guidance, support, and practical strategies for moving forward.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Has taken an important first step by completing this assessment",
    "Demonstrates openness to understanding personal wellbeing",
  ],

  growthAreas: [
    "Addressing underlying emotional challenges",
    "Building healthier coping strategies",
    "Seeking professional and community support",
  ],

  reflectionPrompt:
    "If your relationship with substances no longer controlled your choices, what would you hope your life would look like one year from now?",

  recommendedJourney: "healing-from-the-past",

  nextAction: "therapist",
},

    ],

  },
  
  {
  id: "depression",

  title: "Depression Self-Assessment",

  description:
    "Reflect on your mood, motivation, and emotional wellbeing to better understand whether symptoms associated with depression may be affecting your daily life.",

  category: "Mental Wellness",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often have you felt little interest or pleasure in doing things?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often have you felt down, sad, or hopeless?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often have you found it difficult to enjoy activities you usually like?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often have you struggled to find motivation for everyday tasks?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often have you felt tired or lacked energy, even after resting?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often have you felt negatively about yourself or your abilities?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often have you found it difficult to concentrate on tasks or conversations?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often have your emotions made it difficult to carry out your daily responsibilities?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often have you withdrawn from family, friends, or activities because of how you were feeling?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "How often have you felt that life has been emotionally overwhelming?",
      options: standardOptions,
    },
  ],

  results: [
    // Assessment 2.0 result levels go here
	{
  minScore: 0,
  maxScore: 9,

  level: "Low Depression Indicators",

  message:
    "Your responses suggest relatively few indicators of depression at this time. While everyone experiences periods of sadness or low motivation, you appear to have emotional resources that are supporting your wellbeing.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Maintains emotional balance",
    "Healthy coping strategies",
    "Positive emotional awareness",
  ],

  growthAreas: [
    "Continue nurturing emotional wellbeing",
    "Maintain meaningful relationships and healthy routines",
  ],

  reflectionPrompt:
    "What habits, relationships, or daily practices help you maintain emotional wellbeing even during difficult seasons?",

  recommendedJourney: "meeting-yourself",

  nextAction: "journey",
},

{
  minScore: 10,
  maxScore: 19,

  level: "Moderate Depression Indicators",

  message:
    "Your responses suggest signs of emotional distress that may be affecting your mood, motivation, or daily life. Taking time to understand these experiences and seeking support can be an important step toward healing.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Shows self-awareness by completing this assessment",
    "Open to understanding emotional wellbeing",
  ],

  growthAreas: [
    "Managing persistent low mood",
    "Rebuilding motivation and daily routines",
    "Strengthening emotional support systems",
  ],

  reflectionPrompt:
    "When did you first notice these changes in your mood, and what life experiences may have contributed to them?",

  recommendedJourney: "healing-from-the-past",

  nextAction: "journal",
},

{
  minScore: 20,
  maxScore: 30,

  level: "Higher Depression Indicators",

  message:
    "Your responses suggest significant indicators of depression that may be affecting multiple areas of your life. You deserve support, and speaking with a qualified mental health professional can help you better understand your experiences and develop a path toward recovery. Healing is possible, and you do not have to face this alone.",

  wellbeingDimension: WellbeingDimension.EmotionalRegulation,

  strengths: [
    "Has taken an important first step by completing this assessment",
    "Demonstrates courage and willingness to understand personal wellbeing",
  ],

  growthAreas: [
    "Managing persistent emotional distress",
    "Rebuilding hope and daily functioning",
    "Seeking professional and personal support",
  ],

  reflectionPrompt:
    "If your emotional burden became lighter over the next few months, what is the first positive change you would hope to see in your life?",

  recommendedJourney: "healing-from-the-past",

  nextAction: "therapist",
}
  ],
},

{
  id: "stress",

  title: "Stress Self-Assessment",

  description:
    "Reflect on how stress may be affecting your thoughts, emotions, physical wellbeing, and daily life.",

  category: "Mental Wellness",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often have you felt overwhelmed by your daily responsibilities?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often have you found it difficult to relax or switch off?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often have you felt under constant pressure?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often has stress affected your sleep or ability to rest?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often have you felt physically tense or exhausted because of stress?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often has stress affected your ability to concentrate?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often has stress affected your relationships with others?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often have you felt you had too many demands and too little time?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often have you felt unable to cope with everything expected of you?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "How often have you felt you needed additional support to manage stress?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Low Stress Indicators",

      message:
        "Your responses suggest that you are managing everyday stress well. Maintaining healthy routines and positive coping strategies can help you continue protecting your wellbeing.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Healthy stress management",
        "Good emotional balance",
        "Positive coping habits",
      ],

      growthAreas: [
        "Continue prioritising rest and recovery",
        "Maintain healthy boundaries",
      ],

      reflectionPrompt:
        "What habits or routines help you remain calm and resilient during busy or demanding periods?",

      recommendedJourney: "resilience-strength",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Moderate Stress Indicators",

      message:
        "Your responses suggest that stress is beginning to affect your daily wellbeing. Identifying your biggest sources of pressure and strengthening healthy coping strategies may help restore balance.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Recognises signs of stress",
        "Open to improving wellbeing",
      ],

      growthAreas: [
        "Managing daily pressure",
        "Improving work-life balance",
        "Building healthy coping habits",
      ],

      reflectionPrompt:
        "Which responsibilities or situations currently contribute most to your stress, and what small change could make them feel more manageable?",

      recommendedJourney: "resilience-strength",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Higher Stress Indicators",

      message:
        "Your responses suggest that stress may be significantly affecting your wellbeing. Taking steps to reduce ongoing pressure and seeking additional support may help you regain balance and protect your emotional and physical health.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Has taken an important step by completing this assessment",
        "Shows willingness to improve personal wellbeing",
      ],

      growthAreas: [
        "Reducing chronic stress",
        "Building sustainable coping strategies",
        "Seeking additional support",
      ],

      reflectionPrompt:
        "If one major source of stress could be reduced over the next month, which one would have the greatest positive impact on your life?",

            recommendedJourney: "resilience-strength",

      nextAction: "therapist",
    },
  ],
},
];