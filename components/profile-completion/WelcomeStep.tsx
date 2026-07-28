interface WelcomeStepProps {
  onContinue: () => void;
}

export default function WelcomeStep({
  onContinue,
}: WelcomeStepProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to MyDeepTalk
      </h1>

      <p className="mt-5 text-lg text-gray-600 leading-relaxed">
        Before we begin, let's personalize your experience.
        This will only take a couple of minutes and helps us
        create a safe space that's uniquely yours.
      </p>

      <button
        onClick={onContinue}
        className="mt-10 w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </div>
  );
}