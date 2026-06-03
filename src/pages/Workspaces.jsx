import { useNavigate } from "react-router-dom";
import ReuseableHeader from "../ui/ReuseableHeader";
import Workspacesdisplay from "../features/workspaces/Workspacesdisplay";

const Workspaces = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
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
