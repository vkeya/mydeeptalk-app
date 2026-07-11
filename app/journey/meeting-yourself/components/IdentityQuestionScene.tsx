"use client";

interface IdentityQuestionSceneProps {
  onContinue: () => void;
}

export default function IdentityQuestionScene({
  onContinue,
}: IdentityQuestionSceneProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
      <div className="w-full max-w-3xl">

        <p className="mb-4 text-center text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Meeting Yourself
        </p>

        <h1 className="mb-8 text-center font-serif text-5xl font-bold text-[#1C2434]">
          Let's start with one simple question.
        </h1>

        <p className="mb-10 text-center text-xl leading-9 text-gray-700">
          When someone asks,
          <br />
          <strong>"Who are you?"</strong>
          <br />
          what do you usually tell them?
        </p>

        <textarea
          className="min-h-[220px] w-full rounded-3xl border border-gray-300 bg-white p-6 text-lg outline-none focus:border-[#8A6E4B]"
          placeholder="Write whatever comes naturally..."
        />

        <div className="mt-10 text-center">
          <button
            onClick={onContinue}
            className="rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
          >
            Continue →
          </button>
        </div>

      </div>
    </main>
  );
}