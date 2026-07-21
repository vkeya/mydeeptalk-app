import { adaptivePromptRules } from "@/data/genesis/adaptivePromptRules";
import { genesisPrompts } from "@/data/genesis/adaptivePrompts";
import { MemoryDomain, 
getMemoryCoverage as calculateMemoryCoverage,
} from "@/lib/genesis/memoryCoverage";
import {
  AdaptivePrompt,
  AdaptivePromptTarget,
} from "@/types/genesisAdaptivePrompt";

import { DiscoveryResult } from "@/types/genesisDiscoveryRule";
import { GenesisMemory } from "@/types/genesisMemory";

export class AdaptivePromptGenerator {
  /**
   * Select the best next prompt.
   */
  generate(
    memory: GenesisMemory,
    discoveries: DiscoveryResult
  ): AdaptivePrompt {
    const scoredRules = adaptivePromptRules.map((rule) => ({
      rule,
      score: this.calculateScore(rule, memory, discoveries),
    }));

    scoredRules.sort((a, b) => b.score - a.score);

    const winner = scoredRules[0];

    const prompt = this.selectPrompt(
      winner.rule.target,
      winner.rule.reason
    );

    return {
      id: prompt.id,

      prompt: prompt.prompt,

      reason: winner.rule.reason,

      target: winner.rule.target,

      confidence: Math.min(winner.score / 100, 1),

      discoveryIds: discoveries.discoveries.map(
        (discovery) => discovery.id
      ),

      priority: winner.score,
    };
  }

  /**
   * Calculate rule score.
   */
  private calculateScore(
    rule: (typeof adaptivePromptRules)[number],
    memory: GenesisMemory,
    discoveries: DiscoveryResult
  ): number {
    let score = rule.score;

    if (
      discoveries.discoveries.some(
        (d) => d.category === rule.target
      )
    ) {
      score += 15;
    }

    const existing = this.getMemoryCoverage(
  memory,
  rule.target
);

    score -= existing * 5;

    return Math.max(score, 0);
  }

  /**
   * Count existing knowledge.
   */
 
  
  private mapTargetToMemoryDomain(
  target: AdaptivePromptTarget
): MemoryDomain | null {
  switch (target) {
    case "identity":
      return "identity";

    case "emotion":
      return "emotion";

    case "values":
      return "values";

    case "strengths":
      return "strengths";

    case "relationships":
      return "relationships";

    case "purpose":
      return "purpose";

    default:
      return null;
  }
}

private getMemoryCoverage(
  memory: GenesisMemory,
  target: AdaptivePromptTarget
): number {
  const domain = this.mapTargetToMemoryDomain(target);

  if (!domain) {
    return 0;
  }

  return calculateMemoryCoverage(memory, domain);
}
  

  /**
   * Select the best prompt from the prompt library.
   */
  private selectPrompt(
    target: AdaptivePromptTarget,
    reason: AdaptivePrompt["reason"]
  ) {
    const matches = genesisPrompts.filter(
      (prompt) =>
        prompt.target === target &&
        prompt.reason === reason
    );

    if (matches.length > 0) {
      matches.sort(
        (a, b) => (b.weight ?? 1) - (a.weight ?? 1)
      );

      return matches[0];
    }

    return (
      genesisPrompts.find(
        (prompt) => prompt.target === target
      ) ?? {
        id: "fallback",
        target,
        reason,
        prompt: "Tell me more.",
      }
    );
  }
}

export const adaptivePromptGenerator =
  new AdaptivePromptGenerator();