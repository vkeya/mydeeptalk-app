import Link from "next/link";

export default function SelfAssessmentSection() {
  return (
    <section className="bg-[#F7F3EC] py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 rounded-3xl bg-white p-10 shadow-xl md:grid-cols-2">

          {/* Left Side */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2C7A7B]">
              Free Self-Discovery Check-In
            </p>

            <h2 className="text-4xl font-bold text-[#0F4C5C]">
              Not Sure Where To Begin?
            </h2>

            <p className="mt-6 text-lg text-gray-700">
              Take a private 2-minute check-in to better understand your
              emotional wellbeing and discover which areas of your life may
              need more care, healing or support.
            </p>

            <p className="mt-5 text-sm text-gray-500">
              This is not a diagnosis. It is a gentle self-reflection tool
              designed to help you understand yourself better.
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
                className="rounded-full border border-[#0F4C5C] px-6 py-4 font-semibold text-[#0F4C5C]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="rounded-3xl bg-[#F7F3EC] p-8">

            <h3 className="text-2xl font-bold text-[#0F4C5C]">
              Your Check-In Explores:
            </h3>

            <div className="mt-8 space-y-4 text-gray-700">

              <div>🌿 Emotional Wellness</div>

              <div>❤️ Relationships</div>

              <div>🫂 Healing From The Past</div>

              <div>✨ Self-Worth</div>

              <div>🔥 Burnout & Stress</div>

              <div>🧭 Purpose & Direction</div>

            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow">

              <p className="font-semibold text-[#0F4C5C]">
                Private • Free • Takes 2 Minutes
              </p>

              <p className="mt-3 text-gray-600">
                Receive personalized guidance and discover your current
                growth area.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}