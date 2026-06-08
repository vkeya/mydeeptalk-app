"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

type AssessmentResult = {
  id: string;
  userId?: string | null;
  userEmail?: string | null;
  isAnonymous?: boolean;
  score?: number;
  maxScore?: number;
  level?: string;
  primaryArea?: string;
  createdAt?: any;
};

export default function AdminAssessmentsPage() {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const snapshot = await getDocs(collection(db, "assessmentResults"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as AssessmentResult[];

        setResults(data);
      } catch (error) {
        console.error("Error loading assessment results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  const stats = useMemo(() => {
    const total = results.length;
    const anonymous = results.filter((r) => r.isAnonymous).length;
    const loggedIn = total - anonymous;

    const averageScore =
      total > 0
        ? results.reduce((sum, r) => sum + Number(r.score || 0), 0) / total
        : 0;

    const highSupport = results.filter(
      (r) =>
        r.level === "Support Recommended" ||
        r.level === "Strongly Consider Support"
    ).length;

    const areaCounts: Record<string, number> = {};

    results.forEach((r) => {
      if (r.primaryArea) {
        areaCounts[r.primaryArea] = (areaCounts[r.primaryArea] || 0) + 1;
      }
    });

    const mostCommonArea =
      Object.entries(areaCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "No data yet";

    return {
      total,
      anonymous,
      loggedIn,
      averageScore,
      highSupport,
      mostCommonArea,
    };
  }, [results]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p>Loading assessment analytics...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Assessment Analytics
            </h1>
            <p className="mt-2 text-gray-600">
              Understand how users are engaging with the MyDeepTalk
              Self-Discovery Check-In.
            </p>
          </div>

          <Link
            href="/admin-dashboard"
            className="rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white"
          >
            Back to Admin Dashboard
          </Link>
        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <StatCard title="Total Assessments" value={stats.total} />
          <StatCard title="Anonymous Users" value={stats.anonymous} />
          <StatCard title="Logged-in Users" value={stats.loggedIn} />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore.toFixed(1)}/30`}
          />
          <StatCard title="High Support Cases" value={stats.highSupport} />
          <StatCard title="Top Growth Area" value={stats.mostCommonArea} />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Recent Assessment Results
          </h2>

          {results.length === 0 ? (
            <p className="text-gray-600">No assessment results yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3">User</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Level</th>
                    <th className="p-3">Primary Area</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((result) => (
                    <tr key={result.id} className="border-b">
                      <td className="p-3">
                        {result.userEmail || "Anonymous"}
                      </td>

                      <td className="p-3">
                        {result.score ?? 0}/{result.maxScore ?? 30}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            result.level === "Strongly Consider Support"
                              ? "bg-red-100 text-red-700"
                              : result.level === "Support Recommended"
                              ? "bg-orange-100 text-orange-700"
                              : result.level === "Needs Attention"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {result.level || "Unknown"}
                        </span>
                      </td>

                      <td className="p-3">{result.primaryArea || "-"}</td>

                      <td className="p-3">
                        {result.isAnonymous ? "Anonymous" : "Logged in"}
                      </td>

                      <td className="p-3">
                        {result.createdAt?.toDate
                          ? result.createdAt.toDate().toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h2 className="mt-3 text-2xl font-bold text-[#0F4C5C]">{value}</h2>
    </div>
  );
}