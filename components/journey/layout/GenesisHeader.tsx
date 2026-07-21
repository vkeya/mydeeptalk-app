"use client";

import { LucideIcon } from "lucide-react";

export interface GenesisHeaderChapter {
  number: number;
  title: string;
  subtitle: string;
  icon?: string;
  estimatedMinutes: number;
  xpReward: number;
}

interface GenesisHeaderProps {
  chapter: GenesisHeaderChapter;
}

export default function GenesisHeader({
  chapter,
}: GenesisHeaderProps) {
  return (
    <header className="space-y-6 text-center">

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
          Project Genesis
        </p>
      </div>

      const Icon = chapter.icon;

{chapter.icon && (
  <div className="text-6xl">
  {chapter.icon}
  </div>
)}

      <div className="space-y-2">

        <h1 className="text-4xl font-bold text-slate-900">
          {chapter.title}
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          {chapter.subtitle}
        </p>

      </div>

      <div className="flex flex-wrap justify-center gap-4">

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
          Chapter {chapter.number} of 9
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
          ⏱ {chapter.estimatedMinutes} min
        </div>

        <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
          ⭐ {chapter.xpReward} XP
        </div>

      </div>

    </header>
  );
}