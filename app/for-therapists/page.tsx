import Link from "next/link";

export default function ForTherapistsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC]">

      {/* Hero */}

      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-xl">

            <p className="font-semibold text-[#E2954E]">
              For Therapists
            </p>

            <h1 className="mt-4 text-5xl font-bold">
              Grow your practice and reach people who need your support.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Join MyDeepTalk and become part of a trusted emotional wellness
              platform helping people heal, grow and build healthier lives.
            </p>

            <Link
              href="/signup"
              className="mt-8 inline-block rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white hover:bg-[#d07f34]"
            >
              Join as a Therapist
            </Link>

          </div>

        </div>
      </section>

      {/* Benefits */}

      <section className="px-8 pb-20">

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              More Clients
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Increase your visibility and connect with people actively seeking support.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Flexible Scheduling
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Control your availability and manage appointments with ease.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Verified Platform
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Build trust through profile verification and professional credentials.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Secure Sessions
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Conduct online sessions in a safe and professional environment.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Focus on Healing
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Spend more time helping clients and less time managing logistics.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Built in Africa
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Join a platform designed with African communities and realities in mind.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="px-8 pb-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-[#0F4C5C] p-12 text-center text-white shadow-xl">

          <h2 className="text-4xl font-bold">
            Ready to Make a Difference?
          </h2>

          <p className="mt-6 text-white/80">
            Become part of the MyDeepTalk therapist community and help people
            build healthier emotional lives.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white hover:bg-[#d07f34]"
          >
            Apply as Therapist
          </Link>

        </div>

      </section>

    </main>
  );
}