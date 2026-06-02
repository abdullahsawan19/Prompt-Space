import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { Controller } from "react-hook-form";

const workspaceTypeOptions = [
  { label: "Personal", value: "personal" },
  { label: "Team", value: "team" },
  { label: "Project", value: "project" },
];

const WorkspaceDetailsSection = ({ register, control, errors, isCreating }) => {
  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-8 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-xl font-bold text-[var(--color-grey-800)] border-b border-[var(--color-grey-100)] pb-4">
        1. Workspace Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Input
          label="Workspace Name *"
          type="text"
          placeholder="e.g., Marketing Team"
          error={errors.name?.message}
          {...register("name", { required: "Workspace name is required" })}
          disabled={isCreating}
        />

        <div className="space-y-1">
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Type"
                options={workspaceTypeOptions}
                value={value}
                onChange={onChange}
                disabled={isCreating}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[var(--color-grey-700)] mb-1">
          Description (Optional)
        </label>
        <textarea
          rows="2"
          {...register("description")}
          disabled={isCreating}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-grey-300)] focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-1 focus:ring-[var(--color-brand-500)] bg-[var(--color-grey-50)] text-[var(--color-grey-900)] transition-colors resize-none"
          placeholder="What is this workspace used for?"
        />
      </div>
    </div>
  );
};

export default WorkspaceDetailsSection;
