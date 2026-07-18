"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  ClientHeader,
  WorkspaceTabs,
  type WorkspaceTab,
} from "@/components/therapist/workspace";

import OverviewSection from "@/components/therapist/workspace/sections/OverviewSection";
import JourneySection from "@/components/therapist/workspace/sections/JourneySection";
import AssessmentsSection from "@/components/therapist/workspace/sections/AssessmentsSection";
import SessionsSection from "@/components/therapist/workspace/sections/SessionsSection";
import NotesSection from "@/components/therapist/workspace/sections/NotesSection";
import TreatmentSection from "@/components/therapist/workspace/sections/TreatmentSection";
import HomeworkSection from "@/components/therapist/workspace/sections/HomeworkSection";
import ResourcesSection from "@/components/therapist/workspace/sections/ResourcesSection";
import AIAssistantSection from "@/components/therapist/workspace/sections/AIAssistantSection";

import {
  getClientWorkspace,
  type TherapistClientWorkspace,
} from "@/lib/therapist/clientWorkspace";

export default function TherapistClientWorkspacePage() {
  const params = useParams();
  const clientId = params.clientId as string;

  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] =
    useState<TherapistClientWorkspace | null>(null);

  const [activeTab, setActiveTab] =
    useState<WorkspaceTab>("overview");

  useEffect(() => {
    async function loadWorkspace() {
      setLoading(true);

      try {
        const data = await getClientWorkspace(clientId);
        setWorkspace(data);
      } finally {
        setLoading(false);
      }
    }

    if (clientId) {
      loadWorkspace();
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border bg-white p-8">
          Loading workspace...
        </div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border bg-white p-8">
          Client workspace not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <ClientHeader
        id={clientId}
        name="Client"
        alias="Anonymous Client"
        email="client@example.com"
        status="active"
        therapistSince="Jan 2026"
        totalSessions={workspace.stats.totalSessions}
        nextSession={
          workspace.sessions.nextSession
            ? {
                date: workspace.sessions.nextSession.date,
                time: workspace.sessions.nextSession.time,
              }
            : undefined
        }
      />

      <WorkspaceTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "overview" && (
        <OverviewSection
          stats={workspace.stats}
          activities={workspace.activities}
        />
      )}

      {activeTab === "journey" && (
        <JourneySection {...workspace.journey} />
      )}

      {activeTab === "assessments" && (
        <AssessmentsSection
          summary={workspace.assessments.summary}
          assessments={workspace.assessments.history}
        />
      )}

      {activeTab === "sessions" && (
        <SessionsSection
          nextSession={workspace.sessions.nextSession}
          sessions={workspace.sessions.history}
        />
      )}

      {activeTab === "notes" && (
        <NotesSection
  clientId={clientId}
  notes={workspace.notes}
/>
      )}

      {activeTab === "treatment" && (
        <TreatmentSection
          goals={workspace.treatment}
        />
      )}

      {activeTab === "homework" && (
        <HomeworkSection
          homework={workspace.homework}
        />
      )}

      {activeTab === "resources" && (
        <ResourcesSection
          resources={workspace.resources}
        />
      )}

      {activeTab === "ai" && (
        <AIAssistantSection
          insights={workspace.ai}
        />
      )}
    </div>
  );
}