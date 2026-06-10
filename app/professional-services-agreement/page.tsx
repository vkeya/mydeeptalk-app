export default function ProfessionalServicesAgreementPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Professional Services Agreement
        </h1>

        <div className="mt-8 space-y-8 text-base font-medium leading-8 text-gray-900">

          <p>
            This Professional Services Agreement governs the relationship
            between independent therapists and MyDeepTalk.
          </p>

          <div className="rounded-2xl bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Independent Professional Status
            </h2>

            <p className="mt-4">
              Therapists using MyDeepTalk are independent professionals and are
              not employees, agents or representatives of MyDeepTalk.
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              Professional Standards
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-8">
              <li>Maintain valid licenses and qualifications.</li>
              <li>Comply with ethical and professional standards.</li>
              <li>Provide accurate information.</li>
              <li>Maintain confidentiality.</li>
              <li>Act in the best interests of clients.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6">
            <h2 className="text-2xl font-bold text-[#E2954E]">
              Responsibilities
            </h2>

            <p className="mt-4">
              Therapists are responsible for:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-8">
              <li>Session quality.</li>
              <li>Professional conduct.</li>
              <li>Maintaining accurate availability.</li>
              <li>Protecting client confidentiality.</li>
              <li>Following applicable laws and regulations.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-[#C0392B]">
              Prohibited Conduct
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-8">
              <li>Fraudulent information.</li>
              <li>Misrepresentation of qualifications.</li>
              <li>Harassment or abuse.</li>
              <li>Violation of client privacy.</li>
              <li>Unethical or unlawful behavior.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#0F4C5C] p-6 text-white">
            <h2 className="text-2xl font-bold">
              Platform Rights
            </h2>

            <p className="mt-4">
              MyDeepTalk reserves the right to review, suspend or remove
              therapist accounts that violate professional, ethical or legal
              requirements.
            </p>
          </div>

          <p className="font-bold text-[#0F4C5C]">
            Last Updated: June 2026
          </p>

        </div>
      </div>
    </main>
  );
}