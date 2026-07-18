"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

type EducationQualification = {
  id: string;
  level: string;
  institution: string;
  fieldOfStudy: string;
  yearCompleted: string;
  certificateFile: File | null;
};

const educationLevels = [
  "Diploma",
  "Bachelor's Degree",
  "Postgraduate Diploma",
  "Master's Degree",
  "PhD / Doctorate",
  "Other",
];

function createEducationQualification(): EducationQualification {
  return {
    id: crypto.randomUUID(),
    level: "",
    institution: "",
    fieldOfStudy: "",
    yearCompleted: "",
    certificateFile: null,
  };
}

export default function TherapistCredentialsPage() {
  const router = useRouter();

  const [cpbLicenseNumber, setCpbLicenseNumber] = useState("");
  const [cpbLicenseFile, setCpbLicenseFile] = useState<File | null>(null);

  const [educationQualifications, setEducationQualifications] = useState<
    EducationQualification[]
  >([createEducationQualification()]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
const [licenseAuthority, setLicenseAuthority] = useState("");
const [licenseCountry, setLicenseCountry] = useState("");

  useEffect(() => {
  async function loadTherapistProfile() {
    const user = auth.currentUser;

    if (!user) return;

    const therapistSnap = await getDoc(doc(db, "therapists", user.uid));

    if (!therapistSnap.exists()) return;

    const therapist = therapistSnap.data();

    setProfessionalTitle(therapist.professionalTitle || "");

    setCpbLicenseNumber(
      therapist.licenseNumber ||
      therapist.cpbLicenseNumber ||
      ""
    );

    setLicenseAuthority(
      therapist.licenseAuthority ||
      "Counsellors & Psychologists Board"
    );

    setLicenseCountry(
      therapist.licenseCountry ||
      therapist.country ||
      ""
    );
  }

  loadTherapistProfile();
}, []);

  function updateEducationQualification(
    id: string,
    field: keyof EducationQualification,
    value: string | File | null
  ) {
    setEducationQualifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  function addEducationQualification() {
    setEducationQualifications((current) => [
      ...current,
      createEducationQualification(),
    ]);
  }

  function removeEducationQualification(id: string) {
    if (educationQualifications.length === 1) {
      alert("At least one education qualification is required.");
      return;
    }

    setEducationQualifications((current) =>
      current.filter((item) => item.id !== id)
    );
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

  function validateForm() {
    if (!cpbLicenseNumber.trim()) {
      alert("Please enter your CPB license number.");
      return false;
    }

    if (!cpbLicenseFile) {
      alert("Please upload your CPB license certificate.");
      return false;
    }

    if (educationQualifications.length === 0) {
      alert("Please add at least one education qualification.");
      return false;
    }

    for (const qualification of educationQualifications) {
      if (
        !qualification.level ||
        !qualification.institution.trim() ||
        !qualification.fieldOfStudy.trim() ||
        !qualification.yearCompleted.trim() ||
        !qualification.certificateFile
      ) {
        alert(
          "Please complete every education qualification and upload each certificate."
        );
        return false;
      }
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const cpbLicenseUrl = await uploadToCloudinary(
        cpbLicenseFile as File,
        `mydeeptalk/therapist-licenses/${user.uid}/cpb`
      );

      const uploadedEducationQualifications = await Promise.all(
        educationQualifications.map(async (qualification, index) => {
          const certificateUrl = await uploadToCloudinary(
            qualification.certificateFile as File,
            `mydeeptalk/therapist-education/${user.uid}/${index + 1}`
          );

          return {
            level: qualification.level,
            institution: qualification.institution.trim(),
            fieldOfStudy: qualification.fieldOfStudy.trim(),
            yearCompleted: qualification.yearCompleted.trim(),
            certificateUrl,
          };
        })
      );

      await setDoc(
        doc(db, "therapistCredentials", user.uid),
        {
          uid: user.uid,
          email: user.email,
          cpbLicenseNumber: cpbLicenseNumber.trim(),
          cpbLicenseUrl,
          educationQualifications: uploadedEducationQualifications,
          storageProvider: "cloudinary",
          status: "pending",
          uploadedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "therapists", user.uid),
        {
          cpbLicenseNumber: cpbLicenseNumber.trim(),
          credentialsUploaded: true,
          credentialsStatus: "pending",
          verificationStatus: "pending",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setMessage("Documents uploaded successfully. Returning to dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (error: any) {
      console.error("Credential upload error:", error);
      setMessage(error.message || "Could not upload documents.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Therapist Verification
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Credentials Verification
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Upload your CPB license and education documents so MyDeepTalk can
            review and verify your therapist profile.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10">
          {message && (
            <div className="mb-6 rounded-2xl bg-green-100 p-5 text-base font-bold text-gray-900">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-4 text-2xl font-bold text-[#0F4C5C]">
                Professional License
              </h2>

              <h3 className="mb-5 text-xl font-bold text-[#0F4C5C]">
  Professional License Information
</h3>

<div className="grid gap-5 md:grid-cols-2">

  <div>
    <label className="mb-2 block font-bold text-[#0F4C5C]">
      Professional Title
    </label>

    <input
      className="w-full rounded-2xl border border-gray-300 bg-gray-100 p-4 font-semibold text-gray-900"
      value={professionalTitle}
      readOnly
    />
  </div>

  <div>
    <label className="mb-2 block font-bold text-[#0F4C5C]">
      License Number
    </label>

    <input
      className="w-full rounded-2xl border border-gray-300 bg-gray-100 p-4 font-semibold text-gray-900"
      value={cpbLicenseNumber}
      readOnly
    />
  </div>

  <div>
    <label className="mb-2 block font-bold text-[#0F4C5C]">
      Licensing Authority
    </label>

    <input
      className="w-full rounded-2xl border border-gray-300 bg-gray-100 p-4 font-semibold text-gray-900"
      value={licenseAuthority}
      readOnly
    />
  </div>

  <div>
    <label className="mb-2 block font-bold text-[#0F4C5C]">
      Country of License
    </label>

    <input
      className="w-full rounded-2xl border border-gray-300 bg-gray-100 p-4 font-semibold text-gray-900"
      value={licenseCountry}
      readOnly
    />
  </div>

</div>

              <label className="mb-3 mt-6 block font-bold text-[#0F4C5C]">
                Upload CPB License Certificate
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-bold file:text-white"
                onChange={(e) => setCpbLicenseFile(e.target.files?.[0] || null)}
                required
              />

              <p className="mt-3 text-sm font-bold text-gray-900">
                Accepted formats: PDF, JPG, JPEG, PNG.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F4C5C]">
                    Education Qualifications
                  </h2>
                  <p className="mt-2 font-semibold text-gray-900">
                    Add each qualification separately and upload its certificate.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addEducationQualification}
                  className="rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white hover:bg-[#0b3945]"
                >
                  + Add Qualification
                </button>
              </div>

              <div className="space-y-6">
                {educationQualifications.map((qualification, index) => (
                  <div
                    key={qualification.id}
                    className="rounded-2xl border border-gray-300 bg-white p-5"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-[#0F4C5C]">
                        Qualification {index + 1}
                      </h3>

                      {educationQualifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeEducationQualification(qualification.id)
                          }
                          className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <select
                        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                        value={qualification.level}
                        onChange={(e) =>
                          updateEducationQualification(
                            qualification.id,
                            "level",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">Select Education Level</option>
                        {educationLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>

                      <input
                        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 placeholder:text-gray-700"
                        value={qualification.institution}
                        onChange={(e) =>
                          updateEducationQualification(
                            qualification.id,
                            "institution",
                            e.target.value
                          )
                        }
                        placeholder="Institution / University"
                        required
                      />

                      <input
                        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 placeholder:text-gray-700"
                        value={qualification.fieldOfStudy}
                        onChange={(e) =>
                          updateEducationQualification(
                            qualification.id,
                            "fieldOfStudy",
                            e.target.value
                          )
                        }
                        placeholder="Field of Study, e.g. Counselling Psychology"
                        required
                      />

                      <input
                        type="number"
                        min="1950"
                        max="2100"
                        className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 placeholder:text-gray-700"
                        value={qualification.yearCompleted}
                        onChange={(e) =>
                          updateEducationQualification(
                            qualification.id,
                            "yearCompleted",
                            e.target.value
                          )
                        }
                        placeholder="Year Completed"
                        required
                      />
                    </div>

                    <label className="mb-3 mt-5 block font-bold text-[#0F4C5C]">
                      Upload Certificate For This Qualification
                    </label>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-bold file:text-white"
                      onChange={(e) =>
                        updateEducationQualification(
                          qualification.id,
                          "certificateFile",
                          e.target.files?.[0] || null
                        )
                      }
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-100 p-5">
              <p className="text-base font-bold leading-7 text-gray-900">
                Your documents will be reviewed before your profile is approved
                and shown publicly to clients.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Submit For Verification"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}