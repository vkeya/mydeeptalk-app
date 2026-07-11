"use client";

interface CelebrationSceneProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function CelebrationScene({
  onContinue,
  onBack,
}: CelebrationSceneProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
      <div className="max-w-3xl text-center">

        <div className="mb-8 text-7xl">
          🌱
        </div>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Experience Complete
        </p>

        <h1 className="mb-8 font-serif text-5xl font-bold text-[#1C2434]">
          The Journey Has Begun
        </h1>

        <p className="mb-6 text-xl leading-9 text-gray-700">
          Today you chose something many people avoid:
          looking inward with honesty and curiosity.
        </p>

        <p className="mb-10 text-xl leading-9 text-gray-700">
          You haven't discovered every answer.
          But you've taken the most important step...
        </p>

        <p className="mb-12 text-2xl font-semibold text-[#8A6E4B]">
          You started.
        </p>

        <div className="mx-auto mb-12 max-w-md rounded-3xl bg-white p-8 shadow-lg">

          <p className="text-sm uppercase tracking-wider text-gray-500">
            Reward Earned
          </p>

          <p className="mt-4 text-4xl font-bold text-[#8A6E4B]">
            +100 XP
          </p>

          <p className="mt-4 text-gray-600">
            🌿 Achievement Unlocked
          </p>

          <p className="mt-2 font-semibold text-[#1C2434]">
            The Journey Begins
          </p>

        </div>

        <button
          onClick={onContinue}
          className="rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
        >
          Continue Your Journey →
        </button>

      </div>
    </main>
  );
}