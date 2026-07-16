import Link from "next/link";
import { assessments } from "@/data/assessments";

export default function AssessmentsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">

          <p className="mb-3 font-bold uppercase tracking-wide">
            MyDeepTalk Wellness Centre
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Self Assessments
          </h1>

          <p className="mt-4 max-w-3xl text-lg font-semibold leading-8">
            Explore confidential self-assessments designed to help you
            understand your emotional wellbeing and identify areas where
            professional support may help.
          </p>

        </section>


        <section className="mt-10 grid gap-6 md:grid-cols-3">

          {assessments.map((assessment) => (

           <article
  key={assessment.id}
  className="flex flex-col rounded-3xl bg-white p-6 shadow-lg"
>

              <div className="mb-4">
                <span className="rounded-full bg-[#F7F3EC] px-4 py-2 text-sm font-bold text-[#0F4C5C]">
                  {assessment.category}
                </span>
              </div>


              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                {assessment.title}
              </h2>


              <p className="mt-3 flex-1 font-semibold leading-7 text-gray-700">
                {assessment.description}
              </p>


              <div className="mt-8 flex items-center justify-between">
  <p className="font-bold text-gray-900 whitespace-nowrap">
    Duration:
    <span className="ml-2 text-[#0F4C5C]">
      {assessment.duration}
    </span>
  </p>

  <Link
    href={`/assessments/${assessment.id}`}
    className="rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-bold text-white whitespace-nowrap transition hover:bg-[#0b3945]"
  >
    Start Assessment
  </Link>
</div>

            </article>

          ))}

        </section>

      </div>
    </main>
  );
}