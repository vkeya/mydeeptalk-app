"use client";

import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ClipboardList,
  Brain,
  ArrowRight,
} from "lucide-react";

export type AIInsight = {
  id: string;
  category:
    | "summary"
    | "risk"
    | "recommendation"
    | "journey"
    | "homework";
  title: string;
  description: string;
};

type AIAssistantSectionProps = {
  insights: AIInsight[];
};

const categoryStyles: Record<
  AIInsight["category"],
  {
    icon: React.ElementType;
    badge: string;
  }
> = {
  summary: {
    icon: ClipboardList,
    badge: "bg-blue-100 text-blue-700",
  },
  risk: {
    icon: AlertTriangle,
    badge: "bg-red-100 text-red-700",
  },
  recommendation: {
    icon: Lightbulb,
    badge: "bg-amber-100 text-amber-700",
  },
  journey: {
    icon: Brain,
    badge: "bg-green-100 text-green-700",
  },
  homework: {
    icon: Sparkles,
    badge: "bg-indigo-100 text-indigo-700",
  },
};

export default function AIAssistantSection({
  insights,
}: AIAssistantSectionProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-indigo-600 p-3">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              AI Clinical Copilot
            </h2>

            <p className="mt-2 text-gray-700">
              AI assists by organizing information, identifying
              patterns, and generating suggestions. All clinical
              decisions remain under the therapist's judgment.
            </p>
          </div>
        </div>
      </div>

      {insights.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500 shadow-sm">
          No AI insights available yet.
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon =
              categoryStyles[insight.category].icon;

            return (
              <div
                key={insight.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`rounded-xl p-3 ${categoryStyles[insight.category].badge}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {insight.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        {insight.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Review

                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl border bg-yellow-50 border-yellow-200 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-700" />

          <div>
            <h3 className="font-semibold text-yellow-900">
              Clinical Responsibility
            </h3>

            <p className="mt-2 text-sm text-yellow-800">
              AI-generated summaries, recommendations, and risk flags
              are intended to support therapists. They should always be
              reviewed alongside clinical judgment and should not be
              treated as diagnoses or final clinical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}