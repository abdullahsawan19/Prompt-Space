import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace as createWorkspaceApi } from "../../../services/apiWorkspaces";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createWorkspace, isPending: isCreating } = useMutation({
    mutationFn: createWorkspaceApi,
    onSuccess: () => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["simple-workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      navigate("/workspaces");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  return { createWorkspace, isCreating };
}
