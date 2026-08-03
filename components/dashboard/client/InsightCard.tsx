interface InsightCardProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function InsightCard({
  title,
  message,
  actionLabel,
  onAction,
}: InsightCardProps) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[#F8FBFC] to-[#EEF7F8] border border-[#D8ECEE] shadow-sm">

      <div className="p-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2C7A7B]/10 text-2xl">
            💡
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2C7A7B]">
              Today's Insight
            </p>

            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              {title}
            </h2>
          </div>

        </div>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
          {message}
        </p>

        {actionLabel && (
          <button
            onClick={onAction}
            className="mt-8 rounded-full border border-[#0F4C5C] px-6 py-3 font-semibold text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
          >
            {actionLabel}
          </button>
        )}

      </div>

    </section>
  );
}