import { useNavigate } from "react-router-dom";
import ReuseableHeader from "../ui/ReuseableHeader";

const Workspaces = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ReuseableHeader
        name="Work spaces"
        onClick={() => navigate("/workspaces/new")}
        createName="Create Workspace"
      />
    </div>
  );
};

export default Workspaces;
