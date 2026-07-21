"use client";

import { GenesisChapter } from "@/types/genesis";

interface GenesisHeaderProps {
  chapter: GenesisChapter;
}

export default function GenesisHeader({
  chapter,
}: GenesisHeaderProps) {
  return (
    <header className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        Project Genesis
      </p>

      <div className="mt-6 text-6xl">
        {chapter.icon}
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {chapter.title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        {chapter.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-full border border-slate-200 bg-[#F7F3EC] px-5 py-2 text-sm font-semibold text-[#0F4C5C]">
          Chapter {chapter.number} of 9
        </div>

        <div className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700">
          ⏱ {chapter.estimatedMinutes} min
        </div>

        <div className="rounded-full bg-[#0F4C5C] px-5 py-2 text-sm font-bold text-white">
          ⭐ {chapter.xpReward} XP
        </div>
      </div>
    </header>
  );
}