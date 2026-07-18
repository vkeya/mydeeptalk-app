export type SessionStatus =
  | "upcoming"
  | "completed"
  | "cancelled"
  | "missed";

export interface ClientSession {
  id: string;
  
  clientId: string;
  therapistId: string;

  date: string;
  time: string;
  duration: string;

  type: "Virtual" | "In Person";

  status: SessionStatus;

  therapistNote?: string;
  
  meetingUrl?: string;
  cancellationReason?: string;

  createdAt: string;
  updatedAt: string;
}

export interface SessionWorkspaceData {
  nextSession?: ClientSession;
  history: ClientSession[];
}