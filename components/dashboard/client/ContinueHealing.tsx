import { HealingActivity } from "@/lib/dashboard/types";

interface ContinueHealingProps {
  activities: HealingActivity[];
}

export default function ContinueHealing({
  activities,
}: ContinueHealingProps) {
  if (activities.length === 0) return null;

  return (
    <section className="mt-10">

      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2C7A7B]">
          Continue Healing
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0F4C5C]">
          Pick up where you left off
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Your healing journey is made up of many small moments.
          Continue any activity that's already part of your journey.
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">

              <div className="flex gap-5">

                <div className="text-4xl">
                  {activity.icon}
                </div>

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="text-xl font-bold text-[#0F4C5C]">
                      {activity.title}
                    </h3>

                    {activity.badge && (
                      <span className="rounded-full bg-[#E8F6F5] px-3 py-1 text-xs font-semibold text-[#2C7A7B]">
                        {activity.badge}
                      </span>
                    )}

                  </div>

                  <p className="mt-2 text-gray-600">
                    {activity.description}
                  </p>

                </div>

              </div>

              <button
                className="rounded-full bg-[#0F4C5C] px-6 py-3 text-white transition hover:bg-[#0B3945]"
              >
                {activity.actionLabel}
              </button>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}