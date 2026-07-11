"use client";

import { useState } from "react";
import { useJourney } from "@/context/JourneyContext";

import JourneyLayout from "@/components/journey/JourneyLayout";
import JourneyProgress from "@/components/journey/JourneyProgress";
import JourneyCard from "@/components/journey/JourneyCard";
import JourneyNavigation from "@/components/journey/JourneyNavigation";

interface IdentityQuestionSceneProps {
  onContinue: () => void;
  onBack?: () => void;
}

export default function IdentityQuestionScene({
  onContinue,
  onBack,
}: IdentityQuestionSceneProps) {
  const { setIdentityAnswer } = useJourney();
  const [answer, setAnswer] = useState("");

  return (
    <JourneyLayout>

      <JourneyProgress
        title="Meeting Yourself"
        current={2}
        total={6}
      />

      <JourneyCard>

        <p className="mb-4 text-center text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Meeting Yourself
        </p>

        <h1 className="mb-8 text-center font-serif text-5xl font-bold text-[#1C2434]">
          Let's start with one simple question.
        </h1>

        <p className="mb-10 text-center text-xl leading-9 text-gray-700">
          When someone asks,
          <br />
          <strong>"Who are you?"</strong>
          <br />
          what do you usually tell them?
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="min-h-[220px] w-full rounded-2xl border border-gray-300 bg-[#FAFAFA] p-6 text-lg outline-none transition focus:border-[#8A6E4B]"
          placeholder="Write whatever comes naturally..."
        />

        <JourneyNavigation
          showBack
          onBack={onBack}
          continueDisabled={!answer.trim()}
          onContinue={() => {
            setIdentityAnswer(answer);
            onContinue();
          }}
        />

      </JourneyCard>

    </JourneyLayout>
  );
}