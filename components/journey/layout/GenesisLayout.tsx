"use client";

import { ReactNode } from "react";

import { GenesisChapter } from "@/types/genesis";

import GenesisHeader from "./GenesisHeader";
import GenesisProgress from "./GenesisProgress";
import GenesisFooter from "./GenesisFooter";

interface GenesisLayoutProps {
  chapter: GenesisChapter;

  currentScene: number;
  totalScenes: number;

  nextSceneTitle?: string;

  canContinue?: boolean;

  onPrevious?: () => void;
  onContinue?: () => void;

  children: ReactNode;
}

export default function GenesisLayout({
  chapter,
  currentScene,
  totalScenes,
  nextSceneTitle,
  canContinue = true,
  onPrevious,
  onContinue,
  children,
}: GenesisLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">

        <GenesisHeader chapter={chapter} />

        <GenesisProgress
          currentScene={currentScene}
          totalScenes={totalScenes}
          sceneTitle={nextSceneTitle}
        />

        <div className="flex-1 rounded-[32px] border border-violet-100 bg-white p-8 shadow-sm">

    {children}

</div>

        <GenesisFooter
          canContinue={canContinue}
          onPrevious={onPrevious}
          onContinue={onContinue}
        />

      </div>
    </main>
  );
}