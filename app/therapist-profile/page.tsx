"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import TherapistAgreementModal from "@/components/TherapistAgreementModal";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const specialtyOptions = [
  "Relationships",
  "Marriage & Couples Therapy",
  "Parenting",
  "Parent-Child Relationships",
  "Trauma & Healing",
  "Anxiety",
  "Depression",
  "Stress & Burnout",
  "Grief & Loss",
  "Addiction & Recovery",
  "Self-Esteem",
  "Emotional Regulation",
  "Life Transitions",
  "Youth & Teen Counseling",
  "Faith-Based Counseling",
];

export default function TherapistProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [languages, setLanguages] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [cpbLicenseNumber, setCpbLicenseNumber] = useState("");

  const [feeCurrency, setFeeCurrency] = useState("KES");

  const [sessionFees, setSessionFees] = useState({
    individual: "",
    couple: "",
    parentChild: "",
    family: "",
  });

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoPositionX, setPhotoPositionX] = useState(50);
  const [photoPositionY, setPhotoPositionY] = useState(50);

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

        const profileSnap = await getDoc(doc(db, "therapists", user.uid));

        if (profileSnap.exists()) {
          const data = profileSnap.data();

          setExistingProfile(data);
          setFullName(data.fullName || "");
		  setAge(data.age ? String(data.age) : "");
          setGender(data.gender || "");
          setBio(data.bio || "");
          setFeeCurrency(data.feeCurrency || data.currency || "KES");
          setCpbLicenseNumber(data.cpbLicenseNumber || "");

          setSpecialties(
            Array.isArray(data.specialties)
              ? data.specialties
              : typeof data.specialties === "string"
              ? data.specialties
                  .split(",")
                  .map((item: string) => item.trim())
                  .filter(Boolean)
              : []
          );

          setLanguages(
            Array.isArray(data.languages) ? data.languages.join(", ") : ""
          );

          setYearsExperience(data.yearsExperience?.toString() || "");

          setSessionFees({
            individual:
              data.sessionFees?.individual?.toString() ||
              data.sessionFee?.toString() ||
              "",
            couple: data.sessionFees?.couple?.toString() || "",
            parentChild: data.sessionFees?.parentChild?.toString() || "",
            family: data.sessionFees?.family?.toString() || "",
          });

          setCountry(data.country || "");
          setCity(data.city || "");
          setPhotoPreview(data.profilePhoto || data.photoUrl || "");
          setPhotoPositionX(data.photoPositionX ?? 50);
          setPhotoPositionY(data.photoPositionY ?? 50);
        }
      } catch (error) {
        console.error("Error loading therapist profile:", error);
      } finally {
        setPageLoading(false);
      }
    }

    loadProfile();
  }, []);

  function toggleSpecialty(item: string) {
    if (specialties.includes(item)) {
      setSpecialties(specialties.filter((specialty) => specialty !== item));
    } else {
      setSpecialties([...specialties, item]);
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoPositionX(50);
    setPhotoPositionY(50);

    e.target.value = "";
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
      alert(
        "Please accept the Professional Services Agreement before continuing."
      );
      return;
    }

    if (specialties.length === 0) {
      alert("Please select at least one specialty.");
      return;
    }

    if (!cpbLicenseNumber.trim()) {
      alert("Please enter your CPB license number.");
      return;
    }
	
	if (!age || Number(age) < 18) {
      alert("Please enter a valid age.");
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
		  age: Number(age),
          bio,
          specialties,
          languages: languages
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          yearsExperience: Number(yearsExperience),
          cpbLicenseNumber: cpbLicenseNumber.trim(),

          feeCurrency,
          currency: feeCurrency,

          sessionFees: {
            individual: Number(sessionFees.individual || 0),
            couple: Number(sessionFees.couple || 0),
            parentChild: Number(sessionFees.parentChild || 0),
            family: Number(sessionFees.family || 0),
          },

          sessionFee: Number(sessionFees.individual || 0),

          country,
          city,
          profilePhoto: finalPhotoUrl,
          photoUrl: finalPhotoUrl,
          photoPositionX,
          photoPositionY,
          storageProvider: finalPhotoUrl ? "cloudinary" : "",
          status: existingProfile?.status || "pending",
          credentialsStatus:
            existingProfile?.credentialsStatus || "not_uploaded",
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
      <main className="min-h-screen bg-[#F7F3EC] p-8">
        <p className="font-bold text-[#0F4C5C]">
          Loading therapist profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      {currentUserId && !agreementAccepted && (
        <TherapistAgreementModal
          userId={currentUserId}
          onAccepted={() => setAgreementAccepted(true)}
        />
      )}

      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Therapist Profile
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Complete Your Professional Profile
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Complete your professional profile so clients can find, understand,
            and trust your work.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-3 block font-bold text-[#0F4C5C]">
                Profile Photo
              </label>

              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="mb-4 h-36 w-36 rounded-full object-cover shadow"
                  style={{
                    objectPosition: `${photoPositionX}% ${photoPositionY}%`,
                  }}
                />
              ) : (
                <div className="mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 shadow">
                  No photo
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white hover:bg-[#0b3945]"
              >
                Choose Profile Photo
              </button>

              {photoPreview && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#0F4C5C]">
                      Move photo left / right
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={photoPositionX}
                      onChange={(e) =>
                        setPhotoPositionX(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#0F4C5C]">
                      Move photo up / down
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={photoPositionY}
                      onChange={(e) =>
                        setPhotoPositionY(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <select
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
			
			<input
              type="number"
              min="18"
              max="100"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <textarea
              rows={5}
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Tell clients about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-4 block font-bold text-[#0F4C5C]">
                Select Your Specialties
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                {specialtyOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-3 font-semibold text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={specialties.includes(item)}
                      onChange={() => toggleSpecialty(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Languages, e.g. English, Swahili"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              required
            />

            <input
              type="number"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="Years of Experience"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              required
            />

            <input
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              placeholder="CPB License Number"
              value={cpbLicenseNumber}
              onChange={(e) => setCpbLicenseNumber(e.target.value)}
              required
            />

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-4 block font-bold text-[#0F4C5C]">
                Session Fees
              </label>

              <select
                className="mb-6 w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                value={feeCurrency}
                onChange={(e) => setFeeCurrency(e.target.value)}
                required
              >
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="USD">USD - US Dollar</option>
              </select>

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Individual Session Fee (${feeCurrency})`}
                  value={sessionFees.individual}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
                      individual: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Couple Session Fee (${feeCurrency})`}
                  value={sessionFees.couple}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
                      couple: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Parent + Child Session Fee (${feeCurrency})`}
                  value={sessionFees.parentChild}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
                      parentChild: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  placeholder={`Family Session Fee (${feeCurrency})`}
                  value={sessionFees.family}
                  onChange={(e) =>
                    setSessionFees({
                      ...sessionFees,
                      family: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />

              <input
                className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
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
        </section>
      </div>
    </main>
  );
}