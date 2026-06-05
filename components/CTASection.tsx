import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-16 text-center text-white shadow-2xl">

        <p className="font-semibold text-[#E2954E]">
          Begin Your Journey
        </p>

        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          Start before life becomes too heavy.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80">
          Build emotional awareness, access safe support, and connect with
          verified therapists who can help you heal, grow and thrive.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <Link
            href="/signup"
            className="rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white transition hover:bg-[#d7863b]"
          >
            Get Started
          </Link>

          <Link
            href="/therapists"
            className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0F4C5C]"
          >
            Find a Therapist
          </Link>

        </div>

      </div>
    </section>
  );
}