import Image from "next/image";
import Link from "next/link";

export default function TherapistSupportSection() {
  return (
    <section className="px-8 py-24 bg-[#F7F3EC]">
      <div className="mx-auto max-w-7xl grid items-center gap-16 md:grid-cols-2">

        <div>
          <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
            Trusted Support
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#0F4C5C]">
            Connect with trusted therapists when you need support.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sometimes healing requires more than reflection. MyDeepTalk helps
            you connect with qualified therapists who can support your emotional
            wellness journey.
          </p>

          <Link
            href="/therapists"
            className="mt-8 inline-block rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white"
          >
            Find a Therapist
          </Link>
        </div>

        <Image
          src="/images/therapist-support.png"
          alt="Therapist Support"
          width={700}
          height={500}
          className="rounded-[2rem] shadow-xl"
        />

      </div>
    </section>
  );
}