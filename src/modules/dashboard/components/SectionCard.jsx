function SectionCard({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:p-8">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm font-medium text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative">
        {children}
      </div>
    </section>
  );
}

export default SectionCard;