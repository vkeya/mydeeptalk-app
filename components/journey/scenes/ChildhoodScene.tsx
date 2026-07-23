import { JourneyScene } from "@/types/journey";

interface ChildhoodSceneProps {
  scene: JourneyScene;
}

export default function ChildhoodScene({
  scene,
}: ChildhoodSceneProps) {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        {scene.title}
      </h1>

      {scene.content && (
        <p className="mt-4 text-lg text-gray-600">
          {scene.content}
        </p>
      )}

      <textarea
        className="mt-8 w-full rounded-lg border border-gray-300 p-4 focus:border-[#7A5AF8] focus:outline-none"
        rows={10}
        placeholder="Think back to your childhood. What experiences, people, or moments shaped the person you are today?"
      />
    </div>
  );
}