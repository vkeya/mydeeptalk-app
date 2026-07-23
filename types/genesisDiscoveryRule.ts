import {
  DiscoveryCategory,
  GenesisDiscovery,
} from "./genesisDiscovery";

export interface DiscoveryRule {
  id: string;
  sceneId: string;
  category: DiscoveryCategory;

  trigger: string;
triggers?: string[];
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