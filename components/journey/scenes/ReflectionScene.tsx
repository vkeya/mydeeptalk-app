import { JourneyScene } from "@/types/journey";

interface ReflectionSceneProps {
  scene: JourneyScene;
}

export default function ReflectionScene({
  scene,
}: ReflectionSceneProps) {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        {scene.title}
      </h1>

      {scene.content && (
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          {scene.content}
        </p>
      )}
    </div>
  );
}