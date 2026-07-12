"use client";

import JourneyHero from "./JourneyHero";
import JourneyStats from "./JourneyStats";
import ExperienceCard from "./ExperienceCard";
import JourneyTimeline from "./JourneyTimeline";
import JourneyAchievements from "./JourneyAchievements";

export default function JourneyDashboard() {
  return (
    <div className="space-y-10">

      <JourneyHero />

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

          <ExperienceCard
            chapter="Chapter 1"
            title="Meeting Yourself"
            description="Begin your healing journey by meeting yourself honestly. Explore your identity, reflect deeply, journal your thoughts, and discover your first insight."
            xp={250}
            duration="25 mins"
            href="/journey/meeting-yourself"
            completed
            unlocked
          />

          <ExperienceCard
            chapter="Chapter 2"
            title="Your Story"
            description="Discover how your past experiences shaped the person you have become."
            xp={300}
            duration="30 mins"
            href="/journey/your-story"
            unlocked
          />

          <ExperienceCard
            chapter="Chapter 3"
            title="Emotional Patterns"
            description="Recognize recurring emotional habits and understand what triggers them."
            xp={350}
            duration="35 mins"
            href="/journey/emotional-patterns"
          />

          <ExperienceCard
            chapter="Chapter 4"
            title="Healing the Past"
            description="Begin releasing painful memories with compassion and courage."
            xp={400}
            duration="40 mins"
            href="/journey/healing-the-past"
          />

          <ExperienceCard
            chapter="Chapter 5"
            title="Boundaries"
            description="Learn to protect your peace while maintaining healthy relationships."
            xp={450}
            duration="35 mins"
            href="/journey/boundaries"
          />

          <ExperienceCard
            chapter="Chapter 6"
            title="Relationships"
            description="Understand attachment, connection and authentic love."
            xp={500}
            duration="40 mins"
            href="/journey/relationships"
          />

          <ExperienceCard
            chapter="Chapter 7"
            title="Purpose"
            description="Reconnect with your strengths, values and future vision."
            xp={550}
            duration="40 mins"
            href="/journey/purpose"
          />

          <ExperienceCard
            chapter="Chapter 8"
            title="Future Self"
            description="Meet the person you are becoming and design your next chapter."
            xp={600}
            duration="45 mins"
            href="/journey/future-self"
          />

          <ExperienceCard
            chapter="Chapter 9"
            title="Wholeness"
            description="Celebrate your growth and integrate everything you've learned."
            xp={700}
            duration="45 mins"
            href="/journey/wholeness"
          />

        </div>

      </section>

    </div>
  );
}