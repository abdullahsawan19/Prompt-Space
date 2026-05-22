const HowItWorksSection = () => {
  const steps = [
    {
      num: "01",
      title: "Create Workspace",
      desc: "Set up a clean environment for your specific project or team goal.",
    },
    {
      num: "02",
      title: "Save & Tag",
      desc: "Write your prompts, attach metadata, variables, and optimize with tags.",
    },
    {
      num: "03",
      title: "Deploy & Share",
      desc: "Access your library instantly from anywhere or share it seamlessly via link.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[var(--color-grey-100)]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16 text-[var(--color-grey-900)]">
          How PromptSpace Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <span className="text-7xl font-black text-[var(--color-brand-500)] opacity-10 absolute -top-10 left-1/2 -translate-x-1/2">
                {step.num}
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2 text-[var(--color-grey-900)] relative z-10">
                {step.title}
              </h3>
              <p className="text-[var(--color-grey-600)] max-w-sm text-[15px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
