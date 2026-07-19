import {
  DiscoveryCategory,
} from "@/types/genesisDiscovery";

import {
  DiscoveryRule,
} from "@/types/genesisDiscoveryRule";

export const discoveryRules: DiscoveryRule[] = [

{
    id: "identity-curious",

    category: DiscoveryCategory.Identity,

    trigger: "curious",

    title: "Curious",

    confidence: 0.95,
},

{
    id: "identity-kind",

    category: DiscoveryCategory.Identity,

    trigger: "kind",

    title: "Kind",

    confidence: 0.95,
},

{
    id: "strength-resilience",

    category: DiscoveryCategory.Strength,

    trigger: "resilient",

    title: "Resilience",

    confidence: 0.90,
},

{
    id: "value-family",

    category: DiscoveryCategory.Value,

    trigger: "family",

    title: "Family",

    confidence: 0.95,
},

{
    id: "emotion-hope",

    category: DiscoveryCategory.Emotion,

    trigger: "hope",

    title: "Hope",

    confidence: 0.90,
},

];