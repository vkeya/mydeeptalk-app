"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function TherapistCredentialsPage() {
  const router = useRouter();

  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

    if (!licenseFile || !certificateFile) {
      alert("Please upload your license and certificate.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const licenseUrl = await uploadToCloudinary(
        licenseFile,
        `mydeeptalk/therapist-licenses/${user.uid}`
      );

      const certificateUrl = await uploadToCloudinary(
        certificateFile,
        `mydeeptalk/therapist-certificates/${user.uid}`
      );

      await setDoc(
        doc(db, "therapistCredentials", user.uid),
        {
          uid: user.uid,
          licenseNumber,
          licenseUrl,
          certificateUrl,
          storageProvider: "cloudinary",
          status: "pending",
          uploadedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "therapists", user.uid),
        {
          credentialsUploaded: true,
          credentialsStatus: "pending",
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
            Upload your professional documents so MyDeepTalk can review and
            verify your therapist profile.
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
              <label className="mb-3 block font-bold text-[#0F4C5C]">
                License / Registration Number
              </label>

              <input
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 placeholder:text-gray-700"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="Enter your license or registration number"
                required
              />
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-3 block font-bold text-[#0F4C5C]">
                Professional License
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-bold file:text-white"
                onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                required
              />

              <p className="mt-3 text-sm font-bold text-gray-900">
                Accepted formats: PDF, JPG, JPEG, PNG.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-3 block font-bold text-[#0F4C5C]">
                Certificate / Qualification
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-bold file:text-white"
                onChange={(e) =>
                  setCertificateFile(e.target.files?.[0] || null)
                }
                required
              />

              <p className="mt-3 text-sm font-bold text-gray-900">
                Upload your professional certificate or qualification document.
              </p>
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
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Submit For Verification"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}