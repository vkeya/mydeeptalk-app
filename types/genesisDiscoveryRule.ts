import {
  DiscoveryCategory,
  GenesisDiscovery,
} from "./genesisDiscovery";

export interface DiscoveryRule {
  id: string;

  category: DiscoveryCategory;

  trigger: string;

  title: string;

  confidence: number;

  description?: string;
}

export interface DiscoveryContext {
  experienceId: string;

  sceneId: string;

  response: string;
}

export interface DiscoveryResult {
  discoveries: GenesisDiscovery[];

  matchedRules: DiscoveryRule[];
}