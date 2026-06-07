import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/Auth-Hooks/useUser";
import { getAreaChartData } from "../../../services/apiDashboard";

export function useAreaChartData() {
  const { user } = useUser();

  const { data: areaData = [], isPending: isLoadingArea } = useQuery({
    queryKey: ["areaChart", user?.id],
    queryFn: () => getAreaChartData(user?.id),
    enabled: !!user?.id,
  });

  return { areaData, isLoadingArea };
}
