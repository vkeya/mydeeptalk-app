import Image from "next/image";
import Reveal from "@/components/Reveal";

const stats = [
  {
    number: "10+",
    title: "Areas of Emotional Wellness",
    description:
      "From relationships and parenting to trauma, addiction, and self-discovery.",
    image: "/images/emotional.jpg",
  },
  {
    number: "Preventive",
    title: "Approach to Healing",
    description:
      "Helping people understand themselves before life becomes overwhelming.",
    image: "/images/healing.jpg",
  },
  {
    number: "Africa",
    title: "Built With Global Vision",
    description:
      "Created in Africa to make emotional wellness more accessible and personal.",
    image: "/images/vision.jpg",
  },
  {
    number: "24/7",
    title: "Self-Discovery Access",
    description: "Reflect, journal, and begin your healing journey anytime.",
    image: "/images/self.jpg",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white px-6 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Why MyDeepTalk</span>

          <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
            Self-Discovery Before Crisis
          </h2>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-600">
            Most people seek help only when emotional pain becomes overwhelming.
            MyDeepTalk was created to help people understand themselves earlier
            through reflection, guided self-discovery, journaling, and access to
            verified therapists.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.title} delay={(i % 4) * 90}>
              <article className="group h-full overflow-hidden rounded-xl border border-[#0F4C5C]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                {/* Image banner with number badge */}
                <div className="img-zoom photo-wash relative h-40 overflow-hidden md:h-44">
                  <Image
                    src={stat.image}
                    alt={stat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-3 left-3 z-10 rounded-md bg-white/90 px-3 py-1 text-sm font-bold text-[#0F4C5C]">
                    {stat.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold leading-snug text-[#0F4C5C]">
                    {stat.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-gray-600">
                    {stat.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
