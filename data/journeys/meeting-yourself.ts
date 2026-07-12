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
      id: "identity-question",
      type: "question",
      title: "Who are you?",
      question:
        "If no one else's expectations existed, who would you be?",
    },

    {
      id: "reflection",
      type: "reflection",
      title: "Reflect",
      content:
        "Notice what emotions came up while answering.",
    },

    {
      id: "journal",
      type: "journal",
      title: "Write",
      content:
        "Record your thoughts before moving on.",
    },

    {
      id: "insight",
      type: "insight",
      title: "Insight",
      content:
        "Growth begins the moment you become honest with yourself.",
    },

    {
      id: "celebration",
      type: "celebration",
      title: "Congratulations",
      content:
        "You've completed your first Genesis experience.",
    },
  ],
};