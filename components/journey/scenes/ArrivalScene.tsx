import { JourneyScene } from "@/types/journey";

interface ArrivalSceneProps {
  scene: JourneyScene;
}

export default function ArrivalScene({
  scene,
}: ArrivalSceneProps) {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center px-6 text-center">

      <div className="mb-8 text-6xl">🌅</div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">
        Project Genesis
      </p>

      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        {scene.title}
      </h1>

      <div className="mt-10 max-w-2xl space-y-6 text-lg leading-8 text-gray-700">

        <p>
          Before you discover your future,
          take a moment to meet the person
          who has carried you this far.
        </p>

        <p>
          This experience isn't about being judged.
        </p>

        <p>
          There are no right answers.
          There are only honest ones.
        </p>

        <p className="font-medium text-gray-900">
          Every answer helps Genesis understand
          your story a little better.
        </p>

      </div>

      <div className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 max-w-xl">

        <p className="text-sm uppercase tracking-widest text-amber-700 font-semibold">
          Take Your Time
        </p>

        <p className="mt-3 text-gray-700 leading-7">
          You don't have to finish everything today.
          Your discoveries will become part of your
          personal Genesis Journey, helping you uncover
          patterns, strengths and growth over time.
        </p>

      </div>

    </div>
  );
}