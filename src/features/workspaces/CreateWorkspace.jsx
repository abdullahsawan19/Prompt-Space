import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiUserGroup } from "react-icons/hi";
import { useCreateWorkspace } from "./workspaces-Hooks/useCreateWorkspace";

import WorkspaceDetailsSection from "./WorkspaceDetailsSection";
import WorkspaceInvitesSection from "./WorkspaceInvitesSection";
import WorkspaceFormActions from "./WorkspaceFormActions";

const CreateWorkspace = () => {
  const navigate = useNavigate();
  const { createWorkspace, isCreating } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "team",
      description: "",
      invites: [],
    },
  });

  const selectedType = watch("type");

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
        <WorkspaceDetailsSection
          register={register}
          control={control}
          errors={errors}
          isCreating={isCreating}
        />

        {selectedType !== "personal" && (
          <WorkspaceInvitesSection control={control} isCreating={isCreating} />
        )}

        <WorkspaceFormActions
          isCreating={isCreating}
          onCancel={() => navigate(-1)}
        />
      </form>
    </div>
  );
};

export default CreateWorkspace;
