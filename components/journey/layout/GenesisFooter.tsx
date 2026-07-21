"use client";

import GenesisButton from "../shared/GenesisButton";

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
    <footer className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <GenesisButton
          variant="secondary"
          onClick={onPrevious}
          disabled={!onPrevious}
        >
          ← {previousLabel}
        </GenesisButton>

        <div className="hidden flex-1 text-center md:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Project Genesis
          </p>

          <p className="mt-1 text-sm font-semibold text-[#0F4C5C]">
            Keep Going
          </p>
        </div>

        <GenesisButton
          onClick={onContinue}
          disabled={!canContinue}
        >
          {continueLabel} →
        </GenesisButton>
      </div>
    </footer>
  );
}