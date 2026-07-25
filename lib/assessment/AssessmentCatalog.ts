import {
  AssessmentCategory,
} from "./types/AssessmentEnums";

import {
  AssessmentDefinition,
} from "./types/AssessmentDefinition";

export class AssessmentCatalog {
  private readonly assessments: Map<string, AssessmentDefinition>;

  constructor(definitions: AssessmentDefinition[]) {
    this.assessments = new Map(
      definitions.map((definition) => [
        definition.metadata.id,
        definition,
      ])
    );
  }

  /**
   * Retrieve an assessment by ID.
   */
  get(id: string): AssessmentDefinition {
    const assessment = this.assessments.get(id);

    if (!assessment) {
      throw new Error(`Assessment "${id}" not found.`);
    }

    return assessment;
  }

  /**
   * Retrieve an assessment by slug.
   */
  getBySlug(slug: string): AssessmentDefinition {
    const assessment = Array.from(
      this.assessments.values()
    ).find(
      (item) => item.metadata.slug === slug
    );

    if (!assessment) {
      throw new Error(`Assessment slug "${slug}" not found.`);
    }

    return assessment;
  }

  /**
   * Return all assessments.
   */
  getAll(): AssessmentDefinition[] {
    return Array.from(this.assessments.values());
  }

  /**
   * Return assessments by category.
   */
  getByCategory(
    category: AssessmentCategory
  ): AssessmentDefinition[] {
    return this.getAll().filter(
      (assessment) =>
        assessment.metadata.category === category
    );
  }

  /**
   * Check existence.
   */
  has(id: string): boolean {
    return this.assessments.has(id);
  }
}