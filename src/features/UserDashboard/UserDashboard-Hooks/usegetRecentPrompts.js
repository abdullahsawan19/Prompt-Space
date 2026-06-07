import { useQuery } from "@tanstack/react-query";
import { getRecentPrompts } from "../../../services/apiPrompts";

export function useGetRecentPrompts() {
  const { data: recentPrompets = [], isPending } = useQuery({
    queryKey: ["recentPrompts"],
    queryFn: getRecentPrompts,
  });

  return { recentPrompets, isPending };
}
