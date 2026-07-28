"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipboardList, ArrowRight, RefreshCw } from "lucide-react";

import { assessmentSessionService } from "@/lib/assessment/AssessmentSessionService";
import { AssessmentSession } from "@/lib/assessment/types/AssessmentSession";

export default function LatestCheckIn() {
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatest() {
      try {
        const latest =
          await assessmentSessionService.getLatestSession();

        setSession(latest);
      } catch (error) {
        console.error("Unable to load latest assessment", error);
      } finally {
        setLoading(false);
      }
    }

    loadLatest();
  }, []);

  if (loading) {
    return (
      <section className="mt-10">
        <div className="card-soft rounded-xl p-8">
          <p className="eyebrow">Latest Check-In</p>

          <p className="mt-4 text-[#0F4C5C] font-semibold">
            Loading your latest check-in...
          </p>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="mt-10">
        <div className="card-soft rounded-xl p-8">
          <p className="eyebrow">Latest Check-In</p>

          <h2 className="mt-4 text-2xl font-bold text-[#0F4C5C]">
            You haven't completed a check-in yet.
          </h2>

          <p className="mt-3 leading-7">
            Complete your first emotional wellness assessment to begin tracking
            your healing journey.
          </p>

          <Link
            href="/assessments"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white transition hover:bg-[#0b3945]"
          >
            <ClipboardList size={18} />
            Start Your First Check-In
          </Link>
        </div>
      </section>
    );
  }

  return (
  
    <section className="mt-10">
      <div className="card-soft rounded-xl p-8">
        <p className="eyebrow">Latest Check-In</p>

        <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C]">
          {session.result.summary.title}
        </h2>

        <p className="mt-3 max-w-3xl leading-7">
          {session.result.summary.observation}
        </p>

<div className="mt-8 grid gap-6 md:grid-cols-2">

  <div className="rounded-2xl bg-[#F7F3EC] p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      Completed
    </p>

    <p className="mt-2 text-lg font-bold text-[#0F4C5C]">
      {session.assessment.metadata.title}
    </p>
  </div>
  
  <div className="rounded-2xl bg-[#F7F3EC] p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      Wellness Score
    </p>

    <p className="mt-2 text-4xl font-bold text-[#0F4C5C]">
      {session.score.normalizedScore}%
    </p>
  </div>

</div>

  
  <div className="mt-8 rounded-2xl border border-[#D6ECEC] bg-[#F8FCFC] p-6">

  <p className="eyebrow">
    Recommended Next Assessment
  </p>

  <h3 className="mt-3 text-2xl font-bold text-[#0F4C5C]">
    Resilience Assessment
  </h3>

  <p className="mt-3 leading-7 text-slate-600">
    Understanding your resilience can help you identify how you recover from
    stress and emotional challenges.
  </p>

  <Link
    href="/assessment"
    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white transition hover:bg-[#0b3945]"
  >
    Start Assessment
    <ArrowRight size={18} />
  </Link>

</div>

  

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/assessment/result/${session.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white transition hover:bg-[#0b3945]"
          >
            View Results
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 rounded-full border border-[#0F4C5C] px-6 py-3 font-bold text-[#0F4C5C] transition hover:bg-[#F7F3EC]"
          >
            <RefreshCw size={18} />
            Take Another Check-In
          </Link>
        </div>
      </div>
    </section>
	
  );
}