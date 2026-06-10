export default function CrisisResourcesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-[#C0392B]">
          Crisis Resources
        </h1>

        <div className="mt-8 space-y-8 text-base font-medium leading-8 text-gray-900">

          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="text-2xl font-bold text-[#C0392B]">
              In an Emergency
            </h2>

            <p className="mt-4">
              If you believe you are in immediate danger or experiencing a
              crisis, please call your local emergency services or go to the
              nearest hospital immediately.
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6">
            <h2 className="text-2xl font-bold text-[#E2954E]">
              Reach Out to Someone You Trust
            </h2>

            <p className="mt-4">
              You do not have to face difficult moments alone.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-8">
              <li>A trusted friend.</li>
              <li>A family member.</li>
              <li>A spiritual leader.</li>
              <li>A counselor or therapist.</li>
              <li>Your doctor or healthcare provider.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Professional Support
            </h2>

            <p className="mt-4">
              Licensed therapists available through MyDeepTalk may provide
              support, but they are not emergency responders and may not be
              immediately available.
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              Healing Begins With Connection
            </h2>

            <p className="mt-4">
              Asking for help is not weakness. Reaching out can be the first
              step toward healing, hope and recovery.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0F4C5C] p-6 text-white">
            <h2 className="text-2xl font-bold">
              Remember
            </h2>

            <p className="mt-4">
              You deserve support. You matter. There are people who care and
              professionals who want to help.
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