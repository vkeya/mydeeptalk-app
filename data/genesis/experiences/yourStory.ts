import { GenesisExperience } from "@/types/genesisExperience";

export const yourStoryExperience: GenesisExperience = {
  id: "your-story",

  slug: "your-story",

  metadata: {
    title: "Your Story",
    subtitle: "Understanding the journey that shaped you.",
    description:
      "Explore the experiences, relationships, and defining moments that have influenced the person you are becoming.",
    duration: "20 minutes",
    difficulty: "Medium",
  },

  scenes: [
    // -----------------------------
    // Arrival
    // -----------------------------
    {
      id: "arrival",
      type: "arrival",
      title: "Welcome Back",
      component: "arrival",
      next: "guide",
    },

    {
      id: "guide",
      type: "guide",
      title: "Your Guide Returns",
      component: "guide",
      next: "childhood",
    },

    // -----------------------------
    // Your Story
    // -----------------------------
    {
      id: "childhood",
      type: "childhood",
      title: "Where It All Began",
      component: "childhood",
      next: "important-people",
    },

    {
      id: "important-people",
      type: "important-people",
      title: "The People Who Shaped You",
      component: "important-people",
      next: "defining-moments",
    },

    {
      id: "defining-moments",
      type: "defining-moments",
      title: "Moments That Changed You",
      component: "defining-moments",
      next: "difficult-seasons",
    },

    {
      id: "difficult-seasons",
      type: "difficult-seasons",
      title: "The Difficult Seasons",
      component: "difficult-seasons",
      next: "turning-points",
    },

    {
      id: "turning-points",
      type: "turning-points",
      title: "Turning Points",
      component: "turning-points",
      next: "life-lessons",
    },

    {
      id: "life-lessons",
      type: "life-lessons",
      title: "Lessons Life Has Taught You",
      component: "life-lessons",
      next: "timeline",
    },

    {
      id: "timeline",
      type: "timeline",
      title: "Connecting Your Story",
      component: "timeline",
      next: "reflection",
    },

    // -----------------------------
    // Reflection
    // -----------------------------
    {
      id: "reflection",
      type: "reflection",
      title: "Looking Back",
      component: "reflection",
      next: "journal",
    },

    {
      id: "journal",
      type: "journal",
      title: "Write Freely",
      component: "journal",
      next: "discovery",
    },

    {
      id: "discovery",
      type: "discovery",
      title: "Your Story Mirror",
      component: "discovery",
      next: "celebration",
    },

    // -----------------------------
    // Completion
    // -----------------------------
    {
      id: "celebration",
      type: "celebration",
      title: "Your Story Matters",
      component: "celebration",
      next: "next-journey",
    },

    {
      id: "next-journey",
      type: "celebration",
      title: "Preparing for the Next Chapter",
      component: "celebration",
    },
  ],

  rewards: {
    xp: 150,
    badge: "Storyteller",
  },

  memoryDomains: [
    "identity",
    "emotions",
    "values",
    "relationships",
    
  ],

  enabled: true,
};