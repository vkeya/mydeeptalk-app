import Link from "next/link";

export default function DashboardAnnouncement() {
  return (
    <section className="mb-10 rounded-3xl border border-[#2C7A7B]/20 bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#E2954E]">
            💙 Men's Mental Health Month
          </p>

          <h2 className="text-2xl font-bold text-[#0F4C5C] md:text-3xl">
            Strong men talk too.
          </h2>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-gray-900">
            Men often carry stress, grief, pressure, and loneliness silently.
            Taking care of your emotional wellbeing is a sign of strength, not
            weakness.
          </p>

          <p className="mt-3 text-base font-bold text-[#0F4C5C]">
            You do not have to carry everything alone.
          </p>
        </div>

        <Link
          href="/journal"
          className="w-fit rounded-full bg-[#0F4C5C] px-6 py-3 text-sm font-bold text-white hover:bg-[#0b3945]"
        >
          Reflect Today
        </Link>
      </div>
    </section>
  );
}