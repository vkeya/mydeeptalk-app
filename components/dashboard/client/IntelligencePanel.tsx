interface Props {
    title: string;
    message: string;
}

export default function IntelligencePanel({
    title,
    message,
}: Props) {
    return (
        <section className="card-soft rounded-3xl p-8">
            <p className="eyebrow">
                AI Insight
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {title}
            </h2>

            <p className="mt-4 text-slate-600">
                {message}
            </p>
        </section>
    );
}