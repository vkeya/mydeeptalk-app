"use client";

import { ReactNode } from "react";

interface AssessmentLayoutProps {
  title: string;
  description?: string;
  currentQuestion: number;
  totalQuestions: number;
  children: ReactNode;
  footer: ReactNode;
}

export default function AssessmentLayout({
  title,
  description,
  currentQuestion,
  totalQuestions,
  children,
  footer,
}: AssessmentLayoutProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-3 text-slate-600">
            {description}
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">
            Progress
          </span>

          <span className="text-sm font-semibold text-teal-600">
            {currentQuestion} / {totalQuestions}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {children}

      <div className="mt-8">
        {footer}
      </div>
    </main>
  );
}