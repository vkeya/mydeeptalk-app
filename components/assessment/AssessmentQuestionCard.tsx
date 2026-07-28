"use client";

interface AssessmentQuestionCardProps {
  currentQuestion: number;
  totalQuestions: number;
  question: string;
  helperText?: string;
}

export default function AssessmentQuestionCard({
  currentQuestion,
  totalQuestions,
  question,
  helperText = "Choose the option that best reflects how you've felt over the past two weeks.",
}: AssessmentQuestionCardProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">
            Progress
          </span>

          <span className="text-sm font-semibold text-teal-600">
            {currentQuestion} / {totalQuestions}
          </span>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-teal-600">
            Question {currentQuestion} of {totalQuestions}
          </p>

          <h2 className="text-2xl font-bold text-slate-900">
            {question}
          </h2>

          <p className="mt-3 text-slate-600">
            {helperText}
          </p>
        </div>
      </div>
    </>
  );
}