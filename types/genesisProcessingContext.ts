import { GenesisMemory } from "./genesisMemory";
import { GenesisKnowledge } from "./genesisKnowledge";
import { GenesisJourneyResult } from "./genesisJourneyResult";
import { DiscoveryResult } from "./genesisDiscoveryRule";

export interface GenesisProcessingContext {
  userId: string;

  memory: GenesisMemory;

  knowledge: GenesisKnowledge;

  discoveries?: DiscoveryResult;

  result?: GenesisJourneyResult;
}