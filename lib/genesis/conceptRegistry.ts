import { GenesisConcept, ConceptType } from "@/types/genesisConcept";

export class ConceptRegistry {
  /**
   * Register a concept or reinforce an existing one.
   */
  register(
    concepts: GenesisConcept[],
    value: string,
    type: ConceptType
  ): GenesisConcept {
    const key = this.normalize(value);

    const existing = concepts.find(
      (concept) =>
        concept.type === type &&
        (concept.key === key ||
          concept.aliases.some(
            (alias) => this.normalize(alias) === key
          ))
    );

    if (existing) {
      existing.occurrences++;

      existing.updatedAt = new Date();

      existing.confidence = Math.min(
        existing.confidence + 0.05,
        1
      );

      if (
        !existing.aliases.some(
          (alias) => this.normalize(alias) === key
        ) &&
        existing.label !== value
      ) {
        existing.aliases.push(value);
      }

      return existing;
    }

    const concept: GenesisConcept = {
      id: `${type}-${concepts.length + 1}`,

      key,

      label: this.toTitleCase(value),

      type,

      aliases: [],

      confidence: 0.5,

      occurrences: 1,

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    concepts.push(concept);

    return concept;
  }

  /**
   * Register many concepts.
   */
  registerMany(
    concepts: GenesisConcept[],
    values: string[],
    type: ConceptType
  ): GenesisConcept[] {
    return values.map((value) =>
      this.register(concepts, value, type)
    );
  }

  /**
   * Find a concept.
   */
  find(
    concepts: GenesisConcept[],
    value: string,
    type?: ConceptType
  ): GenesisConcept | undefined {
    const key = this.normalize(value);

    return concepts.find((concept) => {
      if (type && concept.type !== type) {
        return false;
      }

      return (
        concept.key === key ||
        concept.aliases.some(
          (alias) => this.normalize(alias) === key
        )
      );
    });
  }

  /**
   * Normalize values into canonical keys.
   */
  normalize(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ");
  }

  /**
   * Convert to display label.
   */
  private toTitleCase(value: string): string {
    return value
      .trim()
      .split(/\s+/)
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join(" ");
  }
}

export const conceptRegistry =
  new ConceptRegistry();