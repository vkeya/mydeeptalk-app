import Image from "next/image";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    title: "Self-Awareness",
    description: "Understanding yourself is the beginning of healing.",
    image: "/images/mental1.jpg",
  },
  {
    title: "Reflection",
    description:
      "Growth happens when we slow down and pay attention to our inner world.",
    image: "/images/mental2.jpg",
  },
  {
    title: "Connection",
    description:
      "Healthy relationships begin with understanding ourselves and others.",
    image: "/images/connect.jpg",
  },
  {
    title: "Healing",
    description: "Pain does not have to define your future.",
    image: "/images/mental4.jpg",
  },
  {
    title: "Support",
    description: "You do not have to navigate life alone.",
    image: "/images/mental5.jpg",
  },
  {
    title: "Growth",
    description:
      "Healing is not perfection. It is becoming more whole over time.",
    image: "/images/mental6.jpg",
  },
];

export default function PillarsSection() {
  return (
    <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            The MyDeepTalk Philosophy
          </span>

          <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
            Healing begins with understanding yourself
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
            MyDeepTalk was built on the belief that emotional wellness should be
            preventive, accessible, and deeply human. We help people move from
            confusion to clarity through self-discovery, reflection, and
            meaningful support.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={(i % 3) * 90}>
              <article className="group h-full overflow-hidden rounded-xl border border-[#0F4C5C]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="img-zoom photo-wash relative h-40 overflow-hidden md:h-44">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0F4C5C]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-gray-600">
                    {pillar.description}
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
