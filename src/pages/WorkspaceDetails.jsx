import { useNavigate } from "react-router-dom";

import ReuseableHeader from "../ui/ReuseableHeader";
import WorkSpacePromoetDeatailsDisplay from "../features/workspaces/WorkSpacePromoetDeatailsDisplay";
import { useWorkspace } from "../features/workspaces/workspaces-Hooks/useWorkspace";
import SpinnerMini from "../ui/SpinnerMini";
import Button from "../ui/Button";

const WorkspaceDetails = () => {
  const navigate = useNavigate();
  const { isPending: isLoading, data: workspace, error } = useWorkspace();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerMini />
      </div>
    );
  }
  if (error || !workspace) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-[var(--color-grey-800)] mb-4">
          Workspace not found
        </h2>
        <Button onClick={() => navigate("/workspaces")} variant="secondary">
          Back to Workspaces
        </Button>
      </div>
    );
  }
  const {
    name: woerkSpaceName,
    description: workSpaceDescription,
    type: workSpaceType,
    prompts,
  } = workspace;

  return (
    <div className="max-w-5xl mx-auto pt-4 pb-8 px-4 sm:px-6 lg:px-8">
      <ReuseableHeader
        name={woerkSpaceName}
        onClick={() => navigate("/createPrompt")}
        createName="Create Prompt Here"
        type={workSpaceType}
        description={workSpaceDescription}
      />
      <div>
        <h2 className="text-xl font-bold text-[var(--color-grey-800)] mb-6">
          Prompts ({prompts?.length || 0})
        </h2>

        <WorkSpacePromoetDeatailsDisplay />
      </div>
    </div>
  );
};

export default WorkspaceDetails;
