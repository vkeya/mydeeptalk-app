"use client";

import Link from "next/link";
import AssessmentCatalogService from "@/lib/assessment/AssessmentCatalog";

export default function AssessmentsPage() {
  const assessments = AssessmentCatalogService.getAll();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-12">
        <p className="eyebrow">Assessment Centre</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Understand Yourself Better
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Explore evidence-based wellbeing assessments designed to help you
          better understand your emotional health, relationships, mindset,
          and personal growth.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {assessments.map((assessment) => (
          <div
            key={assessment.metadata.id}
            className="card-soft flex flex-col rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
                Emotional Wellbeing
              </span>

              <span className="text-sm text-slate-500">
                {assessment.questions.length} Questions
              </span>
            </div>

            <h2 className="text-2xl font-semibold">
              {assessment.metadata.title}
            </h2>

            <p className="mt-3 flex-1 text-slate-600">
              {assessment.metadata.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                ~3 min
              </span>

              <Link
                href={`/assessment/${assessment.metadata.slug}`}
                className="rounded-xl bg-[#0E5A66] px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#0B4C56] hover:shadow-lg"
              >
                Start Assessment
              </Link>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}