import { Star, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      quote:
        "MyDeepTalk helped me understand myself before things fell apart. The journey toward healing became much clearer.",
    },
    {
      name: "James O.",
      quote:
        "Finding a therapist who understood my experiences changed everything. I finally felt seen and supported.",
    },
    {
      name: "Amina K.",
      quote:
        "The self-discovery journey gave me language for emotions I never understood. It transformed how I relate to myself.",
    },
  ];

  return (
    <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Real Stories</span>

          <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
            What People Say About MyDeepTalk
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-gray-600">
            Building healthier emotional lives begins with awareness, support,
            and meaningful conversations.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 120}>
              <figure className="card-soft relative h-full p-10">
                <Quote className="absolute right-8 top-8 h-10 w-10 text-[#0F4C5C]/8" />

                <div className="flex gap-1 text-[#E2954E]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-5 w-5 fill-[#E2954E]" />
                  ))}
                </div>

                <blockquote className="mt-6 leading-8 text-gray-600">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8">
                  <p className="font-bold text-[#0F4C5C]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    MyDeepTalk Community Member
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
