"use client";

import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  userId: string;
  onAccepted: () => void;
};

const AGREEMENT_VERSION = "professional-services-agreement-v2";

export default function TherapistAgreementModal({ userId, onAccepted }: Props) {
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

    if (isBottom) {
      setHasScrolledToBottom(true);
    }
  }

  async function acceptAgreement() {
    if (!hasScrolledToBottom) {
      alert("Please scroll through the agreement before continuing.");
      return;
    }

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
          therapistAgreementVersion: AGREEMENT_VERSION,
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "therapistAgreements", userId),
        {
          uid: userId,
          accepted: true,
          acceptedAt: serverTimestamp(),
          agreementVersion: "professional-services-agreement-v2",
		   userAgent: navigator.userAgent,

          timezone:
            Intl.DateTimeFormat().resolvedOptions().timeZone
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
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-gray-200 p-6 md:p-8">
          <p className="font-bold uppercase tracking-wide text-[#0F4C5C]">
            Professional Services Agreement
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
            Please read before continuing
          </h2>

          <p className="mt-3 text-base font-semibold leading-7 text-gray-900">
            Review the key terms below before completing your therapist
            onboarding on MyDeepTalk.
          </p>
        </div>

        <div
          onScroll={handleScroll}
          className="max-h-[52vh] overflow-y-auto p-6 md:p-8"
        >
          <div className="space-y-6 text-base font-medium leading-8 text-gray-900">
            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                1. Agreement Parties
              </h3>
              <p>
                This Professional Services Agreement is between MyDeepTalk as
                the digital wellness platform and the registered wellness
                professional or therapist accepting these terms electronically.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                2. Scope of Services
              </h3>
              <p>
                The therapist provides wellness, counselling, coaching, therapy,
                or related professional services through the platform, within
                their lawful and professional scope of practice.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                3. Independent Contractor Relationship
              </h3>
              <p>
                The therapist acts as an independent contractor and not as an
                employee, agent, partner, or legal representative of MyDeepTalk.
                The therapist remains responsible for licensing, insurance,
                professional compliance, and legal obligations.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                4. Licensing and Professional Eligibility
              </h3>
              <p>
                The therapist confirms that all licenses, registrations,
                qualifications, certificates, and professional information
                submitted to MyDeepTalk are accurate, valid, and current. Where
                required, including in Kenya, the therapist must maintain valid
                professional registration such as CPB registration.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                5. Booking, Attendance, and Conduct
              </h3>
              <p>
                Therapists must maintain accurate availability, attend confirmed
                sessions punctually, communicate professionally, and follow
                MyDeepTalk booking, lateness, rescheduling, and cancellation
                rules. Repeated lateness, no-shows, or poor conduct may lead to
                enforcement action.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                6. Client No-Shows and Cancellations
              </h3>
              <p>
                Client attendance, punctuality, no-shows, and cancellations are
                governed by MyDeepTalk user-facing policies. A client no-show is
                not therapist misconduct where the therapist was available and
                present as required.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                7. Fees, Commission, and Payments
              </h3>
              <p>
                Clients pay MyDeepTalk for booked sessions. MyDeepTalk deducts
                its platform commission, currently 15%, and transfers the
                remaining balance to the therapist through the applicable payout
                method. Therapists are responsible for their own taxes and
                statutory obligations.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                8. Refunds, Chargebacks, and Adjustments
              </h3>
              <p>
                Refunds, cancellations, chargebacks, and payment adjustments may
                be accounted for before therapist payouts are made. Payment
                disputes must be raised within the period stated in platform
                payment policies or statements.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                9. Confidentiality and Data Protection
              </h3>
              <p>
                Therapists must protect client confidentiality and use client
                data only for legitimate professional purposes connected to
                booked services. Therapists must comply with applicable data
                protection laws, including the Kenya Data Protection Act where
                applicable.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                10. Client Safety and Professional Responsibility
              </h3>
              <p>
                Therapists are responsible for their professional judgment,
                client interactions, ethical conduct, documentation, referrals,
                and decisions. MyDeepTalk provides digital infrastructure but
                does not replace professional judgment, clinical responsibility,
                supervision, or regulatory duties.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                11. Platform Excluded Services
              </h3>
              <p>
                MyDeepTalk is not an emergency medical service, urgent care
                provider, crisis response provider, medication management
                service, or licensed healthcare facility. Therapists must handle
                urgent or high-risk situations according to their professional
                and legal obligations.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                12. Intellectual Property and Content
              </h3>
              <p>
                Therapists retain ownership of professional content they create.
                By uploading content to MyDeepTalk, therapists grant the
                platform a limited license to host, display, distribute, format,
                and make that content available for platform operations.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                13. Platform Review and Enforcement
              </h3>
              <p>
                MyDeepTalk may review credentials, request additional
                documentation, investigate complaints, issue warnings, suspend
                visibility, restrict access, or remove therapists where there are
                concerns about safety, false information, misconduct, expired
                credentials, or breach of platform standards.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                14. No Guarantee of Clients or Income
              </h3>
              <p>
                MyDeepTalk does not guarantee client bookings, income,
                visibility, ranking, or continued access to the platform.
                Bookings may depend on demand, availability, pricing, profile
                quality, client preferences, and platform policies.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                15. Dispute Resolution
              </h3>
              <p>
                The parties should first attempt to resolve disputes through
                good faith discussions or alternative dispute resolution before
                legal proceedings. Where unresolved, disputes may be submitted
                to confidential and binding arbitration in accordance with the
                applicable Kenyan arbitration guidelines.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                16. Termination
              </h3>
              <p>
                Either party may terminate the agreement according to the notice
                provisions in the full agreement. MyDeepTalk may terminate or
                restrict access immediately where there is serious misconduct,
                fraud, misrepresentation, legal risk, safety concern, or breach
                of confidentiality or professional obligations.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                17. Governing Law
              </h3>
              <p>
                This agreement is governed by the laws of Kenya. Electronic
                acceptance has the same effect as signing the agreement.
              </p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-bold text-[#0F4C5C]">
                18. Electronic Acceptance
              </h3>
              <p>
                By ticking the checkbox and clicking “Accept and Continue,” the
                therapist confirms that they have read, understood, and agreed
                to be legally bound by the MyDeepTalk Professional Services
                Agreement.
              </p>
            </section>

            <div className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-100 p-5 text-base font-semibold text-gray-900">
              This is a summary of the Professional Services Agreement. The full
              agreement remains the authoritative document.
            </div>

            <a
              href="/professional-services-agreement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-[#0F4C5C] bg-white px-6 py-3 font-bold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
            >
              Download Full Professional Services Agreement
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 md:p-8">
          {!hasScrolledToBottom && (
            <p className="mb-4 rounded-2xl bg-yellow-100 p-4 text-sm font-bold text-gray-900">
              Please scroll to the bottom of the agreement before accepting.
            </p>
          )}

          <label
            className={`flex items-start gap-3 rounded-2xl p-5 font-semibold text-gray-900 ${
              hasScrolledToBottom ? "bg-[#F7F3EC]" : "bg-gray-100 opacity-70"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={!hasScrolledToBottom}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 h-5 w-5"
            />
            <span>
              I have read, understood, and agree to be legally bound by the
              MyDeepTalk Professional Services Agreement.
            </span>
          </label>

          <button
            type="button"
            onClick={acceptAgreement}
            disabled={saving || !checked || !hasScrolledToBottom}
            className="mt-6 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Accept and Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}