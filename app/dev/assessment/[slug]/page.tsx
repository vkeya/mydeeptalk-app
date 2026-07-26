"use client";


import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AssessmentCatalogService from "@/lib/assessment/AssessmentCatalog";

export default function AssessmentV3Page() {
  const params = useParams();
  
  const slug =
  typeof params.slug === "string" ? params.slug : null;
  
  const [responses, setResponses] = useState<
  Record<string, string>
>({});

  if (!slug) {
    return (
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-bold">
          Invalid Assessment
        </h1>
      </div>
    );
  }

 const assessment = useMemo(
  () => AssessmentCatalogService.getBySlug(slug),
  [slug]
);

if (!assessment) {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">
        Assessment Not Found
      </h1>

      <p className="mt-4 text-gray-600">
        No assessment exists for "{slug}".
      </p>
    </div>
  );
}

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">
        {assessment.metadata.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {assessment.metadata.description}
      </p>

      <div className="mt-10 space-y-8">
        {assessment.questions.map((question, index) => (
          <div
            key={question.id}
            className="rounded-xl border p-6"
          >
            <h2 className="font-semibold">
              {index + 1}. {question.text}
            </h2>

            <div className="mt-4 space-y-2">
              {question.options.map((option) => (
                <button
  key={option.id}
  type="button"
  onClick={() =>
    setResponses((previous) => ({
      ...previous,
      [question.id]: option.id,
    }))
  }
  className={`block w-full rounded-lg border p-3 text-left transition ${
    responses[question.id] === option.id
      ? "border-blue-600 bg-blue-50"
      : "hover:bg-gray-50"
  }`}
>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}