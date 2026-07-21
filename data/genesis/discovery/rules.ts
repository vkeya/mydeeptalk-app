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
];