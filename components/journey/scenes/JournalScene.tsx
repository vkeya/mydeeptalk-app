import { JourneyScene } from "@/types/journey";

interface JournalSceneProps {
  scene: JourneyScene;
}

export default function JournalScene({
  scene,
}: JournalSceneProps) {
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
        rows={8}
        placeholder="Write your thoughts here..."
      />
    </div>
  );
}