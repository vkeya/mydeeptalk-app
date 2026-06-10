export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Safety & Trust
        </h1>

        <div className="mt-8 space-y-8 text-base font-medium leading-8 text-gray-900">

          <p>
            MyDeepTalk is committed to creating a safe, respectful and supportive
            environment for everyone.
          </p>

          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              Respect and Kindness
            </h2>

            <p className="mt-4">
              Every member deserves dignity, empathy and respect regardless of
              their experiences, beliefs or background.
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6">
            <h2 className="text-2xl font-bold text-[#E2954E]">
              Report Harmful Behavior
            </h2>

            <p className="mt-4">
              If you encounter harassment, bullying, scams, inappropriate
              behavior or anything that makes you feel unsafe, please report it.
            </p>
          </div>

          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-[#C0392B]">
              Zero Tolerance Policy
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-8">
              <li>Harassment and bullying.</li>
              <li>Hate speech or discrimination.</li>
              <li>Threats or intimidation.</li>
              <li>Fraud and scams.</li>
              <li>Sharing private information without consent.</li>
              <li>Impersonation or false identities.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Therapist Verification
            </h2>

            <p className="mt-4">
              MyDeepTalk reviews therapist credentials to help maintain trust
              and professionalism across the platform.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0F4C5C] p-6 text-white">
            <h2 className="text-2xl font-bold">
              Building a Safe Community
            </h2>

            <p className="mt-4">
              Healing happens best in spaces where people feel respected,
              understood and emotionally safe.
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