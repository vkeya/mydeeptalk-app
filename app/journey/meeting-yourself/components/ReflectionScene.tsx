"use client";

interface ReflectionSceneProps {
  onContinue: () => void;
}

export default function ReflectionScene({
  onContinue,
}: ReflectionSceneProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6">
      <div className="max-w-3xl text-center">

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#8A6E4B]">
          Reflection
        </p>

        <h1 className="mb-10 font-serif text-5xl font-bold text-[#1C2434]">
          That's interesting...
        </h1>

        <div className="space-y-8 text-xl leading-9 text-gray-700">

          <p>
            Most people answer that question by describing
            the roles they play.
          </p>

          <p>
            Parent.
          </p>

          <p>
            Engineer.
          </p>

          <p>
            Husband.
          </p>

          <p>
            Friend.
          </p>

          <p className="pt-6">
            Those roles matter.
          </p>

          <p>
            But they are not the whole story.
          </p>

          <p className="font-semibold text-[#1C2434]">
            Together, we're going to discover who you are
            beneath every title you carry.
          </p>

        </div>

        <button
          onClick={onContinue}
          className="mt-14 rounded-full bg-[#8A6E4B] px-10 py-4 text-lg font-semibold text-white transition hover:bg-[#73593C]"
        >
          Continue
        </button>

      </div>
    </main>
  );
}