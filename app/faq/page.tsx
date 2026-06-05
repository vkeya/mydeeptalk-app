export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">
          <h1 className="text-5xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 text-lg text-white/80">
            Answers to common questions about MyDeepTalk.
          </p>
        </div>

        <div className="mt-10 space-y-6">

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              What is MyDeepTalk?
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              MyDeepTalk is an emotional wellness and therapist support platform
              that helps people understand themselves, reflect deeply and connect
              with qualified therapists.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Is MyDeepTalk therapy?
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              No. MyDeepTalk is a preventive emotional wellness platform.
              Professional therapy services are provided by licensed therapists
              available through the platform.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              How do I find a therapist?
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              You can browse verified therapists based on specialty, gender,
              language, experience and availability.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Can therapists join MyDeepTalk?
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Yes. Therapists can create profiles, upload credentials and
              become part of the MyDeepTalk professional network.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Is my information private?
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Yes. Protecting user privacy and confidentiality is a core part
              of the MyDeepTalk mission.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}