import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { genesisPaths } from "./firestorePaths";
import { GenesisRepository } from "./GenesisRepository";
import {
  deserializeKnowledge,
  deserializeMemory,
  serializeKnowledge,
  serializeMemory,
} from "./serializers";

import { GenesisJourneyResult } from "@/types/genesisJourneyResult";
import { GenesisKnowledge } from "@/types/genesisKnowledge";
import { GenesisMemory } from "@/types/genesisMemory";
import { GenesisInsight } from "@/types/genesisInsight";
import { GenesisHypothesis } from "@/types/genesisHypothesis";
import { GenesisDiscovery } from "@/types/genesisDiscovery";

export class FirestoreGenesisRepository implements GenesisRepository {
  /**
   * Journey History
   */
  async saveJourney(
    userId: string,
    journey: GenesisJourneyResult
  ): Promise<void> {
    throw new Error("Not implemented.");
  }

  async loadJourney(
    userId: string,
    journeyId: string
  ): Promise<GenesisJourneyResult | null> {
    throw new Error("Not implemented.");
  }

  /**
   * Cognitive Memory
   */
  async saveMemory(
    userId: string,
    memory: GenesisMemory
  ): Promise<void> {
    const memoryRef = doc(
      db,
      "users",
      userId,
      "genesis",
      "memory",
      "current"
    );

    await setDoc(
      memoryRef,
      serializeMemory(memory),
      {
        merge: true,
      }
    );
  }

  async loadMemory(
  userId: string
): Promise<GenesisMemory | null> {
  const memoryRef = genesisPaths.memory(userId);

  const snapshot = await getDoc(memoryRef);

  if (!snapshot.exists()) {
    return null;
  }

  return deserializeMemory(snapshot.data());
}

  /**
   * Knowledge Graph
   */
  async saveKnowledge(
  userId: string,
  knowledge: GenesisKnowledge
): Promise<void> {
  const knowledgeRef = genesisPaths.knowledge(userId);

  await setDoc(
    knowledgeRef,
    serializeKnowledge(knowledge),
    {
      merge: true,
    }
  );
}

  async loadKnowledge(
  userId: string
): Promise<GenesisKnowledge | null> {
  const knowledgeRef = doc(
    db,
    "users",
    userId,
    "genesis",
    "knowledge",
    "current"
  );

  const snapshot = await getDoc(knowledgeRef);

  if (!snapshot.exists()) {
    return null;
  }

  return deserializeKnowledge(snapshot.data());
}

  /**
   * Discoveries
   */
  async saveDiscovery(
    userId: string,
    discovery: GenesisDiscovery
  ): Promise<void> {
    throw new Error("Not implemented.");
  }

  async loadDiscoveries(
    userId: string
  ): Promise<GenesisDiscovery[]> {
    throw new Error("Not implemented.");
  }

  /**
   * Insights
   */
  async saveInsight(
    userId: string,
    insight: GenesisInsight
  ): Promise<void> {
    throw new Error("Not implemented.");
  }

  async loadInsights(
    userId: string
  ): Promise<GenesisInsight[]> {
    throw new Error("Not implemented.");
  }

  /**
   * Hypotheses
   */
  async saveHypothesis(
    userId: string,
    hypothesis: GenesisHypothesis
  ): Promise<void> {
    throw new Error("Not implemented.");
  }

  async loadHypotheses(
    userId: string
  ): Promise<GenesisHypothesis[]> {
    throw new Error("Not implemented.");
  }
}