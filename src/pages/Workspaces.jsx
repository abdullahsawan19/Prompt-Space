import { useNavigate } from "react-router-dom";
import ReuseableHeader from "../ui/ReuseableHeader";
import Workspacesdisplay from "../features/workspaces/Workspacesdisplay";

const Workspaces = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <ReuseableHeader
        name="Work spaces"
        onClick={() => navigate("/workspaces/new")}
        createName="Create Workspace"
      />
      <Workspacesdisplay />
    </div>
  );
};

export default Workspaces;
