interface OnboardingCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function OnboardingCard({
  icon,
  title,
  description,
}: OnboardingCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        hover:shadow-md
      "
    >
      <div className="flex items-start gap-5">
        <div className="text-3xl">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}