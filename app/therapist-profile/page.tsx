"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export default function TherapistProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [languages, setLanguages] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [sessionFee, setSessionFee] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function uploadProfilePhoto(userId: string) {
    if (!photoFile) return "";

    const photoRef = ref(
      storage,
      `therapist-photos/${userId}/${Date.now()}-${photoFile.name}`
    );

    await uploadBytes(photoRef, photoFile);

    const downloadURL = await getDownloadURL(photoRef);

    return downloadURL;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      let profilePhoto = "";

      if (photoFile) {
        profilePhoto = await uploadProfilePhoto(user.uid);
      }

      await setDoc(
        doc(db, "therapists", user.uid),
        {
          uid: user.uid,
          email: user.email,
          fullName,
          gender,
          bio,
          specialties: specialties
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          languages: languages
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          yearsExperience: Number(yearsExperience),
          sessionFee: Number(sessionFee),
          country,
          city,
          profilePhoto,
          status: "pending",
          profileComplete: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Profile saved successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        "Error saving profile. If this happened during photo upload, confirm Firebase Storage is enabled."
      );
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Therapist Profile</h1>

          <p className="mt-4 text-white/80">
            Complete your professional profile so clients can find and trust
            you.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                Profile Photo
              </label>

              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="mb-4 h-32 w-32 rounded-full object-cover shadow"
                />
              ) : (
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white text-sm text-gray-500 shadow">
                  No photo
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full rounded-2xl border bg-white p-4"
              />

              <p className="mt-3 text-sm text-gray-500">
                Upload a clear, professional photo. This helps clients feel
                more comfortable booking with you.
              </p>
            </div>

            <input
              className="w-full rounded-2xl border p-4"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <select
              className="w-full rounded-2xl border p-4"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>

            <textarea
              rows={5}
              className="w-full rounded-2xl border p-4"
              placeholder="Tell clients about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />

            <input
              className="w-full rounded-2xl border p-4"
              placeholder="Specialties (comma separated)"
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              required
            />

            <input
              className="w-full rounded-2xl border p-4"
              placeholder="Languages (comma separated)"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="number"
                className="rounded-2xl border p-4"
                placeholder="Years of Experience"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                required
              />

              <input
                type="number"
                className="rounded-2xl border p-4"
                placeholder="Session Fee (KES)"
                value={sessionFee}
                onChange={(e) => setSessionFee(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                className="rounded-2xl border p-4"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />

              <input
                className="rounded-2xl border p-4"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}