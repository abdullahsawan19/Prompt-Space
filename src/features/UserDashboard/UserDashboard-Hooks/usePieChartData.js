import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/Auth-Hooks/useUser";
import { getPieChartData } from "../../../services/apiDashboard";

export function usePieChartData() {
  const { user } = useUser();

  const { data: pieData = [], isPending: isLoadingPie } = useQuery({
    queryKey: ["pieChart", user?.id],
    queryFn: () => getPieChartData(user?.id),
    enabled: !!user?.id,
  });

  return { pieData, isLoadingPie };
}
