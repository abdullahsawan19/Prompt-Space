import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace as createWorkspaceApi } from "../../../services/apiWorkspaces";
import { useNavigate } from "react-router-dom";

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createWorkspace, isPending: isCreating } = useMutation({
    mutationFn: createWorkspaceApi,
    onSuccess: () => {
      alert("Workspace created successfully!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      navigate("/workspaces");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  return { createWorkspace, isCreating };
}
