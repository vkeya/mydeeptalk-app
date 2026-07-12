import { JourneyScene } from "@/types/journey";

interface ArrivalSceneProps {
  scene: JourneyScene;
}

export default function ArrivalScene({
  scene,
}: ArrivalSceneProps) {
  return (
    <div className="max-w-3xl mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        {scene.title}
      </h1>

      {scene.content && (
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          {scene.content}
        </p>
      )}
    </div>
  );
}