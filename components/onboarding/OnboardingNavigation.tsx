"use client";

import { useRouter } from "next/navigation";

interface OnboardingNavigationProps {
  back?: string;
  next?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export default function OnboardingNavigation({
  back,
  next,
  nextLabel = "Continue",
  nextDisabled = false,
  
}: OnboardingNavigationProps) {
  const router = useRouter();

  return (
    <div className="mt-8 flex items-center justify-between">
      {back ? (
        <button
          type="button"
onClick={() => {
  if (next) {
    router.push(next);
  }
}}

 
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          ← Back
        </button>
      ) : (
        <div />
      )}

      {next && (
        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => router.push(next)}
          className={`rounded-xl px-8 py-3 font-semibold transition ${
            nextDisabled
              ? "cursor-not-allowed bg-slate-200 text-slate-500"
              : "bg-[#0B5D6B] text-white hover:bg-[#094955]"
          }`}
        >
          {nextLabel} →
        </button>
      )}
    </div>
  );
}