import { dashboardBuilder } from "./builders/DashboardBuilder";
import { DashboardViewModel } from "./types";
import { continueHealingEngine } from "./engines/ContinueHealingEngine";
import { toolkitEngine } from "./engines/ToolkitEngine";
import { insightEngine } from "./engines/InsightEngine";
import { dashboardRepository } from "./repositories/FirestoreDashboardRepository";
import { genesisService } from "@/lib/genesis/GenesisService";
import { journalService } from "@/lib/journal/JournalService";
import { assessmentService } from "@/lib/assessment/AssessmentService";
import { therapyService } from "@/lib/therapy/TherapyService";
import { checkInService } from "@/lib/checkin/CheckInService";
import { generateDashboardIntelligence } from "./dashboardIntelligence";


export class DashboardService {
  async build(userId: string): Promise<DashboardViewModel> {

const profile = await dashboardRepository.getUserProfile(userId);	  
	 const genesis = await genesisService.getDashboardSummary(userId);

const journal = await journalService.getDashboardSummary(userId);

const assessment = await assessmentService.getDashboardSummary(userId);

const therapy = await therapyService.getDashboardSummary(userId);

const checkIn = await checkInService.getDashboardSummary(userId); 
    
	 const healingActivities =
       await dashboardRepository.getHealingActivities(userId);

const intelligence = generateDashboardIntelligence({
  genesis,
  assessment,
  journal,
  therapy,
  checkIn,
});
	
	return dashboardBuilder.build({
     welcome: {
  greeting: "Good afternoon", // we'll make this dynamic next
  userName:
    profile?.profile?.privacyName ??
    profile?.fullName ??
    "Friend",
  encouragement:
    "Every small step you take today matters.",
},

checkIn: {
  hasCheckedInToday:
    checkIn.latestCheckInDate !== null,

  currentMood: checkIn.currentMood,

  latestCheckInDate:
    checkIn.latestCheckInDate,
},

      todaysFocus: {
        title: "Complete today's emotional check-in",
        description:
          "Take a few minutes to reflect on how you're feeling today.",
        actionLabel: "Start Check-In",
        href: "/check-in",
        priority: 80,
      },

      progress: {
        wellbeingScore: 72,
        streak: 14,
        journalEntries: 18,
        genesisProgress: 42,
        assessmentsCompleted: 5,
        therapistSessions: 3,
      },

      insight: insightEngine.build({
  title: "You're building consistency",
  message:
    "You've continued showing up for yourself this week. Keep going.",
  confidence: 0.9,
  generatedAt: new Date(),
}),

     
continueHealing: continueHealingEngine.build({
  genesis,
  journal,
  assessment,
  therapy,
  checkIn,
}),

      toolkit: toolkitEngine.build({
  tools: [],
}),

      timeline: {
  milestones: [],
},

intelligence,
    });
  }
}

export const dashboardService = new DashboardService();