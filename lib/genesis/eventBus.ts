import {
  GenesisEvent,
  GenesisEventHandler,
  GenesisEventType,
} from "@/types/genesisEvent";

export class GenesisEventBus {
  private handlers = new Map<
    GenesisEventType,
    GenesisEventHandler[]
  >();

  /**
   * Subscribe to an event.
   */
  on(
    type: GenesisEventType,
    handler: GenesisEventHandler
  ) {
    const handlers =
      this.handlers.get(type) ?? [];

    handlers.push(handler);

    this.handlers.set(type, handlers);
  }

  /**
   * Remove a handler.
   */
  off(
    type: GenesisEventType,
    handler: GenesisEventHandler
  ) {
    const handlers =
      this.handlers.get(type) ?? [];

    this.handlers.set(
      type,
      handlers.filter((h) => h !== handler)
    );
  }

  /**
   * Emit an event.
   */
  async emit(
    event: GenesisEvent
  ) {
    const handlers =
      this.handlers.get(event.type) ?? [];

    for (const handler of handlers) {
      await handler(event);
    }
  }

  /**
   * Clear listeners.
   */
  clear() {
    this.handlers.clear();
  }
}

export const genesisEventBus =
  new GenesisEventBus();