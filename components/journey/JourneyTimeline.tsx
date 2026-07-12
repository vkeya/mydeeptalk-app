"use client";

interface TimelineItem {
  title: string;
  status: "completed" | "current" | "locked";
}

const timeline: TimelineItem[] = [
  {
    title: "Meeting Yourself",
    status: "completed",
  },
  {
    title: "Your Story",
    status: "current",
  },
  {
    title: "Emotional Patterns",
    status: "locked",
  },
  {
    title: "Healing the Past",
    status: "locked",
  },
  {
    title: "Boundaries",
    status: "locked",
  },
  {
    title: "Relationships",
    status: "locked",
  },
  {
    title: "Purpose",
    status: "locked",
  },
  {
    title: "Future Self",
    status: "locked",
  },
  {
    title: "Wholeness",
    status: "locked",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="mb-8">

        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8A6E4B]">
          Journey Progress
        </p>

        <h2 className="font-serif text-3xl font-bold text-[#1C2434]">
          Your Healing Timeline
        </h2>

        <p className="mt-3 text-gray-600">
          Every experience builds on the last. Growth isn't about rushing—
          it's about moving forward with intention.
        </p>

      </div>

      <div className="space-y-8">

        {timeline.map((item, index) => (
          <div
            key={item.title}
            className="flex items-start gap-6"
          >
            <div className="flex flex-col items-center">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                  item.status === "completed"
                    ? "bg-green-600 text-white"
                    : item.status === "current"
                    ? "bg-[#8A6E4B] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {item.status === "completed"
                  ? "✓"
                  : item.status === "current"
                  ? "▶"
                  : index + 1}
              </div>

              {index < timeline.length - 1 && (
                <div className="h-14 w-1 bg-gray-200" />
              )}

            </div>

            <div className="pt-1">

              <h3 className="text-xl font-semibold text-[#1C2434]">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-600">

                {item.status === "completed" &&
                  "Completed"}

                {item.status === "current" &&
                  "Your next experience"}

                {item.status === "locked" &&
                  "Unlock by completing previous experiences"}

              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}