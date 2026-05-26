import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { HiOutlinePlus, HiOutlineTrash, HiUserGroup } from "react-icons/hi";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useCreateWorkspace } from "./workspaces-Hooks/useCreateWorkspace";
import SpinnerMini from "../../ui/SpinnerMini";

const CreateWorkspace = () => {
  const navigate = useNavigate();
  const { createWorkspace, isCreating } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "team",
      description: "",
      invites: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invites",
  });

  const [currentEmail, setCurrentEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("viewer");

  const workspaceTypeOptions = [
    { label: "Personal", value: "personal" },
    { label: "Team", value: "team" },
    { label: "Project", value: "project" },
  ];

  const roleOptions = [
    { label: "Viewer", value: "viewer" },
    { label: "Editor", value: "editor" },
  ];

  const handleAddInvite = () => {
    if (!currentEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (fields.find((inv) => inv.email === currentEmail)) {
      alert("This email is already in the list!");
      return;
    }

    append({ email: currentEmail, role: currentRole });
    setCurrentEmail("");
    setCurrentRole("viewer");
  };

  const onSubmit = (data) => {
    createWorkspace(data);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-grey-900)] flex items-center gap-3">
          <HiUserGroup className="text-[var(--color-brand-600)]" />
          Create New Workspace
        </h1>
        <p className="text-[var(--color-grey-500)] mt-2">
          Set up a new space for your prompts and invite your team to
          collaborate.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

        <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-8 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[var(--color-grey-800)] border-b border-[var(--color-grey-100)] pb-4">
            2. Invite Team Members{" "}
            <span className="text-sm font-normal text-[var(--color-grey-400)]">
              (Optional)
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <Input
                label="Email Address"
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                placeholder="colleague@example.com"
                disabled={isCreating}
              />
            </div>

            <div className="w-full md:w-48 space-y-1">
              <Select
                label="Role"
                options={roleOptions}
                value={currentRole}
                onChange={(val) => setCurrentRole(val)}
                disabled={isCreating}
              />
            </div>

            <Button
              onClick={handleAddInvite}
              type="button"
              variant="secondary"
              className="h-[46px]"
              disabled={isCreating}
            >
              <HiOutlinePlus size={20} /> Add
            </Button>
          </div>

          {fields.length > 0 && (
            <div className="mt-6 border border-[var(--color-grey-200)] rounded-xl overflow-hidden">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`flex items-center justify-between p-4 ${
                    index !== fields.length - 1
                      ? "border-b border-[var(--color-grey-200)]"
                      : ""
                  } bg-[var(--color-grey-50)]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-600)] flex items-center justify-center font-bold text-sm uppercase">
                      {field.email.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-grey-900)]">
                        {field.email}
                      </p>
                      <p className="text-xs font-semibold text-[var(--color-grey-500)] uppercase tracking-wider">
                        {field.role}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-[var(--color-grey-400)] hover:text-red-500 transition-colors focus:outline-none"
                    disabled={isCreating}
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
            disabled={isCreating}
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary" disabled={isCreating}>
            {isCreating ? (
              <>
                Creating... <SpinnerMini />
              </>
            ) : (
              "Create Workspace & Send Invites"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkspace;
