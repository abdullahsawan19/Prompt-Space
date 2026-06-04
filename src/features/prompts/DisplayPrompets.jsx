import { useState, useMemo } from "react";
import { usePrompts } from "./prompts-Hooks/usePrompts";
import { useDeletePrompt } from "./prompts-Hooks/useDeletePrompt";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";
import SearchFilterBar from "../../ui/SearchFilterBar";
import WorkspaceGroup from "./WorkspaceGroup";

const DisplayPrompets = ({ onOpenModal }) => {
  const { mutate: deletePromptMutation, isPending } = useDeletePrompt();
  const { isLoading, error, prompts } = usePrompts();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState("all");

  const uniqueWorkspaces = useMemo(() => {
    if (!prompts) return [];
    const map = new Map();
    prompts.forEach((p) => {
      const ws = p.workspaces || { id: "unassigned", name: "Personal" };
      if (!map.has(ws.id)) map.set(ws.id, ws.name);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [prompts]);

  const filteredAndGroupedPrompts = useMemo(() => {
    if (!prompts) return [];

    const filtered = prompts.filter((prompt) => {
      const matchesSearch =
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const workspaceId = prompt.workspaces?.id || "unassigned";
      const matchesWorkspace =
        selectedWorkspace === "all" || workspaceId === selectedWorkspace;

      return matchesSearch && matchesWorkspace;
    });

    const grouped = filtered.reduce((acc, prompt) => {
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
  }, [prompts, searchQuery, selectedWorkspace]);

  const handleDelete = (promptId) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
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
        Could not load prompts.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search prompts by title or description..."
        filterOptions={uniqueWorkspaces}
        selectedFilter={selectedWorkspace}
        onFilterChange={setSelectedWorkspace}
        filterLabel="Filter by Workspace:"
        allLabel="All Workspaces"
      />

      {filteredAndGroupedPrompts.length === 0 ? (
        searchQuery || selectedWorkspace !== "all" ? (
          <div className="text-center py-12 bg-[var(--color-grey-0)] border border-dashed border-[var(--color-grey-300)] rounded-2xl">
            <p className="text-[var(--color-grey-500)]">
              No prompts match your search or filter.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-grey-300)] bg-[var(--color-grey-0)] p-12 text-center mt-8">
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-grey-700)]">
              No prompts yet
            </h3>
            <p className="text-[var(--color-grey-500)] mb-6">
              Create your first prompt to get started.
            </p>
            <Button onClick={() => navigate("/createPrompt")} variant="outline">
              Create your first prompt
            </Button>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-10">
          {filteredAndGroupedPrompts.map((workspace) => (
            <WorkspaceGroup
              key={workspace.id}
              workspace={workspace}
              navigate={navigate}
              onOpenModal={onOpenModal}
              handleDelete={handleDelete}
              isPending={isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayPrompets;
