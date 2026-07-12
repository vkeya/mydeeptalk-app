import { JourneyScene } from "@/types/journey";

interface InsightSceneProps {
  scene: JourneyScene;
}

export default function InsightScene({
  scene,
}: InsightSceneProps) {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          AI Insight
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {scene.title}
        </h1>

        {scene.content && (
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {scene.content}
          </p>
        )}
      </div>
    </div>
  );
}