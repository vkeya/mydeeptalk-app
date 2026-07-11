"use client";

interface InsightSceneProps {
  onContinue: () => void;
}

export default function InsightScene({
  onContinue,
}: InsightSceneProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
      <div className="max-w-3xl text-center">

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Your First Insight
        </p>

        <h1 className="mb-10 font-serif text-5xl font-bold text-[#1C2434]">
          Here's what I notice...
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-lg">

          <p className="mb-6 text-lg leading-8 text-gray-700">
            From the way you've reflected today, it seems you naturally
            describe yourself through the roles you play and the
            responsibilities you carry.
          </p>

          <p className="mb-6 text-lg leading-8 text-gray-700">
            That's something many people do.
          </p>

          <p className="mb-6 text-lg leading-8 text-gray-700">
            But over the coming journey, we'll explore something deeper:
            the values, beliefs and experiences that make you who you are,
            even when every title is taken away.
          </p>

          <div className="mt-10 rounded-2xl border border-[#E8DCC8] bg-[#FFF9F2] p-6">
            <p className="text-lg font-semibold text-[#8A6E4B]">
              🌱 Growth Insight
            </p>

            <p className="mt-3 text-gray-700">
              Self-awareness begins when we become curious about ourselves,
              instead of judging ourselves.
            </p>
          </div>

        </div>

        <button
          onClick={onContinue}
          className="mt-12 rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
        >
          Continue
        </button>

      </div>
    </main>
  );
}