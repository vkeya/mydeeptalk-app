export interface TherapistClientHeader {
  id: string;
  name: string;
  alias?: string;
  profilePhoto?: string;

  email: string;
  phone?: string;
  location?: string;

  status: "active" | "inactive";

  therapistSince?: string;

  nextSession?: {
    date: string;
    time: string;
  };

  totalSessions: number;
}

export interface TherapistClientStats {
  totalSessions: number;

  completedAssessments: number;

  activeJourney: string;

  wellbeingScore: number;

  streak: number;

  lastSession: string;
}