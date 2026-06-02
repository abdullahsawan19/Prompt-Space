import { useQuery } from "@tanstack/react-query";
import { getSimpleWorkspaces } from "../../../services/apiWorkspaces";
import { useUser } from "../../auth/Auth-Hooks/useUser";

export function useSimpleWorkspaces() {
  const { user } = useUser();

  const { isPending, data } = useQuery({
    queryKey: ["simple-workspaces", user?.id],
    queryFn: () => getSimpleWorkspaces(user.id),
    enabled: !!user?.id,
  });

  return { isPending, data };
}
