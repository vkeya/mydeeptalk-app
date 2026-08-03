"use client";

import ProfileProgress from "../ProfileProgress";

interface WelcomeStepProps {
  onContinue: () => void;
}

export default function WelcomeStep({
  onContinue,
}: WelcomeStepProps) {
  return (
    <div>
      <ProfileProgress
        step={1}
        totalSteps={5}
        title="Welcome Home"
        description="Before we begin your healing journey, let's personalize your space. These few steps help us create a private, safe, and meaningful experience designed just for you."
      />

      <div className="rounded-2xl border border-[#E7C9A9] bg-[#FFF8F2] p-6">
        <h2 className="text-lg font-semibold text-[#0F4C5C]">
          What you'll set up
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">🛡️</span>
            <div>
              <p className="font-medium text-slate-900">
                Privacy Identity
              </p>
              <p className="text-sm text-slate-600">
                Choose a name that protects your identity while allowing you to
                express yourself freely.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🌍</span>
            <div>
              <p className="font-medium text-slate-900">
                Location & Language
              </p>
              <p className="text-sm text-slate-600">
                We'll tailor therapists, time zones, and content to your region.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <p className="font-medium text-slate-900">
                Personal Preferences
              </p>
              <p className="text-sm text-slate-600">
                Customize reminders and your healing experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-10 w-full rounded-xl bg-[#0F4C5C] py-4 text-lg font-semibold text-white transition hover:opacity-95"
      >
        Let's Begin
      </button>
    </div>
  );
}