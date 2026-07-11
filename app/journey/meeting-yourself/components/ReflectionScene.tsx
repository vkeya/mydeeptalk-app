"use client";

import JourneyLayout from "@/components/journey/JourneyLayout";
import JourneyProgress from "@/components/journey/JourneyProgress";
import JourneyCard from "@/components/journey/JourneyCard";
import JourneyButton from "@/components/journey/JourneyButton";

interface ReflectionSceneProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function ReflectionScene({
  onContinue,
  onBack,
}: ReflectionSceneProps) {
  return (
    <JourneyLayout>

      <JourneyProgress
        title="Meeting Yourself"
        current={3}
        total={6}
      />

      <JourneyCard>

        <div className="text-center">

          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
            Reflection
          </p>

          <h1 className="mb-10 font-serif text-5xl font-bold text-[#1C2434]">
            That's interesting...
          </h1>

          <div className="space-y-8 text-xl leading-9 text-gray-700">

            <p>
              Most people answer that question by describing
              the roles they play.
            </p>

            <p>Parent.</p>

            <p>Engineer.</p>

            <p>Husband.</p>

            <p>Friend.</p>

            <p className="pt-4">
              Those roles matter.
            </p>

            <p>
              But they are not the whole story.
            </p>

            <p className="font-semibold text-[#1C2434]">
              Together, we're going to discover who you are
              beneath every title you carry.
            </p>

          </div>

          <div className="mt-12">

            <JourneyButton
              onClick={onContinue}
            >
              Continue →
            </JourneyButton>

          </div>

        </div>

      </JourneyCard>

    </JourneyLayout>
  );
}