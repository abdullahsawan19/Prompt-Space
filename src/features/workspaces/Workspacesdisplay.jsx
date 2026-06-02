import { useNavigate } from "react-router-dom";
import WorkspaceCard from "./WorkspaceCard";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";
import { useWorkspaces } from "./workspaces-Hooks/useWorkspaces";

const Workspacesdisplay = () => {
  const navigate = useNavigate();

  const { isLoading, workspaces, error } = useWorkspaces();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerMini />
      </div>
    );
  }

  if (error) {
    return toast.error("Something went wrong");
  }

  return (
    <div>
      {" "}
      {workspaces?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 mt-8 bg-[var(--color-grey-50)] rounded-2xl border border-[var(--color-grey-200)]">
          <h3 className="text-lg font-bold text-[var(--color-grey-700)] mb-2">
            No workspaces found
          </h3>
          <p className="text-[var(--color-grey-500)] mb-6">
            Create a new workspace to start organizing prompts with your team.
          </p>
          <Button onClick={() => navigate("/workspaces/new")} variant="primary">
            Create Workspace
          </Button>
        </div>
      )}
    </div>
  );
};

export default Workspacesdisplay;
