"use client";

import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

type ProgressData = {
  sessionAttendance: number;
  homeworkCompletion: number;
  treatmentCompletion: number;
  overallProgress: number;
};

type RiskData = {
  level: "low" | "medium" | "high";
  missedSessions: number;
  overdueHomework: number;
  stalledGoals: number;
  alerts: string[];
};

type ClinicalSummaryProps = {
  progress: ProgressData;
  risk: RiskData;
};

function getRiskBadge(level: RiskData["level"]) {
  switch (level) {
    case "high":
      return {
        label: "High",
        classes:
          "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
      };

    case "medium":
      return {
        label: "Medium",
        classes:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",
      };

    default:
      return {
        label: "Low",
        classes:
          "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
      };
  }
}

export default function ClinicalSummary({
  progress,
  risk,
}: ClinicalSummaryProps) {
  const riskBadge = getRiskBadge(risk.level);

  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Clinical Summary
          </h2>

          <p className="text-sm text-muted-foreground">
            Client engagement and treatment overview.
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${riskBadge.classes}`}
        >
          {riskBadge.label} Risk
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Overall Progress"
          value={`${progress.overallProgress}%`}
        />

        <MetricCard
          title="Session Attendance"
          value={`${progress.sessionAttendance}%`}
        />

        <MetricCard
          title="Homework Completion"
          value={`${progress.homeworkCompletion}%`}
        />

        <MetricCard
          title="Treatment Completion"
          value={`${progress.treatmentCompletion}%`}
        />
      </div>

      <div className="rounded-lg border p-4">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />

          <h3 className="font-medium">
            Therapist Alerts
          </h3>
        </div>

        {risk.alerts.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            No current clinical concerns.
          </div>
        ) : (
          <ul className="space-y-2">
            {risk.alerts.map(alert => (
              <li
                key={alert}
                className="flex items-start gap-2 text-sm"
              >
                <TrendingUp className="mt-0.5 h-4 w-4 text-amber-500" />
                {alert}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
};

function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}