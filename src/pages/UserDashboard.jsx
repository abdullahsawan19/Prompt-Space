import { useNavigate } from "react-router-dom";
import ReuseableHeader from "../ui/ReuseableHeader";
import { useUser } from "../features/auth/Auth-Hooks/useUser";
import SpinnerMini from "../ui/SpinnerMini";
import DisplayStats from "../features/UserDashboard/DisplayStats";
import AreaCharts from "../features/UserDashboard/AreaCharts";
import Invitations from "../features/UserDashboard/Invitations";
import RecentPrompts from "../features/UserDashboard/RecentPrompts";
import PieChart from "../features/UserDashboard/PieChart";

const UserDashboard = () => {
  const navigate = useNavigate();

  const { isLoading, user } = useUser();

  const userName = user?.user_metadata?.full_name;

  console.log(user);

  if (isLoading) {
    return (
      <div>
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ReuseableHeader
        name="Welcome back"
        personName={userName || "User"}
        description="Here is an overview of your workspaces and prompts."
        createName="Create Prompt"
        onClick={() => navigate("/createPrompt")}
        secondCreateName="New Workspace"
        secondOnClick={() => navigate("/workspaces/new")}
      />

      <DisplayStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaCharts />
        <Invitations />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart />
        <RecentPrompts />
      </div>
    </div>
  );
};

export default UserDashboard;
