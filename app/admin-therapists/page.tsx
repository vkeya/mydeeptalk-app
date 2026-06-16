"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type Therapist = {
  id: string;
  uid?: string;
  fullName?: string;
  email?: string;
  gender?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  yearsExperience?: number;
  cpbLicenseNumber?: string;
  feeCurrency?: string;
  sessionFee?: number;
  country?: string;
  city?: string;
  profilePhoto?: string;
  status?: string;
  credentialsUploaded?: boolean;
  credentialsStatus?: string;
  rejectionReason?: string;
};

type EducationQualification = {
  level?: string;
  institution?: string;
  fieldOfStudy?: string;
  yearCompleted?: string;
  certificateUrl?: string;
};

type Credentials = {
  cpbLicenseNumber?: string;
  cpbLicenseUrl?: string;
  educationQualifications?: EducationQualification[];
  status?: string;
};

type Agreement = {
  accepted?: boolean;
  agreementVersion?: string;
  acceptedAt?: any;
};

export default function AdminTherapistsPage() {
  const router = useRouter();

  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [credentials, setCredentials] = useState<Record<string, Credentials>>(
    {}
  );
  const [agreements, setAgreements] = useState<Record<string, Agreement>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));
	  
	  console.log("ADMIN USER CHECK:", {
  authUid: user.uid,
  authEmail: user.email,
  firestoreExists: userSnap.exists(),
  firestoreData: userSnap.exists() ? userSnap.data() : null,
});

      if (!userSnap.exists() || userSnap.data().role !== "admin") {
        router.push("/dashboard");
        return;
      }

      await loadTherapists();
    });

    return () => unsubscribe();
  }, [router]);

  async function loadTherapists() {
    try {
      setLoading(true);

      const therapistsSnap = await getDocs(collection(db, "therapists"));

      const therapistList = therapistsSnap.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      })) as Therapist[];

      const credentialsMap: Record<string, Credentials> = {};
      const agreementsMap: Record<string, Agreement> = {};

      await Promise.all(
        therapistList.map(async (therapist) => {
          const therapistId = therapist.uid || therapist.id;

          const credentialsSnap = await getDoc(
            doc(db, "therapistCredentials", therapistId)
          );

          if (credentialsSnap.exists()) {
            credentialsMap[therapistId] =
              credentialsSnap.data() as Credentials;
          }

          const agreementSnap = await getDoc(
            doc(db, "therapistAgreements", therapistId)
          );

          if (agreementSnap.exists()) {
            agreementsMap[therapistId] = agreementSnap.data() as Agreement;
          }
        })
      );

      therapistList.sort((a, b) => {
        const statusOrder: Record<string, number> = {
          pending: 1,
          rejected: 2,
          approved: 3,
        };

        return (
          (statusOrder[a.status || "pending"] || 99) -
          (statusOrder[b.status || "pending"] || 99)
        );
      });

      setTherapists(therapistList);
      setCredentials(credentialsMap);
      setAgreements(agreementsMap);
    } catch (error) {
      console.error("Error loading admin therapists:", error);
      alert("Could not load therapist review dashboard.");
    } finally {
      setLoading(false);
    }
  }

  async function approveTherapist(therapistId: string) {
    setActionLoading(therapistId);

    try {
      await updateDoc(doc(db, "therapists", therapistId), {
        status: "approved",
        credentialsStatus: "approved",
        verificationStatus: "verified",
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await setDoc(
        doc(db, "therapistCredentials", therapistId),
        {
          status: "approved",
          reviewedAt: serverTimestamp(),
        },
        { merge: true }
      );

      await loadTherapists();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Could not approve therapist.");
    } finally {
      setActionLoading("");
    }
  }

 async function rejectTherapist(therapist: Therapist) {
  const therapistId = therapist.uid || therapist.id;

  const reason = prompt("Enter reason for rejection or requested changes:");

  if (!reason) return;

  setActionLoading(therapistId);

    try {
      await updateDoc(doc(db, "therapists", therapistId), {
        status: "rejected",
        credentialsStatus: "rejected",
        verificationStatus: "rejected",
        rejectionReason: reason,
        rejectedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await setDoc(
        doc(db, "therapistCredentials", therapistId),
        {
          status: "rejected",
          rejectionReason: reason,
          reviewedAt: serverTimestamp(),
        },
        { merge: true }
      );
	  
	  if (therapist.email) {
  await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: therapist.email,
      subject: "MyDeepTalk Therapist Profile Requires Updates",
      html: `
        <p>Hello ${therapist.fullName || "there"},</p>

        <p>Thank you for submitting your therapist profile to MyDeepTalk.</p>

        <p>We reviewed your submission and need you to make the following correction(s):</p>

        <p><strong>${reason}</strong></p>

        <p>Please log in to your MyDeepTalk account, make the required changes, and resubmit for review.</p>

        <p>Warm regards,<br/>
        MyDeepTalk Team</p>
      `,
    }),
  });
}

      await loadTherapists();
    } catch (error) {
      console.error("Rejection error:", error);
      alert("Could not reject therapist.");
    } finally {
      setActionLoading("");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-10">
        <p className="font-bold text-[#0F4C5C]">
          Loading therapist review dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Admin Review
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Therapist Verification Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Review therapist profiles, CPB license details, education
            qualifications, agreement acceptance, and verification status.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-4">
          <StatCard
            title="Total Therapists"
            value={therapists.length.toString()}
          />
          <StatCard
            title="Pending"
            value={therapists
              .filter((item) => item.status === "pending")
              .length.toString()}
          />
          <StatCard
            title="Approved"
            value={therapists
              .filter((item) => item.status === "approved")
              .length.toString()}
          />
          <StatCard
            title="Rejected"
            value={therapists
              .filter((item) => item.status === "rejected")
              .length.toString()}
          />
        </section>

        {therapists.length === 0 ? (
          <section className="mt-8 rounded-3xl bg-white p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              No therapists found
            </h2>
          </section>
        ) : (
          <section className="mt-8 space-y-6">
            {therapists.map((therapist) => {
              const therapistId = therapist.uid || therapist.id;
              const therapistCredentials = credentials[therapistId];
              const therapistAgreement = agreements[therapistId];

              return (
                <article
                  key={therapist.id}
                  className="rounded-3xl bg-white p-6 shadow-lg md:p-8"
                >
                  <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                    <div>
                      {therapist.profilePhoto ? (
                        <img
                          src={therapist.profilePhoto}
                          alt={therapist.fullName || "Therapist"}
                          className="h-40 w-40 rounded-full object-cover shadow"
                        />
                      ) : (
                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#F7F3EC] text-5xl font-bold text-[#0F4C5C] shadow">
                          {therapist.fullName?.charAt(0)?.toUpperCase() ||
                            "T"}
                        </div>
                      )}

                      <h2 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                        {therapist.fullName || "Unnamed Therapist"}
                      </h2>

                      <p className="mt-2 font-semibold text-gray-900">
                        {therapist.email || "No email"}
                      </p>

                      <StatusBadge status={therapist.status || "pending"} />

                      <div className="mt-5 space-y-2 text-sm font-semibold text-gray-900">
                        <p>
                          <strong>Gender:</strong>{" "}
                          {therapist.gender || "Not specified"}
                        </p>
                        <p>
                          <strong>Experience:</strong>{" "}
                          {therapist.yearsExperience || 0} years
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          {[therapist.city, therapist.country]
                            .filter(Boolean)
                            .join(", ") || "Not specified"}
                        </p>
                        <p>
                          <strong>Fee:</strong>{" "}
                          {therapist.sessionFee
                            ? `${therapist.feeCurrency || "KES"} ${
                                therapist.sessionFee
                              }`
                            : "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <InfoSection title="Profile Summary">
                        <p className="font-semibold leading-7 text-gray-900">
                          {therapist.bio || "No bio provided."}
                        </p>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <InfoBox
                            label="Specialties"
                            value={
                              therapist.specialties?.length
                                ? therapist.specialties.join(", ")
                                : "Not specified"
                            }
                          />

                          <InfoBox
                            label="Languages"
                            value={
                              therapist.languages?.length
                                ? therapist.languages.join(", ")
                                : "Not specified"
                            }
                          />
                        </div>
                      </InfoSection>

                      <InfoSection title="Professional License">
                        <div className="grid gap-4 md:grid-cols-2">
                          <InfoBox
                            label="CPB License Number"
                            value={
                              therapistCredentials?.cpbLicenseNumber ||
                              therapist.cpbLicenseNumber ||
                              "Not uploaded"
                            }
                          />

                          <div className="rounded-2xl bg-[#F7F3EC] p-4">
                            <p className="text-sm font-bold uppercase text-[#0F4C5C]">
                              CPB License Document
                            </p>

                            {therapistCredentials?.cpbLicenseUrl ? (
                              <a
                                href={therapistCredentials.cpbLicenseUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block font-bold text-[#0F4C5C] underline"
                              >
                                View CPB License
                              </a>
                            ) : (
                              <p className="mt-2 font-semibold text-gray-900">
                                Not uploaded
                              </p>
                            )}
                          </div>
                        </div>
                      </InfoSection>

                      <InfoSection title="Education Qualifications">
                        {therapistCredentials?.educationQualifications
                          ?.length ? (
                          <div className="space-y-4">
                            {therapistCredentials.educationQualifications.map(
                              (qualification, index) => (
                                <div
                                  key={`${qualification.level}-${index}`}
                                  className="rounded-2xl bg-[#F7F3EC] p-4"
                                >
                                  <p className="text-lg font-bold text-[#0F4C5C]">
                                    {qualification.level || "Qualification"}
                                  </p>

                                  <p className="mt-2 font-semibold text-gray-900">
                                    <strong>Institution:</strong>{" "}
                                    {qualification.institution ||
                                      "Not specified"}
                                  </p>

                                  <p className="font-semibold text-gray-900">
                                    <strong>Field:</strong>{" "}
                                    {qualification.fieldOfStudy ||
                                      "Not specified"}
                                  </p>

                                  <p className="font-semibold text-gray-900">
                                    <strong>Year:</strong>{" "}
                                    {qualification.yearCompleted ||
                                      "Not specified"}
                                  </p>

                                  {qualification.certificateUrl && (
                                    <a
                                      href={qualification.certificateUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-3 inline-block font-bold text-[#0F4C5C] underline"
                                    >
                                      View Certificate
                                    </a>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="font-semibold text-gray-900">
                            No education qualifications uploaded.
                          </p>
                        )}
                      </InfoSection>

                      <InfoSection title="Agreement Acceptance">
                        <div className="grid gap-4 md:grid-cols-2">
                          <InfoBox
                            label="Accepted"
                            value={therapistAgreement?.accepted ? "Yes" : "No"}
                          />

                          <InfoBox
                            label="Version"
                            value={
                              therapistAgreement?.agreementVersion ||
                              "Not available"
                            }
                          />
                        </div>
                      </InfoSection>

                     {therapist.status === "pending" ? (
  <div className="flex flex-wrap gap-4">
    <button
      type="button"
      disabled={actionLoading === therapistId}
      onClick={() => approveTherapist(therapistId)}
      className="rounded-full bg-green-700 px-6 py-3 font-bold text-white hover:bg-green-800 disabled:opacity-70"
    >
      {actionLoading === therapistId ? "Saving..." : "Approve Therapist"}
    </button>

    <button
      type="button"
      disabled={actionLoading === therapistId}
      onClick={() => rejectTherapist(therapist)}
      className="rounded-full bg-red-700 px-6 py-3 font-bold text-white hover:bg-red-800 disabled:opacity-70"
    >
      Reject / Request Changes
    </button>
  </div>
) : (
  <div className="rounded-2xl bg-[#F7F3EC] p-5">
    <p className="font-bold text-[#0F4C5C]">
      Review completed
    </p>
    <p className="mt-2 font-semibold text-gray-900">
      Status: {therapist.status?.toUpperCase()}
    </p>

    {therapist.status === "rejected" && therapist.rejectionReason && (
      <p className="mt-2 font-semibold text-red-700">
        Reason: {therapist.rejectionReason}
      </p>
    )}
  </div>
)}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <p className="font-bold uppercase tracking-wide text-[#0F4C5C]">
        {title}
      </p>

      <p className="mt-3 text-4xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "approved"
      ? "bg-green-100 text-green-800"
      : status === "rejected"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <span
      className={`mt-4 inline-block rounded-full px-4 py-2 text-sm font-bold ${style}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 p-5">
      <h3 className="mb-4 text-xl font-bold text-[#0F4C5C]">{title}</h3>
      {children}
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F7F3EC] p-4">
      <p className="text-sm font-bold uppercase text-[#0F4C5C]">{label}</p>
      <p className="mt-2 font-semibold text-gray-900">{value}</p>
    </div>
  );
}