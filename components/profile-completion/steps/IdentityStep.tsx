"use client";

import ProfileProgress from "../ProfileProgress";

interface IdentityStepProps {
  privacyName: string;
  onPrivacyNameChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function IdentityStep({
  privacyName,
  onPrivacyNameChange,
  onBack,
  onContinue,
}: IdentityStepProps) {
  const isValid = privacyName.trim().length >= 3;

  return (
    <div>
      <ProfileProgress
        step={2}
        totalSteps={5}
        title="Choose Your Privacy Name"
        description="Your privacy name is how you'll appear throughout MyDeepTalk. Your real identity remains private unless you choose to share it."
      />

      <div className="rounded-2xl border border-[#E7C9A9] bg-[#FFF8F2] p-5 mb-8">
        <p className="text-sm text-slate-700 leading-7">
          Many people find it easier to be open when they know their identity is
          protected. Choose a name that feels comfortable and meaningful to you.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Privacy Name
        </label>

        <input
          type="text"
          value={privacyName}
          onChange={(e) => onPrivacyNameChange(e.target.value)}
          placeholder="e.g. Phoenix"
          className="w-full rounded-xl border border-slate-300 px-4 py-4 text-lg outline-none transition focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20"
        />

        <p className="mt-3 text-sm text-slate-500">
          This name will appear in your journal, assessments, AI conversations,
          Healing Circles, and therapist interactions where appropriate.
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          onClick={onContinue}
          disabled={!isValid}
          className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
            isValid
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