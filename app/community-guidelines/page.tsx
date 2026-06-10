export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Community Guidelines
        </h1>

        <div className="mt-8 space-y-8 text-base font-medium leading-8 text-gray-900">

          <p>
            MyDeepTalk is a space for reflection, growth, healing and respectful
            conversations. We are building a community where people feel safe,
            heard and valued.
          </p>

          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              Be Kind and Respectful
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-8">
              <li>Treat others with dignity and compassion.</li>
              <li>Respect differences in beliefs and experiences.</li>
              <li>Encourage rather than criticize.</li>
              <li>Listen without judgment.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6">
            <h2 className="text-2xl font-bold text-[#E2954E]">
              Share Experiences, Not Diagnoses
            </h2>

            <p className="mt-4">
              Members are welcome to share personal experiences and lessons,
              but should avoid diagnosing or providing professional medical or
              psychological advice to others.
            </p>
          </div>

          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-[#C0392B]">
              Zero Tolerance for Harmful Behavior
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-8">
              <li>Harassment or bullying.</li>
              <li>Hate speech or discrimination.</li>
              <li>Threats or intimidation.</li>
              <li>Spam or scams.</li>
              <li>Sharing another person's private information.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Protect Your Privacy
            </h2>

            <p className="mt-4">
              Think carefully before sharing sensitive information. Protect
              your privacy and the privacy of others.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0F4C5C] p-6 text-white">
            <h2 className="text-2xl font-bold">
              Our Mission
            </h2>

            <p className="mt-4">
              Healing begins with awareness and meaningful conversations.
            </p>

            <p className="mt-4">
              Together, we can build a community that promotes self-discovery,
              emotional wellness and human connection.
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