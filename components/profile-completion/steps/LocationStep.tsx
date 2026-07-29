"use client";

import ProfileProgress from "../ProfileProgress";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";
import Select from "react-select";
import TimezoneSelect from "react-timezone-select";

interface LocationStepProps {
  country: string;
  timezone: string;
  language: string;

  onCountryChange: (value: string) => void;
  onTimezoneChange: (value: string) => void;
  onLanguageChange: (value: string) => void;

  onBack: () => void;
  onContinue: () => void;
}

export default function LocationStep({
  country,
  timezone,
  language,
  onCountryChange,
  onTimezoneChange,
  onLanguageChange,
  onBack,
  onContinue,
}: LocationStepProps) {
  const isComplete =
    country.trim() !== "" &&
    timezone.trim() !== "" &&
    language.trim() !== "";

  return (
    <div>
      <ProfileProgress
        step={3}
        totalSteps={5}
        title="Tell Us About Yourself"
        description="These details help us personalize your experience, recommend therapists in your region, schedule sessions correctly, and deliver content in your preferred language."
      />

      <div className="space-y-8">
        {/* Country */}
        <div>
          <label className="mb-2 block font-semibold text-slate-800">
            Country
          </label>

          <Select
  options={countries.map((c) => ({
    value: c.code,
    label: c.name,
  }))}
  value={
    countries
      .map((c) => ({
        value: c.code,
        label: c.name,
      }))
      .find((c) => c.value === country) ?? null
  }
  onChange={(option) => onCountryChange(option?.value ?? "")}
  placeholder="Select your country..."
  isSearchable
/>
          <p className="mt-2 text-sm text-slate-500">
            Used for therapist matching, local resources, and currency.
          </p>
        </div>

        {/* Time Zone */}
        <div>
          <label className="mb-2 block font-semibold text-slate-800">
            Time Zone
          </label>

          <TimezoneSelect
  value={timezone}
  onChange={(tz) => onTimezoneChange(tz.value)}
/>

          <p className="mt-2 text-sm text-slate-500">
            Therapy sessions and reminders will use this timezone.
          </p>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block font-semibold text-slate-800">
            Preferred Language
          </label>

          <Select
  options={languages.map((l) => ({
    value: l.code,
    label: l.name,
  }))}
  value={
    languages
      .map((l) => ({
        value: l.code,
        label: l.name,
      }))
      .find((l) => l.value === language) ?? null
  }
  onChange={(option) => onLanguageChange(option?.value ?? "")}
  placeholder="Preferred language..."
  isSearchable
/>

          <p className="mt-2 text-sm text-slate-500">
            We'll display MyDeepTalk in your preferred language whenever available.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-50"
        >
          Back
        </button>

        <button
          onClick={onContinue}
          disabled={!isComplete}
          className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
            isComplete
              ? "bg-[#0F4C5C] hover:opacity-95"
              : "cursor-not-allowed bg-slate-300"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}