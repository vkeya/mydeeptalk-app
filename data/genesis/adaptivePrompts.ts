import { AdaptivePromptReason } from "@/types/genesisAdaptivePrompt";

export interface GenesisPrompt {
  id: string;

  target:
    | "identity"
    | "lifeStory"
    | "emotion"
    | "values"
    | "strengths"
    | "relationships"
    | "purpose";

  reason: AdaptivePromptReason;

  prompt: string;

  weight?: number;
}

export const genesisPrompts: GenesisPrompt[] = [
  // Identity

  {
    id: "identity-1",
    target: "identity",
    reason: "explore",
    prompt:
      "When you describe yourself to someone new, what do you usually say?",
  },

  {
    id: "identity-2",
    target: "identity",
    reason: "deepen",
    prompt:
      "What part of your identity do you think people misunderstand most?",
  },

  {
    id: "identity-3",
    target: "identity",
    reason: "clarification",
    prompt:
      "Earlier you described yourself differently. Help me understand what changed.",
  },

  // Life Story

  {
    id: "story-1",
    target: "lifeStory",
    reason: "follow-up",
    prompt:
      "What happened next that made this moment so significant?",
  },

  {
    id: "story-2",
    target: "lifeStory",
    reason: "reflection",
    prompt:
      "Looking back now, what meaning do you give this chapter of your life?",
  },

  // Emotion

  {
    id: "emotion-1",
    target: "emotion",
    reason: "deepen",
    prompt:
      "Which emotion feels strongest when you think about this experience?",
  },

  {
    id: "emotion-2",
    target: "emotion",
    reason: "follow-up",
    prompt:
      "What do you think that emotion has been trying to tell you?",
  },

  // Values

  {
    id: "values-1",
    target: "values",
    reason: "explore",
    prompt:
      "What value or principle feels most important in this situation?",
  },

  {
    id: "values-2",
    target: "values",
    reason: "reflection",
    prompt:
      "Have your values changed because of this experience?",
  },

  // Strengths

  {
    id: "strength-1",
    target: "strengths",
    reason: "reflection",
    prompt:
      "What strength did you discover in yourself that you didn't realize you had?",
  },

  {
    id: "strength-2",
    target: "strengths",
    reason: "celebration",
    prompt:
      "What achievement from this experience are you most proud of?",
  },

  // Relationships

  {
    id: "relationship-1",
    target: "relationships",
    reason: "explore",
    prompt:
      "How has this experience changed the way you relate to other people?",
  },

  {
    id: "relationship-2",
    target: "relationships",
    reason: "deepen",
    prompt:
      "Who has had the greatest influence on this part of your life?",
  },

  // Purpose

  {
    id: "purpose-1",
    target: "purpose",
    reason: "explore",
    prompt:
      "How has this experience influenced the direction you want your life to take?",
  },

  {
    id: "purpose-2",
    target: "purpose",
    reason: "reflection",
    prompt:
      "If this chapter taught you one lesson, what would it be?",
  },
];