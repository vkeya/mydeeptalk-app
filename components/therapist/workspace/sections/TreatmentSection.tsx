"use client";

import {
  Target,
  CheckCircle2,
  Circle,
  CalendarDays,
} from "lucide-react";

export type TreatmentGoal = {
  id: string;
  title: string;
  description: string;
  targetDate?: string;
  completed: boolean;
};

type TreatmentSectionProps = {
  goals: TreatmentGoal[];
};

export default function TreatmentSection({
  goals,
}: TreatmentSectionProps) {
  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Total Goals"
          value={goals.length}
        />

        <SummaryCard
          label="Completed"
          value={completedGoals}
        />

        <SummaryCard
          label="In Progress"
          value={goals.length - completedGoals}
        />
      </div>

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Treatment Goals
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Agreed clinical goals for this client.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No treatment goals created yet.
          </div>
        ) : (
          <div className="divide-y">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-start lg:justify-between"
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    {goal.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {goal.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {goal.description}
                    </p>

                    {goal.targetDate && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        Target: {goal.targetDate}
                      </div>
                    )}
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    goal.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {goal.completed
                    ? "Completed"
                    : "In Progress"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: number;
};

function SummaryCard({
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-indigo-100 p-3">
          <Target className="h-5 w-5 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}