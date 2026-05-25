import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../../services/apiWorkspaces";
import { useUser } from "../../auth/Auth-Hooks/useUser";

export function useWorkspaces() {
  const { user } = useUser();

  const { isPending, error, data } = useQuery({
    queryKey: ["workspaces", user?.id],
    queryFn: () => getWorkspaces(user?.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  return { isPending, error, data };
}
