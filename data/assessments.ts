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

{
  id: "relationship-satisfaction",

  title: "Relationship Satisfaction Assessment",

  description:
    "Reflect on the quality of your close relationship, including communication, trust, emotional connection, and overall satisfaction.",

  category: "Relationships",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How satisfied are you with communication in your relationship?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you feel emotionally supported by your partner?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How much trust do you feel exists between you and your partner?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you feel appreciated and valued in your relationship?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How comfortable do you feel discussing difficult topics together?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How satisfied are you with the way conflicts are resolved in your relationship?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How emotionally connected do you feel with your partner?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you enjoy spending quality time together?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How hopeful do you feel about the future of your relationship?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how satisfied are you with your relationship?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Strong Relationship Satisfaction",

      message:
        "Your responses suggest a healthy level of satisfaction in your relationship. While no relationship is perfect, you appear to have strengths that support trust, communication, and emotional connection.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Healthy communication",
        "Strong emotional connection",
        "Mutual trust and respect",
      ],

      growthAreas: [
        "Continue investing in quality time",
        "Maintain open communication",
      ],

      reflectionPrompt:
        "What habits or shared experiences have helped strengthen your relationship, and how can you continue nurturing them?",

      recommendedJourney: "love-and-connection",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Moderate Relationship Satisfaction",

      message:
        "Your responses suggest there are strengths within your relationship, alongside areas that may benefit from greater attention. Honest conversations, empathy, and intentional effort can help strengthen connection over time.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Willingness to reflect",
        "Potential for growth",
      ],

      growthAreas: [
        "Improving communication",
        "Strengthening emotional intimacy",
        "Resolving conflict more effectively",
      ],

      reflectionPrompt:
        "What is one change—by either you or your partner—that could make your relationship feel stronger over the next month?",

      recommendedJourney: "love-and-connection",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Relationship Challenges Identified",

      message:
        "Your responses suggest that your relationship may currently be experiencing significant challenges. Relationships can improve with understanding, honest communication, and support. If these difficulties feel overwhelming, speaking with a qualified relationship therapist may help you explore a healthy path forward.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Shows courage by reflecting honestly",
        "Open to understanding relationship wellbeing",
      ],

      growthAreas: [
        "Rebuilding trust",
        "Improving communication",
        "Strengthening emotional safety",
      ],

      reflectionPrompt:
        "If your relationship became healthier six months from now, what would be the biggest difference you would notice in your daily life?",

      recommendedJourney: "love-and-connection",

      nextAction: "therapist",
    },
  ],
},

{
  id: "self-esteem",

  title: "Self-Esteem Assessment",

  description:
    "Reflect on how you view yourself, your sense of self-worth, confidence, and personal value.",

  category: "Self-Discovery",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel confident in your abilities?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you feel proud of who you are?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you compare yourself negatively to others?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you believe you are worthy of love and respect?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you accept compliments or positive feedback about yourself?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do self-critical thoughts affect your confidence?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel capable of overcoming life's challenges?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you feel comfortable expressing your opinions?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you recognise your strengths and achievements?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how positively do you feel about yourself?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Self-Esteem",

      message:
        "Your responses suggest a positive sense of self-worth and confidence. You appear to recognise your strengths while maintaining a balanced perspective about yourself.",

      wellbeingDimension: WellbeingDimension.Identity,

      strengths: [
        "Positive self-worth",
        "Healthy confidence",
        "Recognises personal strengths",
      ],

      growthAreas: [
        "Continue practising self-compassion",
        "Maintain confidence through healthy habits",
      ],

      reflectionPrompt:
        "Which personal qualities are you most grateful for, and how have they helped shape your life?",

      recommendedJourney: "meeting-yourself",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Developing Self-Esteem",

      message:
        "Your responses suggest that your confidence and self-worth may fluctuate. Building greater self-awareness and practising self-compassion can help strengthen your relationship with yourself over time.",

      wellbeingDimension: WellbeingDimension.Identity,

      strengths: [
        "Shows willingness to reflect",
        "Open to personal growth",
      ],

      growthAreas: [
        "Reducing self-criticism",
        "Building confidence",
        "Recognising personal strengths",
      ],

      reflectionPrompt:
        "What negative belief about yourself would you most like to replace with a healthier, more balanced perspective?",

      recommendedJourney: "meeting-yourself",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Low Self-Esteem Indicators",

      message:
        "Your responses suggest that your self-worth may be significantly affecting your confidence and emotional wellbeing. You deserve kindness, including from yourself. Support from a mental health professional can help you build a healthier relationship with yourself.",

      wellbeingDimension: WellbeingDimension.Identity,

      strengths: [
        "Has taken an important step through self-reflection",
        "Shows openness to understanding personal wellbeing",
      ],

      growthAreas: [
        "Building self-worth",
        "Developing self-compassion",
        "Strengthening confidence",
      ],

      reflectionPrompt:
        "If you truly believed you were enough just as you are, what would change in the way you live your life?",

      recommendedJourney: "meeting-yourself",

      nextAction: "therapist",
    },
  ],
},

{
  id: "loneliness",

  title: "Loneliness & Social Connection Assessment",

  description:
    "Reflect on your sense of connection with others, feelings of belonging, and whether loneliness may be affecting your wellbeing.",

  category: "Relationships",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel lonely, even when you are around other people?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you feel that someone truly understands you?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you feel emotionally connected to friends or family?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you avoid social situations because you feel disconnected?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you feel that you belong within your community or social circle?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you have someone you can turn to when life becomes difficult?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you wish you had deeper or more meaningful relationships?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do feelings of loneliness affect your mood?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you make time to connect with people who matter to you?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how connected do you feel to the people around you?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Strong Social Connection",

      message:
        "Your responses suggest that you have meaningful social connections and a healthy sense of belonging. These relationships can be an important source of resilience and emotional wellbeing.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Healthy support network",
        "Sense of belonging",
        "Meaningful relationships",
      ],

      growthAreas: [
        "Continue nurturing important relationships",
        "Maintain regular social connection",
      ],

      reflectionPrompt:
        "Which relationships bring you the greatest sense of belonging, and how can you continue investing in them?",

      recommendedJourney: "love-and-connection",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Occasional Loneliness",

      message:
        "Your responses suggest that you may sometimes feel disconnected from others. Building or strengthening meaningful relationships can improve emotional wellbeing and reduce feelings of isolation.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Recognises the importance of connection",
        "Open to strengthening relationships",
      ],

      growthAreas: [
        "Building deeper friendships",
        "Increasing meaningful social interaction",
        "Strengthening support networks",
      ],

      reflectionPrompt:
        "What kind of relationship or connection are you missing most in your life right now?",

      recommendedJourney: "love-and-connection",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Loneliness Indicators",

      message:
        "Your responses suggest that loneliness may be having a significant impact on your emotional wellbeing. You deserve meaningful connection and support. Speaking with a therapist or trusted person may help you explore ways to reduce isolation and build healthier relationships.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Shows courage through honest self-reflection",
        "Open to understanding emotional wellbeing",
      ],

      growthAreas: [
        "Reducing social isolation",
        "Building supportive relationships",
        "Strengthening emotional connection",
      ],

      reflectionPrompt:
        "If you felt genuinely connected and supported one year from now, what would your relationships look like?",

      recommendedJourney: "love-and-connection",

      nextAction: "therapist",
    },
  ],
},

{
  id: "grief-loss",

  title: "Grief & Loss Assessment",

  description:
    "Reflect on how grief, loss, or major life changes may be affecting your emotional wellbeing and daily life.",

  category: "Healing",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you find yourself thinking about a significant loss?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do feelings of sadness related to your loss affect your day?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you avoid reminders of your loss?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you feel that your loss has changed who you are?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you struggle to accept what has happened?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you feel emotionally overwhelmed when thinking about your loss?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel isolated because of your grief?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often has grief affected your relationships or daily responsibilities?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel hopeful that healing is possible?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how much is grief affecting your life today?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Grieving",

      message:
        "Your responses suggest that while you may still carry memories of your loss, you are finding healthy ways to adapt and continue moving forward. Grief is deeply personal, and healing does not mean forgetting.",

      wellbeingDimension: WellbeingDimension.Healing,

      strengths: [
        "Healthy emotional processing",
        "Growing resilience",
        "Maintaining meaningful connections",
      ],

      growthAreas: [
        "Continue honouring your healing journey",
        "Maintain supportive relationships",
      ],

      reflectionPrompt:
        "What positive memories or lessons continue to give you strength as you move forward?",

      recommendedJourney: "healing-from-the-past",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Ongoing Grief",

      message:
        "Your responses suggest that grief continues to affect parts of your life. Giving yourself permission to grieve while seeking support from trusted people can help you move toward healing at your own pace.",

      wellbeingDimension: WellbeingDimension.Healing,

      strengths: [
        "Acknowledges emotional pain",
        "Shows willingness to heal",
      ],

      growthAreas: [
        "Processing difficult emotions",
        "Reconnecting with supportive people",
        "Practising self-compassion",
      ],

      reflectionPrompt:
        "What part of your loss feels the hardest to carry today, and what support would help lighten that burden?",

      recommendedJourney: "healing-from-the-past",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Grief Impact",

      message:
        "Your responses suggest that grief may be having a significant impact on your emotional wellbeing and daily life. You do not have to carry this burden alone. Speaking with a qualified therapist or grief counsellor can provide compassionate support as you continue your healing journey.",

      wellbeingDimension: WellbeingDimension.Healing,

      strengths: [
        "Has taken a courageous step through self-reflection",
        "Open to understanding personal healing",
      ],

      growthAreas: [
        "Processing unresolved grief",
        "Reducing emotional overwhelm",
        "Building supportive connections",
      ],

      reflectionPrompt:
        "If healing became possible without losing the memories that matter most, what would you hope your life could look like one year from now?",

      recommendedJourney: "healing-from-the-past",

      nextAction: "therapist",
    },
  ],
},

{
  id: "trauma",

  title: "Trauma Recovery Assessment",

  description:
    "Reflect on whether past difficult or distressing experiences may still be affecting your emotions, relationships, and daily life.",

  category: "Healing",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do memories of a difficult experience unexpectedly come to mind?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you avoid people, places, or situations that remind you of a painful experience?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you feel constantly alert or on edge?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you find it difficult to trust other people?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you experience strong emotional reactions that feel difficult to explain?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do difficult past experiences affect your relationships today?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you struggle to feel emotionally safe?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you experience disturbing dreams or unwanted memories?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel that past experiences still influence your daily decisions?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how much are past difficult experiences affecting your life today?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Recovery Indicators",

      message:
        "Your responses suggest that past experiences are not currently having a major impact on your daily wellbeing. Continuing healthy coping strategies and supportive relationships can help maintain resilience.",

      wellbeingDimension: WellbeingDimension.Healing,

      strengths: [
        "Healthy emotional resilience",
        "Positive coping strategies",
        "Growing emotional safety",
      ],

      growthAreas: [
        "Continue practising self-care",
        "Maintain supportive relationships",
      ],

      reflectionPrompt:
        "What personal strengths have helped you move through difficult experiences in your life?",

      recommendedJourney: "healing-from-the-past",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Ongoing Recovery",

      message:
        "Your responses suggest that some past experiences may still influence your emotions or daily life. Healing is rarely linear, and taking time to understand these experiences with compassion can support your recovery.",

      wellbeingDimension: WellbeingDimension.Healing,

      strengths: [
        "Shows self-awareness",
        "Open to healing",
      ],

      growthAreas: [
        "Building emotional safety",
        "Managing emotional triggers",
        "Strengthening coping strategies",
      ],

      reflectionPrompt:
        "What helps you feel safest, most grounded, or most supported when difficult memories or emotions arise?",

      recommendedJourney: "healing-from-the-past",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Trauma Impact",

      message:
        "Your responses suggest that past experiences may still be having a significant impact on your wellbeing. Healing is possible, and you do not have to navigate it alone. Working with a qualified trauma-informed mental health professional may help you process these experiences safely and build a path toward recovery.",

      wellbeingDimension: WellbeingDimension.Healing,

      strengths: [
        "Has taken a courageous step through self-reflection",
        "Shows willingness to pursue healing",
      ],

      growthAreas: [
        "Processing unresolved trauma",
        "Building emotional safety",
        "Strengthening healthy relationships",
      ],

      reflectionPrompt:
        "If your past no longer held the same emotional weight, what would you hope would become possible in your life?",

      recommendedJourney: "healing-from-the-past",

      nextAction: "therapist",
    },
  ],
},

{
  id: "anger-management",

  title: "Anger Management Assessment",

  description:
    "Reflect on how you experience, express, and manage anger in different areas of your life.",

  category: "Emotional Wellness",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel irritated or frustrated by everyday situations?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you find it difficult to stay calm during disagreements?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you say or do things in anger that you later regret?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you struggle to express your anger in healthy ways?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often does anger affect your relationships with others?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you feel your anger is stronger than the situation requires?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you become angry because of unresolved past experiences?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you find it difficult to let go after becoming angry?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel guilty after expressing anger?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how much is anger affecting your daily life?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Emotional Regulation",

      message:
        "Your responses suggest that you generally manage anger in healthy ways. While everyone experiences frustration from time to time, you appear able to recognise and express your emotions constructively.",

      wellbeingDimension: WellbeingDimension.EmotionalRegulation,

      strengths: [
        "Healthy emotional awareness",
        "Constructive communication",
        "Good self-control",
      ],

      growthAreas: [
        "Continue practising healthy emotional expression",
        "Maintain effective coping strategies",
      ],

      reflectionPrompt:
        "What helps you stay calm and respond thoughtfully when you feel frustrated?",

      recommendedJourney: "emotional-regulation",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Developing Emotional Regulation",

      message:
        "Your responses suggest that anger sometimes affects your emotions or relationships. Learning to recognise triggers and respond intentionally can strengthen both your wellbeing and your connections with others.",

      wellbeingDimension: WellbeingDimension.EmotionalRegulation,

      strengths: [
        "Recognises emotional challenges",
        "Open to personal growth",
      ],

      growthAreas: [
        "Managing emotional triggers",
        "Improving conflict resolution",
        "Developing healthy coping skills",
      ],

      reflectionPrompt:
        "What situations most often trigger your anger, and how would you like to respond differently in the future?",

      recommendedJourney: "emotional-regulation",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Anger Management Challenges",

      message:
        "Your responses suggest that anger may be having a significant impact on your wellbeing or relationships. Understanding the emotions beneath anger and seeking support can help you develop healthier ways of responding to life's challenges.",

      wellbeingDimension: WellbeingDimension.EmotionalRegulation,

      strengths: [
        "Shows courage through honest self-reflection",
        "Has taken an important first step toward growth",
      ],

      growthAreas: [
        "Managing intense emotions",
        "Strengthening healthy communication",
        "Building long-term emotional regulation skills",
      ],

      reflectionPrompt:
        "If anger no longer controlled your reactions, what would be different about your relationships and daily life?",

      recommendedJourney: "emotional-regulation",

      nextAction: "therapist",
    },
  ],
},

{
  id: "sleep-wellbeing",

  title: "Sleep Wellbeing Assessment",

  description:
    "Reflect on your sleep habits and whether the quality of your sleep may be affecting your emotional, mental, and physical wellbeing.",

  category: "Wellbeing",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you have difficulty falling asleep?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you wake up during the night and struggle to fall back asleep?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you wake up feeling rested and refreshed?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often does poor sleep affect your mood during the day?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often does tiredness affect your ability to concentrate?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do stress or worries keep you awake at night?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you rely on naps or extra sleep because you feel exhausted?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often does poor sleep affect your relationships or daily responsibilities?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel you get enough quality sleep?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how much is your sleep affecting your wellbeing?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Sleep Habits",

      message:
        "Your responses suggest that you generally maintain healthy sleep habits. Quality sleep is an important foundation for emotional resilience, physical health, and overall wellbeing.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Healthy sleep routine",
        "Good daily recovery",
        "Supports emotional wellbeing",
      ],

      growthAreas: [
        "Maintain consistent sleep habits",
        "Continue prioritising rest and recovery",
      ],

      reflectionPrompt:
        "What evening habits help you achieve restful and restorative sleep?",

      recommendedJourney: "resilience-strength",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Developing Healthier Sleep Habits",

      message:
        "Your responses suggest that your sleep may occasionally affect your wellbeing. Small improvements to your sleep routine and stress management may help you feel more rested and energised.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Recognises the importance of sleep",
        "Open to improving wellbeing",
      ],

      growthAreas: [
        "Improving sleep consistency",
        "Managing nighttime stress",
        "Creating healthy bedtime routines",
      ],

      reflectionPrompt:
        "What changes to your evening routine could help you sleep more consistently?",

      recommendedJourney: "resilience-strength",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Sleep Challenges",

      message:
        "Your responses suggest that sleep difficulties may be significantly affecting your wellbeing. If these challenges continue, speaking with a healthcare or mental health professional may help identify underlying causes and practical strategies for improving your sleep.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Has taken an important step through self-reflection",
        "Shows commitment to improving wellbeing",
      ],

      growthAreas: [
        "Improving sleep quality",
        "Managing stress and anxiety",
        "Building sustainable sleep routines",
      ],

      reflectionPrompt:
        "If you consistently woke up feeling rested every morning, what would become easier or more enjoyable in your life?",

      recommendedJourney: "resilience-strength",

      nextAction: "therapist",
    },
  ],
},

{
  id: "emotional-intelligence",

  title: "Emotional Intelligence Assessment",

  description:
    "Reflect on your ability to understand, manage, and respond to your own emotions and the emotions of others.",

  category: "Personal Growth",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often are you aware of what you are feeling in the moment?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you understand why you feel the way you do?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you stay calm when facing emotionally difficult situations?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you consider how your words or actions affect other people?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you recognise when someone else is struggling emotionally?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you listen to understand rather than simply respond?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you manage conflict without becoming defensive or reactive?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you reflect on your emotional reactions after challenging situations?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you adapt your communication based on another person's feelings or perspective?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how emotionally aware and emotionally balanced do you feel?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Strong Emotional Intelligence",

      message:
        "Your responses suggest a healthy level of emotional awareness and emotional intelligence. You appear able to recognise your emotions, understand others, and respond thoughtfully in many situations.",

      wellbeingDimension: WellbeingDimension.EmotionalRegulation,

      strengths: [
        "Strong self-awareness",
        "Healthy emotional regulation",
        "Empathy for others",
      ],

      growthAreas: [
        "Continue strengthening emotional awareness",
        "Support others through compassionate communication",
      ],

      reflectionPrompt:
        "Which emotional strength has helped you most in building healthy relationships?",

      recommendedJourney: "meeting-yourself",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Developing Emotional Intelligence",

      message:
        "Your responses suggest opportunities to strengthen emotional awareness and communication. Greater self-reflection and intentional emotional regulation can improve both personal wellbeing and relationships.",

      wellbeingDimension: WellbeingDimension.EmotionalRegulation,

      strengths: [
        "Open to personal growth",
        "Developing self-awareness",
      ],

      growthAreas: [
        "Managing emotional reactions",
        "Building empathy",
        "Improving communication",
      ],

      reflectionPrompt:
        "What emotional reaction would you most like to understand or manage differently in future situations?",

      recommendedJourney: "meeting-yourself",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Growth Opportunity",

      message:
        "Your responses suggest that strengthening emotional awareness and regulation may positively affect several areas of your life. Working with a therapist or coach can help you develop practical skills for understanding emotions, improving relationships, and responding more intentionally.",

      wellbeingDimension: WellbeingDimension.EmotionalRegulation,

      strengths: [
        "Shows willingness to reflect honestly",
        "Has taken an important step toward personal growth",
      ],

      growthAreas: [
        "Building self-awareness",
        "Strengthening emotional regulation",
        "Developing healthier relationships",
      ],

      reflectionPrompt:
        "If you became more aware of your emotions and responded with confidence and calm, how would your relationships and daily life be different?",

      recommendedJourney: "meeting-yourself",

      nextAction: "therapist",
    },
  ],
},

{
  id: "life-satisfaction",

  title: "Life Satisfaction Assessment",

  description:
    "Reflect on how satisfied you feel with different areas of your life, including relationships, purpose, wellbeing, and personal growth.",

  category: "Overall Wellbeing",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How satisfied are you with your life overall?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you feel your life has meaning and direction?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How satisfied are you with your relationships?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How satisfied are you with your emotional wellbeing?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How satisfied are you with your physical health and energy?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you feel hopeful about your future?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel you are becoming the person you want to be?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you experience joy, gratitude, or contentment?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How satisfied are you with the balance between your responsibilities and personal life?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how fulfilled do you currently feel with your life?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "High Life Satisfaction",

      message:
        "Your responses suggest that you experience a healthy sense of fulfilment across many areas of your life. Continuing to invest in your wellbeing, relationships, and personal growth can help sustain this positive foundation.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Positive outlook",
        "Healthy life balance",
        "Strong sense of fulfilment",
      ],

      growthAreas: [
        "Continue investing in meaningful relationships",
        "Maintain habits that support long-term wellbeing",
      ],

      reflectionPrompt:
        "Which area of your life brings you the greatest sense of fulfilment, and how can you continue nurturing it?",

      recommendedJourney: "purpose-future-self",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Growing Life Satisfaction",

      message:
        "Your responses suggest there are meaningful strengths in your life alongside areas that could become more fulfilling. Small, intentional changes can have a significant impact over time.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Self-awareness",
        "Desire for growth",
      ],

      growthAreas: [
        "Clarifying priorities",
        "Creating healthier balance",
        "Strengthening purpose and fulfilment",
      ],

      reflectionPrompt:
        "If you could improve one area of your life over the next six months, which would have the greatest positive impact?",

      recommendedJourney: "purpose-future-self",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Low Life Satisfaction",

      message:
        "Your responses suggest that several areas of your life may currently feel unfulfilling or overwhelming. Remember that life satisfaction can change over time, and support is available. Exploring these experiences with a qualified mental health professional may help you identify meaningful steps toward a more fulfilling life.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Has taken an important step through honest reflection",
        "Open to creating positive change",
      ],

      growthAreas: [
        "Clarifying life direction",
        "Improving overall wellbeing",
        "Building a more fulfilling future",
      ],

      reflectionPrompt:
        "Imagine your life one year from now feeling deeply meaningful and fulfilling. What would be different, and what is one small step you could begin today?",

      recommendedJourney: "purpose-future-self",

      nextAction: "therapist",
    },
  ],
},

{
  id: "purpose-meaning",

  title: "Purpose & Meaning Assessment",

  description:
    "Reflect on your sense of purpose, personal direction, and whether your daily life feels meaningful and aligned with your values.",

  category: "Purpose",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel your life has a clear sense of purpose?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do your daily activities feel meaningful to you?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do your choices reflect your personal values?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you feel motivated about your future?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you feel you are becoming the person you want to be?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you feel your work, studies, or responsibilities contribute to something meaningful?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel excited about what lies ahead in your life?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you reflect on what truly matters to you?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel your life is moving in the direction you want?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how meaningful does your life currently feel?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Strong Sense of Purpose",

      message:
        "Your responses suggest that you have a clear sense of purpose and meaning in your life. Feeling connected to your values and long-term goals can provide resilience during both challenges and opportunities.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Clear personal direction",
        "Strong sense of meaning",
        "Values-driven decision making",
      ],

      growthAreas: [
        "Continue living intentionally",
        "Keep investing in meaningful goals",
      ],

      reflectionPrompt:
        "What gives your life the greatest sense of meaning, and how can you continue building on it?",

      recommendedJourney: "purpose-future-self",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Developing Purpose",

      message:
        "Your responses suggest that you are still exploring what gives your life meaning. This is a normal part of personal growth. Clarifying your values and long-term vision can help strengthen your sense of direction.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Open to self-discovery",
        "Curious about personal growth",
      ],

      growthAreas: [
        "Clarifying personal values",
        "Setting meaningful goals",
        "Creating intentional daily habits",
      ],

      reflectionPrompt:
        "If you looked back on your life ten years from now, what would make you feel proud of how you lived?",

      recommendedJourney: "purpose-future-self",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Searching for Meaning",

      message:
        "Your responses suggest that you may currently feel uncertain about your purpose or direction in life. Many people experience seasons like this. Exploring your values, strengths, and hopes with trusted support can help you rediscover meaning and build a fulfilling future.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Shows courage through honest reflection",
        "Open to discovering new possibilities",
      ],

      growthAreas: [
        "Clarifying life direction",
        "Building hope for the future",
        "Living with greater intention",
      ],

      reflectionPrompt:
        "If fear and uncertainty were no longer holding you back, what kind of life would you choose to build?",

      recommendedJourney: "purpose-future-self",

      nextAction: "therapist",
    },
  ],
},

{
  id: "work-life-balance",

  title: "Work-Life Balance Assessment",

  description:
    "Reflect on how well you balance your work, responsibilities, personal life, and time for rest and renewal.",

  category: "Lifestyle",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel you have enough time for yourself outside of work or responsibilities?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often does work or study interfere with your personal life?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you feel overwhelmed by your responsibilities?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you make time for hobbies or activities you enjoy?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you feel guilty when taking time to rest?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you feel emotionally present with family or friends?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you end your day feeling mentally or physically exhausted?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you set healthy boundaries around your time and energy?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel your current lifestyle is sustainable long-term?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how satisfied are you with your work-life balance?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Work-Life Balance",

      message:
        "Your responses suggest that you maintain a healthy balance between your responsibilities, relationships, and personal wellbeing. This balance can support long-term resilience and life satisfaction.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Healthy personal boundaries",
        "Balanced lifestyle",
        "Prioritises rest and recovery",
      ],

      growthAreas: [
        "Continue protecting your personal time",
        "Maintain healthy routines",
      ],

      reflectionPrompt:
        "Which daily habits help you maintain a healthy balance between achievement and wellbeing?",

      recommendedJourney: "resilience-strength",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Balance Needs Attention",

      message:
        "Your responses suggest that your responsibilities may sometimes outweigh the time you dedicate to yourself and the people who matter most. Small adjustments to your priorities and boundaries can improve your overall wellbeing.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Recognises the importance of balance",
        "Open to positive change",
      ],

      growthAreas: [
        "Setting healthy boundaries",
        "Creating time for rest",
        "Improving work-life balance",
      ],

      reflectionPrompt:
        "What is one responsibility you could approach differently to create more space for rest, relationships, or personal growth?",

      recommendedJourney: "resilience-strength",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Work-Life Imbalance",

      message:
        "Your responses suggest that your current lifestyle may be placing considerable pressure on your wellbeing. Finding a healthier balance and seeking support where needed can help reduce stress and create a more sustainable way of living.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Shows honest self-reflection",
        "Committed to improving wellbeing",
      ],

      growthAreas: [
        "Reducing chronic stress",
        "Creating healthier boundaries",
        "Prioritising rest and recovery",
      ],

      reflectionPrompt:
        "If your life felt balanced six months from now, what would your typical day look like, and what is one step you can take toward that vision today?",

      recommendedJourney: "resilience-strength",

      nextAction: "therapist",
    },
  ],
},

{
  id: "financial-wellbeing",

  title: "Financial Wellbeing Assessment",

  description:
    "Reflect on how your financial situation affects your emotional wellbeing, daily life, and sense of security.",

  category: "Lifestyle",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do financial concerns cause you stress or anxiety?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you feel confident managing your finances?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do financial worries affect your sleep?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do financial pressures affect your relationships?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you feel in control of your spending habits?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you worry about meeting your financial obligations?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do financial concerns prevent you from enjoying life?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you feel hopeful about your financial future?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you have a financial plan or budget that you follow?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how much does your financial situation affect your wellbeing?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Financial Wellbeing",

      message:
        "Your responses suggest that you generally feel financially secure and able to manage your financial responsibilities. Maintaining healthy financial habits can continue supporting your overall wellbeing.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Healthy financial awareness",
        "Sense of financial security",
        "Positive planning habits",
      ],

      growthAreas: [
        "Continue building long-term financial resilience",
        "Maintain healthy financial habits",
      ],

      reflectionPrompt:
        "What financial habit has contributed most to your sense of security, and how can you continue strengthening it?",

      recommendedJourney: "resilience-strength",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Financial Wellbeing Needs Attention",

      message:
        "Your responses suggest that financial concerns may sometimes affect your wellbeing. Developing practical financial habits and seeking guidance where needed may help reduce stress and increase confidence.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Recognises financial challenges",
        "Open to positive change",
      ],

      growthAreas: [
        "Financial planning",
        "Managing financial stress",
        "Building financial confidence",
      ],

      reflectionPrompt:
        "What is one financial change that would make the biggest positive difference in your life over the next year?",

      recommendedJourney: "resilience-strength",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Financial Stress",

      message:
        "Your responses suggest that financial concerns may be having a significant impact on your emotional wellbeing. Financial stress is common and support is available. Exploring practical financial planning alongside emotional support may help you regain a greater sense of stability and hope.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Shows honesty through self-reflection",
        "Committed to improving wellbeing",
      ],

      growthAreas: [
        "Reducing financial stress",
        "Building financial stability",
        "Strengthening emotional resilience",
      ],

      reflectionPrompt:
        "If financial stress were no longer a daily concern, what opportunities or goals would you most want to pursue?",

      recommendedJourney: "resilience-strength",

      nextAction: "therapist",
    },
  ],
},

{
  id: "parenting-wellbeing",

  title: "Parenting Wellbeing Assessment",

  description:
    "Reflect on your experience as a parent or caregiver, including your confidence, emotional wellbeing, and relationship with your child or children.",

  category: "Family",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel confident in your parenting decisions?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do you feel emotionally overwhelmed by parenting responsibilities?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you enjoy spending meaningful time with your child or children?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you feel supported in your parenting journey?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you feel guilty about your parenting?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do parenting responsibilities affect your own wellbeing?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often are you able to stay calm during challenging parenting moments?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you feel emotionally connected with your child or children?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you make time to care for your own wellbeing as a parent?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how satisfied do you feel with your parenting journey?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Parenting Wellbeing",

      message:
        "Your responses suggest that you have a positive relationship with your parenting role and are balancing your child's needs with your own wellbeing. Remember that no parent is perfect, and continuing to care for yourself is an important part of caring for your family.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Positive parent-child connection",
        "Healthy emotional awareness",
        "Balanced parenting approach",
      ],

      growthAreas: [
        "Continue investing in family relationships",
        "Maintain healthy self-care habits",
      ],

      reflectionPrompt:
        "Which parenting moments bring you the greatest joy, and how can you create more of them?",

      recommendedJourney: "love-and-connection",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Parenting Wellbeing Needs Attention",

      message:
        "Your responses suggest that parenting can sometimes feel emotionally demanding. Seeking support, practising self-compassion, and making space for your own wellbeing can strengthen both you and your family.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Committed to your family",
        "Open to learning and growing",
      ],

      growthAreas: [
        "Managing parenting stress",
        "Strengthening family communication",
        "Prioritising self-care",
      ],

      reflectionPrompt:
        "What is one small change that could make parenting feel more joyful or less overwhelming this week?",

      recommendedJourney: "love-and-connection",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Parenting Challenges",

      message:
        "Your responses suggest that parenting may currently be placing significant demands on your emotional wellbeing. Remember that asking for support is a sign of strength. Speaking with a therapist, parenting coach, or trusted support network may help you navigate these challenges with greater confidence and compassion.",

      wellbeingDimension: WellbeingDimension.Relationships,

      strengths: [
        "Shows courage through honest reflection",
        "Committed to being the best parent possible",
      ],

      growthAreas: [
        "Reducing parenting stress",
        "Strengthening emotional resilience",
        "Building supportive relationships",
      ],

      reflectionPrompt:
        "If parenting felt calmer and more connected six months from now, what would be the biggest positive difference for you and your family?",

      recommendedJourney: "love-and-connection",

      nextAction: "therapist",
    },
  ],
},

{
  id: "academic-wellbeing",

  title: "Academic Wellbeing Assessment",

  description:
    "Reflect on how your academic responsibilities are affecting your motivation, confidence, stress levels, and overall wellbeing.",

  category: "Education",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel motivated to study or attend classes?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do academic demands leave you feeling overwhelmed?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How confident do you feel in your ability to succeed academically?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you struggle to concentrate while studying?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you worry about your academic performance?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you maintain a healthy balance between studying and personal wellbeing?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel supported by teachers, lecturers, classmates, or family in your academic journey?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do academic pressures affect your sleep or emotional wellbeing?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel proud of the effort you put into your learning?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how satisfied are you with your academic wellbeing?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Academic Wellbeing",

      message:
        "Your responses suggest that you have a healthy relationship with your studies and are managing academic responsibilities well. Continue balancing learning with rest, relationships, and self-care.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Healthy learning habits",
        "Positive academic confidence",
        "Good work-life balance",
      ],

      growthAreas: [
        "Continue maintaining healthy study routines",
        "Protect your wellbeing during busy periods",
      ],

      reflectionPrompt:
        "What learning habits help you stay motivated while maintaining your wellbeing?",

      recommendedJourney: "resilience-strength",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Academic Wellbeing Needs Attention",

      message:
        "Your responses suggest that academic pressures may sometimes affect your wellbeing. Developing healthy study habits, asking for support when needed, and maintaining balance can help you thrive both academically and personally.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Committed to learning",
        "Open to personal growth",
      ],

      growthAreas: [
        "Managing academic stress",
        "Building confidence",
        "Improving study-life balance",
      ],

      reflectionPrompt:
        "What is one change that could make your academic journey feel healthier and more sustainable?",

      recommendedJourney: "resilience-strength",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Significant Academic Stress",

      message:
        "Your responses suggest that academic responsibilities may currently be having a significant impact on your wellbeing. Seeking support from trusted teachers, family members, counsellors, or mental health professionals can help you manage these challenges while continuing your education.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Shows courage through honest reflection",
        "Committed to personal growth",
      ],

      growthAreas: [
        "Managing academic pressure",
        "Building resilience",
        "Seeking support when needed",
      ],

      reflectionPrompt:
        "If your academic life felt balanced and fulfilling one semester from now, what would be the biggest difference you would notice?",

      recommendedJourney: "resilience-strength",

      nextAction: "therapist",
    },
  ],
},

{
  id: "spiritual-wellbeing",

  title: "Spiritual Wellbeing Assessment",

  description:
    "Reflect on your sense of inner peace, hope, meaning, connection, and spiritual wellbeing, whether through faith, personal beliefs, or life purpose.",

  category: "Spiritual Wellbeing",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you feel a sense of peace within yourself?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do your beliefs or values help you navigate difficult times?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you feel connected to something greater than yourself?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do you find meaning in your daily life?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you take time for prayer, meditation, reflection, or quiet moments?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you feel hopeful about your future?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel your actions align with your personal values?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do you experience gratitude for your life?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel spiritually or emotionally supported during difficult seasons?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how would you describe your spiritual wellbeing?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Strong Spiritual Wellbeing",

      message:
        "Your responses suggest that you have a healthy sense of meaning, hope, and inner peace. Your beliefs, values, or spiritual practices appear to provide a positive foundation for your wellbeing and resilience.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Strong sense of meaning",
        "Inner peace",
        "Hope and resilience",
      ],

      growthAreas: [
        "Continue nurturing your spiritual wellbeing",
        "Maintain practices that strengthen inner peace",
      ],

      reflectionPrompt:
        "What spiritual practice, belief, or personal value gives you the greatest sense of peace and purpose?",

      recommendedJourney: "purpose-future-self",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Growing Spiritual Wellbeing",

      message:
        "Your responses suggest that your sense of meaning or spiritual wellbeing may fluctuate. Taking time to reflect on your values, purpose, or spiritual practices may help strengthen hope and inner peace.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Open to reflection",
        "Desire for personal growth",
      ],

      growthAreas: [
        "Deepening personal meaning",
        "Building hope",
        "Creating regular reflective practices",
      ],

      reflectionPrompt:
        "What helps you reconnect with hope, peace, or purpose when life feels difficult?",

      recommendedJourney: "purpose-future-self",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Spiritual Wellbeing Needs Support",

      message:
        "Your responses suggest that you may currently feel disconnected from your sense of purpose, hope, or inner peace. Exploring your beliefs, values, or sources of meaning with trusted spiritual leaders, mentors, or mental health professionals may help you rediscover a stronger sense of direction and hope.",

      wellbeingDimension: WellbeingDimension.Purpose,

      strengths: [
        "Shows courage through honest reflection",
        "Open to rediscovering meaning and hope",
      ],

      growthAreas: [
        "Rebuilding hope",
        "Strengthening inner peace",
        "Exploring personal meaning",
      ],

      reflectionPrompt:
        "If you felt deeply connected to your purpose and values again, what would change about the way you live each day?",

      recommendedJourney: "purpose-future-self",

      nextAction: "therapist",
    },
  ],
},

{
  id: "digital-wellbeing",

  title: "Digital Wellbeing Assessment",

  description:
    "Reflect on how your use of technology, social media, and digital devices affects your mental, emotional, and physical wellbeing.",

  category: "Lifestyle",

  duration: "2 minutes",

  questions: [
    {
      id: "q1",
      question:
        "How often do you spend more time on your phone or digital devices than you intend?",
      options: standardOptions,
    },

    {
      id: "q2",
      question:
        "How often do social media or online content negatively affect your mood?",
      options: standardOptions,
    },

    {
      id: "q3",
      question:
        "How often do you compare yourself to others because of what you see online?",
      options: standardOptions,
    },

    {
      id: "q4",
      question:
        "How often do digital devices interfere with your sleep?",
      options: standardOptions,
    },

    {
      id: "q5",
      question:
        "How often do you find it difficult to disconnect from technology?",
      options: standardOptions,
    },

    {
      id: "q6",
      question:
        "How often do you intentionally take breaks from screens during the day?",
      options: standardOptions,
    },

    {
      id: "q7",
      question:
        "How often do you feel more connected to people online than in person?",
      options: standardOptions,
    },

    {
      id: "q8",
      question:
        "How often do notifications interrupt your focus or daily activities?",
      options: standardOptions,
    },

    {
      id: "q9",
      question:
        "How often do you feel your technology use supports your wellbeing rather than harms it?",
      options: standardOptions,
    },

    {
      id: "q10",
      question:
        "Overall, how healthy do you believe your relationship with technology is?",
      options: standardOptions,
    },
  ],

  results: [
    {
      minScore: 0,
      maxScore: 9,

      level: "Healthy Digital Wellbeing",

      message:
        "Your responses suggest that technology is generally serving your life in positive ways. You appear to maintain healthy boundaries with your digital devices while making time for relationships, rest, and meaningful offline experiences.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Healthy digital habits",
        "Good technology boundaries",
        "Balanced online and offline life",
      ],

      growthAreas: [
        "Continue practising mindful technology use",
        "Protect healthy screen-time boundaries",
      ],

      reflectionPrompt:
        "Which digital habits help you stay present and connected to the people and experiences that matter most?",

      recommendedJourney: "resilience-strength",

      nextAction: "journey",
    },

    {
      minScore: 10,
      maxScore: 19,

      level: "Digital Balance Needs Attention",

      message:
        "Your responses suggest that technology may sometimes interfere with your wellbeing. Small adjustments to your screen habits and creating intentional offline moments can improve your focus, relationships, and emotional health.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Aware of your digital habits",
        "Open to creating healthier routines",
      ],

      growthAreas: [
        "Reducing unnecessary screen time",
        "Improving focus",
        "Creating healthy digital boundaries",
      ],

      reflectionPrompt:
        "What is one daily habit you could change to create a healthier relationship with technology?",

      recommendedJourney: "resilience-strength",

      nextAction: "journal",
    },

    {
      minScore: 20,
      maxScore: 30,

      level: "Digital Wellbeing Needs Support",

      message:
        "Your responses suggest that technology may be having a significant impact on your wellbeing, relationships, or daily functioning. Developing healthier digital habits and seeking support if technology use feels difficult to manage can help restore greater balance and improve your overall wellbeing.",

      wellbeingDimension: WellbeingDimension.Resilience,

      strengths: [
        "Shows honesty through self-reflection",
        "Willing to make positive changes",
      ],

      growthAreas: [
        "Building healthier digital habits",
        "Reducing digital stress",
        "Strengthening offline relationships",
      ],

      reflectionPrompt:
        "If technology supported your wellbeing instead of distracting from it, what would your ideal daily routine look like?",

      recommendedJourney: "resilience-strength",

      nextAction: "therapist",
    },
  ],
},
];