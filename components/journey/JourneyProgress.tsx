interface JourneyProgressProps {
  title: string;
  current: number;
  total: number;
}

export default function JourneyProgress({
  title,
  current,
  total,
}: JourneyProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-10">

      <div className="mb-3 flex items-center justify-between">

        <h2 className="text-xl font-semibold text-[#1C2434]">
          {title}
        </h2>

        <span className="text-sm text-gray-500">
          Scene {current} of {total}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-[#8A6E4B] transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}