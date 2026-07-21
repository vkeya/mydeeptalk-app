export type AdaptivePromptReason =
  | "follow-up"
  | "clarification"
  | "deepen"
  | "explore"
  | "challenge"
  | "transition"
  | "reflection"
  | "celebration";

export type AdaptivePromptTarget =
  | "identity"
  | "lifeStory"
  | "emotion"
  | "values"
  | "strengths"
  | "relationships"
  | "purpose";

export interface AdaptivePrompt {
  /**
   * Unique prompt identifier.
   */
  id: string;

  /**
   * The question or prompt shown to the user.
   */
  prompt: string;

  /**
   * Why this prompt was selected.
   */
  reason: AdaptivePromptReason;

  /**
   * Which area of the user's journey this prompt develops.
   */
  target: AdaptivePromptTarget;

  /**
   * Engine confidence (0–1).
   */
  confidence: number;

  /**
   * Related discoveries that triggered this prompt.
   */
  discoveryIds: string[];

  /**
   * Optional tags for filtering or analytics.
   */
  tags?: string[];

  /**
   * Optional priority boost.
   */
  priority?: number;
}