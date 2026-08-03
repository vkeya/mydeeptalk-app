"use client";
import { assessmentSessionService } from "@/lib/assessment/AssessmentSessionService";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AssessmentCatalogService from "@/lib/assessment/AssessmentCatalog";
import { AssessmentRuntime } from "@/lib/assessment/AssessmentRuntime";
import AssessmentWelcome from "@/components/assessment/AssessmentWelcome";

export default function AssessmentV3Page() {
  const params = useParams();
  
  const router = useRouter();
  
  const slug =
  typeof params.slug === "string" ? params.slug : null;
  
  const [responses, setResponses] = useState<
  Record<string, string>
>({});

const [hasStarted, setHasStarted] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] =
  useState(0);
  

const [isSubmitting, setIsSubmitting] =
  useState(false);

      if (!slug) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
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

if (!hasStarted) {
  return (
    <AssessmentWelcome
  title={assessment.metadata.title}
  description={assessment.metadata.description}
  estimatedMinutes={2}
  questionCount={assessment.questions.length}
  category="Emotional Wellbeing"
  onBegin={() => setHasStarted(true)}
/>
  );
}

const currentQuestion =
  assessment.questions[currentQuestionIndex];
  
const handleSubmit = async () => {
	
  const assessmentResponse = {
  assessmentId: assessment.metadata.id,
  assessmentVersion: assessment.metadata.version,
  userId: "demo-user",
  answers: assessment.questions.map((question) => {
    const selectedOption = question.options.find(
      (option) => option.id === responses[question.id]
    );

    if (!selectedOption) {
      throw new Error(
        `Missing answer for question ${question.id}`
      );
    }

    return {
      questionId: question.id,
      optionId: selectedOption.id,
      value: selectedOption.value,
    };
  }),
  completedAt: new Date().toISOString(),
};
  
  
  if (!assessment) return;

  setIsSubmitting(true);

  try {
    const session = await AssessmentRuntime.run(
  assessment.metadata.slug,
  assessmentResponse,
  {
    userId: "demo-user",
  }
);

try {
  await assessmentSessionService.saveSession(session);
} catch (error) {
  console.error("Unable to save assessment session", error);

  sessionStorage.setItem(
    "latestAssessmentSession",
    JSON.stringify(session)
  );
}

router.push(`/assessment/result/${session.id}`);

    // Navigation comes next
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="mb-10">
  <p className="eyebrow">
    Assessment
  </p>

  <h1 className="mt-2 text-4xl font-bold text-slate-900">
    {assessment.metadata.title}
  </h1>

  <p className="mt-4 max-w-3xl text-lg text-slate-600">
    {assessment.metadata.description}
  </p>
</div>

     <div className="mb-8">
  <div className="mb-2 flex items-center justify-between">
    <span className="text-sm font-medium text-slate-500">
      Progress
    </span>

    <span className="text-sm font-semibold text-[#0E5A66]">
      {currentQuestionIndex + 1} / {assessment.questions.length}
    </span>
  </div>

  <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
    <div
      className="h-full rounded-full bg-[#0E5A66] transition-all duration-500"
      style={{
        width: `${
          ((currentQuestionIndex + 1) /
            assessment.questions.length) *
          100
        }%`,
      }}
    />
  </div>

  <div className="card-soft rounded-3xl p-8">
  <p className="eyebrow">
    Question {currentQuestionIndex + 1} of {assessment.questions.length}
  </p>

  <h2 className="mt-2 text-3xl font-bold text-slate-900 leading-tight">
    {currentQuestion.text}
  </h2>

  <p className="mt-4 text-slate-600">
    Select the response that best reflects your experience over the past two weeks.
  </p>
</div>

<div className="mt-6 space-y-4">
  {currentQuestion.options.map((option) => {
    const selected = responses[currentQuestion.id] === option.id;

    return (
      <button
        key={option.id}
        type="button"
        onClick={() =>
          setResponses((prev) => ({
            ...prev,
            [currentQuestion.id]: option.id,
          }))
        }
        className={`w-full rounded-2xl border p-6 text-left transition-all duration-200 ${
  selected
    ? "border-[#0E5A66] bg-[#F2FAFA] ring-2 ring-[#D5ECEE]"
    : "border-slate-200 bg-white hover:border-[#0E5A66] hover:shadow-md"
}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              selected
                ? "border-teal-600 bg-[#0E5A66]"
                : "border-slate-300"
            }`}
          >
            {selected && (
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            )}
          </div>

          <span className="text-base font-medium text-slate-800">
  {option.text}
</span>
        </div>
      </button>
    );
  })}
</div>

<div className="mt-8 flex justify-between">
  <button
    type="button"
    disabled={currentQuestionIndex === 0}
    onClick={() =>
      setCurrentQuestionIndex((index) => index - 1)
    }
    className="rounded-xl border border-[#0E5A66] px-6 py-3 font-medium text-[#0E5A66] transition hover:bg-[#F2FAFA] disabled:opacity-50"
  >
    Previous
  </button>

  {currentQuestionIndex === assessment.questions.length - 1 ? (
  <button
    type="button"
    onClick={handleSubmit}
    disabled={
      !responses[currentQuestion.id] ||
      isSubmitting
    }
    className="rounded-xl bg-[#0E5A66] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#0B4C56] hover:shadow-lg disabled:opacity-50"
  >
    {isSubmitting
      ? "Submitting..."
      : "Complete Assessment"}
  </button>
) : (
  <button
    type="button"
    disabled={!responses[currentQuestion.id]}
    onClick={() =>
      setCurrentQuestionIndex((index) => index + 1)
    }
    className="rounded-lg bg-[#0E5A66] px-5 py-2 text-white disabled:opacity-50"
  >
    Next
  </button>
)}
</div>
</div>

  </main>
  );
}