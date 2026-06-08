"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Stats = {
  totalBookings: number;
  paidSessions: number;
  pendingSessions: number;
  totalRevenue: number;
  therapists: number;
  clients: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    paidSessions: 0,
    pendingSessions: 0,
    totalRevenue: 0,
    therapists: 0,
    clients: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const bookingsSnap = await getDocs(collection(db, "bookings"));
        const therapistsSnap = await getDocs(collection(db, "therapists"));
        const usersSnap = await getDocs(collection(db, "users"));

        let paidSessions = 0;
        let pendingSessions = 0;
        let totalRevenue = 0;
        let clients = 0;

        bookingsSnap.docs.forEach((doc) => {
          const booking = doc.data();

          if (booking.paymentStatus === "paid") {
            paidSessions += 1;
            totalRevenue += Number(booking.sessionFee || 0);
          } else {
            pendingSessions += 1;
          }
        });

        usersSnap.docs.forEach((doc) => {
          const user = doc.data();

          if (user.role === "client") {
            clients += 1;
          }
        });

        setStats({
          totalBookings: bookingsSnap.size,
          paidSessions,
          pendingSessions,
          totalRevenue,
          therapists: therapistsSnap.size,
          clients,
        });
      } catch (error) {
        console.error("Error loading admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p>Loading admin dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          MyDeepTalk platform overview.
        </p>
		
		<a
           href="/admin-assessments"
           className="mb-8 inline-block rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white"
        >
           View Assessment Analytics
		</a>

        <div className="grid gap-5 md:grid-cols-3">
          <StatCard title="Total Bookings" value={stats.totalBookings} />
          <StatCard title="Paid Sessions" value={stats.paidSessions} />
          <StatCard title="Pending Sessions" value={stats.pendingSessions} />
          <StatCard
            title="Total Revenue"
            value={`KES ${stats.totalRevenue.toLocaleString()}`}
          />
          <StatCard title="Therapists" value={stats.therapists} />
          <StatCard title="Clients" value={stats.clients} />
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
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h2 className="mt-3 text-3xl font-bold text-gray-900">{value}</h2>
    </div>
  );
}