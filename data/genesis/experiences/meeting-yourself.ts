import {
  GenesisExperience,
  SceneType,
} from "@/types/genesisExperience";

export const meetingYourselfExperience: GenesisExperience = {
  id: "meeting-yourself",

  slug: "meeting-yourself",

  title: "Meeting Yourself",

  subtitle: "The beginning of your healing journey.",

  description:
    "A guided experience to reconnect with who you are beneath expectations and roles.",

  category: "identity",

  difficulty: "gentle",

  estimatedMinutes: 15,

  xpReward: 100,

  badge: "Meeting Yourself",

  scenes: [
    {
      id: "arrival",
      type: SceneType.Arrival,
      data: {},
    },
    {
      id: "identity-question",
      type: SceneType.Question,
      data: {
        prompt:
          "Who are you when nobody expects anything from you?",
      },
    },
    {
      id: "reflection",
      type: SceneType.Reflection,
      data: {
        prompt:
          "Take a moment to notice what came up for you.",
      },
    },
    {
      id: "journal",
      type: SceneType.Journal,
      data: {
        placeholder:
          "Write whatever feels important right now...",
      },
    },
    {
      id: "celebration",
      type: SceneType.Celebration,
      data: {},
    },
  ],
};