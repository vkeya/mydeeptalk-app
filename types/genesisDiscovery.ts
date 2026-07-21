export enum DiscoveryCategory {
  Identity = "identity",
  Emotion = "emotion",
  Value = "value",
  Strength = "strength",
  Relationship = "relationship",
  Purpose = "purpose",
}

export interface GenesisDiscovery {
  id: string;
  
  sceneId: string;

  response: string;

  category: DiscoveryCategory;

  title: string;

  description?: string;

  confidence: number;

  sourceExperience: string;

  createdAt: string;
}