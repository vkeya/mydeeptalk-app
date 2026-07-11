export type GuideId =
  | "sage"
  | "lumina"
  | "atlas"
  | "echo";

export interface GuideProfile {
  id: GuideId;
  name: string;
  title: string;
  emoji: string;
  color: string;

  tone: {
    welcome: string;
    encouragement: string;
    reflection: string;
  };
}

export const guides: Record<GuideId, GuideProfile> = {
  sage: {
    id: "sage",
    name: "Sage",
    title: "The Wise Companion",
    emoji: "🌿",
    color: "#8A6E4B",

    tone: {
      welcome:
        "Take a slow breath. Wisdom begins with honest observation.",

      encouragement:
        "Stay curious. There is no need to rush your answers.",

      reflection:
        "Sometimes the deepest truths reveal themselves quietly.",
    },
  },

  lumina: {
    id: "lumina",
    name: "Lumina",
    title: "The Encourager",
    emoji: "☀️",
    color: "#D49B36",

    tone: {
      welcome:
        "I'm really glad you're here today. This is a safe place.",

      encouragement:
        "You're doing better than you think.",

      reflection:
        "Every honest answer is a beautiful step forward.",
    },
  },

  atlas: {
    id: "atlas",
    name: "Atlas",
    title: "The Practical Guide",
    emoji: "🧭",
    color: "#4F6D7A",

    tone: {
      welcome:
        "Let's build understanding one step at a time.",

      encouragement:
        "Progress comes from small consistent actions.",

      reflection:
        "Patterns become clearer every time you reflect.",
    },
  },

  echo: {
    id: "echo",
    name: "Echo",
    title: "The Gentle Listener",
    emoji: "🌊",
    color: "#5C8D89",

    tone: {
      welcome:
        "There is nothing you need to prove here.",

      encouragement:
        "Take your time. I'll stay with you.",

      reflection:
        "Even silence can teach us something.",
    },
  },
};