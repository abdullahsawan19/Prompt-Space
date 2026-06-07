import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/Auth-Hooks/useUser";
import { getDashboardStats } from "../../../services/apiDashboard";

export function useGetDashboardStats() {
  const { user } = useUser();

  const {
    data: stats = { workspaces: 0, prompts: 0, versions: 0 },
    isPending,
  } = useQuery({
    queryKey: ["dashboardStats", user?.id],
    queryFn: () => getDashboardStats(user?.id),
    enabled: !!user?.id,
  });

  return { stats, isPending };
}
