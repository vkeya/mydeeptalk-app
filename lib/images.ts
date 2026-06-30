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

export const IMAGES = {
  // About
  aboutStory: "/images/mental4.jpg",
  aboutMission: "/images/mental2.jpg",
  aboutAfrica: "/images/mental5.jpg",
  aboutValues: "/images/mental1.jpg",

  // How it works / journey
  journeyCheckIn: "/images/mental7.jpg",
  journeyReflect: "/images/mental2.jpg",
  journeyConnect: "/images/mental5.jpg",
  journeyGrow: "/images/mental6.jpg",

  // Contact / support
  contact: "/images/mental8.jpg",

  // Therapists
  therapists: "/images/mental5.jpg",
  forTherapists: "/images/mental2.jpg",

  // Wellness features
  selfAssessment: "/images/mental9.jpg",
  journal: "/images/mental3.jpg",
  healingCircle: "/images/mental6.jpg",
  aiReflections: "/images/mental7.jpg",

  // Safety / crisis (kept calm + reassuring, not alarming)
  crisis: "/images/mental10.jpg",
  safety: "/images/mental1.jpg",

  // Generic section accents
  peace: "/images/mental3.jpg",
  growth: "/images/mental6.jpg",
  connection: "/images/mental3.jpg",
  hands: "/images/mental1.jpg",
} as const;

export type ImageKey = keyof typeof IMAGES;
