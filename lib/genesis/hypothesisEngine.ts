import { hypothesisRules } from "@/data/genesis/hypothesisRules";
import { genesisEventBus } from "@/lib/genesis/eventBus";

import { GenesisEngine } from "@/types/genesisEngine";
import { GenesisKnowledge } from "@/types/genesisKnowledge";
import { GenesisHypothesis } from "@/types/genesisHypothesis";

export class HypothesisEngine implements GenesisEngine {
  readonly id = "hypothesis-engine";

  readonly name = "Hypothesis Engine";

  readonly order = 70;

  process(
    knowledge: GenesisKnowledge
  ): GenesisKnowledge {
    const hypotheses =
      knowledge.hypotheses ?? [];

    for (const rule of hypothesisRules) {
      const confidence =
        this.calculateConfidence(
          knowledge,
          rule.category
        );

      if (
        confidence <
        rule.minimumConfidence
      ) {
        continue;
      }

      const existing =
        hypotheses.find(
          (hypothesis) =>
            hypothesis.id === rule.id
        );

      if (existing) {
        existing.confidence = Math.min(
          Math.max(
            existing.confidence,
            confidence
          ),
          1
        );

        existing.updatedAt = new Date();

        existing.status =
          this.resolveStatus(
            existing.confidence
          );

        void genesisEventBus.emit({
          id: crypto.randomUUID(),
          type: "hypothesis.updated",
          source: this.name,
          payload: existing,
          createdAt: new Date(),
        });

        continue;
      }

      const hypothesis: GenesisHypothesis =
        {
          id: rule.id,

          title: rule.title,

          statement: rule.statement,

          category: rule.category,

          confidence,

          status:
            this.resolveStatus(
              confidence
            ),

          discoveryIds:
            knowledge.discoveries.discoveries
              .filter(
                (d) =>
                  d.category ===
                  rule.category
              )
              .map((d) => d.id),

          insightIds:
            knowledge.insights
              .filter(
                (i) =>
                  i.category ===
                  rule.category
              )
              .map((i) => i.id),

          conceptIds:
            knowledge.concepts
              .filter(
                (c) =>
                  c.type ===
                  this.toConceptType(
                    rule.category
                  )
              )
              .map((c) => c.id),

          createdAt: new Date(),

          updatedAt: new Date(),
        };

      hypotheses.push(hypothesis);

      void genesisEventBus.emit({
        id: crypto.randomUUID(),
        type: "hypothesis.generated",
        source: this.name,
        payload: hypothesis,
        createdAt: new Date(),
      });
    }

    knowledge.hypotheses = hypotheses;

    return knowledge;
  }

  /**
   * Version 1 confidence.
   *
   * Later this becomes Bayesian /
   * probabilistic reasoning.
   */
  private calculateConfidence(
    knowledge: GenesisKnowledge,
    category: GenesisHypothesis["category"]
  ): number {
    const discoveries =
      knowledge.discoveries.discoveries.filter(
        (d) => d.category === category
      ).length;

    const insights =
      knowledge.insights.filter(
        (i) => i.category === category
      ).length;

    const concepts =
      knowledge.concepts.filter(
        (c) =>
          c.type ===
          this.toConceptType(category)
      ).length;

    return Math.min(
      discoveries * 0.15 +
        insights * 0.25 +
        concepts * 0.10,
      1
    );
  }

  private resolveStatus(
    confidence: number
  ): GenesisHypothesis["status"] {
    if (confidence >= 0.90) {
      return "confirmed";
    }

    if (confidence >= 0.75) {
      return "supported";
    }

    if (confidence >= 0.50) {
      return "emerging";
    }

    return "rejected";
  }

  private toConceptType(
    category: GenesisHypothesis["category"]
  ) {
    switch (category) {
      case "values":
        return "value";

      case "strengths":
        return "strength";

      case "relationships":
        return "relationship";

      default:
        return category;
    }
  }
}

export const hypothesisEngine =
  new HypothesisEngine();