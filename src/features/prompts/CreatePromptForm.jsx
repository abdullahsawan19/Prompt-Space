import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle, HiOutlinePlus } from "react-icons/hi"; // ضفنا أيقونات

import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "../auth/Auth-Hooks/useUser";
import { useCreatePrompt } from "./prompts-Hooks/useCreatePrompt";
import { useSimpleWorkspaces } from "./prompts-Hooks/useSimpleWorkspaces";

const CreatePromptForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { mutate: createPrompt, isPending: isCreating } = useCreatePrompt();
  const { isPending: isLoadingWorkspaces, data: workspaces } =
    useSimpleWorkspaces();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    createPrompt(
      { ...data, user_id: user.id },
      {
        onSuccess: () => {
          navigate("/prompts");
        },
      },
    );
  };

  if (isLoadingWorkspaces) {
    return (
      <Card className="flex justify-center items-center py-16">
        <SpinnerMini />
        <span className="ml-2 text-[var(--color-grey-500)]">Loading...</span>
      </Card>
    );
  }

  if (!workspaces || workspaces.length === 0) {
    return (
      <Card className="flex flex-col items-center text-center py-16">
        <HiOutlineExclamationCircle className="text-5xl text-[var(--color-brand-500)] mb-4" />
        <h3 className="text-xl font-bold text-[var(--color-grey-900)] mb-2">
          No Workspace Found
        </h3>
        <p className="text-[var(--color-grey-500)] mb-6 max-w-md">
          You need to create or join a workspace before you can create a prompt.
          Workspaces help you organize and share your prompts.
        </p>
        <Button onClick={() => navigate("/workspaces/new")} variant="primary">
          <HiOutlinePlus size={20} className="mr-2" />
          Create Your First Workspace
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Title Input */}
        <Input
          label="Prompt Title"
          type="text"
          placeholder="e.g., SEO Blog Post Generator"
          error={errors?.title?.message}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />

        <Input
          label="Description (Optional)"
          type="text"
          placeholder="Briefly describe what this prompt does..."
          error={errors?.description?.message}
          {...register("description")}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-grey-700)]">
            Workspace
          </label>
          <div className="relative">
            <select
              className={`w-full appearance-none px-4 py-2.5 rounded-xl border ${
                errors?.workspace_id
                  ? "border-red-500"
                  : "border-[var(--color-grey-300)]"
              } bg-[var(--color-grey-0)] focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-1 focus:ring-[var(--color-brand-500)] text-[var(--color-grey-900)] transition-colors`}
              disabled={isCreating}
              {...register("workspace_id", {
                required: "Please select a workspace",
              })}
            >
              <option value="">Select a Workspace...</option>
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name} {ws.type === "personal" ? "(Personal)" : ""}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-grey-500)]">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors?.workspace_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.workspace_id.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-grey-700)]">
            Prompt Content
          </label>
          <textarea
            className={`w-full px-4 py-3 rounded-xl border ${
              errors?.content
                ? "border-red-500"
                : "border-[var(--color-grey-300)]"
            } bg-[var(--color-grey-0)] focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-1 focus:ring-[var(--color-brand-500)] text-[var(--color-grey-900)] transition-colors min-h-[200px] resize-y`}
            placeholder="Write your system prompt or instruction here..."
            disabled={isCreating}
            {...register("content", { required: "Content cannot be empty" })}
          />
          {errors?.content && (
            <p className="text-red-500 text-xs mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-[var(--color-grey-100)]">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isCreating || !isValid}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating || !isValid}>
            {isCreating ? (
              <>
                <SpinnerMini />
                <span>Saving...</span>
              </>
            ) : (
              "Create Prompt"
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreatePromptForm;
