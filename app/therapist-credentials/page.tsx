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
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

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

    if (!licenseFile || !certificateFile || !profilePhoto) {
      alert("Please upload all required documents.");
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

      const photoUrl = await uploadToCloudinary(
        profilePhoto,
        `mydeeptalk/therapist-photos/${user.uid}`
      );

      await setDoc(
        doc(db, "therapistCredentials", user.uid),
        {
          uid: user.uid,
          licenseNumber,
          licenseUrl,
          certificateUrl,
          photoUrl,
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
          photoUrl,
          profilePhoto: photoUrl,
        },
        { merge: true }
      );

      setMessage("Documents uploaded successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Credential upload error:", error);
      setMessage(error.message || "Could not upload documents.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Credentials Verification</h1>

          <p className="mt-4 text-white/90">
            Upload your professional documents to become a verified therapist.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          {message && (
            <div className="mb-6 rounded-2xl bg-green-100 p-4 font-semibold text-green-800">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                License / Registration Number
              </label>

              <input
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                Professional License
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-semibold file:text-white"
                onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                required
              />

              <p className="mt-2 text-sm font-semibold text-gray-900">
                Accepted formats: PDF, JPG, JPEG, PNG.
              </p>
            </div>

            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                Certificate / Qualification
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#0F4C5C] file:px-4 file:py-2 file:font-semibold file:text-white"
                onChange={(e) =>
                  setCertificateFile(e.target.files?.[0] || null)
                }
                required
              />

              <p className="mt-2 text-sm font-semibold text-gray-900">
                Upload your certificate or qualification document.
              </p>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945] disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Submit For Verification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}