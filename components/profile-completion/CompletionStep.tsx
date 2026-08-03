interface CompletionStepProps {
  onBack: () => void;
  onFinish: () => void;
}

export default function CompletionStep({
  onBack,
  onFinish,
}: CompletionStepProps) {
  return (
    <div className="space-y-8 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Your safe space is ready.
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Thank you for completing your profile.
        </p>

        <p className="mt-2 text-gray-600 leading-relaxed">
          You're now ready to begin your self-discovery and healing
          journey with MyDeepTalk.
        </p>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h2 className="font-semibold text-green-800">
          What's next?
        </h2>

        <ul className="mt-4 space-y-2 text-left text-green-700">
          <li>✓ Discover more about yourself.</li>
          <li>✓ Complete guided assessments.</li>
          <li>✓ Connect with qualified therapists.</li>
          <li>✓ Journal and track your growth.</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border px-6 py-3"
        >
          Back
        </button>

        <button
          onClick={onFinish}
          className="rounded-lg bg-primary px-6 py-3 text-white"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}