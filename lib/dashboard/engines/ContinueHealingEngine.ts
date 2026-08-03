import {
  ContinueHealingModel,
  HealingActivity,
} from "../types";
import { GenesisDashboardSummary } from "@/lib/genesis/GenesisService";
import { JournalDashboardSummary } from "@/lib/journal/JournalService";
import { AssessmentDashboardSummary } from "@/lib/assessment/AssessmentService";
import { TherapyDashboardSummary } from "@/lib/therapy/TherapyService";
import { CheckInDashboardSummary } from "@/lib/checkin/CheckInService";


export interface ContinueHealingContext {
  genesis: GenesisDashboardSummary;
  journal: JournalDashboardSummary;
  assessment: AssessmentDashboardSummary;
  therapy: TherapyDashboardSummary;
  checkIn: CheckInDashboardSummary;
}

export class ContinueHealingEngine {
  build(context: ContinueHealingContext) {
  const activities: HealingActivity[] = [];

  if (context.genesis.nextAction) {
    activities.push({
      id: "genesis",
      icon: "🌱",
      title: context.genesis.nextAction.title,
      description: context.genesis.nextAction.description,
      actionLabel: context.genesis.nextAction.actionLabel,
      href: context.genesis.nextAction.href,
    });
  }

  if (context.journal.nextAction) {
    activities.push({
      id: "journal",
      icon: "📖",
      title: context.journal.nextAction.title,
      description: context.journal.nextAction.description,
      actionLabel: context.journal.nextAction.actionLabel,
      href: context.journal.nextAction.href,
    });
  }

  if (context.assessment.nextAction) {
    activities.push({
      id: "assessment",
      icon: "🧠",
      title: context.assessment.nextAction.title,
      description: context.assessment.nextAction.description,
      actionLabel: context.assessment.nextAction.actionLabel,
      href: context.assessment.nextAction.href,
    });
  }

  if (context.therapy.nextAction) {
    activities.push({
      id: "therapy",
      icon: "💬",
      title: context.therapy.nextAction.title,
      description: context.therapy.nextAction.description,
      actionLabel: context.therapy.nextAction.actionLabel,
      href: context.therapy.nextAction.href,
    });
  }

  if (context.checkIn.nextAction) {
    activities.push({
      id: "checkin",
      icon: "❤️",
      title: context.checkIn.nextAction.title,
      description: context.checkIn.nextAction.description,
      actionLabel: context.checkIn.nextAction.actionLabel,
      href: context.checkIn.nextAction.href,
    });
  }

  return {
    activities,
  };
}
}

export const continueHealingEngine = new ContinueHealingEngine();