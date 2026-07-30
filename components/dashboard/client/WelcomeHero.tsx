"use client";

import { useRouter } from "next/navigation";

interface WelcomeHeroProps {
  name: string;

  hasCheckedInToday: boolean;

  currentMood?: string | null;
}

export default function WelcomeHero({
  name,
  hasCheckedInToday,
  currentMood,
}: WelcomeHeroProps) {
	
	const router = useRouter();
	
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-xl">

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
        Welcome Back
      </p>

      <h1 className="mt-3 text-4xl font-bold md:text-5xl">
        {greeting}, {name} 👋
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
        Every small step you take today matters.
        Healing isn't about perfection—it's about
        showing up for yourself, one moment at a time.
      </p>

      <div className="mt-8">
  {hasCheckedInToday ? (
    <div className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold text-[#0F4C5C]">
      ✅ Today's Check-In Complete
      {currentMood && (
        <span className="ml-3 text-[#2C7A7B]">
          • {currentMood}
        </span>
      )}
    </div>
  ) : (
    <button
      onClick={() => router.push("/check-in")}
      className="rounded-full bg-white px-8 py-4 font-bold text-[#0F4C5C] transition hover:scale-105"
    >
      How are you feeling today?
    </button>
  )}
</div>

    </section>
  );
}