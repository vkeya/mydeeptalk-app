"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { AssessmentResultsService } from "@/lib/intelligence/services/AssessmentResultsService";
import { AssessmentResult } from "@/lib/intelligence/types/assessmentResult";

export default function AssessmentResultPage() {
  const { resultId } = useParams();

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      if (!resultId) {
        setLoading(false);
        return;
      }

      try {
        const service = new AssessmentResultsService();
        const data = await service.getResult(resultId as string);

        setResult(data);
      } catch (error) {
        console.error("Failed to load assessment result:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [resultId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!result) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold">
            Assessment result not found
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl p-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h1 className="text-3xl font-bold text-[#0F4C5C]">
            {result.title}
          </h1>

          <p className="mt-3 text-xl font-semibold text-[#2C7A7B]">
            {result.level}
          </p>

          <div className="mt-8 space-y-4">

            <div>
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-2xl font-bold">
                {result.score} / {result.maxScore}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Message</p>
              <p>{result.message}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p>{result.createdAt.toLocaleDateString()}</p>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}