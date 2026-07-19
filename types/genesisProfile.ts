import { GenesisMemory } from "./genesisMemory";

export interface GenesisProfile extends GenesisMemory {
  userId: string;

  createdAt: string;

  updatedAt: string;

  version: number;
}