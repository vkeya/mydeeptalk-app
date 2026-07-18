"use client";

import {
  CalendarDays,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

export type SessionStatus =
  | "upcoming"
  | "completed"
  | "cancelled"
  | "missed";

export type ClientSession = {
  id: string;
  date: string;
  time: string;
  duration: string;
  type: "Virtual" | "In Person";
  status: SessionStatus;
  therapistNote?: string;
};

type SessionsSectionProps = {
  nextSession?: ClientSession;
  sessions: ClientSession[];
};

const statusStyles: Record<
  SessionStatus,
  {
    icon: React.ElementType;
    badge: string;
  }
> = {
  upcoming: {
    icon: CalendarDays,
    badge: "bg-blue-100 text-blue-700",
  },
  completed: {
    icon: CheckCircle2,
    badge: "bg-green-100 text-green-700",
  },
  cancelled: {
    icon: XCircle,
    badge: "bg-red-100 text-red-700",
  },
  missed: {
    icon: AlertCircle,
    badge: "bg-yellow-100 text-yellow-700",
  },
};

export default function SessionsSection({
  nextSession,
  sessions,
}: SessionsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Next Session
          </h2>
        </div>

        {!nextSession ? (
          <div className="p-8 text-center text-gray-500">
            No upcoming session scheduled.
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {nextSession.date}
              </h3>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {nextSession.time}
                </span>

                <span>{nextSession.duration}</span>

                <span>{nextSession.type}</span>
              </div>
            </div>

            {nextSession.type === "Virtual" && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                <Video className="h-5 w-5" />
                Join Session
              </button>
            )}
          </div>
        )}
      </div>

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Session History
          </h2>
        </div>

        {sessions.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No sessions available.
          </div>
        ) : (
          <div className="divide-y">
            {sessions.map((session) => {
              const StatusIcon =
                statusStyles[session.status].icon;

              return (
                <div
                  key={session.id}
                  className="px-6 py-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">
                          {session.date}
                        </h3>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            statusStyles[session.status].badge
                          }`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {session.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{session.time}</span>
                        <span>{session.duration}</span>
                        <span>{session.type}</span>
                      </div>

                      {session.therapistNote && (
                        <p className="mt-3 text-sm text-gray-600">
                          {session.therapistNote}
                        </p>
                      )}
                    </div>
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