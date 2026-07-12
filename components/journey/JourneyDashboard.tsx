"use client";

import JourneyHero from "./JourneyHero";
import JourneyStats from "./JourneyStats";
import ExperienceCard from "./ExperienceCard";
import JourneyTimeline from "./JourneyTimeline";
import JourneyAchievements from "./JourneyAchievements";
import GuideMessage from "./GuideMessage";
import { journeyExperiences } from "@/data/journeyExperiences";
import {
  getJourneyProgress,
  isExperienceCompleted,
  isExperienceUnlocked,
} from "@/lib/journey/progressEngine";


export default function JourneyDashboard() {
	
  const progress = getJourneyProgress();

  return (
    <div className="space-y-10">

      <JourneyHero />
	  
	  <GuideMessage />

      <JourneyStats />
	  
	  <JourneyTimeline />
	  
	  <JourneyAchievements />

      <section>

        <div className="mb-8">

          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8A6E4B]">
            Your Journey
          </p>

          <h2 className="font-serif text-4xl font-bold text-[#1C2434]">
            Self-Discovery Experiences
          </h2>

          <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-600">
            Every experience builds upon the last. Move at your own pace.
            Your guide will walk beside you throughout the journey.
          </p>

        </div>

       <div className="grid gap-8">

  {journeyExperiences.map((experience) => (

    <ExperienceCard
      key={experience.id}
      chapter={experience.chapter}
      title={experience.title}
      description={experience.description}
      xp={experience.xp}
      duration={experience.duration}
      href={experience.href}

      completed={isExperienceCompleted(experience.id, progress)}

      unlocked={isExperienceUnlocked(experience.id, progress)}
    />

  ))}



        </div>

      </section>

    </div>
  );
}