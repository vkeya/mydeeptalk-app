"use client";

import { useState } from "react";

import GenesisSection from "@/components/journey/shared/GenesisSection";
import GenesisCard from "@/components/journey/shared/GenesisCard";
import GenesisButton from "@/components/journey/shared/GenesisButton";

import { EmotionOption } from "@/types/genesis";

interface EmotionCompassProps {
  title?: string;
  subtitle?: string;
  emotions: EmotionOption[];
  continueLabel?: string;
  onComplete: (emotion: EmotionOption) => void;
}

export default function EmotionCompass({
  title = "How are you feeling right now?",
  subtitle = "Choose the emotion that best describes your current experience.",
  emotions,
  continueLabel = "Continue",
  onComplete,
}: EmotionCompassProps) {
  const [selected, setSelected] = useState<EmotionOption | null>(null);

  return (
    <GenesisSection
      title={title}
      subtitle={subtitle}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {emotions.map((emotion) => {
          const isSelected = selected?.id === emotion.id;

          return (
            <GenesisCard
              key={emotion.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "ring-2 ring-indigo-500 border-indigo-500"
                  : "hover:-translate-y-1 hover:shadow-lg"
              }`}
              onClick={() => setSelected(emotion)}
            >
              <div className="space-y-2 text-center">
                <div className="text-4xl">{emotion.emoji}</div>

                <h3 className="text-lg font-semibold">
                  {emotion.label}
                </h3>

                {isSelected && (
                  <p className="text-sm text-slate-600">
                    {emotion.description}
                  </p>
                )}
              </div>
            </GenesisCard>
          );
        })}
      </div>

      <div className="flex justify-end">
        <GenesisButton
          disabled={!selected}
          onClick={() => selected && onComplete(selected)}
        >
          {continueLabel}
        </GenesisButton>
      </div>
    </GenesisSection>
  );
}