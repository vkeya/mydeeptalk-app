import Link from "next/link";
import { AssessmentResult } from "@/lib/intelligence/types/assessmentResult";

interface AssessmentResultCardProps {
  result: AssessmentResult;
}

export default function AssessmentResultCard({
  result,
}: AssessmentResultCardProps) {
  return (
    <article className="rounded-3xl bg-white p-7 shadow-lg transition hover:shadow-xl">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            {result.title}
          </h2>

          <p className="mt-2 font-semibold text-[#2C7A7B]">
            {result.level}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Score</p>
              <p className="text-lg font-bold">
                {result.score} / {result.maxScore}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Completed</p>
              <p className="font-semibold">
                {result.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`/results/${result.id}`}
          className="rounded-full border-2 border-[#0F4C5C] px-5 py-3 font-semibold text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}