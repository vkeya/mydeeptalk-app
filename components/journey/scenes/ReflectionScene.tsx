import { JourneyScene } from "@/types/journey";

interface ReflectionSceneProps {
  scene: JourneyScene;

  reflection?: {
    title?: string;
    summary: string;
    highlights?: string[];
    encouragement?: string;
  };
}

export default function ReflectionScene({
  scene,
  reflection,
}: ReflectionSceneProps) {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">
            🪞
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
            Reflection
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            {reflection?.title ?? scene.title}
          </h1>

        </div>

        <div className="mt-10 space-y-6 text-lg leading-8 text-gray-700">

          <p>
            {reflection?.summary ??
              "You've reached a meaningful point in your journey. Take a moment to notice the patterns that have emerged as you've explored your identity, emotions, strengths and values."}
          </p>

        </div>

        {reflection?.highlights &&
          reflection.highlights.length > 0 && (
            <div className="mt-12">

              <h2 className="mb-5 text-xl font-semibold text-gray-900">
                Themes that emerged
              </h2>

              <div className="space-y-4">

                {reflection.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-violet-100 bg-violet-50 p-5"
                  >
                    {item}
                  </div>
                ))}

              </div>

            </div>
          )}

        {reflection?.encouragement && (
          <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">
              Genesis Reflection
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              {reflection.encouragement}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}