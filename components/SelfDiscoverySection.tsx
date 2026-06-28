import Image from "next/image";
import Link from "next/link";

export default function SelfDiscoverySection() {
  return (
    <section className="px-8 py-24 bg-white">
      <div className="mx-auto max-w-7xl grid items-center gap-16 md:grid-cols-2">

        <Image
          src="/images/self-discovery.png"
          alt="Self Discovery"
          width={700}
          height={500}
          className="rounded-xl shadow-sm"
        />

        <div>
          <p className="font-script text-2xl capitalize text-[#E2954E]">
            Begin With Awareness
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#0F4C5C]">
            Self-discovery is the first step toward healing.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore guided reflection, journaling, and emotional insights
            designed to help you understand yourself before stress and life
            challenges become overwhelming.
          </p>

          <Link
            href="/self-assessment"
            className="mt-8 inline-block rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white"
          >
            Start Your Check-In
          </Link>
        </div>

      </div>
    </section>
  );
}