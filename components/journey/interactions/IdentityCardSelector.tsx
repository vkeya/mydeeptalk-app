"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { IdentityCardOption } from "@/types/genesis";

interface IdentityCardSelectorProps {
  title: string;
 subtitle?: string;

  options: IdentityCardOption[];

  minSelections?: number;
  maxSelections?: number;

  continueLabel?: string;

  onComplete: (selected: IdentityCardOption[]) => void;
}

export default function IdentityCardSelector({
  title,
  subtitle,
  options,
  minSelections = 5,
  maxSelections = 5,
  continueLabel = "Continue",
  onComplete,
}: IdentityCardSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedIds.includes(option.id)),
    [options, selectedIds]
  );

  const toggleSelection = (option: IdentityCardOption) => {
    const exists = selectedIds.includes(option.id);

    if (exists) {
      setSelectedIds((current) =>
        current.filter((id) => id !== option.id)
      );
      return;
    }

    if (selectedIds.length >= maxSelections) return;

    setSelectedIds((current) => [...current, option.id]);
  };

  const canContinue = selectedIds.length >= minSelections;

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      <div className="text-center space-y-3">

        <h2 className="text-3xl font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mx-auto max-w-2xl text-slate-600">
            {subtitle}
          </p>
        )}

        <div className="inline-flex rounded-full bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700">
          {selectedIds.length} / {minSelections} Selected
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {options.map((option) => {
          const selected = selectedIds.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleSelection(option)}
              className={`
                relative rounded-2xl border p-5 text-left transition-all duration-200

                ${
                  selected
                    ? "border-indigo-600 bg-indigo-50 shadow-lg scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md"
                }
              `}
            >
              {selected && (
                <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}

              <div className="space-y-3">

                {option.icon && (
                  <div className="text-3xl">
                    {option.icon}
                  </div>
                )}

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {option.label}
                  </h3>

                  {option.description && (
                    <p className="mt-1 text-sm text-slate-500">
                      {option.description}
                    </p>
                  )}

                </div>

              </div>

            </button>
          );
        })}
      </div>

      <div className="flex justify-end">

        <button
          disabled={!canContinue}
          onClick={() => onComplete(selectedOptions)}
          className={`
            rounded-xl px-8 py-3 font-semibold transition

            ${
              canContinue
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "cursor-not-allowed bg-gray-200 text-gray-500"
            }
          `}
        >
          {continueLabel}
        </button>

      </div>

    </div>
  );
}