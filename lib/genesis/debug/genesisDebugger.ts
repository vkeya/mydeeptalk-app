export interface GenesisDebugEvent {
  stage: string;
  timestamp: number;
  duration: number;
  metadata?: Record<string, unknown>;
}

export interface GenesisDebugSession {
  id: string;

  events: GenesisDebugEvent[];

  startedAt: number;

  completedAt?: number;
}

export class GenesisDebugger {
  startSession(): GenesisDebugSession {
    return {
      id: crypto.randomUUID(),
      events: [],
      startedAt: Date.now(),
    };
  }

  record(
    session: GenesisDebugSession,
    event: GenesisDebugEvent
  ): void {
    session.events.push(event);
  }

  finish(session: GenesisDebugSession): GenesisDebugSession {
    session.completedAt = Date.now();
    return session;
  }

  export(session: GenesisDebugSession): GenesisDebugSession {
    return session;
  }
}

export const genesisDebugger = new GenesisDebugger();