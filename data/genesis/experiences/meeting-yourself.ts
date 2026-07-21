import { GenesisExperience } from "@/types/genesisExperience";

export const meetingYourselfExperience: GenesisExperience = {
  id: "meeting-yourself",

  slug: "meeting-yourself",

  metadata: {
    title: "Meeting Yourself",
    subtitle: "The beginning of your healing journey.",
    description:
      "A guided experience to reconnect with who you are beneath expectations and roles.",
    duration: "15 minutes",
    difficulty: "Easy",
  },

  scenes: [
  // -----------------------------
  // Arrival
  // -----------------------------
  {
    id: "arrival",
    type: "arrival",
    title: "Arrival",
    component: "arrival",
    next: "guide",
  },

  {
    id: "guide",
    type: "guide",
    title: "Meet Your Guide",
    component: "guide",
    next: "intention",
  },

  {
    id: "intention",
    type: "intention",
    title: "Your Intention",
    component: "intention",
    next: "identity",
  },

  // -----------------------------
  // Identity
  // -----------------------------
  {
    id: "identity",
    type: "identity",
    title: "Who Are You?",
    component: "identity",
    next: "public-self",
  },

  {
    id: "public-self",
    type: "public-self",
    title: "The Person Others See",
    component: "public-self",
    next: "private-self",
  },

  {
    id: "private-self",
    type: "private-self",
    title: "The Person Only You Know",
    component: "private-self",
    next: "labels",
  },

  {
    id: "labels",
    type: "labels",
    title: "The Labels You Carry",
    component: "labels",
    next: "emotion",
  },

  // -----------------------------
  // Emotional Awareness
  // -----------------------------
  {
    id: "emotion",
    type: "emotion",
    title: "Your Emotional World",
    component: "emotion",
    next: "strengths",
  },

  {
    id: "strengths",
    type: "strengths",
    title: "Your Inner Strengths",
    component: "strengths",
    next: "values",
  },

  {
    id: "values",
    type: "values",
    title: "Your Core Values",
    component: "values",
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
    title: "Your Discovery Mirror",
    component: "discovery",
    next: "celebration",
  },

  // -----------------------------
  // Completion
  // -----------------------------
  {
    id: "celebration",
    type: "celebration",
    title: "Congratulations",
    component: "celebration",
    next: "next-journey",
  },

  {
    id: "next-journey",
    type: "celebration",
    title: "Your Journey Continues",
    component: "celebration",
  },
],

rewards: {
  xp: 100,
  badge: "Meeting Yourself",
},

memoryDomains: [
  "identity",
  "emotions",
  "values",
],

 enabled:true,
}