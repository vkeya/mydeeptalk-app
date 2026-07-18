"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  buildTherapistClients,
  type Booking,
} from "@/lib/therapist/clientAnalytics";
import Link from "next/link";


export default function TherapistClientsPage() {
	
	const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
	
	useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "bookings"),
        where("therapistId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      setBookings(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[]
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);
	
const clients = useMemo(
  () => buildTherapistClients(bookings),
  [bookings]
);

const activeClients =
  clients.filter(c => c.status === "active").length;

const inactiveClients =
  clients.filter(c => c.status === "inactive").length;

const totalUpcomingSessions =
  clients.reduce(
    (sum, c) => sum + c.upcomingSessions,
    0
  );

if (loading) {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <p className="font-bold text-[#0F4C5C]">
        Loading therapist clients...
      </p>
    </main>
  );
}



return (
  <main className="min-h-screen bg-[#F7F3EC] p-6">
    <div className="mx-auto max-w-6xl">

      <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
        <p className="mb-3 font-bold uppercase tracking-wide">
          Therapist CRM
        </p>

        <h1 className="text-4xl font-bold">
          My Clients
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-8">
          View your clients, monitor their progress,
          review previous sessions, and prepare for
          upcoming appointments.
        </p>
      </section>
	  
	  <section className="my-10 grid gap-4 md:grid-cols-4">
	   <SummaryCard
    title="Total Clients"
    value={clients.length}
/>

<SummaryCard
    title="Active Clients"
    value={activeClients}
/>

<SummaryCard
    title="Inactive Clients"
    value={inactiveClients}
/>

<SummaryCard
    title="Upcoming Sessions"
    value={totalUpcomingSessions}
/>
</section>

    <p className="mt-4">
  Total bookings: {bookings.length}
</p>

<p>
  Total clients: {clients.length}
</p>

<div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {clients.map((client) => (
    <div
      key={client.clientId}
      className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg"
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F4C5C]">
            {client.clientAlias || client.clientName}
          </h2>

          <p className="text-sm text-gray-500">
            {client.clientName}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {client.clientEmail}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            client.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {client.status}
        </span>
      </div>

      {/* Divider */}

      <div className="my-5 border-t" />

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-bold">
            {client.totalSessions}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Completed</p>
          <p className="font-bold">
            {client.completedSessions}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Upcoming</p>
          <p className="font-bold">
            {client.upcomingSessions}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Cancelled</p>
          <p className="font-bold">
            {client.cancelledSessions}
          </p>
        </div>
      </div>

      {/* Divider */}

      <div className="my-5 border-t" />

      {/* Dates */}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Last Session
          </span>

          <span>
            {client.lastSession || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Next Session
          </span>

          <span>
            {client.nextSession || "—"}
          </span>
        </div>
      </div>

      {/* Button */}

      <Link
  href={`/therapist-clients/${client.clientId}`}
  className="mt-6 block w-full rounded-xl bg-[#0F4C5C] py-3 text-center font-semibold text-white transition hover:bg-[#0C3D49]"
>
  View Client
</Link>
    </div>
  ))}
</div>
</div>
  </main>
);
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="font-bold text-[#0F4C5C]">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
        {value}
      </h2>
    </div>
  );
}