import { GenesisJourneyResult } from "@/types/genesisJourneyResult";
import { GenesisKnowledge } from "@/types/genesisKnowledge";
import { GenesisMemory } from "@/types/genesisMemory";
import { GenesisInsight } from "@/types/genesisInsight";
import { GenesisHypothesis } from "@/types/genesisHypothesis";
import { GenesisDiscovery } from "@/types/genesisDiscovery";


export interface GenesisRepository {
  /**
   * Journey
   */
  saveJourney(
    userId: string,
    journey: GenesisJourneyResult
  ): Promise<void>;

  loadJourney(
    userId: string,
    journeyId: string
  ): Promise<GenesisJourneyResult | null>;

  /**
   * Memory
   */
  saveMemory(
    userId: string,
    memory: GenesisMemory
  ): Promise<void>;

  loadMemory(
    userId: string
  ): Promise<GenesisMemory | null>;

  /**
   * Knowledge
   */
  saveKnowledge(
    userId: string,
    knowledge: GenesisKnowledge
  ): Promise<void>;

  loadKnowledge(
    userId: string
  ): Promise<GenesisKnowledge | null>;

  /**
   * Insights
   */
  saveInsight(
    userId: string,
    insight: GenesisInsight
  ): Promise<void>;

  loadInsights(
    userId: string
  ): Promise<GenesisInsight[]>;

  /**
   * Hypotheses
   */
  saveHypothesis(
    userId: string,
    hypothesis: GenesisHypothesis
  ): Promise<void>;

  loadHypotheses(
    userId: string
  ): Promise<GenesisHypothesis[]>;
}