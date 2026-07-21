// ======================================================
// Project Genesis
// Insight Builder
// Version 1 (Rule Based)
// ======================================================

export interface MeetingYourselfInsightInput {
  identity?: string;
  reflection?: string;
  journal?: string;
}

export interface MeetingYourselfInsight {
  title: string;
  message: string;
  encouragement: string;
}

export function buildMeetingYourselfInsight(
  input: MeetingYourselfInsightInput
): MeetingYourselfInsight {
  const hasIdentity =
    (input.identity ?? "").trim().length > 0;

  const hasReflection =
    (input.reflection ?? "").trim().length > 0;

  const hasJournal =
    (input.journal ?? "").trim().length > 0;

  let message =
    "Today you made space to slow down and look inward. That alone is a meaningful first step.";

  if (hasIdentity) {
    message =
      "You began exploring who you are beyond expectations, roles, and responsibilities. Self-awareness starts with giving yourself permission to answer that question honestly.";
  }

  if (hasIdentity && hasReflection) {
    message =
      "Your reflections suggest that you're beginning to separate your authentic self from the labels you've carried. That awareness is often the beginning of lasting personal growth.";
  }

  if (hasIdentity && hasReflection && hasJournal) {
    message =
      "Across your responses, a consistent theme emerged: you are becoming more intentional about understanding yourself. Every honest reflection strengthens your relationship with yourself.";
  }

  return {
    title: "Your First Insight",

    message,

    encouragement:
      "Remember, self-discovery isn't about finding a perfect version of yourself. It's about meeting yourself with honesty, curiosity, and compassion—one step at a time.",
  };
}