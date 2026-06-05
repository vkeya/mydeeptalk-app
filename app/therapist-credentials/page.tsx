"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function TherapistCredentialsPage() {
  const router = useRouter();

  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function uploadFile(file: File, folder: string, uid: string) {
    const fileRef = ref(
      storage,
      `${folder}/${uid}/${Date.now()}-${file.name}`
    );

    await uploadBytes(fileRef, file);

    return await getDownloadURL(fileRef);
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

    try {
      const licenseUrl = await uploadFile(
        licenseFile,
        "therapist-licenses",
        user.uid
      );

      const certificateUrl = await uploadFile(
        certificateFile,
        "therapist-certificates",
        user.uid
      );

      const photoUrl = await uploadFile(
        profilePhoto,
        "therapist-photos",
        user.uid
      );

      await setDoc(
        doc(db, "therapistCredentials", user.uid),
        {
          uid: user.uid,
          licenseNumber,
          licenseUrl,
          certificateUrl,
          photoUrl,
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
        },
        { merge: true }
      );

      setMessage("Documents uploaded successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Credentials Verification
          </h1>

          <p className="mt-4 text-white/80">
            Upload your professional documents to become a verified therapist.
          </p>
        </div>

        {/* Form */}

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          {message && (
            <div className="mb-6 rounded-2xl bg-green-100 p-4 text-green-700">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                License / Registration Number
              </label>

              <input
                className="w-full rounded-2xl border p-4"
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
                onChange={(e) =>
                  setLicenseFile(e.target.files?.[0] || null)
                }
                required
              />
            </div>

            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                Certificate / Qualification
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setCertificateFile(e.target.files?.[0] || null)
                }
                required
              />
            </div>

            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                Profile Photo
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  setProfilePhoto(e.target.files?.[0] || null)
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
            >
              {loading ? "Uploading..." : "Submit For Verification"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}