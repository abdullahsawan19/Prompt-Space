import Header from "../../ui/Header";

const FormCopy = () => {
  return (
    <div className="order-1 md:order-2 text-center md:text-left flex flex-col justify-center">
      <Header
        title="Supercharge Your AI Workflows."
        subtitle="Join developers and creators optimizing their prompts. Save, organize, and collaborate in real-time."
        className="md:text-left text-center"
      />

      <ul className="mt-4 space-y-4 text-[var(--color-grey-600)] hidden md:block">
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[var(--color-brand-500)] bg-opacity-10 text-[var(--color-brand-600)] flex items-center justify-center">
            ✓
          </div>
          Smart Workspaces for your team
        </li>
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[var(--color-brand-500)] bg-opacity-10 text-[var(--color-brand-600)] flex items-center justify-center">
            ✓
          </div>
          Version control for every prompt
        </li>
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[var(--color-brand-500)] bg-opacity-10 text-[var(--color-brand-600)] flex items-center justify-center">
            ✓
          </div>
          Deploy instantly via API
        </li>
      </ul>
    </div>
  );
};

export default FormCopy;
