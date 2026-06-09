import Link from "next/link";

export default function SelfAssessmentSection() {
  return (
    <section className="bg-[#F7F3EC] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 rounded-3xl bg-white p-10 shadow-xl md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2C7A7B]">
              Free Self-Discovery Check-In
            </p>

            <h2 className="text-4xl font-bold text-[#0F4C5C]">
              Before You Seek Answers, Understand What You Are Carrying
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              Take a private check-in to better understand your emotional
              wellbeing, relationship patterns, stress levels, and the areas of
              your life that may need more care, healing, or support.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              This is not a diagnosis. It is a gentle self-reflection tool
              designed to help you pause, notice what is happening inside, and
              begin your journey with more clarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/self-assessment"
                className="rounded-full bg-[#0F4C5C] px-6 py-4 font-semibold text-white transition hover:bg-[#0b3945]"
              >
                Take Free Check-In
              </Link>

              <Link
                href="/how-it-works"
                className="rounded-full border border-[#0F4C5C] px-6 py-4 font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                See How It Works
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F7F3EC] p-8">
            <h3 className="text-2xl font-bold text-[#0F4C5C]">
              Your Check-In Explores:
            </h3>

            <div className="mt-8 grid gap-4 text-gray-700">
              <div>🌿 Emotional Wellness</div>
              <div>❤️ Relationship Patterns</div>
              <div>🫂 Healing From The Past</div>
              <div>✨ Self-Worth & Identity</div>
              <div>🔥 Burnout, Stress & Pressure</div>
              <div>🧭 Purpose & Direction</div>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow">
              <p className="font-semibold text-[#0F4C5C]">
                Private • Free • Gentle
              </p>

              <p className="mt-3 leading-7 text-gray-600">
                Receive guided reflection and discover where your current
                growth journey may need attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}