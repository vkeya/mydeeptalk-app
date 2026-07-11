"use client";

import Link from "next/link";

export default function JourneyWelcomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">

      <div className="max-w-3xl text-center">

        <p className="uppercase tracking-[0.45em] text-sm text-[#8A6E4B] mb-10">
          Welcome
        </p>

        <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-[#1C2434] mb-12">
          Today,
          <br />
          You Begin
          <br />
          Meeting Yourself.
        </h1>

        <div className="space-y-8 text-xl leading-10 text-gray-700">

          <p>
            For years...
          </p>

          <p>
            You have learned about everyone else.
          </p>

          <p>
            Their expectations.
          </p>

          <p>
            Their opinions.
          </p>

          <p>
            Their dreams for your life.
          </p>

          <p className="pt-6">
            Today...
          </p>

          <p>
            We begin discovering yours.
          </p>

        </div>

        <div className="mt-20 rounded-3xl bg-white p-10 shadow-xl">

          <p className="text-2xl font-serif text-[#1C2434] mb-6">
            One question before we begin...
          </p>

          <p className="text-lg text-gray-600 mb-10">
            Are you ready to meet yourself with honesty,
            curiosity and compassion?
          </p>

          <Link
            href="/journey/guide"
            className="inline-flex rounded-full bg-[#8A6E4B] px-12 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
          >
            I'm Ready
          </Link>

        </div>

      </div>

    </main>
  );
}