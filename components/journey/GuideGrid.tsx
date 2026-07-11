"use client";

import GuideCard, { Guide } from "./GuideCard";

interface Props {
  guides: Guide[];
  selectedGuide: string | null;
  onSelect: (id: string) => void;
}

export default function GuideGrid({
  guides,
  selectedGuide,
  onSelect,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {guides.map((guide) => (
        <GuideCard
          key={guide.id}
          guide={guide}
          selected={selectedGuide === guide.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}