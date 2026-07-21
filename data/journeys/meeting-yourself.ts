import { JourneyExperience } from "@/types/journey";

export const meetingYourself: JourneyExperience = {
  id: "meeting-yourself",

  title: "Meeting Yourself",

  description:
    "The beginning of your self-discovery journey.",

  xpReward: 100,

  badge: "First Step",

  scenes: [
  {
    id: "arrival",
    type: "arrival",
    title: "Welcome",
    content:
      "Today you begin one of the most important conversations you'll ever have—the one with yourself.",
  },

  {
    id: "guide",
    type: "guide",
    title: "Choose Your Guide",
  },

  {
    id: "intention",
    type: "intention",
    title: "Set Your Intention",
  },

  {
    id: "emotion",
    type: "emotion",
    title: "How are you feeling today?",
  },

  {
    id: "identity",
    type: "identity",
    title: "Who are you?",
    question:
      "If no one else's expectations existed, who would you be?",
  },

  {
    id: "public-self",
    type: "public-self",
    title: "Your Public Self",
    question:
      "Which qualities best describe the version of yourself that most people know?",
  },

  {
    id: "private-self",
    type: "private-self",
    title: "Your Private Self",
    question:
      "Which qualities best describe who you are when nobody is watching?",
  },

  {
    id: "labels",
    type: "labels",
    title: "Your Roles & Identity",
    question:
      "Which roles or identities best describe who you are today?",
  },

  {
    id: "values",
    type: "values",
    title: "Your Core Values",
    question:
      "Which values guide the way you live and make decisions?",
  },

  {
    id: "strengths",
    type: "strengths",
    title: "Your Strengths",
    question:
      "Which strengths can you rely on even during difficult moments?",
  },

  {
    id: "reflection",
    type: "reflection",
    title: "Reflect",
    content:
      "Pause and notice the patterns emerging from your responses.",
  },

  {
    id: "journal",
    type: "journal",
    title: "Journal",
    content:
      "Write about what surprised you, challenged you, or felt most true today.",
  },

  {
    id: "discovery",
    type: "discovery",
    title: "Your Discovery",
    content:
      "Your Genesis profile has begun to take shape. These discoveries will continue to grow with every journey you complete.",
  },

  {
    id: "celebration",
    type: "celebration",
    title: "Congratulations",
    content:
      "You've completed your first Genesis experience.",
  },
],
}