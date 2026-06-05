"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminTherapistsPage() {
  const [therapists, setTherapists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTherapists();
  }, []);

  async function fetchTherapists() {
    const q = query(
      collection(db, "therapists"),
      where("status", "==", "pending")
    );

    const snapshot = await getDocs(q);

    const list: any[] = [];

    snapshot.forEach((docItem) => {
      list.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setTherapists(list);
    setLoading(false);
  }

  async function approveTherapist(id: string) {
    await updateDoc(doc(db, "therapists", id), {
      status: "approved",
    });

    fetchTherapists();
  }

  async function rejectTherapist(id: string) {
    await updateDoc(doc(db, "therapists", id), {
      status: "rejected",
    });

    fetchTherapists();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading therapists...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Therapist Approvals
          </h1>

          <p className="mt-4 text-white/80">
            Review therapist credentials and approve trusted professionals.
          </p>
        </div>

        {therapists.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
            No pending therapists.
          </div>
        )}

        <div className="mt-8 space-y-8">

          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >

              <div className="flex flex-col gap-8 md:flex-row">

                {/* Photo */}

                <div>
                  {therapist.photoUrl ? (
                    <img
                      src={therapist.photoUrl}
                      alt={therapist.fullName}
                      className="h-36 w-36 rounded-full object-cover shadow"
                    />
                  ) : (
                    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#E2954E]/20 text-5xl font-bold text-[#0F4C5C]">
                      {therapist.fullName?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Details */}

                <div className="flex-1">

                  <h2 className="text-3xl font-bold text-[#0F4C5C]">
                    {therapist.fullName}
                  </h2>

                  <p className="mt-4 text-gray-600">
                    {therapist.bio}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">

                    <div>
                      <p>
                        <strong>Gender:</strong> {therapist.gender}
                      </p>

                      <p>
                        <strong>Experience:</strong>{" "}
                        {therapist.yearsExperience} years
                      </p>

                      <p>
                        <strong>Fee:</strong> KES {therapist.sessionFee}
                      </p>
                    </div>

                    <div>
                      <p>
                        <strong>Languages:</strong>{" "}
                        {therapist.languages?.join(", ")}
                      </p>

                      <p>
                        <strong>Specialties:</strong>{" "}
                        {therapist.specialties?.join(", ")}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {therapist.status}
                      </p>
                    </div>

                  </div>

                  <div className="mt-8 flex gap-4">

                    <button
                      onClick={() => approveTherapist(therapist.id)}
                      className="rounded-full bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectTherapist(therapist.id)}
                      className="rounded-full bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}