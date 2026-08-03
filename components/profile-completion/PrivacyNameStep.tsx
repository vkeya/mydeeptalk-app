interface PrivacyNameStepProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function PrivacyNameStep({
  value,
  onChange,
  onContinue,
  onBack,
}: PrivacyNameStepProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Choose your Privacy Name
      </h1>

      <p className="mt-4">
        This is how you'll be known throughout MyDeepTalk.
        Your real name stays private unless you choose to share it.
      </p>

      <div className="mt-8">
        <label className="block mb-2 font-medium">
          Privacy Name
        </label>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Phoenix"
          className="w-full"
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack}>
          Back
        </button>

        <button
          onClick={onContinue}
          disabled={!value.trim()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}