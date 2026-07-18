"use client";

import {
  BookOpen,
  FileText,
  PlayCircle,
  Download,
  ExternalLink,
} from "lucide-react";

export type ResourceType =
  | "worksheet"
  | "article"
  | "video"
  | "exercise"
  | "journey";

export type TherapyResource = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
};

type ResourcesSectionProps = {
  resources: TherapyResource[];
};

const resourceIcons: Record<ResourceType, React.ElementType> = {
  worksheet: FileText,
  article: BookOpen,
  video: PlayCircle,
  exercise: BookOpen,
  journey: BookOpen,
};

const resourceBadges: Record<ResourceType, string> = {
  worksheet: "bg-blue-100 text-blue-700",
  article: "bg-green-100 text-green-700",
  video: "bg-red-100 text-red-700",
  exercise: "bg-purple-100 text-purple-700",
  journey: "bg-indigo-100 text-indigo-700",
};

export default function ResourcesSection({
  resources,
}: ResourcesSectionProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Resource Library
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Therapist resources available for this client.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Assign Resource
          </button>
        </div>

        {resources.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No resources assigned.
          </div>
        ) : (
          <div className="divide-y">
            {resources.map((resource) => {
              const Icon = resourceIcons[resource.type];

              return (
                <div
                  key={resource.id}
                  className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-start lg:justify-between"
                >
                  <div className="flex gap-4">
                    <div className="rounded-xl bg-gray-100 p-3">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-gray-900">
                          {resource.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${resourceBadges[resource.type]}`}
                        >
                          {resource.type}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        {resource.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg border p-2 hover:bg-gray-100"
                      title="Open"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg border p-2 hover:bg-gray-100"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
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