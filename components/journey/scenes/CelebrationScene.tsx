import { JourneyScene } from "@/types/journey";

interface CelebrationSceneProps {
  scene: JourneyScene;
}

export default function CelebrationScene({
  scene,
}: CelebrationSceneProps) {
  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <div className="rounded-3xl border border-green-200 bg-green-50 p-10 shadow-sm">
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="text-4xl font-bold text-green-800">
          {scene.title}
        </h1>

        {scene.content && (
          <p className="mt-6 text-lg leading-relaxed text-green-700">
            {scene.content}
          </p>
        )}

        <div className="mt-10">
          <button
            className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold transition hover:bg-green-700"
            type="button"
          >
            Continue Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}