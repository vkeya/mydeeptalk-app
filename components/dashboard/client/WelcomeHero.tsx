"use client";

import { useRouter } from "next/navigation";

interface WelcomeHeroProps {
  greeting: string;
  name: string;
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
}

export default function WelcomeHero({
  greeting,
  name,
  title,
  message,
  actionLabel,
  actionHref,
}: WelcomeHeroProps) {
  const router = useRouter();

  return (
    <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
        Welcome Back
      </p>

      <h1 className="mt-3 text-4xl font-bold md:text-5xl">
        {greeting}, {name} 👋
      </h1>

      <p className="mt-6 max-w-2xl text-2xl font-semibold text-white">
        {title}
      </p>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/90">
        {message}
      </p>

      <div className="mt-10">
        <button
          onClick={() => router.push(actionHref)}
          className="rounded-full bg-white px-8 py-4 font-bold text-[#0F4C5C] transition hover:scale-105"
        >
          {actionLabel}
        </button>
      </div>
    </section>
  );
}