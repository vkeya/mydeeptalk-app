import { DashboardIntelligence } from "./dashboardIntelligence";

// =====================================================
// Dashboard View Model
// =====================================================

export interface DashboardViewModel {
  welcome: WelcomeSection;
  todaysFocus: TodaysFocusModel;
  progress: JourneyProgressModel;
  insight: InsightModel;
  continueHealing: ContinueHealingModel;
  toolkit: ToolkitModel;
  timeline: HealingTimelineModel;

  // Dashboard Intelligence
  intelligence: DashboardIntelligence;
}

// =====================================================
// Welcome
// =====================================================

export interface WelcomeSection {
  greeting: string;
  userName: string;
  encouragement: string;
}

// =====================================================
// Today's Focus
// =====================================================

export interface TodaysFocusModel {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  priority: number;
}

// =====================================================
// Journey Progress
// =====================================================

export interface JourneyProgressModel {
  wellbeingScore: number;
  streak: number;
  journalEntries: number;
  genesisProgress: number;
  assessmentsCompleted: number;
  therapistSessions: number;
}

// =====================================================
// Insight
// =====================================================

export interface InsightModel {
  title: string;
  message: string;
  confidence: number;
  generatedAt: Date;
}

// =====================================================
// Continue Healing
// =====================================================

export interface ContinueHealingModel {
  activities: HealingActivity[];
}

export interface HealingActivity {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  badge?: string;
}

// =====================================================
// Toolkit
// =====================================================

export interface ToolkitModel {
  tools: ToolkitItem[];
}

export interface ToolkitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

// =====================================================
// Timeline
// =====================================================

export interface HealingTimelineModel {
  milestones: HealingMilestone[];
}

export interface HealingMilestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  icon: string;
  category: HealingMilestoneCategory;
}

export type HealingMilestoneCategory =
  | "assessment"
  | "genesis"
  | "journal"
  | "therapy"
  | "achievement"
  | "checkin"
  | "ai";