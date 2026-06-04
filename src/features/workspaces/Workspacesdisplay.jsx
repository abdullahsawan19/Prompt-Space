import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";
import { useWorkspaces } from "./workspaces-Hooks/useWorkspaces";
import SearchFilterBar from "../../ui/SearchFilterBar";
import WorkspaceCard from "./WorkspaceCard";

const Workspacesdisplay = () => {
  const navigate = useNavigate();
  const { isLoading, workspaces, error } = useWorkspaces();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState("all");

  const uniqueWorkspaces = useMemo(() => {
    if (!workspaces) return [];
    return workspaces.map((ws) => ({ id: ws.id, name: ws.name }));
  }, [workspaces]);

  const filteredWorkspaces = useMemo(() => {
    if (!workspaces) return [];

    return workspaces.filter((ws) => {
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        ws.name?.toLowerCase().includes(searchLower) ||
        ws.description?.toLowerCase().includes(searchLower) ||
        ws.type?.toLowerCase().includes(searchLower) ||
        (ws.prompts || []).some((p) =>
          p.title?.toLowerCase().includes(searchLower),
        );

      const matchesWorkspace =
        selectedWorkspace === "all" || ws.id === selectedWorkspace;

      return matchesSearch && matchesWorkspace;
    });
  }, [workspaces, searchQuery, selectedWorkspace]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 mt-8">
        <SpinnerMini className="h-12 w-12 text-[var(--color-brand-600)]" />
      </div>
    );
  }

  if (error) {
    toast.error("Could not load workspaces");
    return (
      <div className="text-center text-red-500 mt-8">
        Could not load workspaces.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {workspaces?.length > 0 ? (
        <>
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search workspaces or prompts inside them..."
            filterOptions={uniqueWorkspaces}
            selectedFilter={selectedWorkspace}
            onFilterChange={setSelectedWorkspace}
            filterLabel="Filter by:"
            allLabel="All Workspaces"
          />

          {filteredWorkspaces.length === 0 ? (
            <div className="text-center py-12 bg-[var(--color-grey-0)] border border-dashed border-[var(--color-grey-300)] rounded-2xl">
              <p className="text-[var(--color-grey-500)]">
                No workspaces match your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkspaces.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-[var(--color-grey-50)] rounded-2xl border border-[var(--color-grey-200)] shadow-sm">
          <h3 className="text-lg font-bold text-[var(--color-grey-700)] mb-2">
            No workspaces found
          </h3>
          <p className="text-[var(--color-grey-500)] mb-6 max-w-md mx-auto">
            Create a new workspace to start organizing prompts with your team or
            for your personal projects.
          </p>
          <Button onClick={() => navigate("/workspaces/new")}>
            Create Workspace
          </Button>
        </div>
      )}
    </div>
  );
};

export default Workspacesdisplay;
