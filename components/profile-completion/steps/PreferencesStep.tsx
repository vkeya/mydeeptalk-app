"use client";

import ProfileProgress from "../ProfileProgress";

interface Preferences {
  dailyReflection: boolean;
  weeklyInsights: boolean;
  sessionReminders: boolean;
  productUpdates: boolean;
}

interface PreferencesStepProps {
  preferences: Preferences;
  onChange: (preferences: Preferences) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function PreferencesStep({
  preferences,
  onChange,
  onBack,
  onContinue,
}: PreferencesStepProps) {
  function toggle(key: keyof Preferences) {
    onChange({
      ...preferences,
      [key]: !preferences[key],
    });
  }

  const PreferenceCard = ({
    title,
    description,
    field,
  }: {
    title: string;
    description: string;
    field: keyof Preferences;
  }) => (
    <button
      type="button"
      onClick={() => toggle(field)}
      className={`w-full rounded-2xl border p-5 text-left transition ${
        preferences[field]
          ? "border-[#0F4C5C] bg-[#F4FBFC]"
          : "border-slate-200 bg-white hover:border-[#0F4C5C]/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div
          className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
            preferences[field]
              ? "border-[#0F4C5C] bg-[#0F4C5C] text-white"
              : "border-slate-300"
          }`}
        >
          {preferences[field] && "✓"}
        </div>
      </div>
    </button>
  );

  return (
    <div>
      <ProfileProgress
        step={4}
        totalSteps={5}
        title="How would you like us to support you?"
        description="Choose the types of encouragement and reminders you'd like to receive. You can change these at any time."
      />

      <div className="space-y-5">
        <PreferenceCard
          field="dailyReflection"
          title="Daily Reflection"
          description="Receive gentle prompts that encourage self-awareness and consistent emotional growth."
        />

        <PreferenceCard
          field="weeklyInsights"
          title="Weekly Insights"
          description="Receive a weekly summary highlighting your progress and patterns."
        />

        <PreferenceCard
          field="sessionReminders"
          title="Therapy Session Reminders"
          description="Be reminded before upcoming therapy sessions so you never miss one."
        />

        <PreferenceCard
          field="productUpdates"
          title="New Features & Healing Resources"
          description="Stay informed when new journeys, assessments, and wellness resources become available."
        />
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="rounded-xl bg-[#0F4C5C] px-8 py-3 font-semibold text-white transition hover:opacity-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}