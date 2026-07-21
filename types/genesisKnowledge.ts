/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Knowledge Graph Types
 * ------------------------------------------------------------------
 *
 * These types represent the structured knowledge generated from
 * Genesis Memory. They are intentionally independent from UI,
 * Firestore, JourneyContext and the Discovery Engine.
 *
 * Future engines built on these types:
 *
 * - Graph Builder
 * - Relationship Engine
 * - Hypothesis Engine
 * - Insight Engine
 * - Adaptive Prompt Engine
 * ------------------------------------------------------------------
 */
import { GenesisMemory } from "./genesisMemory";
import { DiscoveryResult } from "./genesisDiscoveryRule";


import { GenesisConcept } from "./genesisConcept";
import { GenesisInsight } from "./genesisInsight";
import { GenesisHypothesis } from "./genesisHypothesis";
import { ResolvedRelationship } from "./genesisRelationship";

export type KnowledgeNodeType =
  | "identity"
  | "emotion"
  | "value"
  | "strength"
  | "belief"
  | "relationship"
  | "life-event"
  | "goal"
  | "purpose"
  | "pattern";

export type KnowledgeRelationship =
  | "supports"
  | "contradicts"
  | "influences"
  | "causes"
  | "reinforces"
  | "weakens"
  | "derived-from"
  | "related-to";
  
export interface KnowledgeNode {
  id: string;
  type: KnowledgeNodeType;
  label: string;
  confidence: number;
  evidence: string[];
  firstDiscovered: string;
  lastUpdated: string;
}

export interface KnowledgeEdge {
  from: string;
  to: string;
  relationship: KnowledgeRelationship;
  confidence: number;
  evidence: string[];
}

export interface GenesisKnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}
export interface KnowledgeMetadata {
  experienceId: string;
  sceneId: string;
  responseCount: number;
  version: number;
  updatedAt: Date;
}

export interface GenesisKnowledge {
  /**
   * Current Genesis memory snapshot.
   */
  memory: GenesisMemory;

  /**
   * Canonical concepts extracted from memory.
   */
  concepts: GenesisConcept[];

  /**
   * Structured discoveries.
   */
  discoveries: DiscoveryResult;

  /**
   * Generated insights.
   */
  insights: GenesisInsight[];

  /**
   * Working hypotheses.
   */
  hypotheses: GenesisHypothesis[];

  /**
   * Resolved relationships.
   */
  relationships: ResolvedRelationship[];

  /**
   * Knowledge graph.
   */
  graph: GenesisKnowledgeGraph;

  /**
   * Processing metadata.
   */
  metadata: KnowledgeMetadata;
}