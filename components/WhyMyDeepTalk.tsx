import Image from "next/image";
import { Sparkles, HeartHandshake, Sprout } from "lucide-react";
import Reveal from "@/components/Reveal";

const items = [
  {
    icon: Sparkles,
    image: "/images/mental7.jpg",
    title: "Guided Reflection",
    text: "Discover yourself through journaling and thoughtful prompts.",
  },
  {
    icon: HeartHandshake,
    image: "/images/mental8.jpg",
    title: "Therapist Support",
    text: "Connect with trusted professionals whenever you need support.",
  },
  {
    icon: Sprout,
    image: "/images/mental3.jpg",
    title: "Long-Term Growth",
    text: "Build healthier relationships and emotional resilience.",
  },
];

export default function WhyMyDeepTalk() {
  return (
    <section className="px-6 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Self-Discovery Before Crisis</span>

          <h2 className="mt-4 text-center text-3xl font-bold text-[#0F4C5C] md:text-4xl">
            Healing should not begin only after collapse.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600">
            Begin with awareness. Continue with support. Grow through honest
            reflection and meaningful conversations.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} variant="zoom">
              <div className="card-soft group h-full overflow-hidden p-0">
                <div className="img-zoom relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E] transition group-hover:scale-110">
                    <item.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
