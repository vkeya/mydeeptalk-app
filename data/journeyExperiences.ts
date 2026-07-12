export interface JourneyExperience {
  id: number;
  slug: string;
  chapter: string;

  title: string;
  description: string;

  duration: string;
  xp: number;

  href: string;
}

export const journeyExperiences: JourneyExperience[] = [
  {
    id: 1,
    slug: "meeting-yourself",
    chapter: "Chapter 1",
    title: "Meeting Yourself",
    description:
      "Begin your healing journey by meeting yourself honestly. Explore your identity, reflect deeply, journal your thoughts and discover your first insight.",
    duration: "25 mins",
    xp: 250,
    href: "/journey/meeting-yourself",
  },

  {
    id: 2,
    slug: "your-story",
    chapter: "Chapter 2",
    title: "Your Story",
    description:
      "Discover how your past experiences shaped the person you are today.",
    duration: "30 mins",
    xp: 300,
    href: "/journey/your-story",
  },

  {
    id: 3,
    slug: "emotional-patterns",
    chapter: "Chapter 3",
    title: "Emotional Patterns",
    description:
      "Recognize recurring emotional habits and understand what triggers them.",
    duration: "35 mins",
    xp: 350,
    href: "/journey/emotional-patterns",
  },

  {
    id: 4,
    slug: "healing-the-past",
    chapter: "Chapter 4",
    title: "Healing the Past",
    description:
      "Begin releasing painful memories with compassion and courage.",
    duration: "40 mins",
    xp: 400,
    href: "/journey/healing-the-past",
  },

  {
    id: 5,
    slug: "boundaries",
    chapter: "Chapter 5",
    title: "Boundaries",
    description:
      "Learn to protect your peace while maintaining healthy relationships.",
    duration: "35 mins",
    xp: 450,
    href: "/journey/boundaries",
  },

  {
    id: 6,
    slug: "relationships",
    chapter: "Chapter 6",
    title: "Relationships",
    description:
      "Understand attachment, connection and authentic love.",
    duration: "40 mins",
    xp: 500,
    href: "/journey/relationships",
  },

  {
    id: 7,
    slug: "purpose",
    chapter: "Chapter 7",
    title: "Purpose",
    description:
      "Reconnect with your strengths, values and future vision.",
    duration: "40 mins",
    xp: 550,
    href: "/journey/purpose",
  },

  {
    id: 8,
    slug: "future-self",
    chapter: "Chapter 8",
    title: "Future Self",
    description:
      "Meet the person you're becoming and intentionally shape your future.",
    duration: "45 mins",
    xp: 600,
    href: "/journey/future-self",
  },

  {
    id: 9,
    slug: "wholeness",
    chapter: "Chapter 9",
    title: "Wholeness",
    description:
      "Celebrate your growth and integrate everything you've learned.",
    duration: "45 mins",
    xp: 700,
    href: "/journey/wholeness",
  },
];