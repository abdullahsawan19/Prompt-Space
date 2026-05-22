const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Active Users" },
    { number: "100+", label: "Global Teams" },
    { number: "10K+", label: "Prompts Saved" },
  ];

  return (
    <section
      id="stats"
      className="py-16 bg-[var(--color-grey-50)] border-b border-[var(--color-grey-200)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-grey-200)] text-center bg-[var(--color-grey-0)] rounded-3xl border border-[var(--color-grey-200)] shadow-[var(--shadow-sm)] overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col justify-center py-12 px-6 hover:bg-[var(--color-grey-50)] transition-colors duration-500"
            >
              <span className="text-5xl md:text-6xl font-black text-[var(--color-brand-600)] mb-3">
                {stat.number}
              </span>
              <span className="text-sm font-bold text-[var(--color-grey-500)] uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
