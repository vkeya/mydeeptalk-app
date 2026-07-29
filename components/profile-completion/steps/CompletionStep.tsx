"use client";

import ProfileProgress from "../ProfileProgress";

interface CompletionStepProps {
  onBack: () => void;
  onFinish: () => void;
}

export default function CompletionStep({
  onBack,
  onFinish,
}: CompletionStepProps) {
  return (
    <div>
      <ProfileProgress
        step={5}
        totalSteps={5}
        title="Your Safe Space Is Ready"
        description="Everything is set up. You're ready to begin your journey of self-discovery, healing, and growth with MyDeepTalk."
      />

      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <h2 className="text-xl font-semibold text-green-800">
          🎉 You're all set!
        </h2>

        <p className="mt-3 text-green-700 leading-7">
          Your private healing space has been prepared. From here you'll be
          able to explore guided self-discovery experiences, track your
          emotional wellbeing, connect with therapists, and build healthier
          habits at your own pace.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <FeatureRow
          title="Genesis Journey"
          description="Begin guided self-discovery experiences designed to help you understand yourself."
        />

        <FeatureRow
          title="Assessments"
          description="Measure your emotional wellbeing and monitor your progress over time."
        />

        <FeatureRow
          title="AI Companion"
          description="Reflect through meaningful conversations whenever you need support."
        />

        <FeatureRow
          title="Journal"
          description="Capture thoughts, emotions, gratitude, and personal growth."
        />

        <FeatureRow
          title="Therapists"
          description="Connect with licensed professionals whenever you're ready."
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
          onClick={onFinish}
          className="rounded-xl bg-[#0F4C5C] px-8 py-3 font-semibold text-white transition hover:opacity-95"
        >
          Begin My Journey
        </button>
      </div>
    </div>
  );
}

interface FeatureRowProps {
  title: string;
  description: string;
}

function FeatureRow({
  title,
  description,
}: FeatureRowProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4C5C] text-sm font-bold text-white">
        ✓
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}