export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <article className="card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pine-700/70">
            {label}
          </p>
          <p className="mt-3 font-serif text-4xl text-pine-900">{value}</p>
          {hint && <p className="mt-2 text-sm text-ink-500">{hint}</p>}
        </div>
        {Icon && (
          <span className="rounded-2xl bg-pine-50 p-3 text-pine-700">
            <Icon size={20} />
          </span>
        )}
      </div>
    </article>
  );
}
