"use client";



export type WorkspaceTab =
  | "overview"
  | "journey"
  | "assessments"
  | "sessions"
  | "notes"
  | "treatment"
  | "homework"
  | "resources"
  | "ai";

export type WorkspaceTabItem = {
  id: WorkspaceTab;
  label: string;
};

const defaultTabs: WorkspaceTabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "journey", label: "Journey" },
  { id: "assessments", label: "Assessments" },
  { id: "sessions", label: "Sessions" },
  { id: "notes", label: "Notes" },
  { id: "treatment", label: "Treatment Plan" },
  { id: "homework", label: "Homework" },
  { id: "resources", label: "Resources" },
  { id: "ai", label: "AI Assistant" },
];

type WorkspaceTabsProps = {
  tabs?: WorkspaceTabItem[];
  activeTab: WorkspaceTab;
  onChange: (tab: WorkspaceTab) => void;
};

export default function WorkspaceTabs({
  tabs = defaultTabs,
  activeTab,
  onChange,
}: WorkspaceTabsProps) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <nav className="flex min-w-max gap-2 p-3">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={
  "rounded-xl px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap " +
  (active
    ? "bg-indigo-600 text-white shadow"
    : "text-gray-600 hover:bg-gray-100")
}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}