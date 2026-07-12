import { JourneyScene } from "@/types/journey";

interface QuestionSceneProps {
  scene: JourneyScene;
}

export default function QuestionScene({
  scene,
}: QuestionSceneProps) {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        {scene.title}
      </h1>

      {scene.question && (
        <p className="mt-6 text-xl text-gray-700">
          {scene.question}
        </p>
      )}
    </div>
  );
}