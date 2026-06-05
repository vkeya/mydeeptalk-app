const pillars = [
  "Relationships",
  "Parenting",
  "Trauma & Healing",
  "Emotional Wellness",
  "Addiction & Recovery",
  "Self Discovery",
];

export default function PillarsSection() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold text-[#0F4C5C]">
          What MyDeepTalk Helps With
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <div key={item} className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#0F4C5C]">{item}</h3>

              <p className="mt-4 text-gray-600">
                Explore healing and support around {item.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}