import Link from "next/link";

export interface ToolkitItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface ToolkitGridProps {
  items: ToolkitItem[];
}

export default function ToolkitGrid({
  items,
}: ToolkitGridProps) {
  return (
    <section className="mt-10">

      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2C7A7B]">
          My Toolkit
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0F4C5C]">
          Explore your healing tools
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Whenever you're ready, explore the tools available
          to support your wellbeing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {items.map((tool) => (

          <Link
            key={tool.id}
            href={tool.href}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="text-4xl">
              {tool.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0F4C5C] group-hover:text-[#2C7A7B]">
              {tool.title}
            </h3>

            <p className="mt-3 text-gray-600">
              {tool.description}
            </p>

          </Link>

        ))}

      </div>

    </section>
  );
}