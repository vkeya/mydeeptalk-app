"use client";

interface JourneyNavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
}

export default function JourneyNavigation({
  showBack = false,
  onBack,
  onContinue,
  continueDisabled = false,
  continueLabel = "Continue",
}: JourneyNavigationProps) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <div>
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100"
          >
            Back
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={continueDisabled}
        className="rounded-xl bg-[#8A6E4B] px-6 py-3 font-medium text-white transition hover:bg-[#73593b] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {continueLabel}
      </button>
    </div>
  );
}