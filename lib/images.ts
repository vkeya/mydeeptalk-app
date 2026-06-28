/**
 * Central image map.
 *
 * Every photo used across the site is referenced here by a *semantic* key so
 * the design stays consistent and images are trivial to swap. These currently
 * point at the existing themed placeholder photos in /public — replace the
 * paths (or drop new files into /public and update the value) with your own
 * mental-health imagery. Nothing else in the app needs to change.
 *
 * Tip: keep new photos warm, human and calm (faces, hands, light, nature,
 * journaling, quiet conversation) to match the brand.
 */

const PLACEHOLDERS = {
  calm: "/images/mental-hero.jpg",
  reflection: "/images/self-discovery.png",
  support: "/images/therapist-support.png",
  hero: "/images/mental-hero.jpg",
} as const;

export const IMAGES = {
  // About
  aboutStory: PLACEHOLDERS.reflection,
  aboutMission: PLACEHOLDERS.calm,
  aboutAfrica: PLACEHOLDERS.support,
  aboutValues: PLACEHOLDERS.hero,

  // How it works / journey
  journeyCheckIn: PLACEHOLDERS.reflection,
  journeyReflect: PLACEHOLDERS.calm,
  journeyConnect: PLACEHOLDERS.support,
  journeyGrow: PLACEHOLDERS.hero,

  // Contact / support
  contact: PLACEHOLDERS.support,

  // Therapists
  therapists: PLACEHOLDERS.support,
  forTherapists: PLACEHOLDERS.calm,

  // Wellness features
  selfAssessment: PLACEHOLDERS.reflection,
  journal: PLACEHOLDERS.calm,
  healingCircle: PLACEHOLDERS.hero,
  aiReflections: PLACEHOLDERS.reflection,

  // Safety / crisis (kept calm + reassuring, not alarming)
  crisis: PLACEHOLDERS.support,
  safety: PLACEHOLDERS.calm,

  // Generic section accents
  peace: PLACEHOLDERS.calm,
  growth: PLACEHOLDERS.hero,
  connection: PLACEHOLDERS.support,
  hands: PLACEHOLDERS.reflection,
} as const;

export type ImageKey = keyof typeof IMAGES;
