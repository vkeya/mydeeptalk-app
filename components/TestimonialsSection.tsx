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
    <section className="bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="font-semibold text-[#E2954E]">
            Real Stories
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            What People Say About MyDeepTalk
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-gray-600">
            Building healthier emotional lives begins with awareness,
            support, and meaningful conversations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl bg-white p-10 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 text-2xl text-[#E2954E]">
                ★★★★★
              </div>

              <p className="leading-8 text-gray-600">
                "{testimonial.quote}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-[#0F4C5C]">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">
                  MyDeepTalk Community Member
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}