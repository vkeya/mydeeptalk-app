// ======================================================
// Project Genesis
// Experience Registry
// ======================================================

import { GenesisExperience } from "@/types/genesisExperience";

const registry = new Map<string, GenesisExperience>();

/**
 * Register a Genesis experience.
 *
 * Safe to call during application startup.
 * Duplicate IDs are rejected to avoid accidental overrides.
 */
export function registerExperience(
  experience: GenesisExperience
): GenesisExperience {
  if (registry.has(experience.id)) {
    throw new Error(
      `Genesis experience "${experience.id}" is already registered.`
    );
  }

  registry.set(experience.id, experience);

  return experience;
}

/**
 * Retrieve an experience by ID.
 */
export function getExperience(
  id: string
): GenesisExperience | undefined {
  return registry.get(id);
}

/**
 * Retrieve an experience by slug.
 */
export function getExperienceBySlug(
  slug: string
): GenesisExperience | undefined {
  return [...registry.values()].find(
    (experience) => experience.slug === slug
  );
}

/**
 * Return every registered experience.
 */
export function getAllExperiences(): GenesisExperience[] {
  return [...registry.values()];
}

/**
 * Return only enabled experiences.
 */
export function getEnabledExperiences(): GenesisExperience[] {
  return getAllExperiences().filter(
    (experience) => experience.enabled
  );
}

/**
 * Check whether an experience exists.
 */
export function hasExperience(id: string): boolean {
  return registry.has(id);
}

/**
 * Useful for testing.
 */
export function clearExperienceRegistry(): void {
  registry.clear();
}