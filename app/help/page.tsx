export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Help Center
        </h1>

        <p className="mt-6 text-lg font-medium text-gray-900">
          We're here to help. Find answers to common questions and ways to
          contact the MyDeepTalk team.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-[#F7F3EC] p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Account Support
            </h2>

            <ul className="mt-4 space-y-3 text-gray-900">
              <li>• Email verification</li>
              <li>• Password reset</li>
              <li>• Updating profile information</li>
              <li>• Account access problems</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#F7F3EC] p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Booking Support
            </h2>

            <ul className="mt-4 space-y-3 text-gray-900">
              <li>• Scheduling sessions</li>
              <li>• Rescheduling appointments</li>
              <li>• Payment questions</li>
              <li>• Meeting links</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#F7F3EC] p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Therapist Support
            </h2>

            <ul className="mt-4 space-y-3 text-gray-900">
              <li>• Profile approval</li>
              <li>• Credential verification</li>
              <li>• Availability setup</li>
              <li>• Managing sessions</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#F7F3EC] p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              DeepTalk AI
            </h2>

            <ul className="mt-4 space-y-3 text-gray-900">
              <li>• Journal reflections</li>
              <li>• Emotional check-ins</li>
              <li>• Self-discovery tools</li>
              <li>• Privacy and safety</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white">
          <h2 className="text-2xl font-bold">
            Need More Help?
          </h2>

          <p className="mt-4 text-white/90">
            Contact the MyDeepTalk team and we'll be happy to assist you.
          </p>

          <div className="mt-6">
            <p className="font-semibold">
              📧 info@mydeeptalk.com
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}