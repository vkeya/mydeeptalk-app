"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import DashboardLayout from "@/components/DashboardLayout";
import AssessmentResultCard from "@/components/results/AssessmentResultCard";
import { AssessmentResultsService } from "@/lib/intelligence/services/AssessmentResultsService";
import { AssessmentResult } from "@/lib/intelligence/types/assessmentResult";
import { onAuthStateChanged } from "firebase/auth";

export default function AssessmentResultsPage() {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const service = new AssessmentResultsService();

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        setResults([]);
        return;
      }

      const userResults = await service.getUserResults(user.uid);
      setResults(userResults);
    } catch (error) {
      console.error("Failed to load assessment results:", error);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-5xl p-8">
          <p className="text-center text-gray-600">
            Loading assessment results...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-bold text-[#0F4C5C]">
            Assessment Results
          </h1>

          <p className="mt-2 text-gray-600">
            Review your previous assessments and track your wellbeing journey.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              No assessments completed yet
            </h2>

            <p className="mt-4 text-gray-600">
              Once you complete an assessment, your results will appear here so
              you can revisit them anytime.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <AssessmentResultCard
                key={result.id}
                result={result}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}