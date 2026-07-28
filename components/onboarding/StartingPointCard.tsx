interface StartingPointCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function StartingPointCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: StartingPointCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-6 text-left transition-all duration-200 ${
        selected
          ? "border-[#0B5D6B] bg-[#0B5D6B]/5 ring-2 ring-[#0B5D6B]"
          : "border-gray-200 bg-white hover:border-[#0B5D6B]/40 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B5D6B]/10 text-2xl">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="mt-2 leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}