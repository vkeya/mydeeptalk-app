"use client";

import GenesisSection from "@/components/journey/shared/GenesisSection";
import GenesisCard from "@/components/journey/shared/GenesisCard";
import GenesisButton from "@/components/journey/shared/GenesisButton";

import { Discovery } from "@/types/genesis";

interface DiscoveryRevealProps {
  discovery: Discovery;
  continueLabel?: string;
  onContinue: () => void;
}

export default function DiscoveryReveal({
  discovery,
  continueLabel = "Continue",
  onContinue,
}: DiscoveryRevealProps) {
  return (
    <GenesisSection>
      <GenesisCard className="mx-auto max-w-2xl text-center space-y-6">

        <div className="text-5xl">
          ✨
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            {discovery.title}
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            {discovery.message}
          </p>
        </div>

        {(discovery.xpReward || discovery.badge) && (
          <div className="rounded-xl bg-slate-50 p-6 space-y-3">

            {discovery.xpReward && (
              <div className="text-xl font-semibold text-amber-600">
                ⭐ +{discovery.xpReward} XP
              </div>
            )}

            {discovery.badge && (
              <div className="text-lg font-medium text-indigo-600">
                🏅 {discovery.badge}
              </div>
            )}

          </div>
        )}

        <GenesisButton onClick={onContinue}>
          {continueLabel}
        </GenesisButton>

      </GenesisCard>
    </GenesisSection>
  );
}