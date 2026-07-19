import { GenesisMemory } from "@/types/genesisMemory";
import { JourneyReflection } from "@/types/genesisReflection";

export function buildReflection(
  memory: GenesisMemory
): JourneyReflection {
  const identity = memory.identity.descriptors;
const values = memory.values.topValues;
const strengths = memory.strengths.strengths;
const emotions = memory.emotions.recurring;

  const summaryParts: string[] = [];

  if (identity.length > 0) {
    summaryParts.push(
      `You describe yourself as ${identity.join(", ")}.`
    );
  }

  if (values.length > 0) {
    summaryParts.push(
      `Your responses consistently point toward values such as ${values.join(
        ", "
      )}.`
    );
  }

  if (strengths.length > 0) {
    summaryParts.push(
      `You demonstrate strengths including ${strengths.join(", ")}.`
    );
  }

  if (emotions.length > 0) {
    summaryParts.push(
      `Throughout this experience, emotions such as ${emotions.join(
        ", "
      )} appeared repeatedly.`
    );
  }

  const summary =
    summaryParts.length > 0
      ? summaryParts.join(" ")
      : "You've completed your first Genesis experience. As you continue your journey, your personal growth profile will become richer and more personalized.";

  return {
    title: "Meeting Yourself",

    summary,

    identity,

    values,

    strengths,

    emotions,

    nextStep:
      "Continue to 'Your Story' to discover how your past has shaped who you are today.",
  };
}