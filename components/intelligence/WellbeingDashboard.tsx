"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

import WellbeingHero from "./WellbeingHero";
import WellbeingDimensions from "./WellbeingDimensions";
import RecommendationCard from "./RecommendationCard";

import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";
import { WellbeingDashboardService } from "@/lib/intelligence/services/WellbeingDashboardService";

import {
  RecommendationPresenter,
  WellbeingRecommendation,
} from "@/lib/intelligence/presenters/RecommendationPresenter";

const dashboardService = new WellbeingDashboardService();
const recommendationPresenter = new RecommendationPresenter();

export default function WellbeingDashboard() {
  const [profile, setProfile] =
    useState<WellbeingProfile | null>(null);

  const [recommendation, setRecommendation] =
    useState<WellbeingRecommendation | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const data = await dashboardService.getDashboard(
        user.uid
      );

      setProfile(data);

      if (data) {
        setRecommendation(
          recommendationPresenter.present(
            data.recommendations
          )
        );
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        Loading wellbeing profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-xl font-bold text-[#0F4C5C]">
          Your Wellbeing Profile
        </h2>

        <p className="mt-4 text-gray-600">
          Complete your first assessment to begin
          building your wellbeing profile.
        </p>
      </div>
    );
  }

  return (
  <div className="space-y-8">
    <WellbeingHero profile={profile} />

    <WellbeingDimensions profile={profile} />
  </div>
);
}