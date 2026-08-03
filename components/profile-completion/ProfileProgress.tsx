interface ProfileProgressProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
}

export default function ProfileProgress({
  step,
  totalSteps,
  title,
  description,
}: ProfileProgressProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0F4C5C]">
          Profile Setup
        </p>

        <p className="text-sm font-medium text-slate-500">
          {step} of {totalSteps}
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#0F4C5C] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}