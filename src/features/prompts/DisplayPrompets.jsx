// src/ui/DisplayPrompets.jsx
import { usePrompts } from "./prompts-Hooks/usePrompts";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { HiOutlineFolderOpen } from "react-icons/hi";
import SpinnerMini from "../../ui/SpinnerMini";
import { useMemo } from "react";
import Card from "../../ui/Card";
import PromptCardActions from "../../ui/PromptCardActions";
import { useDeletePrompt } from "./prompts-Hooks/useDeletePrompt";

const DisplayPrompets = ({ onOpenModal }) => {
  const { mutate: deletePromptMutation, isPending } = useDeletePrompt();

  const { isLoading, error, prompts } = usePrompts();
  const navigate = useNavigate();

  const groupedPrompts = useMemo(() => {
    if (!prompts) return [];

    const grouped = prompts.reduce((acc, prompt) => {
      const workspace = prompt.workspaces || {
        id: "unassigned",
        name: "Personal",
        type: "personal",
      };

      if (!acc[workspace.id]) {
        acc[workspace.id] = { ...workspace, prompts: [] };
      }

      acc[workspace.id].prompts.push(prompt);
      return acc;
    }, {});

    return Object.values(grouped);
  }, [prompts]);

  const handleDelete = (promptId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this prompt? This action cannot be undone.",
    );

    if (isConfirmed) {
      deletePromptMutation(promptId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center mt-8">
        <SpinnerMini className="h-12 w-12 text-[var(--color-brand-600)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        Could not load prompts. Please try again later.
      </div>
    );
  }

  return (
    <>
      {groupedPrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-grey-300)] bg-[var(--color-grey-0)] p-12 text-center mt-8">
          <h3 className="mb-2 text-lg font-semibold text-[var(--color-grey-700)]">
            No prompts yet
          </h3>
          <p className="text-[var(--color-grey-500)] mb-6">
            Create your first prompt to get started with your workspace.
          </p>
          <Button onClick={() => navigate("/createPrompt")} variant="outline">
            Create your first prompt
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {groupedPrompts.map((workspace) => (
            <div key={workspace.id} className="flex flex-col gap-4">
              {/* Header Workspace */}
              <div className="flex items-center w-full mb-2 mt-4">
                <div className="h-px flex-1 bg-[var(--color-grey-200)]"></div>
                <div className="flex items-center gap-2 mx-4">
                  <HiOutlineFolderOpen
                    className="text-[var(--color-brand-600)]"
                    size={24}
                  />
                  <h2 className="text-xl font-bold text-[var(--color-grey-800)]">
                    {workspace.name}
                  </h2>
                  {workspace.type === "personal" && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[var(--color-grey-200)] text-[var(--color-grey-600)]">
                      Personal
                    </span>
                  )}
                </div>
                <div className="h-px flex-1 bg-[var(--color-grey-200)]"></div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {workspace.prompts.map((prompt) => (
                  <Card
                    key={prompt.id}
                    className="relative flex flex-col gap-3"
                  >
                    <PromptCardActions
                      prompt={prompt}
                      onOpenModal={onOpenModal}
                      deletePrompt={handleDelete}
                      isPending={isPending}
                    />

                    <h3 className="font-bold text-lg text-[var(--color-grey-900)] pr-20 truncate mt-1">
                      {prompt.title}
                    </h3>

                    <p className="text-sm text-[var(--color-grey-500)] line-clamp-2">
                      {prompt.description || "No description provided."}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayPrompets;
