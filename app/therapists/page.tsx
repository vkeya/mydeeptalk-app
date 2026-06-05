"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    async function fetchTherapists() {
      const q = query(
        collection(db, "therapists"),
        where("status", "==", "approved")
      );

      const snapshot = await getDocs(q);

      const list: any[] = [];
      snapshot.forEach((document) => {
        list.push({ id: document.id, ...document.data() });
      });

      setTherapists(list);
      setLoading(false);
    }

    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesGender = gender ? therapist.gender === gender : true;

    const matchesSpecialty = specialty
      ? therapist.specialties?.some((item: string) =>
          item.toLowerCase().includes(specialty.toLowerCase())
        )
      : true;

    const matchesLanguage = language
      ? therapist.languages?.some((item: string) =>
          item.toLowerCase().includes(language.toLowerCase())
        )
      : true;

    return matchesGender && matchesSpecialty && matchesLanguage;
  });

  if (loading) {
    return <div className="p-10">Loading therapists...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Find a Therapist</h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Browse verified therapists by specialty, language, gender, experience and session fee.
        </p>
      </div>

      <div className="mb-8 grid gap-4 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-3">
        <select
          className="rounded-xl border p-3 text-gray-700 outline-none focus:border-[#0F4C5C]"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <input
          className="rounded-xl border p-3 text-gray-700 outline-none focus:border-[#0F4C5C]"
          placeholder="Search specialty e.g. trauma"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />

        <input
          className="rounded-xl border p-3 text-gray-700 outline-none focus:border-[#0F4C5C]"
          placeholder="Search language e.g. Swahili"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>

      {filteredTherapists.length === 0 && (
        <div className="rounded-2xl bg-white p-8 shadow">
          <p className="text-gray-600">No therapists match your search.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTherapists.map((therapist) => (
          <div
            key={therapist.id}
            className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex items-center gap-4">
              {therapist.photoUrl ? (
                <img
                  src={therapist.photoUrl}
                  alt={therapist.fullName}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E2954E]/20 text-xl font-bold text-[#0F4C5C]">
                  {therapist.fullName?.charAt(0)}
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-[#0F4C5C]">
                  {therapist.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  {therapist.city}, {therapist.country}
                </p>
              </div>
            </div>

            <p className="line-clamp-3 text-sm leading-6 text-gray-600">
              {therapist.bio}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {therapist.specialties?.slice(0, 3).map((item: string) => (
                <span
                  key={item}
                  className="rounded-full bg-[#F7F3EC] px-3 py-1 text-xs text-[#0F4C5C]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-700">
              <p>
                <strong>Gender:</strong> {therapist.gender}
              </p>
              <p>
                <strong>Experience:</strong> {therapist.yearsExperience} years
              </p>
              <p>
                <strong>Languages:</strong> {therapist.languages?.join(", ")}
              </p>
              <p>
                <strong>Fee:</strong> KES {therapist.sessionFee}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/therapists/${therapist.id}`}
                className="flex-1 rounded-full border border-[#0F4C5C] px-4 py-3 text-center text-sm font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                View Profile
              </Link>

              <Link
                href={`/book-session/${therapist.id}`}
                className="flex-1 rounded-full bg-[#0F4C5C] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0b3945]"
              >
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}