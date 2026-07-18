"use client";

import type {
  HomeworkItem,
  HomeworkStatus,
} from "@/types/therapist/homework";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  CalendarDays,
  Circle,
} from "lucide-react";

type HomeworkSectionProps = {
  homework: HomeworkItem[];
};

const statusStyles: Record<
  HomeworkStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  assigned: {
    label: "Assigned",
    className: "bg-blue-100 text-blue-700",
    icon: Circle,
  },
  in_progress: {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
};

export default function HomeworkSection({
  homework,
}: HomeworkSectionProps) {
  const completed = homework.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Assignments"
          value={homework.length}
        />

        <SummaryCard
          label="Completed"
          value={completed}
        />

        <SummaryCard
          label="Outstanding"
          value={homework.length - completed}
        />
      </div>

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Homework & Interventions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Activities assigned to support treatment goals.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Assign Homework
          </button>
        </div>

        {homework.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No homework assigned yet.
          </div>
        ) : (
          <div className="divide-y">
            {homework.map((item) => {
              const StatusIcon =
                statusStyles[item.status].icon;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:justify-between"
                >
                  <div className="flex gap-4">
                    <div className="rounded-xl bg-indigo-100 p-3">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        {item.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          Assigned {item.assignedDate}
                        </span>

                        {item.dueDate && (
                          <span>
                            Due {item.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${statusStyles[item.status].className}`}
                    >
                      <StatusIcon className="h-4 w-4" />
                      {statusStyles[item.status].label}
                    </span>
                  </div>
                </div>
              );
            })}
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
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  );
}