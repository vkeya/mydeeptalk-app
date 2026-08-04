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
import { journeyStateBuilder } from "@/lib/healingJourney/JourneyStateBuilder";
import { healingJourneyEngine } from "@/lib/healingJourney/HealingJourneyEngine";
import { dashboardJourneyAdapter } from "@/lib/healingJourney/DashboardJourneyAdapter";

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

const journeyState = journeyStateBuilder.build({
  userId,

  wellbeingScore: checkIn.wellbeingScore ?? 50,

  currentMood: checkIn.currentMood,

  hasCheckedInToday:
    checkIn.latestCheckInDate !== null,

  checkInStreak:
    checkIn.streak ?? 0,

  assessmentsCompleted:
    assessment.completedAssessments ?? 0,

  genesisStarted:
    genesis.progress > 0,

  genesisCompleted:
    genesis.progress >= 100,

  genesisProgress:
    genesis.progress ?? 0,

  journalEntries:
  journal.journalEntries ?? 0,

  therapistSessions:
    therapy.completedSessions ?? 0,

  activeGoals: [],
});

const healingJourney =
  healingJourneyEngine.build(journeyState);
	
	return dashboardBuilder.build({
     welcome: {
  greeting: "Good afternoon",

  userName:
    profile?.profile?.privacyName ??
    profile?.fullName ??
    "Friend",

  title:
    healingJourney.recommendation.title,

  message:
    healingJourney.recommendation.description,

 actionLabel: "Continue Your Healing",

actionHref: "/check-in",
},

checkIn: {
  hasCheckedInToday:
    checkIn.latestCheckInDate !== null,

  currentMood: checkIn.currentMood,

  latestCheckInDate:
    checkIn.latestCheckInDate,
},

      todaysFocus: {
  title: healingJourney.recommendation.title,

  description:
    healingJourney.recommendation.description,

  actionLabel:
    healingJourney.recommendation.actionLabel,

  href:
    healingJourney.recommendation.actionHref,

  priority: 100,
},

      progress:
  dashboardJourneyAdapter.toProgress(
    healingJourney
  ),

      insight: insightEngine.build({
  title:
  healingJourney.progress.momentum === "accelerating"
    ? "You're building momentum"
    : healingJourney.progress.momentum === "steady"
      ? "You're staying consistent"
      : healingJourney.progress.momentum === "slowing"
        ? "A gentle reminder"
        : "Let's get back on track",

  message:
  healingJourney.progress.momentum === "accelerating"
    ? "Your recent actions are creating positive momentum. Keep showing up for yourself."
    : healingJourney.progress.momentum === "steady"
      ? "Consistency is one of the strongest predictors of long-term healing. Keep going."
      : healingJourney.progress.momentum === "slowing"
        ? "Small, intentional actions today can help rebuild your momentum."
        : "Every healing journey has pauses. Today is an opportunity to take one small step forward.",

  confidence: 0.95,

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