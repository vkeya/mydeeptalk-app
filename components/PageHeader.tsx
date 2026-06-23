import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

export default function PageHeader({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="bg-[#F7F3EC]">
      <div className="mx-auto flex min-h-[350px] max-w-7xl flex-col justify-center px-8 py-16">
        {/* Breadcrumb trail */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-600 transition hover:text-[#0F4C5C]"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-gray-600 transition hover:text-[#0F4C5C]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#0F4C5C]">
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        <h1 className="text-4xl font-bold leading-tight text-[#0F4C5C] md:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
