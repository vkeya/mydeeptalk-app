export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">
          <h1 className="text-5xl font-bold">
            Privacy Policy
          </h1>

          <p className="mt-6 text-lg text-white/80">
            Effective Date: June 2026
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Your Privacy Matters
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            MyDeepTalk is committed to protecting your personal information.
            We do not sell your personal data or conversations.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Information may be used to provide AI-powered reflections,
            therapist discovery, booking services, account management,
            security and platform improvement.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Payments are processed securely by trusted third-party providers,
            and sensitive card details are not stored by MyDeepTalk.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Conversations with AI are intended for self-discovery and
            informational purposes and do not replace licensed professional therapy.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Questions regarding privacy may be directed to:
          </p>

          <div className="mt-6 rounded-2xl bg-[#F7F3EC] p-6">
            <p className="font-semibold text-[#0F4C5C]">
              info@mydeeptalk.com
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}