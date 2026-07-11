"use client";

interface JournalSceneProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function JournalScene({
  onContinue,
  onBack,
}: JournalSceneProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
      <div className="w-full max-w-4xl">

        <p className="mb-4 text-center text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Reflection Journal
        </p>

        <h1 className="mb-6 text-center font-serif text-5xl font-bold text-[#1C2434]">
          Pause for a moment.
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-center text-xl leading-9 text-gray-700">
          Imagine every title you carry disappeared tomorrow.
          No job title.
          No relationship status.
          No achievements.
        </p>

        <p className="mx-auto mb-12 max-w-3xl text-center text-xl font-semibold leading-9 text-[#1C2434]">
          Who would still remain?
        </p>

        <textarea
          placeholder="Take your time. There are no right or wrong answers..."
          className="min-h-[260px] w-full rounded-3xl border border-gray-300 bg-white p-6 text-lg leading-8 outline-none transition focus:border-[#8A6E4B]"
        />

        <div className="mt-10 text-center">
          <button
            onClick={onContinue}
            className="rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
          >
            Continue
          </button>
        </div>

      </div>
    </main>
  );
}