"use client";

interface IntentCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function IntentCard({
  id,
  icon,
  title,
  description,
  selected,
  onSelect,
}: IntentCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
  console.log("Intent selected:", id);
  onSelect(id);
}}
      className={`w-full rounded-2xl border p-6 text-left transition-all ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
            {icon}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {title}
            </h2>

            <p className="mt-2 text-muted-foreground leading-7">
              {description}
            </p>
          </div>
        </div>

        {selected && (
          <div className="text-2xl text-primary">
            ✓
          </div>
        )}
      </div>
    </button>
  );
}