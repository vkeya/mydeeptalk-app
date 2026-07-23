/**
 * ------------------------------------------------------------------
 * Project Genesis
 * Cognitive Diff Types
 * ------------------------------------------------------------------
 *
 * Represents the change between two cognitive snapshots.
 */

export interface ConfidenceChange {
  previous: number;
  current: number;
  delta: number;
}

export interface ChangedConcept {
  key: string;
  label: string;
  change: ConfidenceChange;
}

export interface ChangedRelationship {
  source: string;
  target: string;
  relationship: string;
  change: ConfidenceChange;
}

export interface CognitiveDiff {
  previousSnapshotId: string;

  currentSnapshotId: string;

  newConcepts: string[];

  removedConcepts: string[];

  strengthenedConcepts: ChangedConcept[];

  weakenedConcepts: ChangedConcept[];

  newRelationships: ChangedRelationship[];

  strengthenedRelationships: ChangedRelationship[];

  weakenedRelationships: ChangedRelationship[];

  newHypotheses: string[];

  retiredHypotheses: string[];

  newInsights: string[];

  generatedAt: Date;
}