"use client";

import {
  ClipboardCheck,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";

export type AssessmentSummary = {
  totalCompleted: number;
  latestAssessment: string;
  averageScore: number;
  riskLevel: "Low" | "Moderate" | "High";
};

export type AssessmentResult = {
  id: string;
  name: string;
  completedAt: string;
  score: number;
  interpretation: string;
};

type AssessmentsSectionProps = {
  summary: AssessmentSummary;
  assessments: AssessmentResult[];
};

const riskColors = {
  Low: "bg-green-100 text-green-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function AssessmentsSection({
  summary,
  assessments,
}: AssessmentsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={ClipboardCheck}
          label="Completed"
          value={summary.totalCompleted}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          icon={TrendingUp}
          label="Average Score"
          value={`${summary.averageScore}%`}
          color="bg-green-100 text-green-600"
        />

        <StatCard
          icon={Clock}
          label="Latest Assessment"
          value={summary.latestAssessment}
          color="bg-indigo-100 text-indigo-600"
        />

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Risk Level
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  riskColors[summary.riskLevel]
                }`}
              >
                {summary.riskLevel}
              </span>
            </div>

            <div className="rounded-xl bg-red-100 p-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Assessment History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Completed assessments for this client.
          </p>
        </div>

        {assessments.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No assessments completed yet.
          </div>
        ) : (
          <div className="divide-y">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex flex-col gap-2 px-6 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {assessment.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {assessment.completedAt}
                  </p>
                </div>

                <div className="text-right">
                  <div className="font-semibold">
                    {assessment.score}%
                  </div>

                  <div className="text-sm text-gray-500">
                    {assessment.interpretation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type StatCardProps = {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}