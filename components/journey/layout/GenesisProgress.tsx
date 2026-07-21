"use client";

interface GenesisProgressProps {
  currentScene: number;
  totalScenes: number;
  sceneTitle?: string;
}

export default function GenesisProgress({
  currentScene,
  totalScenes,
  sceneTitle,
}: GenesisProgressProps) {
  const progress = Math.round((currentScene / totalScenes) * 100);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Scene Progress
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            Scene {currentScene} of {totalScenes}
          </p>
        </div>

        <span className="text-sm font-semibold text-[#0F4C5C]">
          {progress}% Complete
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#E7ECEF]">
        <div
          className="h-full rounded-full bg-[#0F4C5C] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {Array.from({ length: totalScenes }).map((_, index) => {
          const isCompleted = index < currentScene;
          const isCurrent = index === currentScene - 1;

          return (
            <div
              key={index}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? "scale-125 bg-[#0F4C5C]"
                  : isCompleted
                  ? "bg-[#0F4C5C]"
                  : "bg-slate-300"
              }`}
            />
          );
        })}
      </div>

      {sceneTitle && (
        <p className="mt-5 text-center text-sm text-slate-500">
          Next:
          <span className="ml-1 font-semibold text-[#0F4C5C]">
            {sceneTitle}
          </span>
        </p>
      )}
    </section>
  );
}