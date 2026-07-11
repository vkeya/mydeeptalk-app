"use client";

import Link from "next/link";

export default function JourneyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">

      <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
        MyDeepTalk Journey
      </p>

      <h1 className="mb-8 font-serif text-5xl font-bold leading-tight">
        Meet the Person
        <br />
        You've Been Living With
        <br />
        Your Entire Life.
      </h1>

      <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-600">
        There is a version of you the world knows.
        There is another version only you know.
        And perhaps there is still another version waiting
        to be discovered.
      </p>

      <div className="max-w-xl rounded-3xl bg-white p-10 shadow-lg">

        <p className="mb-6 text-lg italic text-gray-700">
          This journey is not about becoming someone else.
        </p>

        <p className="mb-10 text-lg italic text-gray-700">
          It is about understanding the person you have
          always been.
        </p>

        <Link
          href="/journey/welcome"
          className="rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#70573B]"
        >
          Begin My Journey
        </Link>

      </div>

    </div>
  );
}