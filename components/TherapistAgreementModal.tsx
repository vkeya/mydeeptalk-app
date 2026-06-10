"use client";

import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  userId: string;
  onAccepted: () => void;
};

export default function TherapistAgreementModal({ userId, onAccepted }: Props) {
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);

  async function acceptAgreement() {
    if (!checked) {
      alert("Please tick the agreement checkbox before continuing.");
      return;
    }

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", userId),
        {
          therapistAgreementAccepted: true,
          therapistAgreementAcceptedAt: serverTimestamp(),
          therapistAgreementVersion: "professional-services-agreement-v1",
        },
        { merge: true }
      );

      onAccepted();
    } catch (error) {
      console.error(error);
      alert("Could not save agreement acceptance.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        <p className="font-bold uppercase tracking-wide text-[#0F4C5C]">
          Professional Services Agreement
        </p>

        <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
          Please review before continuing
        </h2>

        <div className="mt-6 space-y-4 text-base font-medium leading-8 text-gray-900">
          <p>
            Before submitting therapist information on MyDeepTalk, you must
            confirm that you have read and accepted the Professional Services
            Agreement.
          </p>

          <p>
            By accepting, you agree to provide services as an independent
            wellness professional, maintain accurate credentials, protect client
            confidentiality, follow platform booking and attendance rules, and
            comply with applicable professional and data protection obligations.
          </p>

          <p>
            You also acknowledge that MyDeepTalk is a digital wellness platform
            and does not replace your professional, legal, licensing, or ethical
            responsibilities.
          </p>

          <div className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-100 p-5 text-base font-semibold text-gray-900">
            You should only continue if you understand and agree to the
            agreement terms.
          </div>
        </div>

        <label className="mt-8 flex items-start gap-3 rounded-2xl bg-[#F7F3EC] p-5 font-semibold text-gray-900">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 h-5 w-5"
          />
          <span>
            I have read, understood, and agree to the MyDeepTalk Professional
            Services Agreement.
          </span>
        </label>

        <button
          type="button"
          onClick={acceptAgreement}
          disabled={saving}
          className="mt-6 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:opacity-70"
        >
          {saving ? "Saving..." : "Accept and Continue"}
        </button>
      </div>
    </div>
  );
}