import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../../services/apiWorkspaces";
import { useUser } from "../../auth/Auth-Hooks/useUser";

export function useWorkspaces() {
  const { user } = useUser();

  const {
    isLoading,
    data: workspaces,
    error,
  } = useQuery({
    queryKey: ["workspaces", user?.id],
    queryFn: () => getWorkspaces(user.id),
    enabled: !!user?.id,
  });

  return { isLoading, error, workspaces };
}
