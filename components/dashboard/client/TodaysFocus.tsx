interface TodaysFocusProps {
  title: string;
  description: string;
  buttonText: string;
  onAction?: () => void;
}

export default function TodaysFocus({
  title,
  description,
  buttonText,
  onAction,
}: TodaysFocusProps) {
  return (
    <section className="mt-10 rounded-3xl border border-[#D9E7EA] bg-white p-8 shadow-sm">

      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2C7A7B]">
        Today's Focus
      </p>

      <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
        {description}
      </p>

      <button
        onClick={onAction}
        className="mt-8 rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white transition hover:bg-[#0b3945]"
      >
        {buttonText}
      </button>

    </section>
  );
}