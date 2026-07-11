"use client";

export interface Guide {
  id: string;
  name: string;
  icon: string;
  personality: string;
  description: string;
}

interface GuideCardProps {
  guide: Guide;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function GuideCard({
  guide,
  selected,
  onSelect,
}: GuideCardProps) {
  return (
    <button
      onClick={() => onSelect(guide.id)}
      className={`w-full rounded-3xl border p-6 text-left transition-all duration-300 ${
        selected
          ? "border-[#8A6E4B] bg-[#FFF8F0] shadow-lg"
          : "border-gray-200 bg-white hover:border-[#8A6E4B] hover:shadow-md"
      }`}
    >
      <div className="mb-4 text-5xl">{guide.icon}</div>

      <h3 className="mb-2 text-2xl font-bold text-[#1C2434]">
        {guide.name}
      </h3>

      <p className="mb-4 text-sm uppercase tracking-wider text-[#8A6E4B]">
        {guide.personality}
      </p>

      <p className="leading-7 text-gray-600">
        {guide.description}
      </p>
    </button>
  );
}