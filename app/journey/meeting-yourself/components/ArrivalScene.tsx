"use client";

import JourneyLayout from "@/components/journey/JourneyLayout";
import JourneyProgress from "@/components/journey/JourneyProgress";
import JourneyCard from "@/components/journey/JourneyCard";
import JourneyButton from "@/components/journey/JourneyButton";

import useGuide from "@/hooks/useGuide";

interface ArrivalSceneProps {
  onContinue: () => void;
}

export default function ArrivalScene({
  onContinue,
}: ArrivalSceneProps) {
	
  const guide = useGuide();

  return (
    <JourneyLayout>

      <JourneyProgress
        title="Meeting Yourself"
        current={1}
        total={6}
      />

      <JourneyCard>

        <div className="text-center">

          <div className="mb-6 text-7xl">
            {guide.emoji}
          </div>

          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.35em]"
            style={{ color: guide.color }}
          >
            {guide.name}
          </p>

          <h1 className="mb-8 font-serif text-5xl font-bold text-[#1C2434]">
            Welcome.
          </h1>

          <div className="mx-auto max-w-2xl space-y-6 text-xl leading-9 text-gray-700">

            <p
              className="text-2xl font-medium"
              style={{ color: guide.color }}
            >
              "{guide.tone.welcome}"
            </p>

            <p>
              Before we begin...
            </p>

            <p>
              I'd like to ask one small favor.
            </p>

            <p>
              Don't answer the way you think you should.
            </p>

            <p>
              Answer the way that feels true.
            </p>

            <p className="font-semibold text-[#1C2434]">
              There are no right answers here.
            </p>

          </div>

          <div className="mt-12">

            <JourneyButton
              onClick={onContinue}
            >
              Begin with {guide.name} →
            </JourneyButton>

          </div>

        </div>

      </JourneyCard>

    </JourneyLayout>
  );
}