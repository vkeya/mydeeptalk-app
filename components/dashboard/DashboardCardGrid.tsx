import Link from "next/link";
import { DashboardCard } from "./types";

interface DashboardCardGridProps {
  cards: DashboardCard[];
}

export default function DashboardCardGrid({
  cards,
}: DashboardCardGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-4xl">{card.icon}</div>

          <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
            {card.title}
          </h3>

          <p className="mt-3 min-h-[84px] text-base font-semibold leading-7 text-gray-900">
            {card.description}
          </p>

          <div
            className={`mt-auto inline-block w-fit rounded-full px-5 py-3 text-sm font-bold transition ${
              card.primary
                ? "bg-[#0F4C5C] text-white group-hover:bg-[#0b3945]"
                : "border-2 border-[#0F4C5C] text-[#0F4C5C] group-hover:bg-[#0F4C5C] group-hover:text-white"
            }`}
          >
            {card.buttonText}
          </div>
        </Link>
      ))}
    </div>
  );
}