import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../../../services/apiWorkspaces";

export function useWorkspace() {
  const { id } = useParams();

  const { isPending, data, error } = useQuery({
    queryKey: ["workspace", id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
  });

  return { isPending, data, error };
}
