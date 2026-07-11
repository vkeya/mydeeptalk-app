import JourneyButton from "./JourneyButton";

interface JourneyNavigationProps {
  showBack?: boolean;
  backLabel?: string;
  continueLabel?: string;
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
}

export default function JourneyNavigation({
  showBack = false,
  backLabel = "← Back",
  continueLabel = "Continue →",
  onBack,
  onContinue,
  continueDisabled = false,
}: JourneyNavigationProps) {
  return (
    <div className="mt-10 flex items-center justify-between">

      <div>
        {showBack && (
          <button
            onClick={onBack}
            className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            {backLabel}
          </button>
        )}
      </div>

      <JourneyButton
        onClick={onContinue}
        disabled={continueDisabled}
      >
        {continueLabel}
      </JourneyButton>

    </div>
  );
}