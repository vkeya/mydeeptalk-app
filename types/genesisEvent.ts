export type GenesisEventType =
  | "discovery.created"
  | "memory.updated"
  | "concept.registered"
  | "relationship.resolved"
  | "insight.generated"
   | "hypothesis.generated"
  | "hypothesis.updated"
  | "graph.updated"
  | "prompt.selected"
  | "journey.completed"
  | "scene.completed"
  | "achievement.unlocked"
  | "milestone.reached";

export interface GenesisEvent<T = unknown> {
  /**
   * Unique event id.
   */
  id: string;

  /**
   * Event type.
   */
  type: GenesisEventType;

  /**
   * Engine that emitted it.
   */
  source: string;

  /**
   * Event payload.
   */
  payload: T;

  /**
   * Creation time.
   */
  createdAt: Date;
}

export interface GenesisEventHandler<T = unknown> {
  (
    event: GenesisEvent<T>
  ): void | Promise<void>;
}