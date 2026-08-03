interface GuideCardProps {
  name: string;
  title: string;
  description: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
}

export default function GuideCard({
  name,
  title,
  description,
  emoji,
  selected,
  onClick,
}: GuideCardProps) {
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
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B5D6B]/10 text-3xl">
          {emoji}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{name}</h3>

          <p className="mt-1 text-sm font-medium text-[#0B5D6B]">
            {title}
          </p>

          <p className="mt-3 text-muted-foreground leading-7">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}