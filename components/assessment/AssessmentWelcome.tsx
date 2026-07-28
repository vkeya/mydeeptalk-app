"use client";

import { Brain, Clock3, HeartHandshake, ShieldCheck } from "lucide-react";

interface AssessmentWelcomeProps {
  title: string;
  description: string;
  estimatedMinutes: number;
  questionCount: number;
  category: string;
  onBegin: () => void;
}

export default function AssessmentWelcome({
  title,
  description,
  estimatedMinutes,
  questionCount,
  category,
  onBegin,
}: AssessmentWelcomeProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center px-6 py-12">
      <div className="card-soft w-full rounded-3xl p-8">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F4F4]">
            <Brain className="h-8 w-8 text-[#0D5C63]" />
          </div>

          <p className="eyebrow">
            MyDeepTalk
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl bg-[#F8FAFB] p-5">
            <Clock3 className="h-5 w-5 text-[#0D5C63]" />
            <div>
              <p className="text-sm text-slate-500">
                Estimated Time
              </p>
              <p className="font-semibold text-slate-900">
                {estimatedMinutes}–5 minutes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#F8FAFB] p-5">
            <Brain className="h-5 w-5 text-[#0D5C63]" />
            <div>
              <p className="text-sm text-slate-500">
                Questions
              </p>
              <p className="font-semibold text-slate-900">
                {questionCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#F8FAFB] p-5">
            <HeartHandshake className="h-5 w-5 text-[#0D5C63]" />
            <div>
              <p className="text-sm text-slate-500">
                Focus
              </p>
              <p className="font-semibold text-slate-900">
                {category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#F8FAFB] p-5">
            <ShieldCheck className="h-5 w-5 text-[#0D5C63]" />
            <div>
              <p className="text-sm text-slate-500">
                Privacy
              </p>
              <p className="font-semibold text-slate-900">
                Private & Secure
              </p>
            </div>
          </div>

        </div>

        <div className="mb-8 rounded-2xl bg-[#F2FAFA] border border-[#D8ECEE] p-6">
          <p className="text-center leading-8 text-slate-700">
            There are no right or wrong answers.
            <br />
            Answer honestly based on how you've felt over the past two weeks.
            <br />
            Everything you share remains private.
          </p>
        </div>

        <button
          onClick={onBegin}
          className="w-full rounded-2xl bg-[#0D5C63] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#094850] hover:-translate-y-0.5 hover:shadow-lg"
        >
          Begin My Check-In
        </button>

      </div>
    </div>
  );
}