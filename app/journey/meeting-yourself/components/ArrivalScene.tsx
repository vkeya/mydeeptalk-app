"use client";

interface ArrivalSceneProps {
  onContinue: () => void;
}

export default function ArrivalScene({
  onContinue,
}: ArrivalSceneProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F3EC] px-6">
      <div className="max-w-2xl text-center">

        <div className="mb-8 text-6xl">
          🌿
        </div>

        <h1 className="mb-8 font-serif text-5xl font-bold text-[#1C2434]">
          Welcome.
        </h1>

        <div className="space-y-6 text-xl leading-9 text-gray-700">

          <p>
            Before we begin...
          </p>

          <p>
            I'd like to ask one small favor.
          </p>

          <p>
            Don't answer the way you think you should.
          </p>

          <p>
            Answer the way that feels true.
          </p>

          <p className="font-semibold text-[#1C2434]">
            There are no right answers here.
          </p>

        </div>

        <button
          onClick={onContinue}
          className="mt-12 rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white hover:bg-[#73593C]"
        >
          Let's Begin →
        </button>

      </div>
    </main>
  );
}