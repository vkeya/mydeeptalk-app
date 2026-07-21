"use client";

import GenesisButton from "@/components/journey/shared/GenesisButton";

interface GenesisFooterProps {
  canContinue?: boolean;
  onPrevious?: () => void;
  onContinue?: () => void;
  previousLabel?: string;
  continueLabel?: string;
}

export default function GenesisFooter({
  canContinue = true,
  onPrevious,
  onContinue,
  previousLabel = "Previous",
  continueLabel = "Continue",
}: GenesisFooterProps) {
  return (
    <footer className="flex items-center justify-between pt-8">
      <GenesisButton
        variant="secondary"
        onClick={onPrevious}
        disabled={!onPrevious}
      >
        ← {previousLabel}
      </GenesisButton>

      <GenesisButton
        onClick={onContinue}
        disabled={!canContinue}
      >
        {continueLabel} →
      </GenesisButton>
    </footer>
  );
}