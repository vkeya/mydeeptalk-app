import type {
  GenesisMemory,
  IdentityMemory,
} from "@/types/genesisMemory";
import { JourneyReflection } from "@/types/genesisReflection";

export function buildReflection(
  memory: GenesisMemory
): JourneyReflection {
	
	type DebugIdentity = typeof memory.identity;
 const identityMemory: IdentityMemory = memory.identity;

const identity = identityMemory.descriptors;
const publicTraits = identityMemory.publicTraits;
const privateTraits = identityMemory.privateTraits;
const labels = identityMemory.labels;

  const values = memory.values.topValues;
  const strengths = memory.strengths.strengths;
  const emotions = memory.emotions.recurring;

  const summaryParts: string[] = [];

  if (identity.length > 0) {
    summaryParts.push(
      `You describe yourself as ${identity.join(", ")}.`
    );
  }

  if (publicTraits.length > 0) {
    summaryParts.push(
      `You believe others often experience you as ${publicTraits.join(", ")}.`
    );
  }

  if (privateTraits.length > 0) {
    summaryParts.push(
      `Beneath the surface, you identify with qualities such as ${privateTraits.join(", ")}.`
    );
  }

  if (labels.length > 0) {
    summaryParts.push(
      `You currently see yourself in roles such as ${labels.join(", ")}.`
    );
  }

  if (values.length > 0) {
    summaryParts.push(
      `Your decisions appear to be guided by values such as ${values.join(", ")}.`
    );
  }

  if (strengths.length > 0) {
    summaryParts.push(
      `Your journey highlights strengths including ${strengths.join(", ")}.`
    );
  }

  if (emotions.length > 0) {
    summaryParts.push(
      `Recurring emotions during this experience included ${emotions.join(", ")}.`
    );
  }

  const summary =
    summaryParts.length > 0
      ? summaryParts.join("\n\n")
      : "You've completed your first Genesis experience. As you continue your journey, your personal growth profile will become richer and more personalized.";

  return {
    title: "Meeting Yourself",

    summary,

    identity,

    values,

    strengths,

    emotions,

    nextStep:
      "Continue to 'Your Story' to explore how your life experiences shaped the person you are becoming.",
  };
}