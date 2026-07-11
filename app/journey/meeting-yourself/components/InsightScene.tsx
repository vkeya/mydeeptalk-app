"use client";

import { useJourney } from "@/context/JourneyContext";

interface InsightSceneProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function InsightScene({
  onContinue,
  onBack,
}: InsightSceneProps) {
  const { state } = useJourney();

  const answer =
    state.identityAnswer.trim() || "someone still discovering who they are";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
      <div className="max-w-3xl text-center">

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Your First Insight
        </p>

        <h1 className="mb-10 font-serif text-5xl font-bold text-[#1C2434]">
          Here's what I noticed...
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-lg">

          <div className="mb-8 rounded-2xl border border-[#E8DCC8] bg-[#FFF9F2] p-6 text-left">
            <p className="mb-2 text-sm uppercase tracking-wider text-[#8A6E4B]">
              Earlier you described yourself as:
            </p>

            <p className="italic text-lg leading-8 text-[#1C2434]">
              "{answer}"
            </p>
          </div>

          <p className="mb-6 text-lg leading-8 text-gray-700">
            It's interesting that this is where your mind naturally went.
          </p>

          <p className="mb-6 text-lg leading-8 text-gray-700">
            Most of us instinctively describe ourselves through our roles,
            responsibilities, achievements or relationships.
          </p>

          <p className="mb-6 text-lg leading-8 text-gray-700">
            During this journey, we'll slowly uncover something deeper:
            your values, beliefs, experiences and the qualities that remain
            even if every title in your life changed.
          </p>

          <div className="mt-10 rounded-2xl border border-[#E8DCC8] bg-[#FFF9F2] p-6">
            <p className="text-lg font-semibold text-[#8A6E4B]">
              🌱 Growth Insight
            </p>

            <p className="mt-3 text-gray-700">
              Self-awareness begins when we become curious about ourselves,
              instead of judging ourselves.
            </p>
          </div>

        </div>

        <button
          onClick={onContinue}
          className="mt-12 rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
        >
          Continue
        </button>

      </div>
    </main>
  );
}