"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import TherapistAgreementModal from "@/components/TherapistAgreementModal";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

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

  const [currentUserId, setCurrentUserId] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const [existingProfile, setExistingProfile] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;

      if (!user) {
        setPageLoading(false);
        return;
      }

      try {
        setCurrentUserId(user.uid);

        const userSnap = await getDoc(doc(db, "users", user.uid));

        if (userSnap.exists()) {
          setAgreementAccepted(
            userSnap.data().therapistAgreementAccepted === true
          );
        }

        const profileRef = doc(db, "therapists", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const data = profileSnap.data();

          setExistingProfile(data);
          setFullName(data.fullName || "");
          setGender(data.gender || "");
          setBio(data.bio || "");
          setSpecialties(
            Array.isArray(data.specialties) ? data.specialties.join(", ") : ""
          );
          setLanguages(
            Array.isArray(data.languages) ? data.languages.join(", ") : ""
          );
          setYearsExperience(data.yearsExperience?.toString() || "");
          setSessionFee(data.sessionFee?.toString() || "");
          setCountry(data.country || "");
          setCity(data.city || "");
          setPhotoPreview(data.profilePhoto || data.photoUrl || "");
        }
      } catch (error) {
        console.error("Error loading therapist profile:", error);
      } finally {
        setPageLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function uploadToCloudinary(file: File, folder: string) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary environment variables are missing.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Cloudinary upload failed.");
    }

    return data.secure_url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!agreementAccepted) {
      alert("Please accept the Professional Services Agreement before continuing.");
      return;
    }

    setLoading(true);

    try {
      let uploadedPhotoUrl = "";

      if (photoFile) {
        uploadedPhotoUrl = await uploadToCloudinary(
          photoFile,
          `mydeeptalk/therapist-photos/${user.uid}`
        );
      }

      const finalPhotoUrl =
        uploadedPhotoUrl ||
        existingProfile?.profilePhoto ||
        existingProfile?.photoUrl ||
        "";

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
          profilePhoto: finalPhotoUrl,
          photoUrl: finalPhotoUrl,
          storageProvider: finalPhotoUrl ? "cloudinary" : "",
          status: existingProfile?.status || "pending",
          credentialsStatus: existingProfile?.credentialsStatus || "not_uploaded",
          credentialsUploaded: existingProfile?.credentialsUploaded || false,
          profileComplete: true,
          createdAt: existingProfile?.createdAt || serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert(
        existingProfile
          ? "Profile updated successfully"
          : "Profile saved successfully"
      );

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Therapist profile save error:", error);
      alert(error.message || "Error saving profile.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-8 text-[#0F4C5C]">
        Loading therapist profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      {currentUserId && !agreementAccepted && (
        <TherapistAgreementModal
          userId={currentUserId}
          onAccepted={() => setAgreementAccepted(true)}
        />
      )}

      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Therapist Profile</h1>

          <p className="mt-4 text-white/90">
            Complete your professional profile so clients can find and trust
            you.
          </p>

          {existingProfile?.status && (
            <p className="mt-4 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              Current status: {existingProfile.status}
            </p>
          )}
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
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white text-sm text-gray-700 shadow">
                  No photo
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-semibold file:text-white"
              />

              <p className="mt-3 text-sm font-medium text-gray-800">
                Upload a clear, professional photo. This helps clients feel
                more comfortable booking with you.
              </p>
            </div>

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <select
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900"
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
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
              placeholder="Tell clients about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
              placeholder="Specialties (comma separated)"
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              required
            />

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
              placeholder="Languages (comma separated)"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="number"
                className="rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
                placeholder="Years of Experience"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                required
              />

              <input
                type="number"
                className="rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
                placeholder="Session Fee (KES)"
                value={sessionFee}
                onChange={(e) => setSessionFee(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                className="rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />

              <input
                className="rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945] disabled:opacity-70"
            >
              {loading
                ? existingProfile
                  ? "Updating..."
                  : "Saving..."
                : existingProfile
                ? "Update Profile"
                : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}