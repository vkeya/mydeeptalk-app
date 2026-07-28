"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { assessmentSessionService } from "@/lib/assessment/AssessmentSessionService";
import { AssessmentSession } from "@/lib/assessment/types/AssessmentSession";
import {
  CheckCircle2,
  Lightbulb,
  Heart,
  Target,
  BookOpen,
  Compass,
  Brain,
  Stethoscope,
} from "lucide-react";
export default function AssessmentResultPage() {
  const [session, setSession] =
    useState<AssessmentSession | null>(null);
	
	const params = useParams();
const sessionId = params.sessionId as string;
	
  useEffect(() => {
  async function loadSession() {
    try {
      const storedSession =
        await assessmentSessionService.getSession(sessionId);

      if (storedSession) {
        setSession(storedSession);
        return;
      }
    } catch (error) {
      console.error("Unable to load assessment session", error);
    }

    const cached = sessionStorage.getItem(
      "latestAssessmentSession"
    );

    if (cached) {
      setSession(JSON.parse(cached));
    }
  }

  loadSession();
}, [sessionId]);
	


  if (!session) {
    return (
      <main className="mx-auto max-w-4xl p-8">
        <div className="rounded-3xl border bg-white p-10">
          <h1 className="mt-2 text-4xl font-bold text-[#0E5A66]">
            No Assessment Session
          </h1>

          <p className="mt-4 text-slate-600">
            Complete an assessment first.
          </p>

          <Link
            href="/assessment"
            className="mt-8 inline-flex rounded-xl border px-5 py-3 font-medium"
          >
            Start an Assessment
          </Link>
        </div>
      </main>
    );
  }

  const result = session.result;

  return (
    <main className="mx-auto max-w-4xl p-8">

      <div className="rounded-3xl border bg-white p-10">

       <div className="card-soft mb-10 rounded-3xl p-10">

  <div className="flex justify-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F4F4]">
      <CheckCircle2 className="h-8 w-8 text-[#0D5C63]" />
    </div>
  </div>

  <p className="eyebrow mt-6 text-center">
    Assessment Complete
  </p>

  <h1 className="mt-3 text-center text-4xl font-bold text-slate-900">
    {session.assessment.metadata.title}
  </h1>

  <div className="mt-6 flex justify-center">
    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
      {result.summary.title}
    </span>
  </div>

  <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-slate-600">
    {result.summary.observation}
  </p>

  <div className="mx-auto mt-10 max-w-sm rounded-3xl bg-[#F2FAFA] p-8 text-center">

    <p className="text-sm uppercase tracking-wide text-slate-500">
      Overall Wellness Score
    </p>

    <p className="mt-3 text-6xl font-bold text-[#0D5C63]">
      {session.score.normalizedScore}%
    </p>

    <p className="mt-3 text-slate-600">
      Every step toward understanding yourself is progress.
    </p>

  </div>

</div>

        <section className="card-soft mt-8 rounded-3xl p-8">
          <div className="mb-5 flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F4F4]">
    <Lightbulb className="h-5 w-5 text-[#0D5C63]" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    What This Means
  </h3>
</div>

          <p className="mt-3 text-slate-600">
            {result.interpretation.meaning}
          </p>
        </section>

        <section className="card-soft mt-8 rounded-3xl p-8">
          <div className="mb-5 flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F4F4]">
    <Heart className="h-5 w-5 text-[#0D5C63]" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Your Strengths
  </h3>
</div>

          <ul className="mt-4 space-y-2">
            {result.interpretation.strengths.map((item) => (
              <li key={item}>
                ✓ {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-soft mt-8 rounded-3xl p-8">
          <div className="mb-5 flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F4F4]">
    <Target className="h-5 w-5 text-[#0D5C63]" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Areas to Focus On
  </h3>
</div>

          <ul className="mt-4 space-y-2">
            {result.interpretation.growthAreas.map((item) => (
              <li key={item}>
                • {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-soft mt-8 rounded-3xl p-8">
          <div className="mb-5 flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F4F4]">
    <BookOpen className="h-5 w-5 text-[#0D5C63]" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Reflection
  </h3>
</div>

          <p className="mt-4 italic">
            "{result.reflection.question}"
          </p>
        </section>

        <section className="card-soft mt-8 rounded-3xl p-8">
          <div className="mb-5 flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F4F4]">
    <Compass className="h-5 w-5 text-[#0D5C63]" />
  </div>

  <h3 className="text-2xl font-semibold text-slate-900">
    Your Next Steps
  </h3>
</div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

  <button className="card-soft rounded-2xl p-6 text-left transition hover:shadow-lg">
    <BookOpen className="mb-4 h-8 w-8 text-[#0D5C63]" />

    <h4 className="text-lg font-semibold">
      Journal Reflection
    </h4>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      Capture your thoughts while today's insights are still fresh.
    </p>
  </button>

  <button className="card-soft rounded-2xl p-6 text-left transition hover:shadow-lg">
    <Brain className="mb-4 h-8 w-8 text-[#0D5C63]" />

    <h4 className="text-lg font-semibold">
      Talk to MyDeepTalk AI
    </h4>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      Explore your assessment results through a guided conversation.
    </p>
  </button>

  <button className="card-soft rounded-2xl p-6 text-left transition hover:shadow-lg">
    <Compass className="mb-4 h-8 w-8 text-[#0D5C63]" />

    <h4 className="text-lg font-semibold">
      Continue Genesis
    </h4>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      Keep building self-awareness through your guided journey.
    </p>
  </button>

  <button className="card-soft rounded-2xl p-6 text-left transition hover:shadow-lg">
    <Stethoscope className="mb-4 h-8 w-8 text-[#0D5C63]" />

    <h4 className="text-lg font-semibold">
      Find a Therapist
    </h4>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      Connect with a licensed therapist for personalized support.
    </p>
  </button>

</div>
        </section>

        <div className="mt-12 flex justify-between">

          <Link
            href="/dashboard"
            className="rounded-xl border px-6 py-3 font-medium"
          >
            Back to Dashboard
          </Link>

          <div className="rounded-2xl bg-[#F2FAFA] px-6 py-4 text-center">
            <p className="text-sm text-slate-500">
              Overall Wellness Score
            </p>

            <p className="mt-2 text-4xl font-bold text-[#0E5A66]">
              {session.score.normalizedScore}%
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}