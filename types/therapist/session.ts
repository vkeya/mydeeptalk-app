export type SessionStatus =
  | "upcoming"
  | "completed"
  | "cancelled"
  | "missed";

export interface ClientSession {
  id: string;

  date: string;
  time: string;
  duration: string;

  type: "Virtual" | "In Person";

  status: SessionStatus;

  therapistNote?: string;
}

export interface SessionWorkspaceData {
  nextSession?: ClientSession;
  history: ClientSession[];
}