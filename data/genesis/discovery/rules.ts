import {
  DiscoveryCategory,
} from "@/types/genesisDiscovery";

import {
  DiscoveryRule,
} from "@/types/genesisDiscoveryRule";

export const discoveryRules: DiscoveryRule[] = [
  // -----------------------------
  // Identity
  // -----------------------------
  {
    id: "identity-curious",
    sceneId: "identity",
    category: DiscoveryCategory.Identity,
    trigger: "curious",
    title: "Curious",
    confidence: 0.95,
  },
  {
    id: "identity-kind",
    sceneId: "identity",
    category: DiscoveryCategory.Identity,
    trigger: "kind",
    title: "Kind",
    confidence: 0.95,
  },

  // -----------------------------
  // Public Self
  // -----------------------------
  {
    id: "public-confident",
    sceneId: "public-self",
    category: DiscoveryCategory.Identity,
    trigger: "confident",
    title: "Confident",
    confidence: 0.9,
  },
  {
    id: "public-leader",
    sceneId: "public-self",
    category: DiscoveryCategory.Identity,
    trigger: "leader",
    title: "Leadership",
    confidence: 0.9,
  },

  // -----------------------------
  // Private Self
  // -----------------------------
  {
    id: "private-reflective",
    sceneId: "private-self",
    category: DiscoveryCategory.Identity,
    trigger: "reflective",
    title: "Reflective",
    confidence: 0.9,
  },
  {
    id: "private-sensitive",
    sceneId: "private-self",
    category: DiscoveryCategory.Identity,
    trigger: "sensitive",
    title: "Sensitive",
    confidence: 0.9,
  },

  // -----------------------------
  // Labels
  // -----------------------------
  {
    id: "label-parent",
    sceneId: "labels",
    category: DiscoveryCategory.Identity,
    trigger: "parent",
    title: "Parent",
    confidence: 0.9,
  },
  {
    id: "label-leader",
    sceneId: "labels",
    category: DiscoveryCategory.Identity,
    trigger: "leader",
    title: "Leader",
    confidence: 0.9,
  },

  // -----------------------------
  // Values
  // -----------------------------
  {
    id: "value-family",
    sceneId: "values",
    category: DiscoveryCategory.Value,
    trigger: "family",
    title: "Family",
    confidence: 0.95,
  },

  // -----------------------------
  // Strengths
  // -----------------------------
  {
    id: "strength-resilience",
    sceneId: "strengths",
    category: DiscoveryCategory.Strength,
    trigger: "resilient",
    title: "Resilience",
    confidence: 0.9,
  },

  // -----------------------------
  // Emotions
  // -----------------------------
  {
    id: "emotion-hope",
    sceneId: "emotion",
    category: DiscoveryCategory.Emotion,
    trigger: "hope",
    title: "Hope",
    confidence: 0.9,
  },
  
  {
  id: "childhood-family",
  sceneId: "childhood",
  category: DiscoveryCategory.Identity,

  trigger: "family",

  triggers: [
    "family",
    "mother",
    "father",
    "parents",
    "grandmother",
    "grandfather",
    "uncle",
    "aunt"
  ],

  title: "Family Influence",

  confidence: 0.8,
},

  // -----------------------------
  // Your Story
  // -----------------------------
  {
    id: "story-resilience",
    sceneId: "turning-points",
    category: DiscoveryCategory.Strength,

    trigger: "overcame",

    triggers: [
      "overcame",
      "survived",
      "recovered",
      "persevered",
      "resilient",
      "stronger"
    ],

    title: "Resilience",

    confidence: 0.9,
  },

  {
    id: "story-loss",
    sceneId: "turning-points",
    category: DiscoveryCategory.Emotion,

    trigger: "loss",

    triggers: [
      "loss",
      "grief",
      "death",
      "passed away",
      "divorce",
      "heartbreak"
    ],

    title: "Loss",

    confidence: 0.9,
  },

  {
    id: "story-purpose",
    sceneId: "current-chapter",
    category: DiscoveryCategory.Purpose,

    trigger: "purpose",

    triggers: [
      "purpose",
      "calling",
      "mission",
      "dream",
      "future",
      "vision"
    ],

    title: "Purpose",

    confidence: 0.9,
  },

  {
    id: "story-growth",
    sceneId: "chapters",
    category: DiscoveryCategory.Identity,

    trigger: "learned",

    triggers: [
      "learned",
      "changed",
      "grew",
      "transformed",
      "became"
    ],

    title: "Personal Growth",

    confidence: 0.85,
  },

  {
    id: "story-family",
    sceneId: "chapters",
    category: DiscoveryCategory.Identity,

    trigger: "family",

    triggers: [
      "family",
      "mother",
      "father",
      "parents",
      "siblings",
      "children"
    ],

    title: "Family Influence",

    confidence: 0.85,
  },
];