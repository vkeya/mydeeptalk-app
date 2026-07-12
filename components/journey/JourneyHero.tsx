"use client";

import useGuide from "@/hooks/useGuide";
import { useJourney } from "@/context/JourneyContext";
import { getJourneyProgress } from "@/lib/journey/progressEngine";
import { calculateXP } from "@/lib/journey/xpEngine";

export default function JourneyHero() {
  const guide = useGuide();
  

  // Placeholder values for now.
  // These will later come from the XP engine.
  const progress = getJourneyProgress();
  
  const xp = calculateXP(progress.totalXP);

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#8A6E4B] to-[#B89A72] p-8 text-white shadow-xl">

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="mb-4 flex items-center gap-4">

            <div className="text-6xl">
              {guide.emoji}
            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                Your Guide
              </p>

              <h2 className="text-3xl font-bold">
                {guide.name}
              </h2>

            </div>

          </div>

          <h1 className="mb-3 font-serif text-4xl font-bold">
            Welcome back.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-white/90">
            {guide.tone.encouragement}
          </p>

        </div>

        <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">

          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Current Level
          </p>

          <h3 className="mt-2 text-5xl font-bold">
            {xp.level}
          </h3>

          <p className="mt-1 text-xl">
            {xp.title}
          </p>

          <div className="mt-6">

            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
              Experience Points
            </p>

            <div className="h-3 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-white"
                style={{ 
				  width: `${xp.percentage}%`,
				  }}
              />

            </div>

            <p className="mt-2 text-sm">
              {xp.currentXP} / {xp.nextLevelXP} XP
            </p>
			
			<p className="mt-1 text-xs text-white/70">
  {xp.nextLevelXP - xp.currentXP} XP until Level {xp.level + 1}
</p>

          </div>

        </div>

      </div>

    </section>
  );
}