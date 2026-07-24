import Link from "next/link";
import { WellbeingRecommendation } from "@/lib/intelligence/services/WellbeingRecommendationService";

interface RecommendationCardProps {
  recommendation: WellbeingRecommendation;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
      <p className="text-sm font-bold uppercase tracking-wide">
        Recommended Next Step
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {recommendation.title}
      </h2>

      <p className="mt-4 max-w-2xl text-base leading-7">
        {recommendation.message}
      </p>

      <Link
        href={recommendation.actionHref}
        className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-bold text-[#0F4C5C] transition hover:bg-gray-100"
      >
        {recommendation.actionLabel}
      </Link>
    </div>
  );
}