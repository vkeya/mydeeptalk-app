import { DashboardRepository } from "./DashboardRepository";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HealingActivity } from "../types";


export class FirestoreDashboardRepository
  implements DashboardRepository
{
	
  
  async getUserProfile(userId: string): Promise<any> {
  const snapshot = await getDoc(
    doc(db, "users", userId)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

  async getLatestAssessment(userId: string): Promise<unknown> {
    return null;
  }

  async getLatestCheckIn(userId: string): Promise<unknown> {
    return null;
  }

  async getJournalSummary(userId: string): Promise<unknown> {
    return null;
  }

  async getGenesisProgress(userId: string): Promise<unknown> {
    return null;
  }

  async getUpcomingTherapySessions(
    userId: string
  ): Promise<unknown> {
    return null;
  }

  async getHealingActivities(
    userId: string
): Promise<HealingActivity[]> {
  // Temporary implementation.
  // This will later aggregate Genesis, Journal,
  // Therapy Sessions and Assessments.
  return [];
}

  async getToolkit(userId: string): Promise<unknown> {
    return null;
  }
}

export const dashboardRepository =
  new FirestoreDashboardRepository();