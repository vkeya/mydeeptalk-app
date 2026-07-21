export interface GenesisMemory {
  identity: IdentityMemory;
  emotions: EmotionMemory;
  values: ValueMemory;
  strengths: StrengthMemory;
  relationships: RelationshipMemory;
  purpose: PurposeMemory;
  milestones: JourneyMilestone[];
}

export interface IdentityMemory {
  descriptors: string[];

  publicTraits: string[];

  privateTraits: string[];

  labels: string[];

  affirmations: string[];
}

export interface EmotionMemory {
  recurring: string[];
  current: string[];
}

export interface ValueMemory {
  topValues: string[];
}

export interface StrengthMemory {
  strengths: string[];
}

export interface RelationshipMemory {
  attachmentStyle?: string | null;
  recurringPatterns: string[];
}

export interface PurposeMemory {
  aspirations: string[];
}

export interface JourneyMilestone {
  id: string;

  experienceId: string;

  completedAt: string;

  title: string;

  insight: string;
}

export function createEmptyMemory(): GenesisMemory {
  return {
    identity: {
  descriptors: [],

  publicTraits: [],

  privateTraits: [],

  labels: [],

  affirmations: [],
},

    emotions: {
      recurring: [],
      current: [],
    },

    values: {
      topValues: [],
    },

    strengths: {
      strengths: [],
    },

    relationships: {
      attachmentStyle: null,
      recurringPatterns: [],
    },

    purpose: {
      aspirations: [],
    },

    milestones: [],
  };
}